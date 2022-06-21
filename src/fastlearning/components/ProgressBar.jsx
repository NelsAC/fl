import { useState } from "react";
import "./progressBar.css";

export const ProgressBar = ({ correctComments = 2 }) => {

  return (
    <>
      <div className="progress-bar">
      <div 
        role="progressbar" 
        aria-valuenow="65" 
        aria-valuemin="0" 
        aria-valuemax="100" 
        // si son 20 preguntas para conseguir el siguiente nivel, entonces cada pregunta será el 5%
        // su el usuario tiene 3 preguntas marcadas como correctas, entonces el porcentaje será 15%
        style={{ "--value": correctComments * 5 }}
        // style="--value:65"
        >
      </div>
          <span className="progress__bar--description">Para el siguiente nivel</span>
      </div>
    </>
  );
};
