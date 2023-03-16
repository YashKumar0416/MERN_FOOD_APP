import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { NavLink, useNavigate } from 'react-router-dom';
import ToastAlert from '../toastMessage/ToastAlert';
import { AiOutlineUser, AiOutlineMail } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';
import { BsTelephone } from 'react-icons/bs';
import { FaRegAddressBook } from 'react-icons/fa';

const Register = () => {
 
    const [userdata, setUserdata] = useState({name:'', email: '', phone: '', address: '', password: ''});
    const navigate = useNavigate();
    const [showToastMessage, setShowToastMessage] = useState(false)
    const [toast,  setToast] = useState({ message: '', type: ''})
    const API = process.env.REACT_APP_URL

    // NAVLINK STYLE
    const navStyle = {
        textDecoration: 'none'
    }

    //CREATE USER
    const saveData = async (e)=> {
        e.preventDefault();
        const res = await fetch(`${API}/createuser`, {
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
        <div className="container w-25 border border-dark p-3 rounded-2 bg-light fs-5">
            <Form method='POST' onSubmit={saveData}>
            <Form.Group className="mb-2" controlId="formBasicName">
                <Form.Label className=''>Name</Form.Label>
                <div className='input_wrapper'>
                    <Form.Control className='input' type="text" name='name' onChange={handleInputs} required={true} value={userdata.name} placeholder="Enter Name" />
                    <AiOutlineUser className='input_icon'/>
                </div>
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicEmail">
                <Form.Label className=''>Email address</Form.Label>
                <div className='input_wrapper'>
                    <AiOutlineMail className='input_icon'/>
                    <Form.Control className='input' type="email" name='email' onChange={handleInputs} required={true} value={userdata.email} placeholder="Enter email" />
                </div>
                <Form.Text className="text-muted ">
                We'll never share with anyone.
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicPhone">
                <Form.Label className=''>Phone</Form.Label>
                <div className='input_wrapper'>
                    <BsTelephone className='input_icon'/>
                    <Form.Control className='input' type="number" name='phone' onChange={handleInputs} required={true} value={userdata.phone} placeholder="Enter Number" />
                </div>
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicAddress">
                <Form.Label className=''>Address</Form.Label>
                <div className='input_wrapper'>
                    <FaRegAddressBook className='input_icon'/>
                <Form.Control className='input' type="text" name='address' onChange={handleInputs} required={true} value={userdata.address} placeholder="Enter Address" />
                </div>
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicPassword">
                <Form.Label className=''>Password</Form.Label>
                <div className='input_wrapper'>
                    <RiLockPasswordLine className='input_icon'/>
                <Form.Control className='input' type="password" name='password' onChange={handleInputs} required={true} value={userdata.password} placeholder="Password" />
                </div>
            </Form.Group>
            <Form.Group className='container mt-3'>
            <Button variant="success" className='fw-bold w-100 button mb-1' type="submit">
                Submit
            </Button>
            {showToastMessage ? <ToastAlert toast={toast} /> : null}
            <div className='text-center'>
                <Form.Label className='fw-light'>
                    Already registered, <NavLink style={navStyle} to='/loginuser'> Login</NavLink> now 
                </Form.Label>
            </div>
            </Form.Group>
            </Form>
        </div>
    </div>
    </>
  )
}

export default Register;