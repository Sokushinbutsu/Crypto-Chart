import React, { Component } from 'react';
import Chart from './components/Chart';
import Axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bpi: {},
      data: {}
    };
  }

  async refreshData() {
    try {
      const res = await Axios.get('/price');

      const { bpi } = res.data;

      this.setState({ bpi });
    } catch (error) {
      console.error(error);
    }
  }

  organizeData() {
    this.setState({
      data: {
        labels: Object.keys(this.state.bpi),
        datasets: [
          {
            label: `Bitcoin Price`,
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(255,0,0)',
            borderColor: 'rgba(255,0,0,0.3)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(255,0,0)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(255,0,0)',
            pointHoverBorderColor: 'rgba(255,0,0)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: Object.values(this.state.bpi)
          }
        ]
      }
    });
  }

  componentDidMount() {
    this.refreshData()
      .then(() => {
        this.organizeData();
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return (
      <>
        <Chart data={this.state.data} />
        <p>Powered By CoinDesk</p>
      </>
    );
  }
}

export default App;
