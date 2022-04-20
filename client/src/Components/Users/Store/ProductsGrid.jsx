// @Author: Rahul Kherajani
import { Typography } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Container = styled('section')({
  display: 'grid',
  gap: '3em',
  gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
  margin: '5vh',
});

const ProductContainer = styled('div')(({ theme }) => ({
  minWidth: '300px',
  height: '450px',
  backgroundColor: theme.palette.secondary.background,
  border: '0.5px solid gray',
  boxShadow: '0 0 6px hsl(210 14% 90%)',
  borderRadius: '10px',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  cursor: 'pointer',
}));

const Image = styled('img')({
  height: '70%',
  zIndex: 2,
  padding: '20px 0px',
});

const ProductsGrid = ({ productList }) => {
  const navigate = useNavigate();
  return (
    <Container>
      {productList.map((product) => (
        <ProductContainer
          key={product.product_id}
          onClick={() => navigate(`/store/products/${product.product_id}`)}
        >
          <Image src={product.product_color[0].product_image} />
          <Typography variant='h5' gutterBottom>
            {product.product_name}
          </Typography>
          <Typography variant='h6'>{product.product_price} CAD</Typography>
        </ProductContainer>
      ))}
    </Container>
  );
};

export default ProductsGrid;
