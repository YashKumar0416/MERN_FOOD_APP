import React, { useRef } from 'react'
import Col from 'react-bootstrap/esm/Col'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import { AiFillGithub } from 'react-icons/ai'
import { RiTodoLine } from 'react-icons/ri'

const Footer = () => {

  const refContainer = useRef(null)

  return (
    <div className='footer_container'>
        <Container className='d-flex justify-content-center align-items-center flex-column p-2'>
            <Row>
                <Col>
                <ul className='d-flex gap-5'>
                    <a className='footer_link' ref={refContainer} href="https://github.com/YashKumar0416" target={'_blank'}><li> <AiFillGithub /> Github</li></a>
                    <a className='footer_link' ref={refContainer} href="https://mern-todo-app-oxk6.onrender.com" target={'_blank'}><li> <RiTodoLine /> To-Do App</li></a>
                </ul>
                </Col>
            </Row>
            <Row>By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy and Content Policies. All trademarks are properties of their respective owners. 2022-2023 © Food App™ Ltd. All rights reserved.</Row>
        </Container>
    </div>
  )
}

export default Footer