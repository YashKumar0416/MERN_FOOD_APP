import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { NavLink, useNavigate } from 'react-router-dom';
import ToastAlert from '../toastMessage/ToastAlert';
import { AiOutlineUser } from 'react-icons/ai';
import { AiOutlineMail } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';
import { BsTelephone } from 'react-icons/bs';
import { FaRegAddressBook } from 'react-icons/fa';

const RegisterAdmin = () => {
     
    const [userdata, setUserdata] = useState({name:'', email: '', phone: '', address: '', password: ''});
    const navigate = useNavigate();
    const [showToastMessage, setShowToastMessage] = useState(false)
    const [toast,  setToast] = useState({ message: '', type: ''})
    const API = process.env.REACT_APP_URL

    //CREATE USER
    const saveData = async (e)=> {
        e.preventDefault();
        const {name, email, phone, address, password} = userdata;

        const res = await fetch(`${API}/registeradmin`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, phone, address, password})});
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
                <Form.Label className='ms-4'>Name</Form.Label>
                <div className='d-flex align-items-center gap-2'>
                    <AiOutlineUser />
                    <Form.Control type="text" name='name' onChange={handleInputs} required={true} value={userdata.name} placeholder="Enter Name" />
                </div>
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicEmail">
                <Form.Label className='ms-4'>Email address</Form.Label>
                <div className='d-flex align-items-center gap-2'>
                    <AiOutlineMail />
                    <Form.Control type="email" name='email' onChange={handleInputs} required={true} value={userdata.email} placeholder="Enter email" />
                </div>
                <Form.Text className="text-muted ms-4">
                We'll never share with anyone.
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicPhone">
                <Form.Label className='ms-4'>Phone</Form.Label>
                <div className='d-flex align-items-center gap-2'>
                    <BsTelephone />
                    <Form.Control type="number" name='phone' onChange={handleInputs} required={true} value={userdata.phone} placeholder="Enter Number" />
                </div>
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicAddress">
                <Form.Label className='ms-4'>Address</Form.Label>
                <div className='d-flex align-items-center gap-2'>
                    <FaRegAddressBook />
                <Form.Control type="text" name='address' onChange={handleInputs} required={true} value={userdata.address} placeholder="Enter Address" />
                </div>
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicPassword">
                <Form.Label className='ms-4'>Password</Form.Label>
                <div className='d-flex align-items-center gap-2'>
                    <RiLockPasswordLine />
                <Form.Control type="password" name='password' onChange={handleInputs} required={true} value={userdata.password} placeholder="Password" />
                </div>
            </Form.Group>
            <Form.Group className='container mt-3 mx-auto'>
            <Button variant="success" className='fw-bold ms-2 w-100 button'>
                Submit
            </Button>
            {showToastMessage ? <ToastAlert toast={toast} /> : null}
            <div className='text-center'>
                <Form.Text>Already registered,
                    <NavLink to='/loginadmin' style={{textDecoration: 'none'}}> Login</NavLink> here
                </Form.Text>
            </div>
            </Form.Group>
            </Form>
        </div>
    </div>
    </>
  )
}

export default RegisterAdmin