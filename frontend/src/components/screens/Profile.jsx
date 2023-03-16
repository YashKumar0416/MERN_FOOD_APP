import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { UserData } from '../../App';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import UserImage from "../../assets/ic_user.svg";
import ToastAlert from '../toastMessage/ToastAlert';
import { useNavigate } from 'react-router-dom';

const Profile = () => {

  const { userState, userDispatch } = useContext(UserData);
  const [user, setUser] = useState({ name: '', email: '', phone: '', address: '' });
  const [toast, setToast] = useState({ message: '', type: '' })
  const [edit, setEdit] = useState(false);
  const [showToastMessage, setShowToastMessage] = useState(false)
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const API = process.env.REACT_APP_URL

  //GET PROFILE DATA
  const getData = async () => {

    const res = await fetch(`${API}/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token: localStorage.getItem("authToken")
      })
    })
    const json = await res.json();

    const { name, email, phone, address } = json.userdata;
    const userData = { isAuth: true, name, email, phone, address }
    userDispatch({type: "USER", isAuthenticated: true, name: name, email: email, phone: phone, address: address })
    localStorage.setItem('userDetails', JSON.stringify(userData))
  };

  //HANDLE INPUTS
  const handleInputs = (e) => {
    let { name, value } = e.target;
    setUser({ ...user, [name]: value })
  }

  //UPDATE PROFILE DATA
  const saveDetails = async (e) => {
    e.preventDefault();
    
    const { name, phone, address } = user;
    const token = localStorage.getItem("authToken")
    
    const res = await fetch(`${API}/updateuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ token, name, phone, address })
    })
    
    const data = await res.json();
    setShowToastMessage(true)
    setTimeout(() => {
      setShowToastMessage(false)
    }, 2000);

    if (res.status === 400 || !data) {
      setToast({ message: "Profile Update Failed", type: 'danger' })
    } else {
      setToast({ message: "Profile Updated Successfully", type: 'success' })
      setEdit(false)
      getData();
    }
  };

  // CANCEL EDIT
  const cancelEdit = () => {
    setEdit(false)
    const { name, email, phone, address } = userState;
    setUser({ name, email, phone, address })
  }

  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      const userDetails = JSON.parse(localStorage.getItem('userDetails'));
      const { isAuth, name, email, phone, address } = userDetails;
      setAuthenticated(true)
      if (isAuth) {
        setUser({ name, email, phone, address })
      }
    } else {
      setAuthenticated(false)
      navigate('/')
    }
  }, [])

  return (
    <>
      {authenticated ? <>
        <h2 className='text-center mt-5'>User Profile</h2>
        <Container fluid='lg' className='p-lg-3 profile_div d-flex justify-content-center align-items-center'>
          <div className='border border-dark profile_container rounded p-2 highlight w-50'>
            <Row className='m-lg-1 p-2  rounded highlight profile_input'>
              <Col lg={12} className='d-flex justify-content-center'>
                <img src={UserImage} className="text-center userImg" alt="Iser_Img" srcSet="" />
              </Col>
            </Row>
            <div className=''>
              <Row className='text-center m-lg-3 m-3'>
                <Col lg={5}><h4>Name :</h4></Col>
                <Col lg={7}>
                  {!edit ? <h6>{user.name}</h6> :
                    <input type="text" className='w-100 text-center fs-4 profile_input' name='name' value={user.name} onChange={handleInputs} />
                  }
                </Col>
              </Row>
              <Row className='text-center m-lg-3 m-3'>
                <Col lg={5}><h4>Email :</h4></Col>
                <Col lg={7}><h6>{user.email}</h6></Col>
              </Row>
              <Row className='text-center m-lg-3 m-3'>
                <Col lg={5}><h4>Phone :</h4></Col>
                <Col lg={7}>
                  {!edit ? <h6>{user.phone}</h6> :
                    <input type="number" className='w-100 text-center fs-4 profile_input' name='phone' value={user.phone} onChange={handleInputs} />
                  }
                </Col>
              </Row>
              <Row className='text-center m-lg-3 m-3'>
                <Col lg={5}><h4>Address :</h4></Col>
                <Col lg={7}>
                  {!edit ? <h6>{user.address}</h6> :
                    <input type="text" className='w-100 text-center fs-4 profile_input' name='address' value={user.address} onChange={handleInputs} />
                  }
                </Col>
              </Row>
              <Row>
                <Col className='text-center m-2'>
                  {!edit ?
                    <Button variant='outline-mute' className='fs-5 button fw-bold profile_button' onClick={() => setEdit(true)}> Edit</Button>
                    :
                    <div className='d-flex align-items-lg-center justify-content-lg-center gap-5'>
                      <Button variant='outline-mute' className='fs-5 button fw-bold profile_button' onClick={saveDetails}> Save Changes</Button>
                      <Button variant='outline-danger' className='fs-5 button fw-bold profile_button' onClick={cancelEdit}> Cancel</Button>
                    </div>
                  }
                </Col>
              </Row>
              {showToastMessage ? <ToastAlert toast={toast} /> : null}
            </div>
          </div>
        </Container>
      </>
        : <div className="main_container mt-5">
          <h1>Login Required</h1></div>}
    </>
  )
}

export default Profile;