// @Author: Kunj Vijaykumar Patel
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from '../../Assets/config/axiosConfig';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';
import { Grid, Button, Typography } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { toast } from 'react-toastify';

const BlogsContainer = styled('div')({
  flex: '8',
  width: '100%',
  display: 'grid',
  gap: '1em',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
});

const TheList = styled('div')({
  width: '100%',
  flex: '4',
});

const ListItem = styled('div')({
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

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  //Get blog API is called when the page is rendered to display them when the page is rendered
  useEffect(() => {
    axios
      .get('/blogs')
      .then((response) => {
        setBlogs(response.data.success ? response.data.blogs : []);
      })
      .catch((err) => {
        setBlogs([]);
        toast.error(err?.response?.data?.message || 'Something went wrong');
      });
  }, []);
  //This function is used to call the delete api to delete the blog
  const handleDelete = (id) => {
    axios
      .delete(`/blogs/delete/${id}`)
      .then((response) => {
        setBlogs(blogs.filter((item) => item.blog_id !== id));
        toast('Blog Posting Deleted');
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message || 'Could not delete Blog Posting'
        );
      });
  };

  const columns = [
    { field: 'blog_id', headerName: 'Blog ID', width: 120 },
    {
      field: 'title',
      headerName: 'Title',
      width: 200,
      renderCell: (params) => {
        return <ListItem>{params.row.title}</ListItem>;
      },
    },

    {
      field: 'description',
      headerName: 'Description',
      width: 160,
    },
    {
      field: 'content',
      headerName: ' Content',
      width: 160,
    },
    {
      field: 'userId',
      headerName: 'User ID',
      width: 120,
    },
    {
      field: 'isVisible',
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
            <Link to={`/admin/blogs/update/${params.row.blog_id}`}>
              <EditButton primary>Edit</EditButton>
            </Link>
            <MyDeleteOutline onClick={() => handleDelete(params.row.blog_id)} />
          </>
        );
      },
    },
  ];
  return (
    <BlogsContainer>
      <TheList>
        <ItemTitleContainer>
          <h1>Blogs Catalogue</h1>

          <Link to='/admin/blogs/new'>
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
          rows={blogs}
          getRowId={(row) => row.blog_id}
          disableSelectionOnClick
          columns={columns}
          pageSize={9}
        />
      </TheList>
    </BlogsContainer>
  );
};
export default AdminBlogs;
