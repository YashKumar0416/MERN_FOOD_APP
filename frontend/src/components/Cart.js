import React, { useContext, useState } from 'react';
import { useCart, useDispatchCart } from "../components/contextReducers/CartContext";
import Button from "react-bootstrap/Button"
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';
import { UserData } from "../App";

const Cart = () => {
 
    let data = useCart();
    let dispatch = useDispatchCart();
    const [showToastMessage, setShowToastMessage] = useState(false);
    const {userState} = useContext(UserData);

    let totalPrice = data.reduce((total, food)=> total + food.price, 0);
    let totalQty = data.reduce((total, food)=> total + food.qty, 0);

    const handleToast = ()=> {
        return (
          <ToastContainer position='middle-center' className='' >
          <Toast bg='success' onClose={()=> setShowToastMessage(false)} show={showToastMessage} delay={1500} autohide>
            <Toast.Body className='text-center'>
              <strong>
                <span style={{color: 'white'}}>
                  Order has been placed
                </span>
              </strong>
            </Toast.Body>
          </Toast>
        </ToastContainer>
        )
      }

      if(data.length === 0) {
        return (
            <div className='main-container'>
              {showToastMessage ? <div style={{marginLeft: "15rem", padding: "100px"}} className='main-container text-center'>{handleToast()} </div> : 
              <div className='mt-lg-5 w-100 text-center fs-2'> The Cart is Empty !</div>
              }
            </div>
        )
    }
  

    //PLACE ORDER
    const saveData = async ()=> {

      let email = userState.email;
        const res = await fetch(`${process.env.REACT_APP_URL}/saveorder`, {
            method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email: email, order_data: data, qty: totalQty, price: totalPrice, order_date: new Date()})
    });
    
    if (res.status === 200) {
        setShowToastMessage(true)
        setTimeout(() => {
            setShowToastMessage(false)
        }, 4000);
        dispatch({type: "DROP"})
    }
};

  return (
    <>
        <div className="container m-auto mt-lg-4 table-repsonsive table-repsonsive-sm table-repsonsive-md">
            <table className="table">
                <thead className='text-success fs-4'>
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Name</th>
                        <th scope='col'>Quantity</th>
                        <th scope='col'>Option</th>
                        <th scope='col'>Amount</th>
                        <th scope='col'></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((food, index)=> {
                        return (
                            <tr className='fs-5 fw-bold' key={index}>
                                <th scope='row'>{index + 1}</th>
                                <td>{food.name}</td>
                                <td className='text-center'>{food.qty}</td>
                                <td style={{textTransform: "capitalize"}}>{food.size}</td>
                                <td>{food.price}</td>
                                <td><Button variant='mute' className='button fw-bold' onClick={()=> {dispatch({type: "REMOVE", index: index})}}>❌</Button></td>
                                {/* <td><Button variant='danger' className='fw-bold' onClick={()=> {dispatch({type: "REMOVE", index: index})}}>Remove</Button></td> */}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className='text-center'><h1 className='fs-2 mt-4'>Total Price: <span className='text-success'>{totalPrice}</span> /-</h1></div>
            <div className='text-center'> <Button  className="btn bg-success mt-3 text-light fs-5 fw-bold mb-5" onClick={saveData} > Check Out</Button></div>
        </div>
    </>
  )
}

export default Cart;