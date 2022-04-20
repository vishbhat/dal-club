// @Authors: Kishan Thakkar, Rahul Kherajani, Vishwanath Suresh
const { DataTypes } = require('sequelize');
const DBConnection = require('../config/dbConfig');
const Events = require("./events.model")
const EventBookings = require("./eventBookings.model")
const PaymentDetails = require("./paymentDetails.model")
const OrderHeader = require('./orderheader.model.js');
const OrderLine = require('./orderline.model.js');
const Product = require('./product.model.js');
const ProductSize = require('./productsize.model.js');
const ProductColor = require('./productcolor.model.js');
const Careers= require("./careers.model");
const JobApplications = require("./jobApplication.model")
const Blogs = require("./blogs.model")
const Users_Profile = require("./user_profile.model")
const Packages = require("./packages.model")

const Package = require("./package")
const PackageModel = Package(DBConnection, DataTypes);


const EventsModel = Events(DBConnection, DataTypes);

const EventBookingsModel = EventBookings(DBConnection, DataTypes);
const PaymentDetailsModel = PaymentDetails(DBConnection, DataTypes);
const OrderHeaderModel = OrderHeader(DBConnection, DataTypes);
const OrderLineModel = OrderLine(DBConnection, DataTypes);
const ProductModel = Product(DBConnection, DataTypes);
const ProductSizeModel = ProductSize(DBConnection, DataTypes);
const ProductColorModel = ProductColor(DBConnection, DataTypes);
const CareersModel = Careers(DBConnection, DataTypes);
const JobApplicationsModel = JobApplications(DBConnection, DataTypes);
const BlogsModel = Blogs(DBConnection,DataTypes);
const PackagesModel = Packages(DBConnection,DataTypes);
const Users_ProfileModel = Users_Profile(DBConnection,DataTypes)


EventsModel.hasMany(EventBookingsModel, {
  foreignKey: 'event_id',
  as: 'eventBookings',
});
EventBookingsModel.belongsTo(EventsModel, { as: 'event' });

OrderHeaderModel.hasMany(OrderLineModel, {
  as: 'order_line',
  foreignKey: 'order_header_id',
});

OrderLineModel.belongsTo(OrderHeaderModel, {
  foreignKey: 'order_header_id',
});

OrderLineModel.belongsTo(ProductModel, {
  foreignKey: 'order_product_id',
  targetKey: 'product_id',
});

ProductModel.hasOne(OrderLineModel, {
  foreignKey: 'order_product_id',
  sourceKey: 'product_id',
});

ProductModel.hasMany(ProductSizeModel, {
  as: 'product_size',
  foreignKey: 'product_id',
});
ProductSizeModel.belongsTo(ProductModel, {
  foreignKey: 'product_id',
});

ProductModel.hasMany(ProductColorModel, {
  as: 'product_color',
  foreignKey: 'product_id',
});
ProductColorModel.belongsTo(ProductModel, {
  foreignKey: 'product_id',
});

CareersModel.hasMany(JobApplicationsModel, {
  foreignKey: 'job_id'
});
JobApplicationsModel.belongsTo(CareersModel, {
  foreignKey: 'job_id'
});

module.exports = {
  EventsModel,
  EventBookingsModel,
  PaymentDetailsModel,
  OrderHeaderModel,
  OrderLineModel,
  ProductModel,
  ProductColorModel,
  ProductSizeModel,
  CareersModel,
  JobApplicationsModel,
  BlogsModel,
  PackageModel,
  Users_ProfileModel,
  PackagesModel
};