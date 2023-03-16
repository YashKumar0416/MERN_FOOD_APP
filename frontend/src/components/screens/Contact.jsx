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
  const [authenticated, setAuthenticated] = useState(false);
  const API = process.env.REACT_APP_URL

  //SEND USER MESSAGE
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
      const res = await fetch(`${API}/contactus`, {
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
        const userDetails = JSON.parse(localStorage.getItem('userDetails'));
        const {isAuth, name, email} = userDetails;
        if(isAuth) {
          setAuthenticated(true)
          setUserdata({ name, email, message: ''})
        }
      } else {
        setAuthenticated(false)
        navigate('/')
    }
  }, []);

  return (
    <>
    {authenticated ?
        <div className="main_container">
          <h2 className='mb-4'>Having issues</h2>
          <div className="h-75 w-25 fs-5 border border-dark rounded-3 p-2 mt-1">
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
                  <Form.Control rows='5' as='textarea' onChange={(e)=> {setUserdata({name: userdata.name, email: userdata.email, message:e.target.value})}} value={userdata.message} area-label="textarea" placeholder='Write your message here...'/>
                </InputGroup>
              </Form.Group>
              <Form.Group className='container'>
                <Button variant="primary" className='contact-button mb-3 w-100 fw-bold' type="submit">
                    Send
                </Button>
                {showToastMessage ? <ToastAlert toast={toast} /> : null}
                <div className='text-center'>
                  <Form.Label className='fs-5 fw-light'>Thank you for your feedback</Form.Label>
                </div>
              </Form.Group>
            </Form>
          </div>
      </div>
    : ""}
    </>
  )
}

export default Contact;