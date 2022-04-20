// @Authors: Rahul Kherajani, Vishwanath Suresh
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import axios from '../../Assets/config/axiosConfig';
import { toast } from 'react-toastify';

const HomeContainer = styled('div')({
  flex: '8',
});

const FeaturedContainer = styled('div')({
  width: '100%',
  display: 'grid',
  gap: '1em',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
});
const FeaturedItem = styled('div')({
  flex: '1',
  margin: '0px 20px',
  padding: '30px',
  borderRadius: '10px',
  boxShadow: '0px 0px 15px -10px rgba(0, 0, 0, 0.75)',
});

const FeaturedTitle = styled('span')({
  fontSize: '20px',
});
const FeaturesStatsContainer = styled('div')({
  margin: '10px 0px',
  display: 'flex',
  alignItems: 'center',
  '.stats': {
    fontSize: '30px',
    fontWeight: '600',
  },
  '.statMessage': {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '20px',
  },
});

const Home = () => {
  const [status, setStatus] = useState([]);

  useEffect(() => {
    axios
      .get('/dashboard/')
      .then((response) => {
        setStatus(response.data.success ? response.data.status : []);
      })
      .catch((err) => {
        setStatus([]);
        toast.error('Something went wrong');
      });
  }, []);

  return (
    <HomeContainer>
      <FeaturedContainer>
        {status &&
          status.map((item, index) => (
            <FeaturedItem key={index}>
              <FeaturedTitle>{item.title}</FeaturedTitle>
              <FeaturesStatsContainer>
                <span className='stats'>{item.stats}</span>
                <span className='statMessage'>{item.message}</span>
              </FeaturesStatsContainer>
            </FeaturedItem>
          ))}
      </FeaturedContainer>
    </HomeContainer>
  );
};

export default Home;
