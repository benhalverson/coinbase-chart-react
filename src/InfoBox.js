import React, { Component } from 'react';
import moment from 'moment';
import './infobox.scss';
class Infobox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPrice: null,
      monthChangeD: null,
      monthChangeP: null,
      updatedAt: null
    }
  }
  componentDidMount() {
    this.getData = () => {
      const { data } = this.props;
      const url = 'https://api.coindesk.com/v1/bpi/currentprice.json';

      fetch(url)
        .then(res => res.json())
        .then((coinData) => {
          const price = coinData.bpi.USD.rate_float;
          const change = price - data[0].y;
          const changeP = (price - data[0].y) / data[0].y * 100;
          this.setState({
            currentPrice: coinData.bpi.USD.rate_float,
            monthChangeD: change.toLocaleString('us-EN', { style: 'currency', currency: 'USD'}),
            monthChangeP: changeP.toFixed(2) + '%',
            updatedAt: coinData.time.updated
          })
        })
        .catch(e => console.error(`Error ${e}`));
    }
    this.getData();
    this.refresh = setInterval(() => this.getData(), 90000);
  }
  render() {
    return(<div id="data-container">
      { this.state.currentPrice ? 
        <div id='left' className='box'>
          <div className='heading'>{this.state.currentPrice.toLocaleString('us-EN', { style: 'currency', currency: 'USD'})}</div>
          <div className='subtext'>{'Updated ' + moment(this.state.updatedAt).fromNow()}</div>
        </div> : null }
      { this.state.monthChangeD ? 
      <div id='middle' className='box'>
        <div className='heading'>{this.state.monthChangeD}</div>
        <div className='subtext'>Changed since last Month</div>
      </div> : null }
      { this.state.monthChangeP ? 
      <div id='right' className='box'>
        <div className='heading'>{this.state.monthChangeP}</div>
        <div className='subtext'>Changed since last Month</div>
      </div> : null }

    </div>)
  }
}

export default Infobox;