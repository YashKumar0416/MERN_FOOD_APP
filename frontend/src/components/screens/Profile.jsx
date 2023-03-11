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

  const {userState, userDispatch} = useContext(UserData);
  const [user, setUser] = useState({name: '', email: '', phone: '', address: ''});
  const [toast,  setToast] = useState({ message: '', type: ''})
  const [edit, setEdit] = useState(false);
  const [showToastMessage, setShowToastMessage] = useState(false)
  const navigate = useNavigate();

  //GET PROFILE DATA
  const getData = async ()=> {

    const res = await fetch(`${process.env.REACT_APP_URL}/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token: localStorage.getItem("authToken")
      })
    })
    const json = await res.json();

    const {name, email, phone, address} = json.userdata;
    userDispatch({type: "USER", isAuthenticated: true, name, email, phone, address})
  };

  //HANDLE INPUTS
  const handleInputs = (e)=> {
    let {name , value} = e.target;
    setUser({...user, [name]: value})
  }

  //UPDATE PROFILE DATA
  const saveDetails = async (e)=> {
    e.preventDefault();
    setShowToastMessage(true)

    const {name, phone, address} = user;
    const token = localStorage.getItem("authToken")
    
    const res = await fetch(`${process.env.REACT_APP_URL}/updateuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ token, name, phone, address })
    })
    
    const data = await res.json();
    setTimeout(() => {
        setShowToastMessage(false)
    }, 2000);
    
    if(res.status === 400 || !data) {
    setToast({message: "Profile Update Failed", type: 'danger'})
    } else {
    setToast({message: "Profile Updated Successfully", type: 'success'})
      setEdit(false)
      getData();
    }
  };

  // CANCEL EDIT
  const cancelEdit = ()=> {
    setEdit(false)
    const { name, email, phone, address } = userState;
    setUser({name, email, phone, address})
  }
 
  useEffect(()=> {
      if(localStorage.getItem('authToken')) {
          if(userState) {
            const { name, email, phone, address } = userState;
            setUser({name, email, phone, address})
          }
      } else {
        navigate('/')
      }
  }, [userState])

  return (
    <>
    {userState.isAuthenticated ? <>
    <h2 className='text-center mt-5'>User Profile</h2>
    <Container fluid='lg' className='p-lg-3 profile_div d-flex justify-content-center align-items-center'>
      <div className='border border-info rounded p-2 highlight w-lg-25 w-md-100'>
      <Row className='m-lg-1 p-2  rounded highlight'>
        <Col lg={12} className='d-flex justify-content-center'>
          <img src={UserImage} className="text-center userImg" alt="Iser_Img" srcSet="" />
        </Col>
      </Row>
      <div className='border-top border-info'>
        <Row className='text-center m-lg-3 m-3'>
          <Col lg={5}><h3>Name :</h3></Col>
          <Col lg={7}>
          {!edit ? <h4>{user.name}</h4>: 
          <input type="text" className='w-100 text-center fs-4 profile_input' name='name' value={user.name} onChange={handleInputs} />
        }
          </Col>
        </Row>
        <Row className='text-center m-lg-3 m-3'>
          <Col lg={5}><h3>Email :</h3></Col>
          <Col lg={7}><h4>{user.email}</h4></Col>
        </Row>
        <Row className='text-center m-lg-3 m-3'>
          <Col lg={5}><h3>Phone :</h3></Col>
          <Col lg={7}>
          {!edit ? <h4>{user.phone}</h4> : 
          <input type="number" className='w-100 text-center fs-4 profile_input' name='phone' value={user.phone} onChange={handleInputs} />
          }
          </Col>
        </Row>
        <Row className='text-center m-lg-3 m-3'>
          <Col lg={5}><h3>Address :</h3></Col>
          <Col lg={7}>
          {!edit ? <h4>{user.address}</h4> : 
          <input type="text" className='w-100 text-center fs-4 profile_input' name='address' value={user.address} onChange={handleInputs} />
          }
          </Col>
        </Row>
        <Row>
          <Col className='text-center m-2'>
            {!edit ? 
            <Button variant='outline-dark fs-5 fw-bold' onClick={()=> setEdit(true)}> Edit</Button>
            : 
            <div className='d-flex align-items-lg-center justify-content-lg-center gap-5'>
            <Button variant='outline-info fs-5 fw-bold' onClick={saveDetails}> Save Changes</Button>
            <Button variant='outline-danger fs-5 fw-bold' onClick={cancelEdit}> Cancel</Button>
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