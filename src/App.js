import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import moment from 'moment';
import MomentInput from './lib';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">react-moment-input</h1>
        </header>
        <p className="App-intro">
          Data picker
        </p>
          <MomentInput max={moment().add(5,'days')} min={moment()} format="YYYY-MM-DD HH:mm" options={true} readOnly={false} icon={false} onChange={(date)=> {console.log(date)}}>
          </MomentInput>
      </div>
    );
  }
}

export default App;
