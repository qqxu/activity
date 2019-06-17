import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const Modal = ({ config }) => {
  const { show, title = '', description = null, btnName = '我知道了', onOk, onClose } = config;
  return (
    <div className={`modal${show ? ' show' : ''}`}>
      <div className="wrapper">
        <div className="close-btn" onClick={onClose} />
        <div className="content">
          <div className="title">{title}</div>
          <div className="description">{description}</div>
          <div onClick={onOk} className="btn">{btnName}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  config: PropTypes.shape({
    show: PropTypes.bool.isRequired,
    title: PropTypes.string,
    description: PropTypes.node,
    onOk: PropTypes.func,
    onClose: PropTypes.func,
    btnName: PropTypes.string,
  }).isRequired,
};

Modal.defaultProps = {
  config: {
    show: false,
  },
};
