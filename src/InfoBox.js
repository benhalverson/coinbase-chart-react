import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './infobox.css';
class Infobox extends Component {

  static propsTypes = {
    currency: PropTypes.string
  }

  static defaultProps = {
    currency: 'USD'
  }

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
      const url = `https://api.coindesk.com/v1/bpi/currentprice/${this.props.currency}.json`;

      fetch(url)
        .then(res => res.json())
        .then((coinData) => {
          // console.log(`coindata`, coinData.bpi);
          const price = coinData.bpi[this.props.currency].rate_float;
          // console.log('price', price);
          // console.log('data', data[0]);
          const change = price - data[0].y;
          // console.log('change', change);
          const changeP = (price - data[0].y) / data[0].y * 100;
          // console.log('changed price', changeP);
          this.setState({
            currentPrice: coinData.bpi[this.props.currency].rate_float,
            monthChangeD: change,
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
          <div className='heading'>{this.state.currentPrice.toLocaleString('us-EN', { style: 'currency', currency: this.props.currency})}</div>
          <div className='subtext'>{'Updated ' + moment(this.state.updatedAt).fromNow()}</div>
        </div> : null }
      { this.state.monthChangeD ? 
      <div id='middle' className='box'>
        <div className='heading'>{this.state.monthChangeD.toLocaleString('us-EN', { style: 'currency', currency: this.props.currency})}</div>
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