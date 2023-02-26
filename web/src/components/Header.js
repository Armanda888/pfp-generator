import logo from '../static/images/web-logo-v2.1.png'
import React, {useRef, useState} from 'react';
import {Container,Row, Col, Button} from 'react-bootstrap'
import '../static/styles/style.css';

export default function Header(){

return(
    <div>
      <Container className='header' style={{height:20, width:20, position:'fixed'}}>
        <Row>
          <Col>
            <img src={logo}/>  
          </Col>
          <Col md='4' style={{display: 'inline', position:'fixed'}}> 
          Unlimited PFP Generator
          </Col>
          </Row>
          </Container>
      </div>
  );
}