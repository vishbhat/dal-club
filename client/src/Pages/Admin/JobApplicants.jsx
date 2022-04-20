// @Author: Vishwanath Suresh
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import axios from '../../Assets/config/axiosConfig';
import { styled } from '@mui/system';
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

const ItemTitleContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const JobApplicants = () => {
  let { jobId } = useParams();
  const [applications, setApplications] = useState([]);

  // Fetches all applicantions for the selected job
  useEffect(() => {
    axios
      .get(`/careers/applications/${jobId}`)
      .then((response) => {
        setApplications(response.data.success ? response.data.applicants : []);
      })
      .catch((err) => {
        setApplications([]);
        toast.error(err?.response?.data?.message || 'Something went wrong');
      });
  }, [jobId]);

  // Applicants data and header to be loaded to the data grid
  const columns = [
    {
      field: 'application_id',
      headerName: '#',
      width: 90,
      renderCell: (params) => {
        return <ListItem>{params.row.application_id}</ListItem>;
      },
    },
    {
      field: 'first_name',
      headerName: 'First Name',
      width: 160,
      renderCell: (params) => {
        return <ListItem>{params.row.first_name}</ListItem>;
      },
    },
    {
      field: 'last_name',
      headerName: 'Last Name',
      width: 160,
      renderCell: (params) => {
        return <ListItem>{params.row.last_name}</ListItem>;
      },
    },
    {
      field: 'dob',
      headerName: 'DOB',
      width: 140,
      renderCell: (params) => {
        return <ListItem>{params.row.dob}</ListItem>;
      },
    },
    {
      field: 'phone_no',
      headerName: 'Phone',
      width: 140,
      renderCell: (params) => {
        return <ListItem>{params.row.phone_no}</ListItem>;
      },
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
      renderCell: (params) => {
        return <ListItem>{params.row.email}</ListItem>;
      },
    },
    {
      field: 'address',
      headerName: 'Address',
      width: 350,
      renderCell: (params) => {
        return <ListItem>{params.row.address}</ListItem>;
      },
    },
    {
      field: 'resume',
      headerName: 'Resume',
      width: 240,
      renderCell: (params) => {
        return (
          <a
            href={`https://webproject5709.s3.amazonaws.com/resumes/${params.row.application_id}/${params.row.resume}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <CustomButton primary>View Resume</CustomButton>
          </a>
        );
      },
    },
  ];

  return (
    <JobsContainer>
      <TheList>
        <ItemTitleContainer>
          <h1>Jobs Applicants</h1>
        </ItemTitleContainer>
        <DataGrid
          rows={applications}
          getRowId={(row) => row.application_id}
          disableSelectionOnClick
          columns={columns}
          pageSize={10}
        />
      </TheList>
    </JobsContainer>
  );
};

export default JobApplicants;
