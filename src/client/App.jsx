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
      Axios.interceptors.response.use(response => response.data);

      const { bpi, time } = await Axios.get('/price');
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
