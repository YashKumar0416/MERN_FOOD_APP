import { useContext, useState } from 'react';
import { NavLink } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import Modal from '../modal/Modal';
import Cart from '../Cart';
import { useCart } from '../contextReducers/CartContext';
import Button from 'react-bootstrap/esm/Button';
import { UserData } from '../../App';
import ToastAlert from '../toastMessage/ToastAlert';

function NavbarHeader() {

  let activeStyle = {
    textDecoration: "underline",
  }

  const {userState, userDispatch} = useContext(UserData);
  const [toast] = useState({message: 'Logout Successfull', type: 'success'})
  const [showToastMessage, setShowToastMessage] = useState(false)
  const [cartView, setCartView] = useState(false);
  let data = useCart();

  //LOGOUT USER
  const logoutUser = ()=> {
    setShowToastMessage(true)
    if(userState) {
      setTimeout(() => {
        localStorage.removeItem('authToken');
        userDispatch({type: "USER", isAuthenticated: false, name: '', email: '', phone: '', address: ''})
        setShowToastMessage(false)
      }, 1000);
    }
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand className=' fs-3 fw-bold fst-italic logo'>Food <span className='text-info fs-2'> App</span> </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav className="ms-auto">
          <NavLink style={({isActive})=> isActive ? activeStyle:undefined} className='link' to='/'><Button className='button btn-light fw-bold mx-1 text-primary'> Home </Button></NavLink>
          {userState.email ? <>
              <NavLink style={({isActive})=> isActive ? activeStyle:undefined} className='link' to='/contact'><Button className='button btn-light fw-bold mx-1 text-primary'> Contact Us</Button></NavLink>
              <NavLink className='link mx-1' to='' onClick={()=> setCartView(true)}><Button className='button btn-light fw-bold text-primary'>  Cart {data.length === 0 ? '': <Badge pill bg="danger" >{data.length}</Badge> }</Button></NavLink>
              {cartView ? <Modal onClose={()=> setCartView(false)} > <Cart /> </Modal>: null}
              <NavLink style={({isActive})=> isActive ? activeStyle:undefined} className='link mx-1' to='/orders'><Button className='button btn-light fw-bold text-primary'> Last Orders </Button></NavLink>
              <NavLink style={({isActive})=> isActive ? activeStyle:undefined} className='link mx-1' to='/profile'><Button className='button btn-light fw-bold text-primary'> Profile </Button></NavLink>
              <NavLink className='link mx-1 text-danger' to='/' onClick={logoutUser}><Button className='button btn-light fw-bold text-danger'> Logout </Button></NavLink>
                {showToastMessage ? <ToastAlert toast={toast} /> : null}
            </>
            :<>
              <NavLink style={({isActive})=> isActive ? activeStyle:undefined} className='link' to='/about'><Button className='button btn-light fw-bold mx-1 text-primary'> About Us</Button></NavLink>
              <NavLink className='link mx-1' to='/registeradmin'><Button className='button btn-light fw-bold text-primary'>Admin</Button></NavLink>
              <NavLink className='link mx-1' to='/loginuser'><Button className='button btn-light fw-bold text-primary'>Order Now</Button></NavLink>
            </>
          }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarHeader;