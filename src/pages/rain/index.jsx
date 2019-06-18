import React from 'react';
import Modal from '../../components/modal/index';
import OpenImg from './img/open.png';

import './style.scss';

let domId = 0;
export default class RedEnvelopeRain extends React.Component {
  constructor() {
    super();
    this.state = {
      pageCount: 3,
      rainDom: [],
      processCount: 10,
      paused: false,
      config: {
        show: false,
      },
      isSelected: false,
      selectedAmount: 0,
    };
  }

  componentWillMount() {
    this.clearTimer('pageTimer');
    this.startPageCount();
  }

  startPageCount = () => {
    let self = this;
    this.pageTimer = setTimeout(function(){
      let { pageCount } = self.state;
      if(pageCount === 0) {
        self.clearTimer('pageTimer');
        self.startRainCount();
        self.getRain();
        return;
      }
      pageCount--;
      self.setState({ pageCount });
      self.startPageCount();
    }, 1000);
  }

  clearTimer = (timerStr) => {
    if (this[timerStr]) {
      clearTimeout(this[timerStr]);
      this[timerStr] = null;
    }
  }

  componentWillUnmount (){
    this.clearTimer('pageTimer');
    this.clearTimer('processTimer');
    this.clearTimer('rainDomTimer');
  }

  getRain = () => {
    let { rainDom } = this.state;
    let dom = this.renderRainDom();
    let len = rainDom.length;
    if (len > 1) { rainDom.shift() }
    rainDom.push(dom);
    this.setState({
      rainDom,
    });
    let self = this;
    this.rainDomTimer = setTimeout(function () {
      let { processCount } = self.state;
      if (processCount === 0) {
        self.setState({
          paused: true,
        });
        self.openModal();
        self.clearTimer('rainDomTimer');
        return;
      }
      self.getRain();
    }, 1500);  // 比动画时间短一点，是为了让两场雨无间隔
  }

  openModal = () => {
    const { isSelected, selectedAmount } = this.state;
    if (isSelected === false) {
      this.setState({
        config: {
          show: true,
          title: '很遗憾，没抢到哦',
          description: <span className="modal-des">本场您未击中任何红包，未能获得奖励！</span>,
          btnName: '再来一场',
          onOk: this.reInit,
          onClose: this.closeModal,
        },
      });
    } else {
      this.setState({
        config: {
          show: true,
          title: '太棒了，运气爆棚',
          description: <span className="modal-des">{`抢到了 ${selectedAmount} 个红包！`}</span>,
          btnName: '再战一场',
          onOk: this.reInit,
          onClose: this.closeModal,
        },
        modalVisible: true,
      });
    }
  }

  startRainCount = () => {
    let self = this;
    this.processTimer = setTimeout(function () {
      let { processCount } = self.state;
      if(processCount === 0) {
        self.clearTimer('processTimer');
        return;
      }
      processCount--;
      self.setState({ processCount });
      self.startRainCount();
    }, 1000)
  }

  renderRainDom = () => {
    domId++;
    let envelopArr = [0, 1, 2, 3, 4];
    envelopArr.sort((a, b) => 0.5 - Math.random());
    let base = 20; // 单个红包的宽度 15vw, 页面总宽度100vw, 除以一行5列红包 20vw
    return (
       <div className="row" key={`dom-${domId}`}>
         {
           envelopArr.map((itm, idx) => {
             return <div className={`envelope animation${itm}`} key={idx} style={{ left: `${ base * idx + 3 }vw` }} ref={(ref => { this[`envelope${domId}${itm}`] = ref; })} onClick={() => this.openEnvelop(`envelope${domId}${itm}`)} />
           })
         }
       </div>
    )
  }

  openEnvelop = (envelopeId) => {
    if (this.state.paused) { return; }
    this[envelopeId].style.backgroundImage = `url(${OpenImg})`;
    const { selectedAmount } = this.state;
    this.setState({
      isSelected: true,
      selectedAmount: selectedAmount + 1,
    });
  }

  closeModal = () => {
    this.setState({
      config: {
        show: false,
      },
    });
  }

  reInit = () => {
    this.clearTimer('pageTimer');
    this.clearTimer('processTimer');
    this.clearTimer('rainDomTimer');
    this.setState({
      pageCount: 3,
      rainDom: [],
      processCount: 10,
      paused: false,
      config: {
        show: false,
      },
      isSelected: false,
      selectedAmount: 0,
    });
    this.startPageCount();
  }

  render() {
    const { pageCount, config, processCount, paused, rainDom } = this.state;
    return (
     <div className="RedEnvelopeRain">
       {
         pageCount > 0 ?
         <PageInit pageCount={pageCount} />
         :
         <RainPage processCount={processCount} paused={paused} rainDom={rainDom} />
       }
       <Modal config={config} />
     </div>
    );
  }
}

export const PageInit = ({ pageCount }) => {
  return (
    <div className="page-start">
     <div className="page-time-count">{pageCount}</div>
     <div className="tips">猛戳屏幕赢红包</div>
    </div>
  );
};


export const RainPage = ({ processCount, paused, rainDom }) => {
  return (
    <div className="rain-wrapper">
      <div className="rain-time-count">{`剩余时间: ${processCount} s`}</div>
      <div className={`wrapper${paused ? ' paused' : ''}`}>
      { rainDom.map(itm => itm) }
      </div>
    </div>
  );
};