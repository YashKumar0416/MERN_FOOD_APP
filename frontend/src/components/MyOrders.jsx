import React, { useContext, useEffect, useRef, useState } from 'react';
import Container from 'react-bootstrap/Container';
import  Row from 'react-bootstrap/Row';
import  Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion'
import { UserData } from '../App';
import { useNavigate } from 'react-router-dom';

const MyOrders = ()=> {

    const [orders, setOrders] = useState([])
    let date, day, time;
    const {userState} = useContext(UserData);
    const navigate = useNavigate();

    //GET ALL ORDERS
    const fetchMyOrders = async () => {

        const res = await fetch(`${process.env.REACT_APP_URL}/myorders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                token: localStorage.getItem('authToken'),
                email: userState.email
            })
        })
        const json = await res.json();

        if(json.orderData) {
            setOrders(json.orderData.orders.reverse())
        }   
    }
    
    useEffect(() => {
        if(localStorage.getItem('authToken')) {
            if(userState) {
                fetchMyOrders()
            }
        } else {
            navigate('/')
        }
    }, [])
    
    return (
        <div className='mt-5'>
            <h1 className='text-center mb-3'>All Orders</h1>
            <Container>
                {orders.length !== 0 ? 
                orders.map((item)=> {
                    {
                        const convertTime24_12 = (t) => {
                            let [h, ...rest] = t.split(":");
                            return (h=== '12' ? '12' : h%12) + ":" + rest.join(":")}
                        date = new Date(item.order_date)
                        let localTime = new Date(item.order_date).toLocaleTimeString()
                        day = new Date(item.order_date).toDateString()
                        time = convertTime24_12(localTime)
                    }
                    
                    return (
            <Accordion key={item._id} flush className='m-5 border border-info rounded'>
                <Accordion.Item eventKey={item._id} className=''>
                    <Accordion.Header className=''>
                        <div className='d-flex justify-content-between w-75 p-1 m-1 rounded'>
                              <div>
                                <span className='fw-bold'>Order Placed On: </span>
                                <span>{`${day} , ${time}`}</span>
                              </div>
                              <div>
                                <span className='fw-bold'>Total Quantity: </span>
                                <span>{item.qty}</span>
                              </div>
                              <div>
                                <span className='fw-bold'>Total Price: </span>
                                <span>{item.price}</span>
                              </div>
                        </div>
                    </Accordion.Header>
                    <Accordion.Body className='border-top border-info'>
                        <Container>
                                    <Row className='mb-lg-2 fw-bold'>
                                        <Col lg={1}>S No.</Col>
                                        <Col>Name</Col>
                                        <Col>Quantity</Col>
                                        <Col>Size</Col>
                                        <Col>Price</Col>
                                    </Row>
                            </Container>
                                    <Container className='rounded border border-info'>
                        {item.order_data.map((singleItem, index)=> {
                            return (
                                <div key={index}>
                                    <Row key={index} className='p-1'>
                                        <Col lg={1}>{index+1}</Col>
                                        <Col>{singleItem.name}</Col>
                                        <Col>{singleItem.qty}</Col>
                                        <Col style={{textTransform: 'capitalize'}}>{singleItem.size}</Col>
                                        <Col>{singleItem.price}</Col>
                                    </Row>
                                </div>
                                )
                            })}
                            </Container>
                    </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              
                    )
                })
                  : <div className='text-center mt-5'><h3>No orders found</h3></div>
                  }
            </Container>
        </div> 
    )
}

export default MyOrders;