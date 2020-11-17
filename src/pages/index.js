import React, { Component } from "react"
import Layout from "../components/layout"

import classes from './index.module.css';


class Index extends Component {
  state = {
    amount: 0,
    type: 'equal'
  }

  
  render () {

    const dayList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const amount = this.state.amount;
    const schedule = {};

    
    // equal donation amount per day
    if (this.state.type === 'equal') {
      const dailyAmount = (amount / dayList.length);
      let x = 0;
      dayList.forEach(day => {
        schedule[day] = Math.floor(dailyAmount * 100) / 100;
        x = x + Math.floor(dailyAmount * 100) / 100; 
      });

      console.log(x);
      // add any remaining money above 1p to day 10's donation
      console.log('remainder: ', Math.floor( (amount-x) * 100) / 100);
      if ((amount - x) > 0.01) {
        schedule[dayList.length] += Math.floor( (amount-x) * 100) / 100;
      }
    } 

    // alternating donation amount per day
    else {
      const dailyAmount = (amount / (dayList.length * 1.5));
      let x = 0;
      dayList.forEach(day => {
        if ( (day % 2) != 0 ) {

          schedule[day] = Math.round(dailyAmount * 2 * 100) / 100;
          x = x + Math.floor(dailyAmount * 2 * 100) / 100;
        } else {
          schedule[day] = Math.round(dailyAmount * 100) / 100;
          x = x + Math.floor(dailyAmount * 100) / 100;
        }
      });
      console.log(x);
      console.log('remainder: ', Math.floor( (amount-x) * 100) / 100);
      if ( (amount - x) > 0.01) {
        schedule[dayList.length] += Math.floor( (amount-x) * 100) / 100;
      }
    }

    
    

    let table = Object.keys(schedule).map(key => {
      return (
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <div className={classes.LeftRow}>{key}</div> 
          <div className={classes.RightRow}>{schedule[key].toFixed(2)}</div>
        </div>
      );
    });

    // console.log(schedule);
    // console.log(schedule[dayList.length]);

    return (
      <Layout>
        <h1>Welcome to the Shamaazi Charity Donation Hub!</h1>
        <p>
          Please select the amount you'd like to donate, along with the breakdown type in which you'd like that donation to be paid. 
        </p>
        <div style={{display: 'flex', flexFlow:'column wrap', width: '70%', paddingLeft: '15%'}}>
          <label>Type of Donation</label>
          <select value={this.state.type} onChange={(event) => {this.setState({type: event.target.value});}}>
            <option value="equal">Equal</option>
            <option value="alternating">More-Odd</option>
          </select>
          <hr />
          <label>Amount to Donate</label>
          <input 
          value={this.state.amount} 
          type="number" 
          laceholder="e.g. £5" 
          onChange={(event) => {this.setState({amount: event.target.value});}}
          />
          <hr />
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <div className={classes.Title}>DAY</div>
            <div className={classes.Title}>£</div>
          </div>
          {table}



        </div>
      </Layout>
    );
  }
  
  
}

export default Index;