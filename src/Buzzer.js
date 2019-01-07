import React from "react";
import "./Buzzer.css";
import cog from "./icon-cog.svg";

const Buzzer = props => (
  <div className={props.isBuzzing ? "Buzzer-pressed" : "Buzzer"}>
    <img src={cog} alt="Cog" />
  </div>
);

export default Buzzer;
