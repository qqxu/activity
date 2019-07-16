import React from 'react';
import Modal from '../../components/modal/index';

import './style.scss';

export default class modalWrapper extends React.Component {
  constructor() {
    super();
    this.state = {
      config: {
        show: false,
      },
    };
  }

  handleClick = () => {
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
  }

  closeModal = () => {
    this.setState({
      config: {
        show: false,
      },
    });
  }

  render() {
    const { config } = this.state;
    return (
     <div className="modalWrapper">
       <span>本页面是为了实验</span>
       <span>当内容超出屏幕高度时，打开弹框，固定底部不动，同时记录当前位置。</span>
       <span>关闭弹框时，将页面滑动到弹框打开前的位置</span>
       <button onClick={this.handleClick}>打开弹框</button>
       <p>
         <span>Modal只传递一个属性值config</span>
         <span>其中config包含所有的弹框内部内容，show是必填项</span>
         <span>modal组件添加了animation，用以提升打开弹框体验</span>
         <span>modalFixed用到了config这种的show属性</span>
       </p>
       <Modal config={config} />
     </div>
    );
  }
}
