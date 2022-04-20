// @Author: Rahul Kherajani
import { styled } from '@mui/system';

const Container = styled('section')(({ theme }) => ({
  height: '5vh',
  backgroundColor: theme.palette.secondary.main,
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1em',
  fontWeight: 400,
}));

const Banner = () => {
  return <Container>Free Shipping on Orders Over $50</Container>;
};

export default Banner;
