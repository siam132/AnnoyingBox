import React from "react";
import click1 from "./assets/click1.wav";
import click2 from "./assets/click2.wav";
import air_horn from "./assets/Air_horn.wav";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      count: 0,
      bpm: 100,
      beatsPerMeasure: 4,
    };
    this.click1 = new Audio(click1);
    this.click2 = new Audio(click2);
    this.horn = new Audio(air_horn);
  }

  handleBpmChange = (event) => {
    const bpm = event.target.value;
    if (this.state.playing) {
      clearInterval(this.timer);
      this.timer = setInterval(this.playClick, (60 / bpm) * 1000);

      this.setState({
        count: 0,
        bpm,
      });
    } else {
      this.setState({ bpm });
    }
  };

  startStop = () => {
    if (this.state.playing) {
      clearInterval(this.timer);
      this.setState({
        playing: false,
      });
    } else {
      this.timer = setInterval(this.playClick, (60 / this.state.bpm) * 1000);
      this.setState(
        {
          count: 0,
          playing: true,
        },
        this.playClick
      );
    }
  };

  playClick = () => {
    const { count, beatsPerMeasure } = this.state;

    // The first beat will have a different sound than the others
    if (count % beatsPerMeasure === 0) {
      this.click2.play();
    } else {
      this.click1.play();
      this.horn.play();
    }

    // Keep track of which beat we're on
    this.setState((state) => ({
      count: (state.count + 1) % state.beatsPerMeasure,
    }));
  };

  handleBeatsPerMeasure = (event) => {
    const beatsPerMeasure = event.target.value;
    this.setState({playing:false})
    console.log(beatsPerMeasure);
    this.setState({ beatsPerMeasure,playing:true });
  };


  render() {
    return (
      <div className="App-header">
        <div className="metronome">
          <div className="bpm-slider">
            <div>{this.state.bpm} BPM</div>
            <input
              type="range"
              min="60"
              max="500"
              value={this.state.bpm}
              onChange={this.handleBpmChange}
            />
          </div>
          <button className="metronome" onClick={this.startStop}>
            {this.state.playing ? "Stop" : "Start"}
          </button>
          <input
            className="tempo-field"
            value={this.state.beatsPerMeasure}
            onChange={this.handleBeatsPerMeasure}
            placeholder="Enter Tempo"
            type="number"
          ></input>
        </div>
        <p>Beats count: {this.state.count}</p>
      </div>
    );
  }
}

export default App;
