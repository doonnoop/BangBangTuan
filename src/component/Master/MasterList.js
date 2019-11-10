import React, { Component } from "react";
import { List, Card, Descriptions, Breadcrumb, Row, Col, Layout, Divider, Icon} from "antd";
import "./Master.css";
import photo from "../../images/author.jpg"
import storage from "../storage";
const { Sider, Content } = Layout;
const data = [
  {
    title: "Title 1"
  },
  {
    title: "Title 2"
  },
  {
    title: "Title 3"
  },
  {
    title: "Title 4"
  }
];

export default class MasterList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible:false
    };
  }

  componentDidMount() {
    this.getMasterList();
  }

  getMasterList = () => {
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
              <a href="/userProfile/1">个人中心</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>我拜师的</Breadcrumb.Item>
          </Breadcrumb>
          <div>
            <List
              grid={{ gutter: 16, column: 2 }}
              dataSource={data}
              renderItem={item => (
                <List.Item>
                  <Card
                    style={{ background: "#fff", border: "none" }}
                    onClick={this.showModal}
                  >
                    <Layout
                      style={{ background: "#fff", padding: "0px 10px", margin:"0"}}
                    >
                      <Sider
                        theme="light"
                        width="120px"
                        style={{ height: "120px" }}
                      >
                        <img
                          className="master-image"
                          src={photo}
                          alt="师傅带徒"
                        />
                      </Sider>
                      <Layout style={{ backgroundColor: "#fff" }}>
                        <Content style={{ paddingLeft: "10px", margin: 0 }}>
                          <Descriptions title="是生生世世任务" column={1}>
                            <Descriptions.Item>
                              <p
                                style={{
                                  color: "#FFD700",
                                  display: "inline",
                                  fontSize: "24px"
                                }}
                              >
                                ￥10
                              </p>
                            </Descriptions.Item>
                            <Descriptions.Item>
                              <p
                                style={{ display: "inline", fontSize: "14px" }}
                              >
                                等待师傅收徒/拜师成功/完成任务/拜师失败
                              </p>
                            </Descriptions.Item>
                          </Descriptions>
                        </Content>
                      </Layout>
                    </Layout>
                    <Divider/>
                    <div style={{margin:"0 auto"}}>
                        <div style={{width:"100px", float:"left"}}>
                            <Icon type="message" style={{fontSize:"24px", margin:"0 auto",marginRight:"10px"}}/>
                            联系师傅
                        </div>
                        <div style={{float:"right", width:"180px", textAlign:"center"}}>
                            <div style={{float:"left", border:"1px solid #000", width:"80px"}}>取消拜师</div>
                            <div style={{float:"right", border:"1px solid #000", width:"80px"}}>确认完成</div>
                        </div>
                    </div>
                  </Card>
                </List.Item>
              )}
            />
          </div>
        </Col>
        <Col md={4} />
      </Row>
    );
  }
}
