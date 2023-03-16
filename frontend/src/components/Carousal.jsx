import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import '../App.css';

const Carousal = () => {
  return (
    <>
        <Carousel fade>
            <Carousel.Item id='carousal_item'>
                <img
                className="d-block w-100"
                id='carousal_images'
                src="https://source.unsplash.com/random/900x800/?burger"
                alt="First slide"
                />
                <Carousel.Caption>
                <h1 className='fs-1 text-success fw-bold'>Want a Burger</h1>
                <p className='fs-5'>Get upto 25% off on our new burger combos</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item id='carousal_item'>
                <img
                className="d-block w-100"
                id='carousal_images'
                src="https://source.unsplash.com/random/900x800/?pasta"
                alt="Second slide"
                />
                <Carousel.Caption>
                <h3 className='fs-1 text-info fw-bold'>Pastas like you never tasted before</h3>
                <p className='fs-5'>Fell in Love with our special MEXICANA Chilli Pasta</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item id='carousal_item'>
                <img
                className="d-block w-100"
                id='carousal_images'
                src="https://source.unsplash.com/random/900x800/?pizza"
                alt="Third slide"
                />
                <Carousel.Caption>
                <h3 className='fs-1 text-warning fw-bold'>Pizza Starting just 99/-</h3>
                <p className='fs-5'>Get our new range of pizzas</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    </>
  )
}

export default Carousal;