// @Author: Rahul Kherajani
import { styled } from '@mui/system';
import { useState } from 'react';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import { StateContext } from '../../../State';
import { useContext } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { toast } from 'react-toastify';

const Container = styled('div')({
  flex: 1,
  padding: '0vh 5vh',
  marginRight: '5vh',
});

const Title = styled('h1')({
  fontWeight: 700,
});

const Price = styled('h1')({
  fontWeight: 500,
});

const Description = styled('p')({
  margin: '2vh 0vh',
  fontWeight: '300',
  fontSize: '1.2em',
});

const FilterContainer = styled('div')({
  width: '100%',
  margin: '3vh 0vh',
  display: 'flex',
});

const Filter = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const Color = styled('div')((props) => ({
  width: '3vh',
  height: '3vh',
  borderRadius: '50%',
  backgroundColor: props.color,
  margin: '1vh',
  cursor: 'pointer',
  border: '1px solid black',
}));

const AddContainer = styled('div')({
  width: '100%',
  display: 'flex',
});

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

const Button = styled('button')((props) => ({
  backgroundColor: !props.disabled ? props.theme.palette.primary.main : 'white',
  color: !props.disabled ? 'white' : 'black',
  height: '5vh',
  width: '5vh',
  border: 'none',
  borderRadius: '5px',
  fontWeight: 700,
  margin: '3vh',
  cursor: 'pointer',
}));

const ProductDescription = ({ product, setIndex }) => {
  const [quantity, setQuantity] = useState(0);
  const [color, setColor] = useState(0);
  const [size, setSize] = useState('');
  const { cartList, setCartList } = useContext(StateContext);
  const [disabled, setDisabled] = useState(false);
  const [text, setText] = useState('ADD TO CART');

  //Adds an item to the Cart
  const handleAddToCart = () => {
    if (size !== '' && quantity !== 0) {
      const cartProduct = {
        product_id: product.product_id,
        product_name: product.product_name,
        product_image: product.product_color[color].product_image,
        product_color: product.product_color[color].product_color,
        product_size: size,
        product_quantity: quantity,
        product_price: product.product_price,
        product_subtotal: product.product_price * quantity,
        product_maxquantity: product.product_quantity,
      };
      setCartList([...cartList, cartProduct]);
      setDisabled(true);
      setText('ADDED TO CART');
      toast.success('Product Added to Cart');
    } else {
      toast.error('Please Select Color, Size & Quantity');
    }
  };

  return (
    <Container>
      <Title>{product.product_name}</Title>
      <Price>{product.product_price} CAD </Price>
      <Description>{product.product_description}</Description>
      <FilterContainer>
        <Filter>
          Colors{' '}
          {product.product_color.map((item, i) => {
            return (
              <Color
                key={item.product_color_id}
                color={item.product_color}
                onClick={() => {
                  setColor(i);
                  setIndex(i);
                }}
              />
            );
          })}
        </Filter>
        <Filter>
          <TextField
            select
            value={size}
            label='Size'
            sx={{ width: '20vh', marginLeft: '5vh' }}
            onChange={(e) => setSize(e.target.value)}
          >
            {product.product_size.map((item) => {
              return (
                <MenuItem key={item.product_size_id} value={item.product_size}>
                  {item.product_size}
                </MenuItem>
              );
            })}
          </TextField>
        </Filter>
      </FilterContainer>
      <AddContainer>
        <AmountContainer>
          <RemoveOutlinedIcon
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              if (quantity > 0) {
                setQuantity(quantity - 1);
              }
            }}
          />
          <Amount>{quantity}</Amount>
          <AddOutlinedIcon
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              if (quantity < product.product_quantity) {
                setQuantity(quantity + 1);
              } else {
                toast.error('Max Available Quantity reached.');
              }
            }}
          />
        </AmountContainer>
        <Button
          disabled={disabled}
          style={{ width: '20vh' }}
          onClick={handleAddToCart}
        >
          {text}
        </Button>
      </AddContainer>
    </Container>
  );
};

export default ProductDescription;
