import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { NavLink, useNavigate } from 'react-router-dom';
import ToastAlert from '../toastMessage/ToastAlert';

const Register = () => {
 
    const [userdata, setUserdata] = useState({name:'', email: '', phone: '', address: '', password: ''});
    const navigate = useNavigate();
    const [showToastMessage, setShowToastMessage] = useState(false)
    const [toast,  setToast] = useState({ message: '', type: ''})

    //CREATE USER
    const saveData = async (e)=> {
        e.preventDefault();
        const res = await fetch(`${process.env.REACT_APP_URL}/createuser`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: userdata.name,
                email: userdata.email,
                phone: userdata.phone,
                address: userdata.address,
                password: userdata.password})
        });
        const json = await res.json();
        setShowToastMessage(true)
        setTimeout(() => {
            setShowToastMessage(false);
            setToast({message: '', type: ''})
        }, 2000);

        if(!json.success) {
            if(json.errors) {
                setToast({message: json.errors[0].msg, type: 'danger'})
            } else if(json.message) {
                setToast({message: json.message, type: 'danger'})
            }
            
        }else {
            setToast({message: json.message, type: 'success'})
            setTimeout(() => {
                navigate('/loginuser');
            }, 2000);
        }
    };

    //HANDLE INPUTS
    const handleInputs = (e)=> {
        const name = e.target.name;
        const value = e.target.value;

        setUserdata({...userdata, [name]: value})
    };

  return (
    <>
    <div className="main_container">
        <h2 className='fw-bold'>Register Here</h2>
        <div className="container w-25 border border-info p-3 rounded-2 bg-light fs-5">
            <Form method='POST' onSubmit={saveData}>
            <Form.Group className="mb-2" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name='name' onChange={handleInputs} required={true} value={userdata.name} placeholder="Enter Name" />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name='email' onChange={handleInputs} required={true} value={userdata.email} placeholder="Enter email" />
                <Form.Text className="text-muted">
                We'll never share with anyone.
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="number" name='phone' onChange={handleInputs} required={true} value={userdata.phone} placeholder="Enter Number" />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" name='address' onChange={handleInputs} required={true} value={userdata.address} placeholder="Enter Address" />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name='password' onChange={handleInputs} required={true} value={userdata.password} placeholder="Password" />
            </Form.Group>
            <Form.Group className='container mt-3'>
            <Button variant="outline-success" className='fw-bold w-50 button' type="submit">
                Submit
            </Button>
            {showToastMessage ? <ToastAlert toast={toast} /> : null}
            <NavLink to='/loginuser'>
                <Button variant="none" className='fw-bold w-50 text-primary button'> Already a user </Button>
            </NavLink>
            </Form.Group>
            </Form>
        </div>
    </div>
    </>
  )
}

export default Register;