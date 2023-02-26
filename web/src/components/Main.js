import * as React from "react";
import { render } from "react-dom";
import Customize from "./Customize"
import ImageGallery from 'react-image-gallery';
import { LayeredImage } from "react-layered-image";
import { Container } from "react-bootstrap";
import beforeSunRise from "../static/images/01-background/BeforeSunrise.png"
import beforeSunset from "../static/images/01-background/BeforeSunset.png"
import back1 from "../static/images/02-back/AngelWings.png"
import back2 from "../static/images/02-back/DevilWings.png"
import breedBeige from "../static/images/03-breed/Beige.png"
import breedBlue from "../static/images/03-breed/Blue.png"

const imageMap = new Map();

const layer1 = [beforeSunRise, beforeSunset];

const layers = [
    beforeSunRise,
    back1,
    breedBeige
  ];
const style = {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

imageMap.set("layer1", layer1);

export default function MainBody(){
    
    return (
        <section className='app' >
            <img src={back1} style={{"margin-top":"10%",width:"40px",height:"40px"}}/>
            <div style={style}>
    <LayeredImage layers={layers} style={{ width: 400 }} />
  </div>
        </section>
      );  
}