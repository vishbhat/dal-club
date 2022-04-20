// @Author: Rahul Kherajani
import { styled } from '@mui/system';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
import { useNavigate, Link } from 'react-router-dom';
import { Typography } from '@mui/material';

const Container = styled('div')({ display: 'flex' });

const Left = styled('div')({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2vh',
});

const Center = styled('div')({
  flex: 1,
  padding: '2vh',
});

const Right = styled('div')({
  flex: 1,
  padding: '2vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
});

const Logo = styled('h1')({
  fontSize: '2rem',
  fontWeight: 700,
});

const SocialContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const Icon = styled('div')({
  display: 'flex',
  width: '5vh',
  height: '5vh',
  borderRadius: '50%',
  margin: '2vh',
  cursor: 'pointer',
});

const ListContainer = styled('div')({
  display: 'flex',
  justifyContent: 'flex-start',
});

const List = styled('ul')({
  margin: '1vh',
  listStyle: 'none',
});

const ListItem = styled('li')({
  width: '100%',
  marginBottom: '2vh',
  cursor: 'pointer',
});

const Title = styled('h3')({ marginBottom: '3vh' });

const ContactItem = styled('div')({
  marginBottom: '2vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const Footer = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Left>
        <Logo>DALClub.</Logo>
        <SocialContainer>
          <Icon>
            <FacebookIcon />
          </Icon>
          <Icon>
            <InstagramIcon />
          </Icon>
          <Icon>
            <TwitterIcon />
          </Icon>
          <Icon>
            <PinterestIcon />
          </Icon>
        </SocialContainer>
      </Left>
      <Center>
        <ListContainer>
          <List>
            <Title>Links</Title>
            <Typography sx={{ cursor: 'pointer', margin: '2vh 0vh' }}>
              <Link to={'/'}>Home</Link>
            </Typography>
            <Typography sx={{ cursor: 'pointer', margin: '2vh 0vh' }}>
              <Link to={'/events'}>Events</Link>
            </Typography>
            <Typography sx={{ cursor: 'pointer', margin: '2vh 0vh' }}>
              <Link to={'/store/products'}>Merchandise Store</Link>
            </Typography>
            <Typography sx={{ cursor: 'pointer', margin: '2vh 0vh' }}>
              <Link to={'/careers'}>Careers</Link>
            </Typography>
          </List>
          <List>
            <Title>More Links</Title>
            <Typography sx={{ cursor: 'pointer', margin: '2vh 0vh' }}>
              <Link to={'/blogs'}>Blogs</Link>
            </Typography>
            <Typography sx={{ cursor: 'pointer', margin: '2vh 0vh' }}>
              <Link to={'/store/cart'}>Cart</Link>
            </Typography>
            <Typography sx={{ cursor: 'pointer', margin: '2vh 0vh' }}>
              <Link to={'/store/orders'}>Orders</Link>
            </Typography>
          </List>
        </ListContainer>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <LocationOnOutlinedIcon style={{ marginRight: '1vh' }} /> 6299 South
          St, Halifax, NS, Canada - B3H 3R2
        </ContactItem>
        <ContactItem>
          <LocalPhoneOutlinedIcon style={{ marginRight: '1vh' }} /> +1 234 567
          8900
        </ContactItem>
        <ContactItem>
          <MailOutlinedIcon style={{ marginRight: '1vh' }} /> contact@dalclub.ca
        </ContactItem>
      </Right>
    </Container>
  );
};

export default Footer;
