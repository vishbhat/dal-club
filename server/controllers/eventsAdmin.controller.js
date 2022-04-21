// @Author: Vishnu Sumanth
const { EventsModel, EventBookingsModel } = require("../models");
const DBConnection = require("../config/dbConfig");
const eventsModel = require("../models/events.model");
const { sequelize } = require("sequelize");
const { Result } = require("express-validator");
const { format, formatISO } = require("date-fns");
const read = require("body-parser/lib/read");
const AWS = require("aws-sdk");
const fs = require("fs");
//fetch all events regardless of all the of the active status
const getEvents = (req, res) => {
  // EventsModel.findAll({attributes: ["name","id","silverMemberSeats","goldMemberSeats","platinumMemberSeats","remainingSilverSeats","remainingGoldSeats","remainingPlatinumSeats"]
  EventsModel.findAll({
    attributes: [
      "id",
      "name",
      "allow_booking_date",
      "is_active",
      [
        DBConnection.literal(
          "(SUM(silver_member_seats)-SUM(remaining_silver_seats))"
        ),
        "Total_bookings",
      ],
      [
        DBConnection.literal(
          "(SUM(gold_member_seats)-SUM(remaining_gold_seats))"
        ),
        "Total_gold_bookings",
      ],
      [
        DBConnection.literal(
          "(SUM(platinum_member_seats)-SUM(remaining_platinum_seats))"
        ),
        "Total_platinum_bookings",
      ],
    ],
    group: ["id"],
  })
    .then((events) => {
      res.status(200).send(events);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
//adding new events
const addEvents = async (req, res) => {
  console.log(req.body);
  console.log(format(new Date(req.body.date2), "dd/MM/yyyy hh:mm "));
  await EventsModel.create({
    name: req.body.eventName,
    coverImage: req.body.image,
    category: req.body.select,
    description: req.body.EventDes,
    eventDate: format(new Date(req.body.date2), "yyyy-MM-dd hh:mm:ss"),
    allowBookingDate: format(new Date(req.body.date1), "yyyy-MM-dd hh:mm:ss"),
    isActive: 1,
    ticketLimit: req.body.mxs,
    silverMemberSeats: req.body.ss,
    goldMemberSeats: req.body.gs,
    platinumMemberSeats: req.body.ps,
    remainingSilverSeats: req.body.ss,
    remainingGoldSeats: req.body.gs,
    remainingPlatinumSeats: req.body.ps,
    silverMemberPrice: req.body.sp,
    goldMemberPrice: req.body.gp,
    platinumMemberPrice: req.body.pp,
  })
    .then((result) => {
      console.log("yes");
      res.status(200).send({ success: true, node: "event added" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
};
// retrive users that registered the events
const showUsers = (req, res) => {
  EventBookingsModel.findAll({
    where: { eventId: req.body.id },
    include: {
      model: EventsModel,
      as: "event",
      attributes: ["id", "name"],
    },
  })
    .then((users) => {
      console.log(users);
      res.send({ success: true, users: users });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ success: false, users: [] });
    });
};
// deactiabetteh event
const deactivateEvent = (req, res) => {
  console.log(req.body.id);
  EventsModel.update({ isActive: 0 }, { where: { id: req.body.id } })
    .then(
      (result) => console.log(result)
      //  res.status(200)
    )
    .catch(
      (err) => console.log(err)
      //   res.send(500)
    );
};
//activate the event
const activateEvent = (req, res) => {
  EventsModel.update({ isActive: 1 }, { where: { id: req.body.id } })
    .then((result) => res.status(200))
    .catch(
      (err) => console.log(err)
      //   res.send(500)
    );
};
//upload image
const imageUpload = (req, res) => {
  console.log(req);
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  });
  if (req.files === null) {
    res.status(400).send({ msg: "no file found" });
  }
  const params = {
    Bucket: "webproject5709",
    Key: "eventimages/" + req.body.eventName + ".jpg",
    Body: req.files.file.data,
  };

  s3.upload(params, function (err, data) {
    if (err) {
      throw err;
    }
    console.log(`File uploaded successfully. ${data.Location}`);
  });
};
// delete event
const deleteEvent = (req, res) => {
  console.log(req.body.id);
  EventsModel.destroy({ where: { id: req.body.id } })
    .then((result) => console.log(result))
    .catch((err) => console.log(err));
};
// get event status
const eventStatus = (req, res) => {
  EventsModel.findAll({
    attributes: ["is_active"],
    where: { id: req.body.id },
  })
    .then((events) => {
      res.status(200).send(events);
    })
    .catch((err) => {
      console.log(err);

      res.status(500).send(err);
    });
};
module.exports = {
  getEvents,
  addEvents,
  deactivateEvent,
  deleteEvent,
  showUsers,
  activateEvent,
  eventStatus,
  imageUpload,
};
// getEvents();
