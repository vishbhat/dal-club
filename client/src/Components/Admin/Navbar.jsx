// @Author: Rahul Kherajani
import React, { useContext } from 'react';
import { styled } from '@mui/system';
import { StateContext } from "../../State"
import { useNavigate } from 'react-router-dom';

const NavbarContainer = styled('div')({
  width: '100%',
  height: '50px',
  backgroundColor: '#fff',
  position: 'sticky',
  top: '0',
  zIndex: '999',
});

const NavbarWrapper = styled('div')({
  height: '100%',
  padding: '0px 20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const Logo = styled('h1')({
  fontSize: '48px',
  fontWeight: 700,
  margin: '25px',
});

const TopLeft = styled('div')({});
const TopRight = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

const MenuItem = styled('div')({
  fontSize: '16px',
  cursor: 'pointer',
  margin: '25px',
});

const Navbar = () => {
  const navigate = useNavigate()
  const { modifySiteAuth } = useContext(StateContext)

  const logout = () => {
    modifySiteAuth("isLoggedIn", false)
    modifySiteAuth("isAdmin", false)
    modifySiteAuth("token", "")
    navigate("/admin/login")
  }
  return (
    <NavbarContainer>
      <NavbarWrapper>
        <TopLeft>
          <Logo>DALClub</Logo>
        </TopLeft>
        <TopRight>
          <MenuItem>Admin</MenuItem>
          <MenuItem onClick={logout}>Logout</MenuItem>
        </TopRight>
      </NavbarWrapper>
    </NavbarContainer>
  );
};

export default Navbar;
