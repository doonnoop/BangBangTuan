import React, { Component } from "react";
import { Divider, List, Card, Descriptions, Modal, Input } from "antd";
import "./Master.css";
import storage from "../storage";
const data = [
  {
    title: "Title 1"
  },
  {
    title: "Title 2"
  },
  {
    title: "Title 3"
  }
];

export default class MasterRecommend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  componentDidMount() {
    this.getPostList();
  }

  getPostList = () => {
    let token = storage.get("token");
    fetch()
      .then(res => res.json())
      .then(res => {})
      .catch(err => console.log(err));
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  render() {
    return (
      <div>
        <Divider />
        <p>看下我给你的推荐吧</p>
        <List
          grid={{ gutter: 16, column: 3 }}
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <Card
                style={{ background: "#eee", borderRadius: "5px" }}
                onClick={this.showModal}
              >
                <Descriptions title="XXX任务定价带徒" column={1}>
                  <Descriptions.Item label="周期">
                    <p style={{ color: "blue", display: "inline" }}>10</p>天
                  </Descriptions.Item>
                  <Descriptions.Item label="定价">
                    <p style={{ color: "red", display: "inline" }}>￥10.0</p>
                  </Descriptions.Item>
                </Descriptions>
              </Card>
              <Modal
                title="成为师傅"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                cancelText="取消"
                okText="确定"
                
              >
                <div className="masterModal" >
                  <p>哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</p>
                  <div>
                    <Descriptions colon={false} column={2}>
                      <Descriptions.Item label="周期" ><Input placeholder="请输入周期" style={{marginTop:"5px"}}/></Descriptions.Item>
                      <Descriptions.Item label="定价" ><Input value="￥10.0" style={{marginTop:"5px"}}/></Descriptions.Item>
                    </Descriptions>
                  </div>
                </div>
              </Modal>
            </List.Item>
          )}
        />
      </div>
    );
  }
}
