import React, { useState } from 'react';
import { useCart, useDispatchCart } from "../components/contextReducers/CartContext";
import Button from "react-bootstrap/Button"
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';
import { AiOutlinePlus, AiOutlineMinus, AiOutlineDelete } from 'react-icons/ai';

const Cart = () => {
 
    let data = useCart();
    let dispatch = useDispatchCart();
    const [showToastMessage, setShowToastMessage] = useState(false);
    let totalPrice = data && data.reduce((total, food)=> total + food.price, 0);
    let totalQty = data && data.reduce((total, food)=> total + food.qty, 0);
    const API = process.env.REACT_APP_URL

    // ICON STYLE
    const iconStyle = {
      border: 'none'
    }

    // HANDLE TOAST MESSAGE
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
            {showToastMessage ? 
            <div style={{marginLeft: "15rem", padding: "100px"}} className='main-container text-center'>{handleToast()}</div> : 
            <div className='mt-lg-5 w-100 text-center fs-2'> The Cart is Empty !</div>}
          </div>
      )
    }
  
    //PLACE ORDER
    const saveData = async ()=> {

      let {email} = JSON.parse(localStorage.getItem('userDetails'))
        const res = await fetch(`${API}/saveorder`, {
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

    // INCREASE FOOD QUANTITY
    const increaseQty = async (food)=> {
      let price = food.price/food.qty
      await dispatch({type: 'UPDATE', id: food.id, price: price, qty: 1, size: food.size})
    }
    
    // DECREASE FOOD QUANTITY
    const decreaseQty = async (food)=> {
        if(food.qty > 1) {
          let price = food.price/food.qty
          await dispatch({type: 'UPDATE', id: food.id, price: -price, qty: -1, size: food.size})
        }
    }

  return (
    <>
        <div className="container m-auto mt-lg-4 table-repsonsive table-repsonsive-sm table-repsonsive-md">
            <table className="table">
                <thead className='text-success fs-5'>
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
                            <tr className='fs-5  text-start' key={index}>
                                <th scope='row'>{index + 1}.</th>
                                <td className=''>{food.name}</td>
                                <td className='d-flex align-items-start'>
                                  <Button variant='mute' className='button p-1 m-1' style={iconStyle} onClick={()=> increaseQty(food)}> <AiOutlinePlus style={{color: 'red', marginBottom: '1rem'}}/> </Button>
                                  {food.qty}
                                 <Button variant='mute' className='button p-1 m-1' style={iconStyle} onClick={()=> decreaseQty(food)}> <AiOutlineMinus style={{color: 'green', marginBottom: '1rem'}}/> </Button>
                                </td>
                                <td style={{textTransform: "capitalize"}}>{food.size}</td>
                                <td>{food.price}</td>
                                <td><Button variant='mute' className='button p-0 m-0' style={iconStyle}  onClick={()=> {dispatch({type: "REMOVE", index: index})}}><AiOutlineDelete style={{color: 'red', fontSize: '1.5rem'}} /></Button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className=' d-flex justify-content-center gap-2 align-items-center mb-3'>
              <h1 className='fs-2 mt-1'>Total Price: <span className='text-success'>{totalPrice}</span> /-</h1>
              <Button variant='success' className="button text-light fs-5 fw-bold" onClick={saveData} > Check Out</Button>
            </div>
        </div>
    </>
  )
}
 
export default Cart;