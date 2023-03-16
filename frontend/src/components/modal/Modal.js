import Button from 'react-bootstrap/Button'
import React from 'react'
import ReactDom from 'react-dom'
import "../../App.css"

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  backgroundColor: 'white',
  transform: 'translate(-50%, -50%)',
  zIndex: 1000,
  height: '90%',
  width: '90%',
  overflowY: "auto",
  overflowX: "hidden",
  borderRadius: 10,
  maxWidth: 600,
}

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000,
}

export default function Modal({ children, onClose }) {

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES} className='Scroll'>
        <div className='d-flex justify-content-between '>
          <h2 className='m-lg-2'>Cart Items</h2>
          <Button variant='outline-mute' className='button fs-4 fw-bold' onClick={onClose}> X </Button>
        </div>
        {children}
      </div>
    </>,
    document.getElementById('cart-root')
  )
}