//--Libs--//
import reportWebVitals from './reportWebVitals';
import * as React from "react";
import { render } from "react-dom";
import App from "./App"
//--Libs end--//

//---Images---//
//---Images end--//




render(
 
 <div>
  <App/>
 </div>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
