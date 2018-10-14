import React, {
  Component
} from 'react';
import './App.css';
import moment from 'moment';
import LineChart from './LineChart';
import ToolTip from './ToolTip';
import InfoBox from './InfoBox';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchingData: true,
      data: null,
      hover: null,
      activePoint: null
    }
  }

  handleChartHover(hover, activePoint) {
    this.setState({
      hover,
      activePoint
    });
  }
  componentDidMount() {
    const getData = () => {
      const url = 'https://api.coindesk.com/v1/bpi/historical/close.json';
      debugger;
      fetch(url)
        .then((res) => res.json())
        .then((coinData) => {
          const sortedData = [];
          let count = 0;
          for (let date in coinData.bpi) {
            sortedData.push({
              d: moment(date).format('MMM DD'),
              p: coinData.bpi[date].toLocaleString('us-EN', {
                style: 'currency',
                currency: 'USD'
              }),
              x: count,
              y: coinData.bpi[date]
            });
            count++;
          }
          this.setState({
            data: sortedData,
            fetchingData: false
          })
        })
        .catch(e => console.error(`Error ${e}`));
    }
    getData();
  }
  render() {
    return ( 
    <div className = "container">
      <div className="row">
        <div className="infobox">
          { !this.state.fetchingData ?
          <InfoBox data={this.state.data} />
          : null  }
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
            <LineChart data={this.state.data} onChartHover={(a, b) => this.handleChartHover(a,b)}  /> : null
          } 
        </div>
      </div>

     </div>);
  }
}

export default App;
