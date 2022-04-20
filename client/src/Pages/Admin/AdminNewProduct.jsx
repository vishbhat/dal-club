// @Author: Rahul Kherajani
import React, { useState } from 'react';
import axios from '../../Assets/config/axiosConfig';
import { styled } from '@mui/system';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import IconButton from '@mui/material/IconButton';
import { Box } from '@mui/material';
import { useRef } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Container = styled('div')({
  flex: 8,
});

const FlexContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
});

const Form = styled('form')({
  backgroundColor: '#ffffff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: '0 50px',
  textAlign: 'center',
  height: 'auto',
});

const Input = styled(TextField)({
  margin: '8px 0px',
  width: '100%',
});

const SubmitButton = styled(Button)(({ theme }) => ({
  width: '100%',
  border: 'none',
  borderRadius: '10px',
  padding: '1vh 2vh',
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  cursor: 'pointer',
  margin: '5vh 0vh',
}));

const AdminNewProduct = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState();
  const [status, setStatus] = useState(1);
  const [colorImages, setColorImages] = useState([
    { color: '', image: '', url: '' },
  ]);
  const [sizes, setSizes] = useState([{ size: '' }]);
  const [imageIndex, setImageIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleChangeColor = (index, event) => {
    const newColorImages = [...colorImages];
    newColorImages[index].color = event.target.value;
    setColorImages(newColorImages);
  };

  const handleChangeSize = (index, event) => {
    const newSizes = [...sizes];
    newSizes[index].size = event.target.value;
    setSizes(newSizes);
  };

  const handleChangeImage = (event) => {
    const newColorImages = [...colorImages];
    newColorImages[imageIndex].image = event.target.files[0];
    newColorImages[imageIndex].url = URL.createObjectURL(event.target.files[0]);
    setColorImages(newColorImages);
  };

  const handleAddColorImages = () => {
    setColorImages([...colorImages, { color: '', image: '', url: '' }]);
  };

  const handleRemoveColorImages = (index) => {
    const values = [...colorImages];
    values.splice(index, 1);
    setColorImages(values);
  };

  const handleAddSizes = () => {
    setSizes([...sizes, { size: '' }]);
  };

  const handleRemoveSizes = (index) => {
    const values = [...sizes];
    values.splice(index, 1);
    setSizes(values);
  };

  const handleClick = (index) => {
    setImageIndex(index);
    inputRef && inputRef.current && inputRef.current.click();
  };

  // Function to create a new Product
  const onCreateProduct = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('quantity', quantity);
    formData.append('status', status);
    formData.append('colorImages', JSON.stringify(colorImages));
    formData.append('sizes', JSON.stringify(sizes));
    colorImages.forEach((colorImage) => {
      formData.append('images', colorImage.image);
    });
    axios
      .post('/products/new', formData, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success('New Product Created');
          setTimeout(() => {
            navigate('/admin/products');
          }, 1000);
        } else {
          toast.error('Something Went Wrong!');
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <React.Fragment>
      <Container>
        <Form encType='multipart/form'>
          <input
            type='file'
            ref={inputRef}
            style={{ display: 'none' }}
            onChange={handleChangeImage}
          />
          <Input
            type='text'
            placeholder='Product Name'
            label='Product Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            select
            label='Category'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <MenuItem value='Tshirts'>Tshirts</MenuItem>
            <MenuItem value='Jeans'>Jeans</MenuItem>
            <MenuItem value='Shoes'>Shoes</MenuItem>
          </Input>
          <Input
            type='text'
            placeholder='Product Description'
            label='Product Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={4}
            required
          />
          <FlexContainer>
            <Input
              type='text'
              placeholder='Price'
              label='Price'
              style={{ marginRight: '5px' }}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <Input
              type='text'
              placeholder='Quantity'
              label='Quantity'
              style={{ marginRight: '5px' }}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </FlexContainer>
          {colorImages.map((field, index) => (
            <FlexContainer key={index} sx={{ gap: '10px' }}>
              <Input
                type='text'
                placeholder='Color'
                label='Color'
                style={{ marginRight: '5px' }}
                value={field.color}
                onChange={(event) => handleChangeColor(index, event)}
                required
              />
              <SubmitButton
                variant='contained'
                color='primary'
                component='span'
                onClick={(event) => handleClick(index, event)}
              >
                Upload Image
              </SubmitButton>
              {colorImages[index].url && (
                <Box mt={2} textAlign='center'>
                  <img
                    src={colorImages[index].url}
                    height='100px'
                    width='100px'
                  />
                </Box>
              )}

              <IconButton
                disabled={index === 0}
                onClick={() => handleRemoveColorImages(index)}
              >
                <RemoveIcon />
              </IconButton>
              <IconButton onClick={handleAddColorImages}>
                <AddIcon />
              </IconButton>
            </FlexContainer>
          ))}
          {sizes.map((field, index) => (
            <FlexContainer key={index}>
              <Input
                type='text'
                placeholder='Size'
                label='Size'
                style={{ marginRight: '5px' }}
                value={field.size}
                onChange={(event) => handleChangeSize(index, event)}
                required
              />
              <IconButton
                disabled={index === 0}
                onClick={() => handleRemoveSizes(index)}
              >
                <RemoveIcon />
              </IconButton>
              <IconButton onClick={handleAddSizes}>
                <AddIcon />
              </IconButton>
            </FlexContainer>
          ))}
          <FlexContainer>
            <SubmitButton variant='contained' onClick={onCreateProduct}>
              CREATE
            </SubmitButton>
            <SubmitButton
              variant='contained'
              onClick={() => navigate(-1)}
              sx={{ marginLeft: '1vh' }}
            >
              CANCEL
            </SubmitButton>
          </FlexContainer>
        </Form>
      </Container>
    </React.Fragment>
  );
};

export default AdminNewProduct;
