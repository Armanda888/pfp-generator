<<<<<<< Updated upstream
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
=======
import './App.css';
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function App() {
  const [accountsStatus, setAccountsStatus] = useState('Not Started.');
  const [aliceAddress, setAliceAddress] = useState('');
  const [bobAddress, setBobAddress] = useState('');
  const [carlaAddress, setCarlaAddress] = useState('');

    // useEffect(() => {
  //    fetch('http://127.0.0.1:5000/accounts')
  //       .then((response) => response.json()
  //       .then((data) => {
  //          console.log(data);
  //          setPosts(data);
  //       })
  //       .catch((err) => {
  //          console.log(err.message);
  //       }));
  // }, []);

var background = "";
var breed = "";
var tshirt = "";

  function createAccounts() {
      console.log("createAccounts");
      setAccountsStatus("Creating Accounts");
      fetch('http://127.0.0.1:5000/auction/start')
          .then((response) => response.json()
              .then((data) => {
                    console.log(data);
                    setAccountsStatus("Accounts created");
                    setAliceAddress(data.seller);
                    setBobAddress(data.creator);
                    setCarlaAddress(data.bidder);
              })
              .catch((err) => {
                  console.log(err.message);
              }));
  }

  function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }

  function loadImage(src) {
    var img = new Image();
    img.src = src;
    return img;
  }

  function createPicture(type, value) {
    if (type === "background") {
      background = value;
    } else if (type === "breed") {
      breed = value;
    } else if (type === "tshirt") {
      tshirt = value;
    }

    var canvas = document.getElementById("gameCanvas");
    var myVar = canvas.getContext("2d");

    if (background) {
      var img = loadImage(background);
      myVar.drawImage(img, 0, 0);
    }

    if (breed) {
      var img = loadImage(breed);
      myVar.drawImage(img, 0, 0);
    }

    if (tshirt) {
      var img = loadImage(tshirt);
      myVar.drawImage(img, 0, 0);
    }
  }

  function mintPicture() {
    var canvas = document.getElementById("gameCanvas");

    // var image = canvas.toDataURL("image/png"); 
    var link = document.createElement('a');
    link.download = "test.png";
    link.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");;
    link.click();

    var xhr = new XMLHttpRequest();
    var url = "http://127.0.0.1:5000/post";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "text/plain");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            console.log(json.transaction_id);
        }
    };
    var data = JSON.stringify({"url": "linkabc"});
    xhr.send(data);
  }

  return (
    <>
      <h1>Demo</h1>

        <Grid container spacing={2}>
            <Grid item xs={2}>
            </Grid>
            <Grid item xs={8}>
            <canvas id="gameCanvas" width="1000" height="1300"></canvas>
            </Grid>
            <Grid item xs={2}>
            </Grid>

        </Grid>

        <button onClick={() => mintPicture()}>Create</button>

        <div class="tab">
          <button class="tablinks" onClick={event => openCity(event, 'Background')}>Background</button>
          <button class="tablinks" onClick={event => openCity(event, 'Breed')}>Breed</button>
          <button class="tablinks" onClick={event => openCity(event, 'Tshirt')}>Eyes</button>
        </div>

        <div id="Background" class="tabcontent">
          <label>
            <input type="radio" name="test" value="small" onClick={() => createPicture("background", "images/01-background/Blue.png")}/>
            <img src="images/01-background/Blue.png" alt="Option 1" width="200" height="200"/>
          </label>
          <label>
            <input type="radio" name="test" value="small" onClick={() => createPicture("background", "images/01-background/BloodMoon.png")}/>
            <img src="images/01-background/BloodMoon.png" alt="Option 1" width="200" height="200"/>
          </label>
          <label>
            <input type="radio" name="test" value="small" onClick={() => createPicture("background", "images/01-background/Grey.png")}/>
            <img src="images/01-background/Grey.png" alt="Option 1" width="200" height="200"/>
          </label>
        </div>

        <div id="Breed" class="tabcontent">
          <label>
            <input type="radio" name="test" value="small" onClick={() => createPicture("breed", "images/03-breed/Beige.png")}/>
            <img src="images/03-breed/Beige.png" alt="Option 1" width="200" height="200"/>
          </label>
          <label>
            <input type="radio" name="test" value="small" onClick={() => createPicture("breed", "images/03-breed/Cream.png")}/>
            <img src="images/03-breed/Cream.png" alt="Option 1" width="200" height="200"/>
          </label>
          <label>
            <input type="radio" name="test" value="small" onClick={() => createPicture("breed", "images/03-breed/White.png")}/>
            <img src="images/03-breed/White.png" alt="Option 1" width="200" height="200"/>
          </label>
        </div>

        <div id="Tshirt" class="tabcontent">
          <label>
            <input type="radio" name="test" value="small" onClick={() => createPicture("tshirt", "images/05-eyes/Ruby.png")}/>
            <img src="images/05-eyes/Ruby.png" alt="Option 1" width="200" height="200"/>
          </label>
          <label>
            <input type="radio" name="test" value="small" onClick={() => createPicture("tshirt", "images/05-eyes/Sapphire.png")}/>
            <img src="images/05-eyes/Sapphire.png" alt="Option 1" width="200" height="200"/>
          </label>
          <label>
            <input type="radio" name="test" value="small" onClick={() => createPicture("tshirt", "images/05-eyes/FireOpal.png")}/>
            <img src="images/05-eyes/FireOpal.png" alt="Option 1" width="200" height="200"/>
          </label>
        </div>
    </>
  );
}
>>>>>>> Stashed changes

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