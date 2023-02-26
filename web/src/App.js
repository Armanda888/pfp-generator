import React, { useRef, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap'
import MainBody from "./components/Main";
import Header from "./components/Header";
import { LayeredImage } from "react-layered-image";
import 'react-dropdown/style.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import 'bootstrap/dist/css/bootstrap.min.css';

//---Images---//
import logo from './static/images/web-logo-v2.1.png'
import beforeSunRise from "./static/images/01-background/BeforeSunrise.png"
import beforeSunset from "./static/images/01-background/BeforeSunset.png"
import back1 from "./static/images/02-back/AngelWings.png"
import back2 from "./static/images/02-back/DevilWings.png"
import breedBeige from "./static/images/03-breed/Beige.png"
import breedBlue from "./static/images/03-breed/Blue.png"
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
//---Images end--//

export default function App() {
  const [value, setValue] = React.useState('');

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
    alignRight: true,
    justifyContent: "left",
    alignItems: "center",
  };

  const selectWidge = {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: "40px",
    height: "40px",
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
    marginTop: "60px",
    display: "flex",
    justifyContent: "left",
    alignItems: "center",
    visibility: "hidden"
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
    visibility: "hidden"
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
    visibility: "hidden"
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

  /**
   * <Dropdown id='optionValue' options={selectOptions} onChange={chooseOption} value={defaultOption} placeholder="Select an option" /> 
   * 
   */
  const selectOptions = [
    'Background', 'Wings', 'Breed', 'Expression', 'Eyes'
  ];
  const defaultOption = selectOptions[0];

  const handleSelect = (value) => {
    console.log(value);
    document.getElementById("backgroupStyle").style.visibility = "hidden";
    document.getElementById("wingStyle").style.visibility = "hidden";
    document.getElementById("breedStyle").style.visibility = "hidden";
    if (value === "Background") {
      console.log("it'sbackgrounmd");
      document.getElementById("backgroupStyle").style.visibility = "visible";
      //this.backgroupStyle.visibility = "visible";
    } else if (value === "Wing") {
      console.log("it' wing");
      document.getElementById("wingStyle").style.visibility = "visible";
      //this.wingStyle.visibility = "visible";
    } else {
      console.log("it'breed");
      document.getElementById("breedStyle").style.visibility = "visible";
    }
    setValue(value);
  }

  const chooseOption = (event) => {
    //React.useState();
    console.log("chose value " + event.currentTarget);
    this.backgroupStyle.visibility = "hidden";
    this.wingStyle.visibility = "hidden";
    breedStyle.visibility = "hidden";
    const value = event.target.value;
    if (value === "Background") {
      backgroupStyle.visibility = "visible";
    } else {
      wingStyle.visibility = "visible";
    }

  };
  return (
    <Container>
      <div>
        <Container className='header' >
          <Row>
            <Col md="4">
              <img src={logo} style={{ height: 60, width: 60, position: 'fixed' }} />
            </Col>
            <Col md='6' style={{ height: 20, width: 100, position: 'relative' }}>
              Unlimited PFP Generator
            </Col>
          </Row>
        </Container>
      </div>
      <div class="row">
        <div style={imageResult}>
          <LayeredImage layers={layers} />
        </div>

        <div style={selectBox}>
          <DropdownButton
            alignRight
            title="Select Options"
            id="optionSelect"
            style={{ "color": "white" }}
            onSelect={handleSelect}>
            <Dropdown.Item eventKey="Background">Background</Dropdown.Item>
            <Dropdown.Item eventKey="Wing">Wing</Dropdown.Item>
            <Dropdown.Item eventKey="Breed">Breed</Dropdown.Item>
          </DropdownButton>
        </div>
        <div id="backgroupStyle">
          <div class="row" style={{ "paddingTop": "20px", "marginTop": "20px" }}>
            <div class="column" style={{ "float": "left", padding: "5px", width: "40px" }}>
              <img src={beforeSunRise} style={{ width: "40px" }} />
            </div>
            <div class="column" style={{ "float": "left", padding: "5px", paddingLeft: "10px", width: "40px" }}>
              <img src={beforeSunset} style={{ width: "40px" }} />
            </div>
          </div>
        </div>
        <div style={wingStyle} id="wingStyle">
          <img src={back1} />
        </div>
        <div style={breedStyle} id="breedStyle">
          <img src={breedBeige} />
        </div>
      </div>

    </Container>
  );
}