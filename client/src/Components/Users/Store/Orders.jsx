// @Author: Rahul Kherajani
import React from 'react';
import { styled } from '@mui/system';

const OrdersContainer = styled('div')({});

const OrderContainer = styled('div')({
  marginBottom: '5vh',
});

const OrderDetailContainer = styled('div')(({ theme }) => ({
  border: '0.5px solid lightgray',
  borderTopLeftRadius: '1em',
  borderTopRightRadius: '1em',
  boxShadow: '0 0 6px hsl(210 14% 90%)',
  backgroundColor: theme.palette.secondary.background,
  height: '5vh',
}));

const ProductsContainer = styled('div')({
  height: 'auto',
  border: '0.5px solid lightgray',
  borderBottomLeftRadius: '1em',
  borderBottomRightRadius: '1em',
  boxShadow: '0 0 6px hsl(210 14% 90%)',
});

const Product = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  border: '0.5px solid lightgray',
  boxShadow: '0 0 6px hsl(210 14% 90%)',
});

const LeftContainer = styled('div')({
  flex: 2,
  display: 'flex',
});

const Image = styled('img')({
  width: '20vh',
  height: '20vh',
  margin: '5vh',
});

const Details = styled('div')({
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
});

const ProductDetail = styled('span')({
  textAlign: 'left',
});

const OrderDetails = styled('div')({
  padding: '8px',
  display: 'flex',
  justifyContent: 'space-evenly',
});

const OrderDetail = styled('span')({
  textAlign: 'left',
});

const Orders = ({ orderList }) => {
  return (
    <OrdersContainer>
      {orderList.map((order) => {
        return (
          <OrderContainer key={order.order_header_id}>
            <OrderDetailContainer>
              <OrderDetails>
                <OrderDetail>
                  <b>Order ID:</b> {order.order_header_id}
                </OrderDetail>
                <OrderDetail>
                  <b>Order Date:</b> {order.created_at.split('T')[0]}
                </OrderDetail>
                <OrderDetail>
                  <b>Order Total:</b> {order.order_total / 100} CAD
                </OrderDetail>
                <OrderDetail>
                  <b>Order Status:</b> {order.order_status}
                </OrderDetail>
              </OrderDetails>
            </OrderDetailContainer>
            <ProductsContainer>
              {order.order_line.map((item) => {
                return (
                  <Product key={item.order_line_id}>
                    <LeftContainer>
                      <Image src={item.order_product_image} />
                      <Details>
                        <ProductDetail>
                          <b>Product ID:</b> {item.order_product_id}
                        </ProductDetail>
                        <ProductDetail>
                          <b>Product Name:</b> {item.order_product_name}
                        </ProductDetail>
                        <ProductDetail>
                          <b>Product Price:</b> {item.order_product_price} CAD
                        </ProductDetail>
                        <ProductDetail>
                          <b>Product Quantity:</b> {item.order_product_quantity}
                        </ProductDetail>
                      </Details>
                    </LeftContainer>
                  </Product>
                );
              })}
            </ProductsContainer>
          </OrderContainer>
        );
      })}
    </OrdersContainer>
  );
};

export default Orders;
