import React from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Descriptions,
  Layout,
  Breadcrumb,
  Divider,
} from "antd";
import "./Master.css";

import photo from "../../images/author.jpg";
import QRCode from "../../images/yangshu.png";

import storage from "../storage";
const { Sider, Content } = Layout;

class Master extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.getMasterPay();
  }

  getMasterPay = () => {
    let token = storage.get("token");
    fetch()
      .then(res => res.json())
      .then(res => {})
      .catch(err => console.log(err));
  };

  render() {
    document.body.style.backgroundColor = "#f8fbfd";
    return (
      <Row>
        <Col md={4} />
        <Col md={16}>
          <Breadcrumb
            className="con-header"
            style={{
              paddingLeft: 10,
              fontSize: 16,
              marginTop: 30,
              marginBottom: 30
            }}
          >
            <Breadcrumb.Item>
              <a href="/master">师傅带徒详情</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>支付页面</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ background: "#fff", height: "550px" }}>
            <Layout
              style={{
                background: "#fff",
                paddingLeft: "30px",
                paddingTop: "30px"
              }}
            >
              <Sider theme="light" width="230px" style={{ height: "230px" }}>
                <img className="master-image" src={photo} alt="师傅带徒" />
              </Sider>
              <Layout style={{ backgroundColor: "#fff" }}>
                <Content style={{ margin: 0, paddingLeft: "20px" }}>
                  <Descriptions title="师傅有偿带徒做任务" column={1}>
                    <Descriptions.Item label="师傅昵称">
                      哈哈哈哈
                    </Descriptions.Item>
                    <Descriptions.Item label="任务名称">
                      哈哈哈{" "}
                      <Link to={"/masterDetail/1"} style={{ fontSize: "10px" }}>
                        [查看详情]
                      </Link>
                    </Descriptions.Item>
                    <Descriptions.Item label="项目介绍">还好</Descriptions.Item>
                    <Descriptions.Item label="周期"><p style={{color:"#00FF00", display:"inline"}}>10</p>天</Descriptions.Item>
                    <Descriptions.Item label="价格"><p style={{color:"red", display:"inline", fontSize:"20px", fontWeight:"bold"}}>￥10.0</p></Descriptions.Item>
                  </Descriptions>
                </Content>
              </Layout>
            </Layout>
            <div style={{ padding: "0px 30px" }}>
              <Divider />
            </div>
            <div style={{ padding: "0px 30px"}}>
                <h6>支付方式：</h6>
                <div style={{textAlign:"center"}}>
                    <p>微信扫码，支付10元</p>
                    <img src={QRCode} alt="二维码" style={{width:"150px", backgroundColor:"#ddd"}}/>
                </div>
            </div>
          </div>
        </Col>
        <Col md={4} />
      </Row>
    );
  }
}

export default Master;
