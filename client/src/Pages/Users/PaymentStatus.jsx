// @Author: Kishan Thakkar
import { useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useStripe } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { StateContext } from '../../State';
import axios from '../../Assets/config/axiosConfig';
import { useContext } from 'react';

const PaymentStatus = () => {
  const stripe = useStripe();
  const navigate = useNavigate();
  const { cartList, setCartList, siteAuth } = useContext(StateContext);

  useEffect(() => {
    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );
    if (!stripe) return;
    if (!clientSecret) return;
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      let entity = paymentIntent.description.includes('EVENT')
        ? 'event'
        : 'order';
      switch (paymentIntent.status) {
        case 'succeeded':
          if (entity === 'event') {
            // register for event then navigate to registered events
            axios
              .post('/events/bookEvent', {
                paymentIntent: paymentIntent.id,
                userId: siteAuth?.userDetails?.userId,
                ticketType: siteAuth?.userDetails?.packageType,
              })
              .then((response) => {
                toast.success(`Payment successfully processed for ${entity}.`);
                navigate('/events');
                return;
              })
              .catch((err) => {
                toast.error(
                  err?.response?.data?.message || 'Something went wrong.'
                );
              });
          } else {
            // complete order
            const order_line = [];
            cartList.forEach((product) => {
              const line = {
                order_product_id: product.product_id,
                order_product_name: product.product_name,
                order_product_quantity: product.product_quantity,
                order_product_size: product.product_size,
                order_product_color: product.product_color,
                order_product_price: product.product_price,
                order_product_image: product.product_image,
              };
              order_line.push(line);
            });
            console.log({
              order_payment_intent_id: paymentIntent.id,
              order_user_id: 1,
              order_total: paymentIntent.amount,
              order_status: 'Created',
              order_line: order_line,
            });
            axios({
              method: 'post',
              url: '/orders/new',
              data: {
                order_payment_intent_id: paymentIntent.id,
                order_user_id: 1,
                order_total: paymentIntent.amount,
                order_status: 'Created',
                order_line: order_line,
              },
            })
              .then((response) => {
                if (response.status === 200) {
                  setCartList([]);
                  toast.success('Order Placed');
                  navigate('/store/orders');
                  return;
                }
              })
              .catch(() => {
                toast.error('Something went wrong');
                navigate('/store/orders');
                return;
              });
          }
          break;
        case 'processing':
          toast.info(
            "Payment processing. We'll update you when payment is received."
          );
          navigate(-1);
          break;
        case 'requires_payment_method':
          toast.error('Payment failed. Please try again later.');
          navigate(-1);
          break;
        default:
          toast.error('Something went wrong.');
          navigate(-1);
          break;
      }
    });
  }, [stripe]);

  return (
    <Box
      flexDirection={'column'}
      height={'80vh'}
      width='100vw'
      display='flex'
      alignItems={'center'}
      justifyContent='center'
    >
      <CircularProgress />
      <Typography mt={2} fontSize='1.2rem'>
        Processing payment
      </Typography>
    </Box>
  );
};

export default PaymentStatus;
