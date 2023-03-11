import React, { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useNavigate } from 'react-router-dom';
import { UserData } from '../../App';
import ToastAlert from '../toastMessage/ToastAlert';

const Contact = () => {

  const [userdata, setUserdata] = useState({name:'', email: '', message: ''});
  const {userState} = useContext(UserData);
  const [showToastMessage, setShowToastMessage] = useState(false);
  const [toast,  setToast] = useState({ message: '', type: ''});
  const navigate = useNavigate();

  //UPDATE USER PROFILE DATA
  const saveData = async (e)=> {
    e.preventDefault();

    if(userdata.message === '') {
      setShowToastMessage(true);
      setToast({message: 'Enter some message', type: 'danger'})
      setTimeout(() => {
        setShowToastMessage(false)
        setToast({message: '', type: ''})
      }, 1500);

    } else {
      const res = await fetch(`${process.env.REACT_APP_URL}/contactus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          token: localStorage.getItem('authToken'),
          email: userdata.email,
          message: userdata.message
        })
      })
      const json = await res.json();

      setShowToastMessage(true);
      setTimeout(() => {
        setShowToastMessage(false)
        setToast({message: '', type: ''})
      }, 1500);

      if(!json.success) {
        setToast({message: 'Message Failed', type: 'danger'})
      }else {
        setToast({message: 'Message send Successfully', type: 'success'})
        setUserdata({ name: userState.name, email: userState.email, message: ''})
      }
  }
  };

  useEffect(()=> {
    if(localStorage.getItem("authToken")) {
      if(userState) {
        setUserdata({ name: userState.name, email: userState.email, message: ''})
      }
    } else {
      navigate('/')
    }
  }, []);

  return (
    <>
    {userState.isAuthenticated ?
        <div className="main_container">
          <h2 className='mb-4'>Having issues</h2>
          <div className="h-75 w-25 fs-5 border border-info rounded-3 p-2 mt-1 app_theme">
            <Form method='POST' onSubmit={saveData} className='container'>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control readOnly={true} type="text" name='name' defaultValue={userdata.name} placeholder="Name" />
            </Form.Group>
            <Form.Group className="mb-4" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" readOnly={true} name='email' defaultValue={userdata.email} placeholder="Email" />
            </Form.Group>
            <Form.Group className='mb-4'>
              <InputGroup>
                <Form.Control rows='5' as='textarea' onChange={(e)=> {setUserdata({name: userdata.name, email: userdata.email, message:e.target.value})}} value={userdata.message} area-label="textarea" placeholder='Write your message here'/>
              </InputGroup>
            </Form.Group>
            <Form.Group className='container'>
            <Button variant="outline-primary" className='contact-button mb-3 w-100 fw-bold' type="submit">
                Send
            </Button>
            {showToastMessage ? <ToastAlert toast={toast} /> : null}
            <h6 className='text-center'>Thank you for your feedback</h6>
            </Form.Group>
            </Form>
          </div>
      </div>
    : ""}
    </>
  )
}

export default Contact;