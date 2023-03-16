import React from 'react';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';

const ToastAlert = ({toast}) => {
  return (
        <div>
            <ToastContainer position='top-center' className='mt-5'>
              <Toast bg={toast.type} delay={1500} autohide>
                <Toast.Body className='text-center'>
                  <strong>
                    <span style={{color: 'white'}}>{toast.message}</span>
                  </strong>
                </Toast.Body>
              </Toast>
            </ToastContainer>
        </div>
  )
}

export default ToastAlert;