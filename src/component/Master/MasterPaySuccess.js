import React from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Descriptions,
  Layout
} from "antd";
import "./Master.css";
import storage from "../storage";
const { Sider, Content } = Layout;

class MasterPaySuccess extends React.Component {
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
          <div style={{ background: "#fff", marginTop:"80px"}}>
            <Layout
              style={{
                background: "#fff"
              }}
            >
              <Sider theme="light" width="360px" style={{backgroundColor:"#8bc34a", textAlign:"center"}}>
              <div className="pay">
                <h2 >支付成功</h2>
                <p>￥10.0</p>
                <div className="seeDetailContent">
                    <Link to={"/MasterDetail/1"} className="seeDetail">查看订单详情</Link>
                </div>
                <p className="payNote">本公司不会用任何理由要求您登录银行卡信息或支付额外费用 请谨防钓鱼链接或诈骗电话</p>
              </div>
              </Sider>
              <Layout style={{ backgroundColor: "#fff" }}>
                <Content style={{ margin: 0, padding: "40px"}}>
                  <Descriptions column={1}>
                    <Descriptions.Item label="订单编号">哈哈哈哈</Descriptions.Item>
                    <Descriptions.Item label="下单时间">哈哈哈</Descriptions.Item>
                    <Descriptions.Item label="任务名称">还好</Descriptions.Item>
                    <Descriptions.Item label="师傅昵称">哈哈哈</Descriptions.Item>
                    <Descriptions.Item label="周期">哈哈哈</Descriptions.Item>
                  </Descriptions>
                </Content>
              </Layout>
            </Layout>
          </div>
        </Col>
        <Col md={4} />
      </Row>
    );
  }
}

export default MasterPaySuccess;
