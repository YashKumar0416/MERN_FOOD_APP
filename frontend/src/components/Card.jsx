import { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'
import { useCart, useDispatchCart } from '../components/contextReducers/CartContext';
import { BiCartAdd } from 'react-icons/bi';

function SingleCard({foodItem, options, userPresent}) {

  let dispatch = useDispatchCart();
  let data = useCart();
  let priceOptions = Object.keys(options);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('');
  const priceRef = useRef();
  const [showToastMessage, setShowToastMessage] = useState(false)
  let finalPrice = qty * parseInt(options[size]);

  // HANDLE TOAST MESSAGE
  const handleToast = ()=> {
      return (
        <ToastContainer position='middle-start'>
        <Toast bg='success' onClose={()=> setShowToastMessage(false)} show={showToastMessage} delay={1500} autohide>
          <Toast.Body className='text-center'>
            <strong>
              <span style={{color: 'white'}}>
                Added Successfully
              </span>
            </strong>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    )
  }

  // ADD ITEM TO CART
  const addToCart = async ()=> {        
    let food = [];
      for (let item of data) {
        if (item.id === foodItem._id && item.size === size) {
          food = item;
          break;
        }
      }

      if (food.length !== 0) {
          await dispatch({type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty, size: size})
          return
      } else {
        await dispatch({type: "ADD", id: foodItem._id, name: foodItem.name,
                                    price: finalPrice, qty: qty, size: size})
        return
      }
  };

  useEffect(()=> {
    setSize(priceRef.current.value)
    localStorage.setItem('cart', JSON.stringify(data))
  }, [foodItem, showToastMessage, data, userPresent]);

  return (
      <div className="mb-5">
        <Card style={{ width: '17rem' }} className='single_card'>
          <Card.Img variant="top" src={foodItem.img} style={{height: "150px", objectFit: "fill"}} />
          <Card.Body>
            <Card.Title className='fw-bold'>{foodItem.name}</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title.
            </Card.Text>
            <div className=' w-100'>
                <select className='m-2 h=100 bg-sucess rounded' onChange={(e)=> setQty(e.target.value)} >
                    {Array.from(Array(6), (e, i)=> {
                        return (
                            <option key={i+1}value={i+1}>{i+1}</option>
                        )
                    })}
                </select>
                <select className='m-2 h=100 bg-sucess rounded' ref={priceRef} onChange={(e)=> setSize(e.target.value)}>
                    {priceOptions.map((data, index)=> {
                      return <option key={index}>{data}</option>
                    })}
                </select>
                <div className='d-inline fw-bold'>Price : <span className='text-success'> {Number(finalPrice)}</span>/-</div>
            </div>
            {!userPresent ? <OverlayTrigger placement='bottom' delay={{show: 250, hide: 400}} overlay={(props)=> (<Tooltip {...props}>Login required</Tooltip>)}>
              <Button variant="primary" className='container button'><BiCartAdd style={{fontSize: '1.5rem'}}/> Add to Cart</Button>
            </OverlayTrigger> 
            : <Button variant="primary" onClick={()=> {addToCart() 
                setShowToastMessage(true)
                handleToast()}} className='container button'><BiCartAdd style={{fontSize: '1.5rem', marginTop: '-6px'}}/> Add to Cart</Button>
            }
            {showToastMessage ? handleToast() : null}
          </Card.Body>
        </Card>
    </div>
  );
}

export default SingleCard;