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
          <table style={{margin:"0 auto"}}>
              <tbody>
              <tr>
                  <td>Data picker simple: </td>
                  <td><MomentInput
                      inputStyle={{width:"201px"}}
                      format="YYYY-MM-DD HH:mm"
                      defaultValue={this.state.value}
                      defaultTime="03:00"
                      options={true}
                      readOnly={false}
                      onSave={(value)=> {this.setState({value})}} /></td>
              </tr>
              <tr>
                  <td> Min and max date: </td>
                  <td><MomentInput
                      max={moment("2019-10-05 22:45")}
                      min={moment()}
                      format="YYYY-MM-DD hh:mm AA"
                      translations={{HOURS:"Sati", MINUTES:"Minute",YEARS:"Godine", DATE:"Dani", TIME:"Vrijeme", MONTHS_OCTOBER:"Oktobar", DAYS_MON:"PON"}}
                      options={true}
                      readOnly={false}
                      icon={true}
                      onChange={(date)=> {}} /></td>
              </tr>
              <tr>
                  <td> Different days order: </td>
                  <td><MomentInput
                      format="YYYY-MM-DD HH:mm"
                      options={true}
                      readOnly={true}
                      daysOfWeek={['Mon','Tue','Wed','Thu','Fri','Sat','Sun']}
                      icon={true}
                      onChange={(date)=> {}} /></td>
              </tr>
              <tr>
                  <td>Input disabled: </td>
                  <td><MomentInput
                      format="YYYY-MM-DD HH:mm"
                      options={true}
                      readOnly={true}
                      icon={true}
                      onChange={(date)=> {}} /></td>
              </tr>
              <tr>
                  <td>Month select disabled: </td>
                  <td><MomentInput
                      format="YYYY-MM-DD"
                      options={false}
                      readOnly={false}
                      monthSelect={false}
                      icon={true}
                      onChange={(date)=> {}} /></td>
              </tr>
              <tr>
                  <td>Only time: </td>
                  <td><MomentInput
                      format="HH:mm:ss"
                      options={false}
                      value={this.state.value}
                      readOnly={false}
                      icon={true}
                      tab={1}
                      onChange={(date)=> (value)=> {this.setState({value})}} /></td>
              </tr>
              <tr>
                  <td>Year, calendar and today: </td>
                  <td><MomentInput
                      format="YYYY-MM-DD"
                      options={false}
                      readOnly={false}
                      today={true}
                      icon={true}
                      tab={2}
                      onChange={(date)=> {}} /></td>
              </tr>
              <tr>
                  <td>Open date picker on input click </td>
                  <td><MomentInput
                      format="YYYY-MM-DD"
                      options={false}
                      readOnly={false}
                      today={true}
                      enableInputClick
                      icon={true}
                      tab={2}
                      onChange={(date)=> {}} /></td>
              </tr>
              </tbody>
          </table>
          </div>

    );
  }
}

export default App;
