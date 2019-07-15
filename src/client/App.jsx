import React, { Component } from 'react';
import Axios from 'axios';
import Chart from './components/Chart';
import Form from './components/Form';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bpi: {},
      data: {},
      start: '',
      end: '',
    };

    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  async refreshData() {
    try {
      const { start, end } = this.state;
      if (start !== '' && end !== '') {
        const res = await Axios.post('/price', {
          start, end,
        });
        const { bpi } = res.data;

        this.setState({ bpi });
        this.organizeData();
      }
    } catch (error) {
      Axios.post('/error', {
        error,
      }).catch((err) => {
        console.error(err);
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

  handleChangeStart(event) {
    this.setState({ start: event.target.value });
  }

  handleChangeEnd(event) {
    this.setState({ end: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.refreshData();
  }

  render() {
    const { data, start, end } = this.state;
    return (
      <>
        <Chart data={data} />
        <p>Powered By CoinDesk and Heroku</p>
        <Form
          handleSubmit={this.handleSubmit}
          handleChangeStart={this.handleChangeStart}
          handleChangeEnd={this.handleChangeEnd}
          start={start}
          end={end}
        />
      </>
    );
  }
}

export default App;
