// @Author: Kunj Vijaykumar Patel
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from '../../Assets/config/axiosConfig';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';
import { Grid, Button, Typography } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { toast } from 'react-toastify';

const PackagesContainer = styled('div')({
  flex: '8',
  width: '100%',
  display: 'grid',
  gap: '1em',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
});

const PackageList = styled('div')({
  width: '100%',
  flex: '4',
});

const Package = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

const EditButton = styled('button')(({ theme }) => ({
  border: 'none',
  borderRadius: '10px',
  padding: '5px 10px',
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  cursor: 'pointer',
  marginRight: '20px',
}));

const MyDeleteOutline = styled(DeleteOutlineIcon)({
  color: 'red',
  cursor: 'pointer',
});

const ItemTitleContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const AdminSubscriptionPackages = () => {
  const [packages, setPackages] = useState([]);
  //Get package API is called when the page is rendered to display them when the page is rendered
  useEffect(() => {
    axios
      .get('/packages')
      .then((response) => {
        setPackages(
          response.data.success ? response.data.subscriptionPackages : []
        );
      })
      .catch((err) => {
        setPackages([]);
        toast.error(err?.response?.data?.message || 'Something went wrong');
      });
  }, []);
  //This function is used to call the delete api to delete the package
  const handleDelete = (id) => {
    axios
      .delete(`/packages/delete/${id}`)
      .then((response) => {
        setPackages(packages.filter((item) => item.package_id !== id));
        toast('Package Deleted');
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Could not delete Package');
      });
  };

  const columns = [
    { field: 'package_id', headerName: 'Package ID', width: 120 },
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
      renderCell: (params) => {
        return <Package>{params.row.name}</Package>;
      },
    },

    {
      field: 'price',
      headerName: 'Price',
      width: 160,
    },
    {
      field: 'type',
      headerName: 'Type',
      width: 160,
    },
    {
      field: 'isActive',
      headerName: 'Visible',
      width: 160,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/packages/update/${params.row.package_id}`}>
              <EditButton primary>Edit</EditButton>
            </Link>
            <MyDeleteOutline
              onClick={() => handleDelete(params.row.package_id)}
            />
          </>
        );
      },
    },
  ];
  return (
    <PackagesContainer>
      <PackageList>
        <ItemTitleContainer>
          <h1>Packages Catalogue</h1>

          <Link to='/admin/packages/new'>
            <Grid
              sx={{
                display: 'flex',
                flexDirection: 'row-reverse',
                p: 1,
                m: 1,
                bgcolor: 'background.paper',
                borderRadius: 1,
              }}
            >
              <Button variant='contained'>New</Button>
            </Grid>
          </Link>
        </ItemTitleContainer>
        <DataGrid
          rows={packages}
          getRowId={(row) => row.package_id}
          disableSelectionOnClick
          columns={columns}
          pageSize={5}
        />
      </PackageList>
    </PackagesContainer>
  );
};
export default AdminSubscriptionPackages;
