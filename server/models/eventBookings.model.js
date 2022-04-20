// @Author: Kishan Thakkar
module.exports = (sequelize, DataTypes) => {
  const EventBookings = sequelize.define("eventBookings", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "user_id"
    },
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "event_id"
    },
    paymentStatus: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: "payment_status"
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ticketsBooked: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "tickets_booked"
    },
    ticketsRefunded: {
      type: DataTypes.INTEGER,
      allowNull: true,
      default: 0,
      field: "tickets_refunded"
    },
    bookedOn: {
      type: "TIMESTAMP",
      allowNull: false,
      field: "booked_on"
    },
    ticketType: {
      type: DataTypes.STRING(20),
      allowNull: false,
      field: "ticket_type"
    },
  }, {
    tableName: "event_bookings",
    createdAt: "created_at",
    updatedAt: "updated_at"
  })
  return EventBookings
}