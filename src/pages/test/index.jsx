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

  componentDidMount () {
    const canvas = document.getElementById('fireWorks');
    if (canvas.getContext) {
      const context = canvas.getContext('2d');
      // this.drawTriangle(context);
      // this.drawCircle(context);
      // this.drawText(context);
      // this.drawSquare(context);
      this.drawShift(context);
    }
  }

  drawTriangle = (context) => {
    context.beginPath();
    context.moveTo(30, 30);
    context.lineTo(60, 30);
    context.lineTo(30, 60);
    context.fill();
    context.closePath();

    context.beginPath();
    context.moveTo(80, 30);
    context.lineTo(80, 60);
    context.lineTo(30, 60);
    context.lineTo(80, 30);
    context.stroke();
    context.closePath();
    context.save();

  }


  drawCircle = (context) => {
    context.beginPath();
    context.arc(120, 60, 20, 0, Math.PI);   //  弧度 = (Math.PI / 180) * 角度
    context.fillStyle = '#FFA500';    // fillStyle需要在填充之前设置
    context.fill();
    context.closePath();

    context.moveTo(140, 40);
    context.arc(120, 40, 20, 0, Math.PI, true);
    context.stroke();
    context.strokeStyle = 'red';      // 如果有两个，前面的会被忽略
    context.closePath();

    context.moveTo(180, 40);
    context.arc(160, 40, 20, 0, Math.PI / 2);
    context.strokeStyle = 'blue';
    context.stroke();
    context.closePath();
    context.save();
  }

  drawText = (context) => {
    context.font = '22px serif';
    context.textAlign = 'center';
    context.direction = 'rtl';
    context.fillText('hello my', 40, 100); // 使用当前填充的样式fillStyle绘制文本
    context.strokeText('world ok', 80, 100);  // 使用当前边款样式strokeStyle，绘制文本
    context.save();
  }


  drawSquare = (context) => {

    context.fillRect(30, 110, 200, 200);
    context.save();


    context.fillStyle = '#09F';
    context.fillRect(40, 120, 180, 180);
    context.save();

    context.fillStyle = '#FFF';
    context.fillRect(50, 130, 160, 160);
    context.save();

    context.restore();
    context.fillRect(60, 140, 140, 140);


    context.restore();
    context.fillRect(70, 150, 120, 120);
  }

  drawShift = (context) => {
    context.fillRect(100, 100, 50, 50);
    context.restore();

    context.translate(120, 120);
    context.fillRect(80, 80, 150, 150);
    context.restore()

    context.fillRect(180, 180, 150, 150);

  }

  render() {
    return (
      <div className="index-container">
        <canvas id="fireWorks" width="400" height="900">
          浏览器不支持
        </canvas>
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
