// @Author: Rahul Kherajani
import React from 'react';
import { styled } from '@mui/system';
import Orders from '../../Components/Users/Store/Orders';
import { useState, useEffect } from 'react';
import axios from '../../Assets/config/axiosConfig';

const Container = styled('section')({});

const Wrapper = styled('div')({
  padding: '20px',
});

const Title = styled('h1')({
  fontWeight: 500,
  textAlign: 'center',
  marginTop: '5vh',
});

const OrdersPage = () => {
  const [loading, setLoading] = useState(true);
  const [orderList, setOrderList] = useState([]);

  //Fetches Order Details from API
  useEffect(() => {
    const fetchOrderList = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/orders?order_user_id=1`);
        if (response.status === 200) {
          console.log(response.data);
          setOrderList(response.data);
        }
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };

    fetchOrderList();
  }, []);

  return (
    <Container>
      <Wrapper>
        <Title>YOUR ORDERS</Title>
        {loading && <div>Loading</div>}
        {!loading && <Orders orderList={orderList} />}
      </Wrapper>
    </Container>
  );
};

export default OrdersPage;
