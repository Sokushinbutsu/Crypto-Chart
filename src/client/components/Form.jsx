import React from 'react';
import { PropTypes } from 'prop-types';

const Form = (props) => {
  const {
    handleChangeStart, handleChangeEnd, handleSubmit, start, end,
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      Date (YYYY-MM-DD):
      <input type="text" value={start} onChange={handleChangeStart} />
      <input type="text" value={end} onChange={handleChangeEnd} />
      <input type="submit" value="Submit" />
    </form>
  );
};

Form.propTypes = {
  handleChangeStart: PropTypes.func.isRequired,
  handleChangeEnd: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
};

export default Form;
