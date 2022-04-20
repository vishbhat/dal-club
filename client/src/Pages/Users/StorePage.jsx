// @Author: Rahul Kherajani
import React from 'react';
import Banner from '../../Components/Users/Store/Banner';
import ProductsGrid from '../../Components/Users/Store/ProductsGrid';
import Filters from '../../Components/Users/Store/Filters';
import { useEffect, useState } from 'react';
import axios from '../../Assets/config/axiosConfig';

const StorePage = () => {
  const [loading, setLoading] = useState(true);
  const [productList, setProductList] = useState([]);
  const [filteredProductList, setFilteredProductList] = useState([]);
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('LowToHigh');

  //Filters & Sorts Products on Store Page
  const filterSort = (category, sort, productList) => {
    let filteredProducts = productList;

    if (category !== 'All') {
      filteredProducts = productList.filter(
        (product) => product.product_category === category
      );
    }

    if (sort === 'LowToHigh') {
      filteredProducts.sort((p1, p2) =>
        p1.product_price > p2.product_price ? 1 : -1
      );
    } else {
      filteredProducts.sort((p1, p2) =>
        p1.product_price < p2.product_price ? 1 : -1
      );
    }
    setFilteredProductList(filteredProducts);
  };

  //Fetches Products from API
  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const response = await axios.get('/products');
        setProductList(response.data);
        filterSort(category, sort, response.data);
      } catch (error) {
        console.error(error.message);
      }
    };
    setLoading(true);
    fetchProductList();
    setLoading(false);
  }, []);

  return (
    <React.Fragment>
      <Banner />
      <Filters
        category={category}
        sort={sort}
        setCategory={setCategory}
        setSort={setSort}
        filterSort={filterSort}
        productList={productList}
      />
      {loading && <div>Loading</div>}
      {!loading && <ProductsGrid productList={filteredProductList} />}
    </React.Fragment>
  );
};

export default StorePage;
