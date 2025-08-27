import './App.css';
import './Style/style.css'
import Navbar from './Component/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Component/Home';
import Register from './Component/Register';
import Login from './Component/Login';
import Product from './Component/Product';
import Otp_verify from './Component/Otp_verify';
import Alert_msg from './Component/Alert_msg';
import Data_show from './Component/Data_show';
import All_data from './Component/All_data';
import ChatMsg from './Component/Chatmsg';
import Search from './Component/Search';
import Rent_user from './Component/Rent_user';

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/Register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/product' element={<Product/>} />
        <Route path='/Otp_verify' element={<Otp_verify/>} />
        <Route path='/Alert' element={<Alert_msg/>} />
        <Route path='/Show' element={<Data_show/> } />
        <Route path='/AllData' element={<All_data/> } />
        <Route path='/Chat' element={<ChatMsg/> } />
        <Route path='/search' element={<Search/> } />
        <Route path='/rent_user' element={<Rent_user/> } />
      </Routes>
      </Router>
      {/* <Home/> */}
      {/* <Product/> */}
      {/* <Rent_user/> */}
      {/* <Product/> */}
      {/* <Rent_user/> */}
    </div>
  );
}

export default App;
