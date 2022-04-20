// @Author: Vishwanath Suresh
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from '../../Assets/config/axiosConfig';
import { styled } from '@mui/system';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const OrdersContainer = styled('div')({
  flex: '8',
  width: '100%',
  display: 'grid',
  gap: '1em',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
});

const List = styled('div')({
  width: '100%',
  flex: '4',
});

const ListItem = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

const ActionButton = styled('button')(({ theme }) => ({
  border: 'none',
  borderRadius: '10px',
  padding: '1vh 2vh',
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  cursor: 'pointer',
  marginRight: '2vh',
}));

const ItemTitleContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const AdminOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [update, setUpdate] = useState(true);

  // Fetches all the existing user orders
  useEffect(() => {
    axios
      .get('/orders/all')
      .then((response) => {
        setOrders(response.data);
        setUpdate(false);
      })
      .catch((err) => {
        setOrders([]);
        toast.error('Something went wrong');
      });
  }, [update]);

  // Method to update the status of order
  const handleUpdate = (orderId, status) => {
    axios
      .put('/orders/update', { order_header_id: orderId, order_status: status })
      .then((response) => {
        if (response.data.success) {
          toast('Order updated');
          setUpdate(true);
        } else {
          toast.error('Could not update order status');
        }
      })
      .catch((err) => {
        toast.error('Could not update order status');
      });
  };

  const columns = [
    {
      field: 'order_header_id',
      headerName: 'Order ID',
      width: 160,
    },
    {
      field: 'order_total',
      headerName: 'Order Total',
      width: 160,
      renderCell: (params) => {
        return <ListItem>{params.row.order_total/100} CAD</ListItem>;
      },
    },
    {
      field: 'created_at',
      headerName: 'Ordered on',
      width: 160,
      renderCell: (params) => {
        return <ListItem>{params.row.created_at.split('T')[0]}</ListItem>;
      },
    },
    {
      field: 'order_status',
      headerName: 'Order Status',
      width: 160,
    },
    {
      field: 'order_details',
      headerName: 'Order Details',
      width: 180,
      renderCell: (params) => {
        return (
          <>
            <ActionButton
              onClick={() => {
                navigate(`/admin/orders/${params.row.order_header_id}`);
              }}
            >
              View Order
            </ActionButton>
          </>
        );
      },
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 260,
      renderCell: (params) => {
        if (params.row.order_status === 'Created') {
          return (
            <>
              <ActionButton
                onClick={() => {
                  handleUpdate(params.row.order_header_id, 'Shipped');
                }}
              >
                Ship Order
              </ActionButton>
              <ActionButton
                onClick={() => {
                  handleUpdate(params.row.order_header_id, 'Delivered');
                }}
              >
                Deliver Order
              </ActionButton>
            </>
          );
        } else if (params.row.order_status === 'Shipped') {
          return (
            <>
              <ActionButton
                onClick={() => {
                  handleUpdate(params.row.order_header_id, 'Delivered');
                }}
              >
                Deliver Order
              </ActionButton>
            </>
          );
        }
      },
    },
  ];
  return (
    <OrdersContainer>
      <List>
        <ItemTitleContainer>
          <h1>Orders Catalogue</h1>
        </ItemTitleContainer>
        <DataGrid
          rows={orders}
          getRowId={(row) => row.order_header_id}
          disableSelectionOnClick
          columns={columns}
          pageSize={10}
        />
      </List>
    </OrdersContainer>
  );
};

export default AdminOrders;
