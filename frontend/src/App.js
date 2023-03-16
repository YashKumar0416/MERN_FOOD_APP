import React, { createContext, useReducer } from 'react';
import { Routes ,Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import Navbar from "../src/components/screens/Navbar";
import Home from '../src/components/screens/Home';
import Contact from "../src/components/screens/Contact";
import Register from '../src/components/screens/Register';
import Login from '../src/components/screens/Login';
import MyOrders from '../src/components/MyOrders';
import Error from '../src/components/screens/Error';
import About from '../src/components/screens/About';
import Profile from '../src/components/screens/Profile';
import LoginAdmin from './components/admin/LoginAdmin';
import RegisterAdmin from './components/admin/RegisterAdmin';
import AdminHome from './components/admin/AdminHome';
import { CartProvider } from '../src/components/contextReducers/CartContext';
import { initialUser, userReducer } from '../src/components/contextReducers/UserContext';
import { ItemsProvider } from './components/contextReducers/ItemsContext';

export const UserData = createContext();

const App = () => {

  const [userState, userDispatch] = useReducer(userReducer, initialUser)

  return (
    <>
    <UserData.Provider value={{userState, userDispatch}}>
      <ItemsProvider>
        <CartProvider>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/registeruser' element={<Register />} />
            <Route path='/loginuser' element={<Login />} />
            <Route path='/orders' element={<MyOrders />} />
            <Route path='/about' element={<About />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/loginadmin' element={<LoginAdmin />} />
            <Route path='/registeradmin' element={<RegisterAdmin />} />
            <Route path='/home' element={<AdminHome />} />
            <Route path='*' element={<Error />} />
          </Routes>
        </CartProvider>
      </ItemsProvider>
    </UserData.Provider>
    </>
  )
}

export default App;