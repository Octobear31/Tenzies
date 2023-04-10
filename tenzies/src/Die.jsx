// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";

export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "orange" : "white",
  };
  const win = {
    backgroundColor: "#59E391",
  };

  return (
    <div
      className="die-face"
      style={props.tenzies ? win : styles}
      onClick={props.holdDice}
    >
      <h2>{props.value}</h2>
    </div>
  );
}
