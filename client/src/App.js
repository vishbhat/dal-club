// @Author: Kishan Thakkar
import AppRoutes from './Routes';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './Assets/config/siteTheme';
import './App.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-toastify/dist/ReactToastify.min.css';

import { State } from './State';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <State>
        <AppRoutes />
        <ToastContainer
          position='top-right'
          autoClose={3000}
          closeOnClick
          pauseOnHover
          theme='colored'
          hideProgressBar
        />
      </State>
    </ThemeProvider>
  );
}

export default App;
