// @Authors: Kishan Thakkar, Rahul Kherajani, Vishwanath Suresh, Vishnu Sumanth, Anamika Ahmed, Kunj Vijaykumar Patel

require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const EventRouter = require('./routes/events');
const PaymentRouter = require('./routes/payment');
const OrderRouter = require('./routes/orders');
const ProductRouter = require('./routes/products');
const CareersRouter = require('./routes/careers');
const BlogsRouter = require('./routes/blogs');
const EventAdminRouter = require("./routes/eventsAdmin");
const UserRouter = require('./routes/users')
const AdminRouter = require('./routes/admin')
const PackagesRouter = require('./routes/packages');
const UserProfileRouter = require('./routes/usersProfile.routes')
const PackageRouter = require('./routes/package.route')
const DashboardRouter = require('./routes/dashboard');
const fileUpload = require("express-fileupload");





const PORT = process.env.PORT || 3005;
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());

app.get("/api/status", (req, res) => {
  res.json({ message: "DalClub.", status: true });
});

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.use("/api/users", UserRouter);
app.use('/api/events', EventRouter);
app.use('/api/orders', OrderRouter);
app.use("/api/admin", AdminRouter);
app.use('/api/users/profile', UserProfileRouter);
app.use('/api/products', ProductRouter);
app.use('/api/blogs', BlogsRouter);
app.use('/api/packages', PackagesRouter);
app.use("/api/careers", CareersRouter)
app.use("/api/events", EventAdminRouter)
app.use("/api/package", PackageRouter)
app.use('/api/payments', PaymentRouter);
app.use('/api/dashboard', DashboardRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
