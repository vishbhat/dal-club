// @Author: Vishwanath Suresh
import React, { useState, useEffect } from 'react';
import axios from '../../Assets/config/axiosConfig';
import { styled } from '@mui/system';
import { toast } from 'react-toastify';
import { useParams } from "react-router-dom";

const OrderOuterContainer = styled('div')({
    width: '100%',
    gap: '1em',
    flex: '8'
});

const OrderContainer = styled('div')({
    marginRight: '1%'
});

const ItemTitleContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
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

const AdminOrderDetails = () => {

    const [order, setOrder] = useState({})
    const orderId = useParams();

    // Fetches the order details for the selected order
    useEffect(() => {
        axios.get(`/orders/${orderId.id}`)
            .then((response) => {
                setOrder(response.data)
            })
            .catch((err) => {
                setOrder({});
                toast.error('Something went wrong');
            });
    }, [orderId]);
    
    return (
        <OrderOuterContainer>
            <ItemTitleContainer>
                <h1>Order Details</h1>
            </ItemTitleContainer>
            {Object.keys(order).length > 0 &&
                <OrderContainer>

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
                        {order.order_line.length > 0 && order.order_line.map((item) => {
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
                </OrderContainer>}
        </OrderOuterContainer>
    );
}

export default AdminOrderDetails;