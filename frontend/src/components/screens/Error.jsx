import React from 'react';
import { NavLink } from 'react-router-dom';

const Error = () => {
  return (
    <>
        <div className='container text-center mt-5'>
            <div className='mt-5'><h1> We couldn't find what you are looking for :(</h1></div>
            <NavLink to='/'><div className='mt-2'><h4 className='link'> Go Back</h4></div></NavLink>
        </div>
    </>
  )
}

export default Error;