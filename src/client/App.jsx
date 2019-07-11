import React, { Component } from 'react';
import Axios from 'axios';
import Chart from './components/Chart';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bpi: {},
      data: {},
    };
  }

  componentDidMount() {
    this.refreshData()
      .then(() => {
        this.organizeData();
      })
      .catch((error) => {
        throw error;
      });
  }

  async refreshData() {
    try {
      const res = await Axios.get('/price');

      const { bpi } = res.data;

      this.setState({ bpi });
    } catch (error) {
      Axios.post('/error', {
        error,
      });
    }
  }

  organizeData() {
    this.setState(state => ({
      data: {
        labels: Object.keys(state.bpi),
        datasets: [
          {
            label: 'Bitcoin Price',
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
            data: Object.values(state.bpi),
          },
        ],
      },
    }));
  }

  render() {
    const { data } = this.state;
    return (
      <>
        <Chart data={data} />
        <p>Powered By CoinDesk</p>
      </>
    );
  }
}

export default App;
