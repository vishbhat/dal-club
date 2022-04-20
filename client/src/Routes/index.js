// @Authors: Kishan Thakkar, Rahul Kherajani, Vishwanath Suresh, Kunj Vijaykumar Patel,Vishnu Sumanth, Anamika Ahmed
import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import AdminDashboard from '../Pages/Admin/AdminHome';
import AdminLogin from '../Pages/Admin/AdminLogin';
import UserHeader from '../Components/Users/Header';
import Homepage from '../Pages/Users/Homepage';
import UserLogin from '../Pages/Users/Login';
import UserRegister from '../Pages/Users/Register';
import UserProfile from '../Pages/Users/UpdateProfile';
import EventList from '../Pages/Users/EventList';
import EventDetails from '../Pages/Users/EventDetails';
import StorePage from '../Pages/Users/StorePage';
import ProductPage from '../Pages/Users/ProductPage';
import CartPage from '../Pages/Users/CartPage';
import OrdersPage from '../Pages/Users/OrdersPage';
import Home from '../Components/Admin/Home';
import RegisteredEvents from '../Pages/Users/RegisteredEvents';
import PaymentStatus from '../Pages/Users/PaymentStatus';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Careers from '../Pages/Users/Careers';
import JobApplication from '../Pages/Users/JobApplication';
import AdminCareers from '../Pages/Admin/AdminCareers';
import AddJobs from '../Pages/Admin/AddJobs';
import UpdateJobs from '../Pages/Admin/UpdateJobs';
import JobApplicants from '../Pages/Admin/JobApplicants';
import Blogs from '../Pages/Users/Blogs';
import NewBlog from '../Pages/Users/NewBlog';
import IndividualBlog from '../Pages/Users/IndividualBlog';
import AdminBlogs from '../Pages/Admin/AdminBlogs';
import AdminListUsers from '../Pages/Admin/AdminListUsers';

import AddBlog from '../Pages/Admin/AddBlog';
import UpdateBlog from '../Pages/Admin/UpdateBlog';
import AdminSubscriptionPackages from '../Pages/Admin/AdminSubscriptionPackages';
import AddPackage from '../Pages/Admin/AddPackage';
import UpdatePackage from '../Pages/Admin/UpdatePackage';
import Ctable from '../Components/Admin/Event/Ctable';
import EventForm from '../Components/Admin/Event/EventForm';
import ListUsers from '../Components/Admin/Event/ListUsers';
import AdminProducts from '../Pages/Admin/AdminProducts';
import AdminNewProduct from '../Pages/Admin/AdminNewProduct';
import AdminEditProduct from '../Pages/Admin/AdminEditProduct';
import AdminOrders from '../Pages/Admin/AdminOrders';
import AdminOrderDetails from '../Pages/Admin/AdminOrderDetails';

const AppRoutes = () => {
  const loadStripeKey = loadStripe(
    'pk_test_51KgEo1GMutfkjZDFgZN4zTuVLFDNLlUzae99RhzKMjWXlcBg6y0dIFKSRg3AMPZKaJLGuvUGT8MeDqe6tAzcCbfb00Ko70FnbZ'
  );

  return (
    <BrowserRouter>
      <Routes>
        {/* Admin routes without layout */}
        <Route path='/admin/login' element={<AdminLogin />} />
        {/* Admin routes with layout */}
        <Route path='/admin' element={<AdminDashboard />}>
          <Route path='dashboard' element={<Home />} />

          <Route path='careers' element={<AdminCareers />} />
          <Route path='careers/new' element={<AddJobs />} />
          <Route path='careers/update/:jobId' element={<UpdateJobs />} />
          <Route
            path='careers/applications/:jobId'
            element={<JobApplicants />}
          />

          <Route path='blogs' element={<AdminBlogs />} />
          <Route path='blogs/new' element={<AddBlog />} />
          <Route path='blogs/update/:blogId' element={<UpdateBlog />} />
          <Route path='packages' element={<AdminSubscriptionPackages />} />
          <Route path='packages/new' element={<AddPackage />} />
          <Route
            path='packages/update/:packageId'
            element={<UpdatePackage />}
          />

          <Route path='products' element={<AdminProducts />} />
          <Route path='products/new' element={<AdminNewProduct />} />
          <Route path='products/update/:id' element={<AdminEditProduct />} />

          <Route path='orders' element={<AdminOrders />} />
          <Route path='orders/:id' element={<AdminOrderDetails />} />
        </Route>
        <Route path='/admin/listUsers' element={<AdminListUsers />} />

        <Route path='/admin/dashboard/events' element={<Ctable />} />

        <Route path='/admin/dashboard/addevent' element={<EventForm />} />
        <Route
          path='/admin/dashboard/event/viewusers'
          element={<ListUsers />}
        />

        {/* User routes without header */}
        <Route path="/user/login" element={<UserLogin/>} />
        <Route path="/user/register" element={<UserRegister/>} />
        <Route path="/user/profile/:user_id" element={<UserProfile/>} />

        <Route path='/' element={<UserHeader />}>
          {/* User routes with header */}
          <Route index element={<Homepage />} />
          <Route path='/events' element={<EventList />} />
          <Route path='/eventDetails/:eventId' element={<EventDetails />} />
          <Route path='/registeredEvents' element={<RegisteredEvents />} />
          <Route
            path='/paymentStatus'
            element={
              <Elements stripe={loadStripeKey}>
                <PaymentStatus />
              </Elements>
            }
          />
          <Route path='/store/products' element={<StorePage />} />
          <Route path='/store/products/:id' element={<ProductPage />} />
          <Route path='/store/cart' element={<CartPage />} />
          <Route path='/store/orders' element={<OrdersPage />} />
          <Route path='/careers' element={<Careers />} />
          <Route
            path='/careers/application/:jobId'
            element={<JobApplication />}
          />
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/blogs/new' element={<NewBlog />} />
          <Route path='/blogs/:blogId' element={<IndividualBlog />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
