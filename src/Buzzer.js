import React from "react";
import "./Buzzer.css";
import cog from "./icon-cog.svg";

const Buzzer = props => (
  <div className="Buzzer">
    <img src={cog} alt="Cog" className={props.isBuzzing ? "pressed" : ""} />
  </div>
);

export default Buzzer;
