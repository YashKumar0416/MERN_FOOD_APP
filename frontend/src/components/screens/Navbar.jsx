import { useContext, useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import Modal from '../modal/Modal';
import Cart from '../Cart';
import { useCart } from '../contextReducers/CartContext';
import { UserData } from '../../App';
import ToastAlert from '../toastMessage/ToastAlert';
import { AiOutlineShoppingCart, AiOutlineHome, AiOutlineLogout, AiOutlineLogin } from 'react-icons/ai';
import { BiUserCircle } from 'react-icons/bi';
import { BsInfoCircle } from 'react-icons/bs';
import { IoMdContacts } from 'react-icons/io';
import { HiOutlineClipboardList } from 'react-icons/hi';
import { RiAdminLine } from 'react-icons/ri';


function NavbarHeader() {

  const {userState, userDispatch} = useContext(UserData);
  const [toast] = useState({message: 'Logout Successfull', type: 'success'})
  const [showToastMessage, setShowToastMessage] = useState(false)
  const [cartView, setCartView] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  let data = useCart();

  // ACTIVE LINK STYLE
  let activeStyle = {
    fontWeight: 'bold',
    backgroundColor: '#ff6464',
    color: 'white',
    borderRadius: '10px',
    padding: '5px'
  }

  // ICON STYLE
  const iconStyle = {
    fontSize: '1.5rem',
    padding: '5px'
  }

  //LOGOUT USER
  const logoutUser = ()=> {
    setShowToastMessage(true)
    if(authenticated) {
      setTimeout(() => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userDetails')
        setAuthenticated(false)
        userDispatch({type: "USER", isAuthenticated: false, name: '', email: '', phone: '', address: ''})
        setShowToastMessage(false)
      }, 1000);
    }
  };
  
  useEffect(()=> {
    if(localStorage.getItem('authToken')) {
      const userDetails = JSON.parse(localStorage.getItem('userDetails'));
      const {isAuth, name, email, phone, address} = userDetails;
      if(isAuth) {
        userDispatch({type: "USER", isAuthenticated: isAuth, name, email, phone, address})
      }
      if(userState.isAuthenticated) {
        setAuthenticated(true)
      }
    } else {
      setAuthenticated(false)
    }
  }, [userState.isAuthenticated])

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand className=' fs-3 fw-bold fst-italic logo'>Food <span className='home_logo fs-2'> App</span> </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav className="ms-auto d-flex gap-3 justify-content-center align-items-center">
          <NavLink style={({isActive})=> isActive ? activeStyle:undefined} className='link' to='/'><AiOutlineHome style={iconStyle}  /> Home</NavLink>
          {authenticated ? <>
              <NavLink style={({isActive})=> isActive ? activeStyle:undefined} className='link' to='/contact'> <IoMdContacts style={iconStyle} /> Contact Us</NavLink>
              <NavLink className='link mx-1' to='' onClick={()=> setCartView(true)}><AiOutlineShoppingCart style={iconStyle} /> Cart {data && data.length === 0 ? '': <Badge pill bg='danger' >{data ? data.length : ''}</Badge> }</NavLink>
              {cartView ? <Modal onClose={()=> setCartView(false)} > <Cart /> </Modal>: null}
              <NavLink style={({isActive})=> isActive ? activeStyle:undefined} className='link mx-1' to='/orders'><HiOutlineClipboardList style={iconStyle}  /> My Orders </NavLink>
              <NavLink style={({isActive})=> isActive ? activeStyle:undefined} className='link mx-1' to='/profile'> <BiUserCircle  style={iconStyle}/>Profile </NavLink>
              <NavLink className='link mx-1 text-danger' to='/' onClick={logoutUser}> <AiOutlineLogout style={iconStyle}  /> Logout </NavLink>
                {showToastMessage ? <ToastAlert toast={toast} /> : null}
            </>
            :<>
              <NavLink style={({isActive})=> isActive ? activeStyle:undefined} className='link' to='/about'> <BsInfoCircle  style={iconStyle} /> About Us</NavLink>
              <NavLink style={({isActive})=> isActive ? activeStyle:undefined}  className='link mx-1' to='/loginadmin'><RiAdminLine style={iconStyle}  /> Admin</NavLink>
              <NavLink style={({isActive})=> isActive ? activeStyle:undefined}  className='link mx-1' to='/loginuser'><AiOutlineLogin  style={iconStyle} /> Order Now</NavLink>
            </>
          }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarHeader;