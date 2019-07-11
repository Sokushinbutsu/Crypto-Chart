import React from 'react';
import { Line } from 'react-chartjs-2';
import { PropTypes } from 'prop-types';

const Chart = (props) => {
  const { data } = props;
  return <Line data={data} />;
};

Chart.propTypes = {
  data: PropTypes.objectOf(Object),
};

Chart.defaultProps = {
  data: {},
};

export default Chart;
