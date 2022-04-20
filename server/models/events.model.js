// @Author: Kishan Thakkar
module.exports = (sequelize, DataTypes) => {
  const UserModel = sequelize.define("events", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    coverImage: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: "cover_image"
    },
    category: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    eventDate: {
      type: "TIMESTAMP",
      allowNull: true,
      field: "event_date"
    },
    allowBookingDate: {
      type: "TIMESTAMP",
      allowNull: true,
      field: "allow_booking_date"
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: "is_active"
    },
    ticketLimit: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "ticket_limit"
    },
    silverMemberSeats: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "silver_member_seats"
    },
    goldMemberSeats: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "gold_member_seats"
    },
    platinumMemberSeats: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "platinum_member_seats"
    },
    remainingSilverSeats: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "remaining_silver_seats"
    },
    remainingGoldSeats: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "remaining_gold_seats"
    },
    remainingPlatinumSeats: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "remaining_platinum_seats"
    },
    silverMemberPrice: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "silver_member_price"
    },
    goldMemberPrice: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "gold_member_price"
    },
    platinumMemberPrice: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "platinum_member_price"
    },
  }, {
    tableName: "events",
    createdAt: "created_at",
    updatedAt: "updated_at"
  })
  return UserModel
}