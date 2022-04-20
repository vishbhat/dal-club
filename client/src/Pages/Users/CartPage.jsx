// @Author: Rahul Kherajani
import React from 'react';
import { styled } from '@mui/system';
import Banner from '../../Components/Users/Store/Banner';
import CartProducts from '../../Components/Users/Store/CartProducts';
import { StateContext } from '../../State';
import { useContext, useEffect, useState } from 'react';
import axios from '../../Assets/config/axiosConfig';
import { toast } from 'react-toastify';
import PaymentModal from '../../Components/Users/Events/PaymentModal';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const Container = styled('section')({});

const Wrapper = styled('div')({
  padding: '2vh',
});

const Title = styled('h1')({
  fontWeight: 500,
  textAlign: 'center',
  marginTop: '5vh',
});

const Button = styled('button')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  height: '5vh',
  width: 'auto',
  minWidth: '10vh',
  border: 'none',
  borderRadius: '4px',
  fontWeight: 700,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const ButtonsContainer = styled('div')({
  padding: '1vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const RightContainer = styled('div')({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
});

const Cart = () => {
  const { cartList, setCartList } = useContext(StateContext);
  const [total, setTotal] = useState(0);
  const [name, setName] = useState('');
  const [showPaymentModel, setShowPaymentModal] = useState(false);
  const [stripeSecret, setStripeSecret] = useState('');

  //Calculates Total & Payment Name
  useEffect(() => {
    let totalAmount = 0;
    let entities = [];
    cartList.forEach((product) => {
      totalAmount += product.product_subtotal;
      entities.push(product.product_name);
    });
    setTotal(totalAmount.toFixed(2));
    setName(entities.join('+'));
  });

  //Opens Up a Payment Form & Initates a Payment Intent on Stripe
  const togglePaymentModal = () => {
    if (cartList.length === 0) {
      toast.error('Add Products to Place your Order');
      return;
    } else {
      axios
        .post('/payments/createIntent', {
          module: 'order',
          amount: total,
          entityName: name,
        })
        .then((res) => {
          if (res.data.success) {
            setStripeSecret(res.data.clientSecret);
            setShowPaymentModal(true);
          } else {
            toast.error(res?.data?.message || 'Cannot initiate payment.');
          }
        })
        .catch((err) => {
          toast.error(
            err?.response?.data?.message || 'Cannot initiate payment'
          );
        });
    }
  };

  const closePaymentModal = () => setShowPaymentModal(false);

  //Stripe Public Client Key
  const loadStripeKey = loadStripe(
    'pk_test_51KgEo1GMutfkjZDFgZN4zTuVLFDNLlUzae99RhzKMjWXlcBg6y0dIFKSRg3AMPZKaJLGuvUGT8MeDqe6tAzcCbfb00Ko70FnbZ'
  );

  return (
    <Container>
      <Banner />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <ButtonsContainer>
          <RightContainer>
            <Button sx={{ padding: '0vh 5vh' }} onClick={togglePaymentModal}>
              PROCEED TO CHECKOUT
            </Button>
          </RightContainer>
        </ButtonsContainer>
        <CartProducts
          cartList={cartList}
          setCartList={setCartList}
          total={total}
        />
      </Wrapper>
      {showPaymentModel && (
        <Elements
          options={{
            clientSecret: stripeSecret,
            appearance: { theme: 'stripe' },
          }}
          stripe={loadStripeKey}
        >
          <PaymentModal
            open={showPaymentModel}
            handleClose={closePaymentModal}
            amount={total}
          />
        </Elements>
      )}
    </Container>
  );
};

export default Cart;
