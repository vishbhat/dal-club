// @Author: Vishwanath Suresh
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from '../../Assets/config/axiosConfig';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { toast } from 'react-toastify';

const JobsContainer = styled('div')({
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

const CustomButton = styled('button')(({ theme }) => ({
  border: 'none',
  borderRadius: '10px',
  padding: '5px 10px',
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  cursor: 'pointer',
  marginRight: '20px',
}));

const CustomDeleteOutline = styled(DeleteOutlineIcon)({
  color: 'red',
  cursor: 'pointer',
  marginRight: '20px',
});

const ItemAddButton = styled('button')(({ theme }) => ({
  width: '80px',
  border: 'none',
  padding: '5px',
  backgroundColor: theme.palette.primary.main,
  borderRadius: '5px',
  cursor: 'pointer',
  color: 'white',
  fontSize: '16px',
  textTransform: 'uppercase',
}));

const ItemTitleContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const AdminCareers = () => {
  const [jobs, setJobs] = useState([]);
  const [applicants, SetApplicants] = useState({});

  // Fetches existing jobs and job application count
  useEffect(() => {
    axios
      .get('/careers')
      .then((response1) => {
        setJobs(response1.data.success ? response1.data.jobs : []);
      })
      .catch((err) => {
        setJobs([]);
        toast.error(err?.response1?.data?.message || 'Something went wrong');
      });
    axios
      .get('/careers/applications')
      .then((response2) => {
        SetApplicants(
          response2.data.success ? response2.data.applicantsMap : {}
        );
      })
      .catch((err) => {
        SetApplicants({});
        toast.error(err?.response2?.data?.message || 'Something went wrong');
      });
  }, []);

  // Handles deleting a job posting
  const handleDelete = (id) => {
    axios
      .delete(`/careers/${id}`)
      .then((response) => {
        setJobs(jobs.filter((item) => item.job_id !== id));
        toast('Job Posting Deleted');
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message || 'Could not delete Job Posting'
        );
      });
  };

  // Column headers and data to be displayed in the data grid.
  const columns = [
    {
      field: 'job_id',
      headerName: '#',
      width: 90,
      renderCell: (params) => {
        return <ListItem>{params.row.job_id}</ListItem>;
      },
    },
    {
      field: 'title',
      headerName: 'Title',
      width: 240,
      renderCell: (params) => {
        return <ListItem>{params.row.title}</ListItem>;
      },
    },
    {
      field: 'vacancies',
      headerName: '# Vacancies',
      width: 160,
    },
    {
      field: 'applicants',
      headerName: '# Applicants',
      width: 160,
      renderCell: (params) => {
        return (
          <ListItem>
            {applicants[params.row.job_id] ? applicants[params.row.job_id] : 0}
          </ListItem>
        );
      },
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 160,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 240,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/careers/update/${params.row.job_id}`}>
              <CustomButton primary>Edit</CustomButton>
            </Link>
            <CustomDeleteOutline
              onClick={() => handleDelete(params.row.job_id)}
            />
            <Link to={`/admin/careers/applications/${params.row.job_id}`}>
              <CustomButton primary>View Applications</CustomButton>
            </Link>
          </>
        );
      },
    },
  ];
  return (
    <JobsContainer>
      <TheList>
        <ItemTitleContainer>
          <h1>Jobs Catalogue</h1>
          <Link to='/admin/careers/new'>
            <ItemAddButton>Create</ItemAddButton>
          </Link>
        </ItemTitleContainer>
        <DataGrid
          rows={jobs}
          getRowId={(row) => row.job_id}
          disableSelectionOnClick
          columns={columns}
          pageSize={10}
        />
      </TheList>
    </JobsContainer>
  );
};

export default AdminCareers;
