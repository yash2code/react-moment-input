import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import moment from 'moment';
import MomentInput from './lib';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: moment()
        }
    }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">react-moment-input</h1>
        </header>
          <div style={{display: "table", margin:"0 auto"}}>
              <p className="App-intro">
                  Data picker simple
              </p>
              <MomentInput
                  format="YYYY-MM-DD HH:mm"
                  value={this.state.value}
                  options={true}
                  readOnly={false}
                  onSave={(value)=> {this.setState({value})}} />
          </div>
          <div style={{display: "table", margin:"0 auto"}}>
              <p className="App-intro">
                  Min and max date <br/>
                  2019-10-05 10:45 PM/AM
              </p>
              <MomentInput
                  max={moment("2019-10-05 22:45")}
                  min={moment()}
                  format="YYYY-MM-DD hh:mm AA"
                  translations={{HOURS:"Sati", MINUTES:"Minute",YEARS:"Godine", DATE:"Dani", TIME:"Vrijeme", MONTHS_OCTOBER:"Oktobar", DAYS_MON:"PON"}}
                  options={true}
                  readOnly={false}
                  icon={true}
                  onChange={(date)=> {}} />
          </div>
          <div style={{display: "table", margin:"0 auto"}}>
              <p className="App-intro">
                  Different days order
              </p>
              <MomentInput
                  format="YYYY-MM-DD HH:mm"
                  options={true}
                  readOnly={true}
                  daysOfWeek={['Mon','Tue','Wed','Thu','Fri','Sat','Sun']}
                  icon={true}
                  onChange={(date)=> {}} />
          </div>
          <div style={{display: "table", margin:"0 auto"}}>
              <p className="App-intro">
                  Input disabled
              </p>
              <MomentInput
                  format="YYYY-MM-DD HH:mm"
                  options={true}
                  readOnly={true}
                  icon={true}
                  onChange={(date)=> {}} />
          </div>
          <div style={{display: "table", margin:"0 auto"}}>
              <p className="App-intro">
                  Only calendar
              </p>
              <MomentInput
                  format="YYYY-MM-DD"
                  options={false}
                  readOnly={false}
                  icon={true}
                  onChange={(date)=> {}} />
          </div>
          <div style={{display: "table", margin:"0 auto"}}>
              <p className="App-intro">
                  Only time
              </p>
              <MomentInput
                  format="HH:mm:ss"
                  options={false}
                  value={this.state.value}
                  readOnly={false}
                  icon={true}
                  tab={1}
                  onChange={(date)=> (value)=> {this.setState({value})}} />
          </div>
          <div style={{display: "table", margin:"0 auto"}}>
              <p className="App-intro">
                  Year, calendar and today
              </p>
              <MomentInput
                  format="YYYY-MM-DD"
                  options={false}
                  readOnly={false}
                  today={true}
                  icon={true}
                  tab={2}
                  onChange={(date)=> {}} />
          </div>
          </div>

    );
  }
}

export default App;
