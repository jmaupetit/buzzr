import React, { Component } from "react";
import "./App.css";
import Buzzer from "./Buzzer";
import buzzrSound from "./buzzr.mp3";
import easterEggSound from "./easter-egg.mp3";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isBuzzing: false };
    this.keyboardBuzz = this.keyboardBuzz.bind(this);
    this.gamepadBuzz = this.gamepadBuzz.bind(this);
    this.start = null;
  }

  buzz() {
    this.setState({ isBuzzing: true });
    const url =
      window.location.hash === "#easter" ? easterEggSound : buzzrSound;
    const buzzer = new Audio(url);
    buzzer.play().then(() => {
      setTimeout(() => {
        this.setState({ isBuzzing: false });
      }, 2000);
    });
  }

  keyboardBuzz(event) {
    event.stopPropagation();
    if ("Space" === event.code) {
      this.buzz();
    }
  }

  gamepadBuzz() {
    // We only consider the first detected GamePad
    var gp = navigator.getGamepads()[0];

    // Any pressed button can buzz
    if (gp.buttons.some(btn => btn.pressed)) {
      this.buzz();
    }

    // This is the game loop
    this.start = window.requestAnimationFrame(this.gamepadBuzz);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.keyboardBuzz);

    window.addEventListener("gamepadconnected", () => {
      var gamepad = navigator.getGamepads()[0];
      console.log(`Gamepad connected at index ${gamepad.index}: ${gamepad.id}`);
      this.gamepadBuzz();
    });

    window.addEventListener("gamepaddisconnected", () => {
      console.log("GamePad disconnected");
      window.cancelAnimationFrame(this.start);
    });
  }

  componentWillUnmount() {
    document.removeEventListener("keydown");
    window.removeEventListener("gamepadconnected");
    window.removeEventListener("gamepaddisconnected");
  }

  render() {
    return (
      <div className={this.state.isBuzzing ? "App App-buzzing" : "App"}>
        <Buzzer isBuzzing={this.state.isBuzzing} />
        <p>
          Hit <kbd>space</kbd> or a 🎮 to buzz!
        </p>
      </div>
    );
  }
}

export default App;
