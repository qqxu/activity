import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

export default class Modal extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { modalVisible = false, title = '', description = null, btnName = '', onOk } = this.props || {};
    return (
      <div className={`modal${modalVisible ? ' show' : ''}`}>
        <div className="wrapper">
          <div className="close-btn" onClick={this.props.closeModal} />
          <div className="content">
            <div className="title">{title}</div>
            <div className="description">{description}</div>
            <div onClick={onOk} className="btn">{btnName}</div>
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalVisible: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.node.isRequired,
  btnName: PropTypes.string,
  onOk: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  btnName: '我知道了',
};
