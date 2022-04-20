// @Author: Rahul Kherajani
import React from 'react';
import { styled } from '@mui/system';
import Caraousel from '../../Components/Users/Store/Caraousel';
import ProductDescription from '../../Components/Users/Store/ProductDescription';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from '../../Assets/config/axiosConfig';

const Wrapper = styled('section')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2vh',
});

const ProductPage = () => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const [index, setIndex] = useState(0);
  const params = useParams();

  // Fetches Product Details from API
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/products/${params.id}`);
        if (response.status === 200) {
          setProduct(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };

    fetchProduct();
  }, []);

  return (
    <React.Fragment>
      {loading && <div>Loading</div>}
      {!loading && (
        <Wrapper>
          <Caraousel product={product} index={index} setIndex={setIndex} />
          <ProductDescription
            product={product}
            index={index}
            setIndex={setIndex}
          />
        </Wrapper>
      )}
    </React.Fragment>
  );
};

export default ProductPage;
