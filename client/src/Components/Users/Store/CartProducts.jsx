// @Author: Rahul Kherajani
import React from 'react';
import { styled } from '@mui/system';
import { toast } from 'react-toastify';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';

const CartContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
});

const ProductsContainer = styled('div')({
  border: '0.5px solid lightgray',
  borderBottomLeftRadius: '1em',
  borderBottomRightRadius: '1em',
  boxShadow: '0 0 6px hsl(210 14% 90%)',
});

const NoProductsContainer = styled('div')({
  border: '0.5px solid lightgray',
  borderRadius: '1em',
  boxShadow: '0 0 6px hsl(210 14% 90%)',
  height: '50vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const Title = styled('h1')({
  fontSize: '2em',
});

const Product = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
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
  margin: '1vh',
});

const RightContainer = styled('div')({
  flex: 1,
  display: 'flex',
});

const Button = styled('button')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  height: '5vh',
  width: '20vh',
  border: 'none',
  borderRadius: '4px',
  fontWeight: 700,
  cursor: 'pointer',
  alignSelf: 'center',
}));

const Color = styled('div')((props) => ({
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  backgroundColor: props.color,
  margin: '10px',
  cursor: 'pointer',
  border: '1px solid black',
}));

const OrderDetails = styled('div')({
  padding: '8px',
  display: 'flex',
  justifyContent: 'space-evenly',
});

const OrderDetail = styled('span')({
  textAlign: 'left',
});

const OrderDetailContainer = styled('div')(({ theme }) => ({
  border: '0.5px solid lightgray',
  borderTopLeftRadius: '1em',
  borderTopRightRadius: '1em',
  boxShadow: '0 0 6px hsl(210 14% 90%)',
  backgroundColor: theme.palette.secondary.background,
  height: '5vh',
}));

const AmountContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  fontWeight: 700,
});

const Amount = styled('span')(({ theme }) => ({
  width: '10vh',
  height: '10vh',
  borderRadius: '30%',
  border: `1px solid ${theme.palette.primary.main}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0vh 1vh',
}));

const CartProducts = ({ cartList, setCartList, total }) => {
  //Removes an item from Cart
  const handleRemove = (index) => {
    const cart = [...cartList];
    cart.splice(index, 1);
    setCartList(cart);
    toast.success('Product Removed from Cart');
  };

  const handleAddQuantity = (index) => {
    const cart = [...cartList];
    if (cart[index]['product_quantity'] < cart[index]['product_maxquantity']) {
      cart[index]['product_quantity'] += 1;
      setCartList(cart);
    } else {
      toast.error('Max Available Quantity reached.');
    }
  };

  const handleSubtractQuantity = (index) => {
    const cart = [...cartList];
    if (cart[index]['product_quantity'] > 1) {
      cart[index]['product_quantity'] -= 1;
      setCartList(cart);
    } else {
      handleRemove(index);
    }
  };

  return (
    <CartContainer>
      {cartList.length > 0 ? (
        <OrderDetailContainer>
          <OrderDetails>
            <OrderDetail>
              <b>Total:</b> {total} CAD
            </OrderDetail>
          </OrderDetails>
        </OrderDetailContainer>
      ) : null}
      {cartList.length > 0 ? (
        <ProductsContainer>
          {cartList.map((item, i) => {
            return (
              <Product key={i}>
                <LeftContainer>
                  <Image src={item.product_image} />
                  <Details>
                    <ProductDetail>
                      <b>Product:</b> {item.product_name}
                    </ProductDetail>
                    <ProductDetail>
                      <b>ID:</b> {item.product_id}
                    </ProductDetail>
                    <ProductDetail
                      sx={{ display: 'flex', alignItems: 'center' }}
                    >
                      <div>
                        <b>Color:</b>
                      </div>{' '}
                      <Color color={item.product_color} />
                    </ProductDetail>
                    <ProductDetail>
                      <b>Size:</b> {item.product_size}
                    </ProductDetail>
                    <ProductDetail>
                      <b>Price:</b> {item.product_price} CAD
                    </ProductDetail>
                  </Details>
                </LeftContainer>
                <RightContainer>
                  <Details>
                    <AmountContainer>
                      <RemoveOutlinedIcon
                        sx={{ cursor: 'pointer' }}
                        onClick={() => handleSubtractQuantity(i)}
                      />
                      <Amount>{item.product_quantity}</Amount>
                      <AddOutlinedIcon
                        sx={{ cursor: 'pointer' }}
                        onClick={() => handleAddQuantity(i)}
                      />
                    </AmountContainer>
                    <ProductDetail>
                      <b>Subtotal:</b> {item.product_subtotal} CAD
                    </ProductDetail>
                    <Button
                      sx={{ marginTop: '2vh' }}
                      onClick={() => handleRemove(i)}
                    >
                      REMOVE
                    </Button>
                  </Details>
                </RightContainer>
              </Product>
            );
          })}
        </ProductsContainer>
      ) : null}
      {cartList.length === 0 ? (
        <NoProductsContainer>
          <Title>EMPTY CART</Title>
        </NoProductsContainer>
      ) : null}
    </CartContainer>
  );
};

export default CartProducts;
