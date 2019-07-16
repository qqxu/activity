/* eslint react/prop-types: 0 */
import 'babel-polyfill';
import React, { useState, useEffect } from 'react';
import { setStyle } from '../../libs/utils';
import './style.scss';

const modalWrapper = (WrappedComponent) => {
  const hoc = (props) => {
    const [scrollTop, setScrollTop] = useState(0);

    const allowBodyScrolling = () => {
      setStyle(document.body, { top: '0px' });
      document.body.classList.remove('page-hidden');
      // 在给页面设置了doctype的时候，documentElement.scrollTop(1)/body.scrollTop(2), safari不支持(1), chrome不支持(2)
      if (scrollTop > 0) {
        if (document.scrollingElement) {
          document.scrollingElement.scrollTop = scrollTop;
        } else {
          document.body.scrollTop = scrollTop;
          document.documentElement.scrollTop = scrollTop;
          window.pageYOffset = scrollTop;
        }
      }
    };

    const forbidBodyScrolling = () => {
      let top = document.scrollingElement ? document.scrollingElement.scrollTop : Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);
      setScrollTop(top);
      setStyle(document.body, { top: `${-top}px` });
      document.body.classList.add('page-hidden');
    };

    useEffect(() => {
      if (props.config.show) {
        forbidBodyScrolling();
      } else {
        allowBodyScrolling();
      }
    }, [props.config.show]);

    return (
      <div className={`modalFixed${props.config.show ? '' : ' hide'}`}>
        <WrappedComponent {...props} />
      </div>
    );
  };

  return hoc;
};

export default modalWrapper;
