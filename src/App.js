import React, {
  Component
} from 'react';
import './App.css';
import moment from 'moment';
import LineChart from './LineChart';
import ToolTip from './ToolTip';
import InfoBox from './InfoBox';
import SupportedCurrencies from './supported.currency.json';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchingData: true,
      selectedCurrency: 'USD',
      supportedCurrencies: [
        {"currency":"USD","country":"United States Dollar"},
      ],
      data: null,
      hover: null,
      activePoint: null
    }

    this.changeCurrency = this.changeCurrency.bind(this);
  }

  handleChartHover(hover, activePoint) {
    this.setState({
      hover,
      activePoint
    });
  }
  componentDidMount() {

    const getCurrencyList = async () => {
      return Promise.resolve(SupportedCurrencies);

      // TODO
      // following currency list api fails with cross origin issue.
      // asked coinDesk to fix it. once they fixed need to remove mock country list json
      // const url = "https://api.coindesk.com/v1/bpi/supported-currencies.json";
      // try {
      //   const response = await fetch(url, {
      //     cors: 'no-cors'
      //   });
      //   let currencyList = await response.text();
      //   console.log('Fetched currency list ', currencyList)
      //   return currencyList;

      //   return Promise.resolve(SupportedCurrencies);
      // }
      // catch (error) {
      //   console.error('Failed to fetch currency list');
      // }
    }

    Promise.all([this.fetchCoinData(), getCurrencyList()])
      .then(responses => {
        console.log('fetched responses asdfasdf ', responses)
        this.setState({
          data: responses[0],
          supportedCurrencies: responses[1],
          fetchingData: false
        })
      })
      .catch(err => {
        console.error('Failed to fetch data', err);
      });
  }

  async fetchCoinData(currency = 'USD') {
    const url = `https://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}`;
      try {
      const res = await fetch(url);
      const coinData = await res.json();
      const sortedData = [];
      let count = 0;
      for (let date in coinData.bpi) {
        sortedData.push({
          d: moment(date).format('MMM DD'),
          p: coinData.bpi[date].toLocaleString('us-EN', {
            style: 'currency',
            currency: currency
          }),
          x: count,
          y: coinData.bpi[date]
        });
        count++;
      }
      return sortedData;
    }
    catch (e) {
      return console.error(`Error ${e}`);
    }
  }

  async changeCurrency(currency) {
    console.log('selected currency ', currency);
    try {
      let coinData = await this.fetchCoinData(currency);
      this.setState({
        data: coinData,
        selectedCurrency: currency
      })
    }catch(error) {
      console.error('Failed to get currency data for currency', currency, error);
    }
  }

  render() {
    return ( 
    <div className = "container">
      <div className="row">
        <div className="infobox">
          { !this.state.fetchingData ?
          <InfoBox currency={this.state.selectedCurrency} data={this.state.data} />
          : null  }
        </div>
      </div>
      <div className="row">
        <div className="currencyBox">
          <label>Change currency</label>
          <select name="currency"
            onChange={(evt) => this.changeCurrency(evt.target.value)}
            value={this.state.selectedCurrency}>
            {
              this.state.supportedCurrencies.map(currency => (
                <option key={currency.currency} className="currency">{currency.currency}</option>                ))
            }
          </select>
        </div>
      </div>
      <div className='row'>
        <div className="popup">
            {this.state.hover ? <ToolTip hover={this.state.hover} activePoint={this.state.activePoint} /> : null}
        </div>      
      </div>
      <div className='row'>
        <div className="chart">
          { !this.state.fetchingData ? 
            <LineChart
              currency={this.state.selectedCurrency}
              data={this.state.data}
              onChartHover={(a, b) => this.handleChartHover(a,b)}  /> : null
          }
        </div>
      </div>

     </div>);
  }
}

export default App;
