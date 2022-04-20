// @Author: Rahul Kherajani
import { styled } from '@mui/system';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const FilterContainer = styled('section')({
  display: 'flex',
  margin: '5vh 0vh',
  justifyContent: 'space-between',
  height: '10vh',
});

const Filter = styled('div')({ margin: '20px' });

const Filters = ({
  category,
  sort,
  setCategory,
  setSort,
  filterSort,
  productList,
}) => {
  return (
    <FilterContainer>
      <Filter>
        <TextField
          select
          value={category}
          label='Category'
          onChange={(e) => {
            setCategory(e.target.value);
            filterSort(e.target.value, sort, productList);
          }}
          sx={{ width: '20vh', marginLeft: '5vh' }}
        >
          <MenuItem value='All'>All</MenuItem>
          <MenuItem value='Tshirts'>T-Shirts</MenuItem>
          <MenuItem value='Jeans'>Jeans</MenuItem>
          <MenuItem value='Shoes'>Shoes</MenuItem>
        </TextField>
      </Filter>
      <Filter>
        <TextField
          select
          value={sort}
          label='Sort'
          onChange={(e) => {
            setSort(e.target.value);
            filterSort(category, e.target.value, productList);
          }}
          sx={{ width: '20vh', marginRight: '5vh' }}
        >
          <MenuItem value='LowToHigh'>Low To High</MenuItem>
          <MenuItem value='HighToLow'>High To Low</MenuItem>
        </TextField>
      </Filter>
    </FilterContainer>
  );
};

export default Filters;
