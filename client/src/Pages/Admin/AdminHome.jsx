import Navbar from '../../Components/Admin/Navbar';
import Sidebar from '../../Components/Admin/Sidebar';
import { Outlet } from 'react-router-dom';

const AdminHome = () => {
  return (
    <div>
      <Navbar />
      <div className='container'>
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminHome;
