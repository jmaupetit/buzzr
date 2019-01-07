import React, { Component } from "react";
import "./App.css";
import Buzzer from "./Buzzer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isBuzzing: false };
    this.buzz = this.buzz.bind(this);
  }

  // Inspired from:
  // https://github.com/facebook/react/issues/285#issuecomment-373931454
  buzz(event) {
    event.stopPropagation();
    if ("Space" === event.code) {
      this.setState({ isBuzzing: true });
      const url =
        Math.floor(Math.random() * Math.floor(10)) % 3 === 0
          ? "https://www.myinstants.com/media/sounds/wrong-answer-sound-effect.mp3"
          : "https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-21014/zapsplat_cartoon_fart_037_21629.mp3";
      const buzzer = new Audio(url);
      buzzer.play().then(() => {
        setTimeout(() => {
          this.setState({ isBuzzing: false });
        }, 2000);
      });
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.buzz);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.buzz);
  }

  render() {
    return (
      <div className={this.state.isBuzzing ? "App App-buzzing" : "App"}>
        <Buzzer isBuzzing={this.state.isBuzzing} />
        <p>
          Hit <kbd>space</kbd> to buzz!
        </p>
      </div>
    );
  }
}

export default App;
