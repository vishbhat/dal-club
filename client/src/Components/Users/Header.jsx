// @Authors: Kishan Thakkar, Rahul Kherajani, Vishwanath Suresh, Anamika Ahmed
import { useState, useEffect } from 'react';
import { Box, Grid, Typography, Menu, MenuItem } from '@mui/material';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Badge } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { StateContext } from '../../State';
import { useContext } from 'react';
import Footer from './Footer';
import { toast } from 'react-toastify';
import Tooltip from '@mui/material/Tooltip';

const Header = () => {
  const [eventElement, setEventElement] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const openEventMenu = (e) => setEventElement(e.currentTarget);
  const closeEventMenu = () => setEventElement(null);

  const { cartList, siteAuth, modifySiteAuth } = useContext(StateContext);

  useEffect(() => {
    if (location.pathname !== '/' && !siteAuth.isLoggedIn) {
      toast.error('Please login first.');
      navigate(`/user/login?redirect=${location.pathname}`);
    }
  }, []);

  const logout = () => {
    modifySiteAuth('userDetails', {});
    modifySiteAuth('isLoggedIn', false);
    modifySiteAuth('token', '');
    navigate('/');
  };

  return (
    <Box position={'relative'}>
      <Grid
        position={'sticky'}
        zIndex={5}
        top={0}
        container
        justifyContent={'space-between'}
        alignItems={'center'}
        bgcolor='primary.main'
        color={'white'}
      >
        <Box display={'flex'} py={2} px={3} alignItems='center'>
          <Box
            fontSize={'1.5rem'}
            fontWeight={'medium'}
            className='cursor-pointer'
          >
            <Link to={'/'}>DalClub.</Link>
          </Box>
          <Grid container width={'fit-content'}>
            <Typography
              color={'white'}
              className='cursor-pointer'
              marginLeft={2}
              onClick={openEventMenu}
            >
              Events
            </Typography>
            <Typography
              color={'white'}
              className='cursor-pointer'
              marginLeft={2}
            >
              <Link
                to={`${
                  siteAuth?.isLoggedIn ? '' : '/user/login?redirect='
                }/store/products`}
              >
                Merchandise Store
              </Link>
            </Typography>
            <Typography
              color={'white'}
              className='cursor-pointer'
              marginLeft={2}
            >
              {' '}
              <Link
                to={`${
                  siteAuth?.isLoggedIn ? '' : '/user/login?redirect='
                }/blogs`}
              >
                Blogs
              </Link>
            </Typography>
            {!siteAuth.isLoggedIn ? (
              <Typography
                color={'white'}
                className='cursor-pointer'
                marginLeft={2}
              >
                <Link to='/careers'>Careers</Link>
              </Typography>
            ) : null}
          </Grid>
        </Box>
        {siteAuth?.isLoggedIn ? (
          <Box py={2} px={3} className='cursor-pointer'>
            <Grid container width={'fit-content'}>
              <Typography
                color={'white'}
                className='cursor-pointer'
                marginLeft={2}
              >
                <Link
                  to={`${
                    siteAuth?.isLoggedIn ? '' : '/user/login?redirect='
                  }/store/orders`}
                >
                  My Orders
                </Link>
              </Typography>
              <Box color={'white'} className='cursor-pointer' marginLeft={2}>
                <Badge
                  badgeContent={cartList.length ? cartList.length : '0'}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Link
                    to={`${
                      siteAuth?.isLoggedIn ? '' : '/user/login?redirect='
                    }/store/cart`}
                  >
                    <Tooltip title='Cart'>
                      <ShoppingCartOutlinedIcon />
                    </Tooltip>
                  </Link>
                </Badge>
              </Box>
              <Typography
                color={'white'}
                className='cursor-pointer'
                marginLeft={2}
                onClick={logout}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Tooltip title='Logout'>
                  <LogoutIcon />
                </Tooltip>
              </Typography>
            </Grid>
          </Box>
        ) : (
          <Box py={2} px={3}>
            <Link to={'/user/login'}>Login</Link>&emsp;
            <Link to={'/user/register'}>Sign Up</Link>
          </Box>
        )}
      </Grid>
      <Menu
        anchorEl={eventElement}
        open={!!eventElement}
        onClose={closeEventMenu}
      >
        <Link
          to={`${siteAuth?.isLoggedIn ? '' : '/user/login?redirect='}/events`}
        >
          <MenuItem onClick={closeEventMenu}>Events</MenuItem>
        </Link>
        <Link
          to={`${
            siteAuth?.isLoggedIn ? '' : '/user/login?redirect='
          }/registeredEvents`}
        >
          <MenuItem onClick={closeEventMenu}>Registered Events</MenuItem>
        </Link>
      </Menu>
      <Box>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default Header;
