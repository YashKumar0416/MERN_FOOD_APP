import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserData } from '../../App';
import ToastAlert from '../toastMessage/ToastAlert';

const Login = () => {

    const { userDispatch } = useContext(UserData);

    const [userdata, setUserdata] = useState({email: '', password: ''});
    const navigate = useNavigate();
    const [toast, setToast] = useState({message: '', type: ''})
    const [showToastMessage, setShowToastMessage] = useState(false)

    //LOGIN USER
    const saveData = async (e)=> {
        e.preventDefault();
        const {email, password} = userdata; 

        if(!email || !password) {
            alert("Enter Details")
        }else if (password.length < 5) {
            alert("Min Password Length: 5")
        } else {
                const res = await fetch(`${process.env.REACT_APP_URL}/loginuser`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: userdata.email,
                    password: userdata.password})
                });
                const json = await res.json();
                
                if(res.status === 200) {
                    const {name, email, phone, address} = json.prevuser;
                    localStorage.setItem("authToken", json.authToken);
                    if(localStorage.getItem("authToken")) {
                        userDispatch({type: "USER", isAuthenticated: true, name: name, email: email, phone: phone, address: address })
                        navigate('/')
                    }
                } else if(res.status === 400) {
                    setToast({message: json.message, type: 'danger'})
                    setShowToastMessage(true)
                    setTimeout(() => {
                        setShowToastMessage(false)
                        setToast({message: '', type: ''})
                    }, 2000);
                } else {
                    alert("Error Occured")
                }
        }
    };

    // HANDLE INPUTS
    const handleInputs = (e)=> {
        const name = e.target.name;
        const value = e.target.value;

        setUserdata({...userdata, [name]: value})
    };

  return (
    <>
        <div className="main_container">
            <h2 className='m-4 fw-bold'>Login Here</h2>
            <Form method='POST' onSubmit={saveData} className='border h-50 login_box border-info p-4 rounded-2 bg-light fs-5 w-25'>
                <Form.Group className="m-2" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name='email' required={true} onChange={handleInputs} value={userdata.email} placeholder="Enter email" />
                </Form.Group>
                <Form.Group className="m-2" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name='password' required={true} onChange={handleInputs} value={userdata.password} placeholder="Password" />
                </Form.Group>
                <Form.Group className='mt-4 mx-auto container'>
                    <Button variant="outline-success" className='fw-bold w-100 mb-2 button' type="submit">
                        Login
                    </Button>
                    {showToastMessage ? <ToastAlert toast={toast} /> : null}
                    <NavLink to='/registeruser'>
                        <Button variant="none"  className='fw-bold w-100 button text-primary' type="submit">Sign up</Button>
                    </NavLink>
                </Form.Group>
                </Form>
        </div>
    </>
  )
}

export default Login;