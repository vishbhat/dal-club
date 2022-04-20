// @Author: Kishan Thakkar
const { EventsModel, EventBookingsModel, PaymentDetailsModel } = require("../models");
const { Op } = require('sequelize')
const { format, parseISO, add, isBefore } = require("date-fns");
const DBConnection = require("../config/dbConfig");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const getEventList = (req, res) => {
  const {category, searchText, featured = false} = req.body
  
  // Create where condition object and add dynamic conditions if parameters are present
  const conditionObject = {
    where: {
      eventDate: { [Op.gte]: new Date() },
      allowBookingDate: { [Op.lte]: new Date() },
      isActive: true
    }
  }

  // Add limit of 5 for event carousel at homepage
  if(featured) conditionObject["limit"] = 5
  if(category) conditionObject["where"]["category"] = category
  if(searchText) conditionObject["where"]["name"] = { [Op.like]: `%${searchText}%` }
  
  EventsModel.findAll(conditionObject)
    .then((events) => {
      res.send({ success: true, events });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ success: false });
    });
};

const getBookedEvents = (req, res) => {
  const { eventType } = req.body
  const whereObj = { userId: req.params.userId }

  if(eventType === "All"){
  } else if(eventType === "Past") {
    whereObj["$event.event_date$"] = { [Op.lt]: new Date() }
  } else {
    whereObj["$event.event_date$"] = { [Op.gte]: new Date() }
  }

  EventBookingsModel.findAll({
    where: whereObj,
    include: {
      model: EventsModel,
      as: "event",
      attributes: ["id", "name", "coverImage", "eventDate"]
    },
  })
    .then((events) => {
      res.send({ success: true, events });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ success: false });
    });
};

const bookEvent = async (req, res) => {
  const { userId, paymentIntent, ticketType } = req.body;
  // Retrieve intent details and save them to database like amount paid and intent id
  // which will be used in future to refund tickets.
  const paymentIntentDetails = await stripe.paymentIntents.retrieve(paymentIntent);
  const { metadata: { id, ticketsBooked }, amount } = paymentIntentDetails;

  const eventDetails = await EventsModel.findOne({ where: { id } }).then((data) => data).catch(() => null);
  if (eventDetails) {
    const {
      ticketLimit, remainingSilverSeats, remainingGoldSeats, remainingPlatinumSeats,
    } = eventDetails

    // Get total tickets reserved by user for particular event in past
    const userBookedEvents = await EventBookingsModel.findAll({
      where: { userId, eventId: id },
    }).then((bookings) => {
      const totalBookings = bookings.reduce(
        (prevValue, currentValue) => prevValue + currentValue.ticketsBooked, 0
      );
      return totalBookings
    }).catch(() => 0);

    // Dont allow to book event if user limit exceeds or no more seats are available
    if (parseInt(userBookedEvents)+parseInt(ticketsBooked) <= parseInt(ticketLimit)) {
      const remainingTickets = ticketType === "Silver" ? remainingSilverSeats
        : ticketType === "Gold" ? remainingGoldSeats
        : ticketType === "Platinum" ? remainingPlatinumSeats
        : 0;
      if(remainingTickets < ticketsBooked) {
        await stripe.refunds.create({
          amount, payment_intent: paymentIntent
        })
        res.status(400).send({
          success: false,
          message: remainingTickets > 0 ? `Only ${remainingTickets} tickets are remaining for event.` : `Event is fully booked.`
        })
        return
      } else {

        // Deduct seats from available count, add payment details and book event for user
        let t = await DBConnection.transaction()
        try {
          const remainingTicketsField = ticketType === "Silver" ? "remainingSilverSeats"
            : ticketType === "Gold" ? "remainingGoldSeats"
            : ticketType === "Platinum" ? "remainingPlatinumSeats"
            : "";
          if(!remainingTicketsField) throw new Error();
          await eventDetails.update({
            [remainingTicketsField]: eventDetails[remainingTicketsField]-ticketsBooked
          }, { transaction: t })
          let bookingObject = await EventBookingsModel.create({
            userId,
            eventId: id,
            ticketsBooked,
            amount,
            paymentStatus: "Recieved",
            ticketType,
            bookedOn: format(new Date(), "yyyy-MM-dd hh:mm:ss")
          }, { transaction: t })
          await PaymentDetailsModel.create({
            paymentIntent,
            module: "event",
            userId,
            moduleId: bookingObject.id
          }, { transaction: t })
          await t.commit()
          res.send({ success: true, message: "Tickets booked successfully." })
          return
        } catch(error) {
          console.log(error);
          t.rollback();
          await stripe.refunds.create({
            amount, payment_intent: paymentIntent
          })
          res.status(500).send({ success: false, message: "Server error occured." })
          return
        }
      }
    } else {
      let difference = ticketLimit - userBookedEvents
      await stripe.refunds.create({
        amount, payment_intent: paymentIntent
      })
      res.status(400).send({
        success: false,
        message: `Maximum user ticket limit has reached.${ difference ?
          ` You can only book ${difference} tickets.` : "" }`,
      });
      return
    }
  } else {
    await stripe.refunds.create({
      amount, payment_intent: paymentIntent
    })
    res.status(404).send({ success: false, message: "Event not found." });
  }
};

