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

export default App;