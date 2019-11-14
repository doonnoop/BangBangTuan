import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Descriptions, Layout } from "antd";
import "./Master.css";
import photo from "../../images/author.jpg";

import storage from "../storage";
const { Sider, Content } = Layout;

class MasterDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getMaster();
  }

  getMaster = () => {
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
          <div className="con-header">师徒带徒详情</div>
          <div>
            <Layout style={{ background: "#fff", padding: "30px" }}>
              <Sider theme="light" width="300px">
                <img className="master-image" src={photo} alt="师傅带徒" />
              </Sider>
              <Layout style={{ backgroundColor: "#fff" }}>
                <Content style={{ padding: "20px 20px 0", margin: 0 }}>
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
                    <Descriptions.Item label="周期">
                      <p style={{ color: "#00FF00", display: "inline" }}>10</p>
                      天
                    </Descriptions.Item>
                    <Descriptions.Item label="价格">
                      <p
                        style={{
                          color: "red",
                          display: "inline",
                          fontSize: "20px",
                          fontWeight: "bold"
                        }}
                      >
                        ￥10.0
                      </p>
                    </Descriptions.Item>
                  </Descriptions>
                </Content>
                <div style={{ padding: "20px" }}>
                  <Link to={"/masterPay/1"} className="btnDetail">
                    拜师
                  </Link>
                </div>
              </Layout>
            </Layout>
          </div>
        </Col>
        <Col md={4} />
      </Row>
    );
  }
}

export default MasterDetail;
