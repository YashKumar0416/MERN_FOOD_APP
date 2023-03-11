import React from 'react';
import About_Us from '../../assets/About_Us.jfif'

const About = () => {

  return (
    <>
    <div className='bg-dark p-5 mt-3' id='aboutus'>
        <div className="container text-center p-3">
            <div className="row">
                <div className="col mt-5">
                    <h1 className='text-light'>About Us</h1>
                    <h5 className='text-light'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi cupiditate tempore molestiae ipsum ullam assumenda praesentium, distinctio voluptatem neque tenetur!</h5>
                    <div className='text-light mt-5'>
                      <h5>Contact us on :</h5>
                      <h5>Email: yxz@gamil.com</h5>
                      <h5>Address</h5>
                    </div>
                </div>
                <div className="col"> <img src={About_Us} className='image border border-info p-2 rounded' width='450rem' alt="food_img"/></div>
            </div>
        </div>
    </div>
    </>
  )
}

export default About;