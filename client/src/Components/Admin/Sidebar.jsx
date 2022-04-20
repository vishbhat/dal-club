// @Authors: Rahul Kherajani, Vishwanath Suresh, Vishnu Sumanth, Kunj Vijaykumar Patel
import React, { useContext, useEffect } from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import RedeemIcon from '@mui/icons-material/Redeem';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HailIcon from '@mui/icons-material/Hail';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { styled } from '@mui/system';
import { Link, useNavigate } from 'react-router-dom';
import { StateContext } from '../../State';
import { toast } from "react-toastify"

const SidebarContainer = styled('div')({
  flex: '2',
  height: 'calc(100vh - 50px)',
  position: 'sticky',
  top: '50px',
});
const SidebarWrapper = styled('div')({
  padding: '20px',
  color: '#555',
});

const SidebarMenu = styled('div')({
  marginBottom: '10px',
  fontSize: '1.2em',
});
const SidebarList = styled('ul')({
  listStyle: 'none',
  padding: '5px',
});
const SidebarListItem = styled('li')({
  padding: '5px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  borderRadius: '10px',
  '&:hover': {
    backgroundColor: 'rgb(240, 240, 255)',
  },
  marginBottom: '3vh',
});

const Sidebar = () => {
  const { siteAuth } = useContext(StateContext)
  const navigate = useNavigate()
  useEffect(() => {
    if(!siteAuth.isLoggedIn || !siteAuth.isAdmin) {
      toast.error("Please login first.")
      navigate(`/admin/login`)
    }
  }, [])
  return (
    <SidebarContainer>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarList>
            <Link to={'/admin/dashboard'}>
              <SidebarListItem>
                <DashboardIcon sx={{ marginRight: '2vh' }} />
                Dashboard
              </SidebarListItem>
            </Link>
            <SidebarListItem>
              <PeopleIcon sx={{ marginRight: '2vh' }} />
              <Link to={"/admin/listUsers"}>Users</Link>
            </SidebarListItem>
            <SidebarListItem>
              <EventIcon sx={{ marginRight: '2vh' }} />
              <Link to='/admin/dashboard/events'>Events </Link>
            </SidebarListItem>
            <Link to={'/admin/packages'}>
              <SidebarListItem>
                <RedeemIcon sx={{ marginRight: '2vh' }} />
                Membership Packages
              </SidebarListItem>
            </Link>
            <Link to={'/admin/products'}>
              <SidebarListItem>
                <InventoryIcon sx={{ marginRight: '2vh' }} />
                Merchandise Products
              </SidebarListItem>
            </Link>
            <Link to={'/admin/orders'}>
              <SidebarListItem>
                <LocalShippingIcon sx={{ marginRight: '2vh' }} />
                Merchandise Orders
              </SidebarListItem>
            </Link>
            <Link to={'/admin/careers'}>
              <SidebarListItem>
                <HailIcon sx={{ marginRight: '2vh' }} />
                Jobs
              </SidebarListItem>
            </Link>
            <Link to={'/admin/blogs'}>
              <SidebarListItem>
                <AssignmentIcon sx={{ marginRight: '2vh' }} />
                Blogs
              </SidebarListItem>
            </Link>
          </SidebarList>
        </SidebarMenu>
      </SidebarWrapper>
    </SidebarContainer>
  );
};

export default Sidebar;
