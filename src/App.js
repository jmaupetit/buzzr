import React, { Component } from "react";
import "./App.css";
import Buzzer from "./Buzzer";
import buzzrSound from "./buzzr.mp3";
import easterEggSound from "./easter-egg.mp3";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isBuzzing: false, team: null };
    this.start = null;
  }

  buzz = (team) => {
    this.setState({ isBuzzing: true, team: team });
    const url = window.location.hash === "#easter"
      ? easterEggSound
      : buzzrSound;
    const buzzer = new Audio(url);
    buzzer.play().then(() => {
      setTimeout(() => {
        this.setState({ isBuzzing: false });
      }, 1000);
    });
  };

  keyboardBuzz = (event) => {
    event.stopPropagation();
    if ("Space" === event.code) {
      this.buzz();
    }
  };

  gamepadBuzz = (gamepad) => {
    // Any pressed button can buzz but only if we are not already buzzing
    if (gamepad.buttons.some((btn) => btn.pressed) && !this.state.isBuzzing) {
      this.buzz(gamepad.index);
    }

    // This is the game loop
    this.start = window.requestAnimationFrame(() => this.gamepadBuzz(gamepad));
  };

  componentDidMount = () => {
    document.addEventListener("keydown", this.keyboardBuzz);

    window.addEventListener("gamepadconnected", (event) => {
      const gamepad = event.gamepad;
      console.log("Gamepad connected", gamepad);
      this.gamepadBuzz(gamepad);
    });

    window.addEventListener("gamepaddisconnected", () => {
      console.log("GamePad disconnected");
      window.cancelAnimationFrame(this.start);
    });
  };

  componentWillUnmount = () => {
    document.removeEventListener("keydown");
    window.removeEventListener("gamepadconnected");
    window.removeEventListener("gamepaddisconnected");
  };

  render = () => {
    return (
      <div className={this.state.isBuzzing ? "App App-buzzing" : "App"}>
        <Buzzer isBuzzing={this.state.isBuzzing} team={this.state.team} />
        <p>
          Hit <kbd>space</kbd> or a 🎮 to buzz!
        </p>
      </div>
    );
  };
}

export default App;
