import React from 'react';
import PropTypes from 'prop-types';
import modalFixed from '../modalFixed/index';

import './style.scss';

const modal = ({ config }) => {
  const { title = '', description = null, btnName = '我知道了', onOk, onClose } = config;
  return (
    <div className="modal">
      <div className="close-btn" onClick={onClose} />
      <div className="content">
        <div className="title">{title}</div>
        <div className="description">{description}</div>
        <div onClick={onOk} className="btn">{btnName}</div>
      </div>
    </div>
  );
};

export default modalFixed(modal);

modal.propTypes = {
  config: PropTypes.shape({
    show: PropTypes.bool.isRequired,
    title: PropTypes.string,
    description: PropTypes.node,
    onOk: PropTypes.func,
    onClose: PropTypes.func,
    btnName: PropTypes.string,
  }).isRequired,
};

modal.defaultProps = {
  config: {
    show: false,
  },
};
