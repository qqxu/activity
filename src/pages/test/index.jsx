import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.scss';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 3333,
    }
  }

  render() {
    return (
      <div className="index-container">
        {this.state.index}
      </div>
    );
  }
}


index.propTypes = {
  index: PropTypes.string,
};

index.defaultProps = {
  index: '',
};
