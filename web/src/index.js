//--Libs--//
import reportWebVitals from './reportWebVitals';
import * as React from "react";
import { useState, useRef } from 'react';
import { render } from "react-dom";
import { Container, Row, Col, Button } from 'react-bootstrap'
import { LayeredImage } from "react-layered-image";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import App from "./App"
//--Libs end--//

//---Images---//
import logo from './static/images/web-logo-v2.1.png'
import beforeSunRise from "./static/images/01-background/BeforeSunrise.png"
import beforeSunset from "./static/images/01-background/BeforeSunset.png"
import back1 from "./static/images/02-back/AngelWings.png"
import back2 from "./static/images/02-back/DevilWings.png"
import breedBeige from "./static/images/03-breed/Beige.png"
import breedBlue from "./static/images/03-breed/Blue.png"
//---Images end--//

const imageResult = {
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  display: "flex",
  marginLeft: "10%",
  width: "40%",
  justifyContent: "left",
  alignItems: "center",
};

const selectBox = {
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: "55%",
  width: "40%",
  display: "flex",
  justifyContent: "left",
  alignItems: "center",
};

var backgroupStyle = {
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: "55%",
  width: "40%",
  display: "flex",
  justifyContent: "left",
  alignItems: "center",
  visibility:"hidden"
};

var wingStyle = {
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: "55%",
  width: "40%",
  display: "flex",
  justifyContent: "left",
  alignItems: "center",
  visibility:"hidden"
};

var breedStyle = {
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: "55%",
  width: "40%",
  display: "flex",
  justifyContent: "left",
  alignItems: "center",
  visibility:"hidden"
};

var layers = [
  beforeSunRise,
  back1,
  breedBeige
];

var layers2 = [
  beforeSunset,
  back2,
  breedBlue
];

const selectOptions = [
  'Background', 'Wings', 'Breed', 'Expression', 'Eyes'
];
const defaultOption = selectOptions[0];

//=====Functions===//
/**
const [value,setValue] = React.useState('');

const chooseOption = (event) => {
  setValue(event);
  console.log("chose value " + event);
  backgroupStyle.visibility = "hidden";
   wingStyle.visibility = "hidden";
   breedStyle.visibility = "hidden";
  const value = event.target.value;
   if (value==="Background")
   {
    backgroupStyle.visibility = "visible";
   } else{
    wingStyle.visibility = "visible";
   }

};
 */
 /** 
const chooseOption = (event: React.ChangeEvent<HTMLInputElement>) => {
  console.log("chose value " + event + (event == undefined) + (event.));
  //document.getElementById("optionValue").setValue(event);
  const value = event.target.value;
  console.log("check target value " + event);

  backgroupStyle.visibility = "hidden";
  wingStyle.visibility = "hidden";
  breedStyle.visibility = "hidden";
  
   if (value==="Background")
   {
    backgroupStyle.visibility = "visible";
   } else{
    wingStyle.visibility = "visible";
   }
};
*/

 //====Functions//

render(
  /**
  <Container>
    <div>
      <Container className='header' >
        <Row>
          <Col>
            <img src={logo} style={{ height: 20, width: 20, position: 'fixed' }} />
          </Col>
          <Col md='4' style={{ height: 20, width: 20, position: 'relative' }}>
            Unlimited PFP Generator
          </Col>
        </Row>
      </Container>
    </div>
    <div style={imageResult}>
      <LayeredImage layers={layers} />
    </div>
    <div style={selectBox}>
      <Dropdown id='optionValue' options={selectOptions} onChange={chooseOption} value={defaultOption} placeholder="Select an option" />
      <div style={backgroupStyle}></div>
      <div style={wingStyle}></div>
      <div style={breedStyle}></div>
    </div>
  </Container>,
  */
 <div>
  <App/>
 </div>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
