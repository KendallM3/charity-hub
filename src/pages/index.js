import React, { Component } from "react";
import Layout from "../components/Layout";
import classes from './index.module.css';

class Index extends Component {
  state = {
    donation: '',
    type: 'equal'
  }
  
  render () {

    // initialise array of days to calculate out donation schedule over
    const dayList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const donation = this.state.donation;
    const schedule = {};
    let runningTotal = 0;

    
    if (this.state.type === 'equal') {
      // equal daily donations
      const dailyDonation = (donation / dayList.length);
      dayList.forEach(day => {
        schedule[day] = Math.floor(dailyDonation * 100) / 100;
        runningTotal += Math.floor(dailyDonation * 100) / 100; 
      });

      // add any remaining money above 1p to day 10's donation
      // console.log('remainder: ', Math.floor( (donation - runningTotal) * 100) / 100);
      if ((donation - runningTotal) > 0.01) {
        schedule[dayList.length] += Math.floor( (donation - runningTotal) * 100) / 100;
      }
    } else {
      // alternating daily donations
      const dailyDonation = (donation / (dayList.length * 1.5));
      dayList.forEach(day => {
        if ( (day % 2) !== 0 ) {

          schedule[day] = Math.floor(dailyDonation * 2 * 100) / 100;
          runningTotal += Math.floor(dailyDonation * 2 * 100) / 100;
        } else {
          schedule[day] = Math.floor(dailyDonation * 100) / 100;
          runningTotal += Math.floor(dailyDonation * 100) / 100;
        }
      });

      // add any remaining money above 1p to day 10's donation
      if ( (donation - runningTotal) > 0.01) {
        schedule[dayList.length] += Math.floor( (donation - runningTotal) * 100) / 100;
      }
    }
    
    // for debugging
    // console.log('running total: ', runningTotal);
    // console.log('remainder: ', Math.floor( (donation - runningTotal) * 100) / 100);

    // iterate through schedule of days and return some JSX for each day/donation combination 
    let table = Object.keys(schedule).map(key => {
      return (
        <div style={{display: 'flex', flexDirection: 'row'}} key={key}>
          <div className={classes.LeftRow}>{key}</div> 
          <div className={classes.RightRow}>{schedule[key].toFixed(2)}</div>
        </div>
      );
    });

    return (
      <Layout>
        <h1>Welcome to the Charity Hub.</h1>
        <p>
          Please select the amount you'd like to donate, along with the daily split of how you'd like to pay this donation. 
        </p>
        <div style={{display: 'flex', flexFlow:'column wrap', width: '70%', paddingLeft: '15%'}}>
          <label className={classes.Label} htmlFor="amount">Amount to Donate (£)
          </label>
          <input className={classes.Input} id="amount" value={this.state.donation} type="number" onChange={(event) => {this.setState({donation: event.target.value});}}/>
          <hr />
          <label className={classes.Label} htmlFor="type">Donation Payment Split</label>
          <select className={classes.Input} id="type" value={this.state.type} onChange={(event) => {this.setState({type: event.target.value});}}>
            <option value="equal">Equal</option>
            <option value="alternating">More-Odd</option>
          </select>
          <hr />
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <div className={classes.Title}>DAY</div>
            <div className={classes.Title}>£</div>
          </div>
          {table}
          <hr />
          <button className={classes.Button} onClick={() => alert('How generous, thank you very much!')}>Donate!</button>
        </div>
      </Layout>
    );
  }
}

export default Index;