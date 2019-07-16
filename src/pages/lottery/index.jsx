import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.scss';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animation: '',
    }
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        animation: 'animation',
      });
    }, 1000)
  }

  render() {
    const { animation } = this.state;
    return (
      <div className="index-container">
        <div id="skills">
          <div id="part1" className={`circle ${animation}`}></div>
        </div>
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
