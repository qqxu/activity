import React from 'react';
import Modal from './components/modal/index';
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
      modalVisible: false,
      isSelected: false,
      title: '',
      description: null,
      btnName: '',
    };
  }

  componentWillMount() {
    this.clearTimer(this.pageTimer);
    this.startPageCount();
  }

  startPageCount = () => {
    let self = this;
    this.pageTimer = setTimeout(function(){
      let { pageCount } = self.state;
      if(pageCount === 0) {
        self.clearTimer(self.pageTimer);
        self.startRainCount();
        self.getRain();
        return;
      }
      pageCount--;
      self.setState({ pageCount });
      self.startPageCount();
    }, 1000);
  }

  clearTimer = (timer) => {
    if (timer) {
      clearTimeout(timer);
      this[timer] = null;
    }
  }

  componentWillUnmount (){
    this.clearTimer(this.pageTimer);
    this.clearTimer(this.processTimer);
    this.clearTimer(this.rainDomTimer);
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
        self.clearTimer(self.rainDomTimer);
        return;
      }
      self.getRain();
    }, 1500);  // 比动画时间短一点，是为了让两场雨无间隔
  }


  openModal = () => {
    const { isSelected } = this.state;
    if (isSelected === false) {
      this.setState({
        modalVisible: true,
        title: '很遗憾，没抢到哦',
        description: <span className="modal-des">本场您未击中任何红包，未能获得<br />现金红包奖励！</span>,
        btnName: '我知道了',
      });
    } else {
      this.setState({
        modalVisible: true,
        title: '恭喜您获得 10 元现金红包！',
        description: <span className="modal-des">红包雨奖励可在“我的优惠券”中查看</span>,
        btnName: '去查看'
      });
    }
  }

  startRainCount = () => {
    let self = this;
    this.processTimer = setTimeout(function () {
      let { processCount } = self.state;
      if(processCount === 0) {
        self.clearTimer(self.processTimer);
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
    this.setState({
      isSelected: true,
    });
  }

  renderPageCount = () => (
     <div className="page-start">
       <div className="page-time-count">{this.state.pageCount}</div>
       <div className="tips">猛戳屏幕赢红包</div>
     </div>
  )

  renderRain = () => (
    <div className="rain-wrapper">
      <div className="rain-time-count">{`剩余时间: ${this.state.processCount} s`}</div>
      <div className={`wrapper${this.state.paused ? ' paused' : ''}`}>
      { this.state.rainDom.map(itm => itm) }
      </div>
    </div>
  )

  onOk = () => {
    if (this.state.isSelected) {
    }
    this.closeModal();
  }

  closeModal = () => {
    this.setState({
      modalVisible: false,
    });
  }

  render() {
    const { pageCount, modalVisible, title, description, btnName } = this.state;
    return (
     <div className="RedEnvelopeRain">
       {
         pageCount > 0 ?
         this.renderPageCount()
         :
         this.renderRain()
       }
       <Modal modalVisible={modalVisible} title={title} description={description} btnName={btnName} onOk={this.onOk} closeModal={this.closeModal} />
     </div>
    );
  }
}
