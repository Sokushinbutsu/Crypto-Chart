import React, { Component } from 'react';
import Chart from './components/Chart';
import Axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bpi: {},
      time: {}
    };
  }

  async componentDidMount() {
    try {
      const res = await Axios.get('/price');

      if (res.statusText !== 'OK') {
        throw Error(res.statusText);
      }

      const { bpi, time } = res.data;

      this.setState({
        bpi,
        time
      });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return <Chart />;
  }
}

export default App;
