import logo from '../static/images/web-logo-v2.1.png'
import React, {useRef, useState} from 'react';
import {Container,Row, Col, Button} from 'react-bootstrap'

export default function Header(){


return(
    <div>
      <Container style={{marginTop: '24px', height:20}}>
        <Row>
          <Col>
            <img src={logo}/>  
          </Col></Row>
          </Container>
          </div>
  )
}