const getEventDetails = (req, res) => {
  const { eventId="", userId="" } = req.params
  if(!eventId) {
    res.status(400).send({ success: false, message: "Event id and user id are required." })
    return
  }
  EventsModel.findOne({ where: { id: eventId } }).then(async eventDetails => {
    if(eventDetails) {
      // Get total number of tickets booked by user for this event, so UI can put required validations
      const userBookedEvents = await EventBookingsModel.findAll({
        where: { userId, eventId },
      }).then((bookings) => {
        const totalBookings = bookings.reduce(
          (prevValue, currentValue) => prevValue + currentValue.ticketsBooked, 0
        );
        return totalBookings
      }).catch(() => 0);
      res.send({ success: true, eventDetails: { ...eventDetails.dataValues, userBookedEvents } })
    } else {
      res.status(404).send({ success: false, message: "Event not found." })
    }
  }).catch(err => {
    res.status(500).send({ success: false, message: "Something went wrong." })
  })
}

const unregisterEvent = (req, res) => {
  PaymentDetailsModel.findOne({ where: { moduleId: req.params.bookingId } }).then(async details => {
    if(!details) throw new Error()
    let eventDetails = await EventBookingsModel.findOne({
      where: { id: req.params.bookingId },
      include: {
        model: EventsModel,
        as: "event",
      },
    })
    eventDetails = { ...eventDetails.dataValues, event: eventDetails.dataValues.event.dataValues }
    
    // Dont allow users to unregister from event if event is in less than 1 hour
    if(isBefore(add(new Date(), { hours: 1 }), parseISO(eventDetails.event.eventDate))) {
      res.status(400).send({ success: false, message: "Cannot unregister from event which are due less than hour." })
      return
    }

    // Get amount paid and number of tickets from stripe payment intent
    const paymentIntentDetails = await stripe.paymentIntents.retrieve(details.paymentIntent);
    let { amount, metadata: { ticketsBooked } } = paymentIntentDetails
    if(req.body.tickets < ticketsBooked) {
      // Calculate amount to refund by tickets to unregister
      let amountToRefund = (amount / ticketsBooked) * req.body.tickets
      let t = await DBConnection.transaction()
      try{

        // Deduct ticket count from event bookings row and delete the row if all tickets are refunded
        if(eventDetails.ticketsBooked === req.body.tickets) {
          await EventBookingsModel.destroy({ where: { id: req.params.bookingId } })
        } else {
          await EventBookingsModel.update({
            ticketsBooked: eventDetails.ticketsBooked - req.body.tickets,
            ticketsRefunded: eventDetails.ticketsRefunded + req.body.tickets,
          }, {
            where: { id: req.params.bookingId },
            transaction: t
          })
        }

        // Take ticket type from event details and increament overall available ticket count
        const remainingTicketsField = eventDetails.ticketType === "Silver" ? "remainingSilverSeats"
          : ticketType === "Gold" ? "remainingGoldSeats" : "remainingPlatinumSeats"
        EventsModel.update({
          [remainingTicketsField]: parseInt(eventDetails["event"][remainingTicketsField]) + req.body.tickets
        }, {
          where: { id: eventDetails.event.id },
          transaction: t
        })

        // If above conditions are valid then refund tickets through stripe payment intent
        await stripe.refunds.create({
          amount: amountToRefund, payment_intent: details.paymentIntent
        })
        await t.commit()
        res.send({ success: true, message: "Event unregistered successfully." })
        return
      } catch (error) {

        // Rollback all the changes if any operation fails to maintain database consistency
        console.log(error);
        t.rollback()
        res.status(500).send({ success: false, message: "Something went wrong, please try again later." })
      }
    } else {
      res.status(400).send({ success: false, message: "Invalid tickets to register." })
    }
  }).catch(err => {
    res.status(500).send({ success: false, message: "Something went wrong." })
  })
  

}

module.exports = {
  getEventList,
  getBookedEvents,
  bookEvent,
  getEventDetails,
  unregisterEvent
};
