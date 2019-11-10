import React from "react";
import { Link } from 'react-router-dom'
import {
  Row,
  Col,
  Descriptions,
  Layout,
  Breadcrumb,
  List
} from "antd";
import "./Master.css"
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
  }
];

class MasterPostList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
              <a href="/userProfile/1">个人中心</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>师傅列表</Breadcrumb.Item>
          </Breadcrumb>
                      <List
              grid={{ gutter: 16, column: 1 }}
              dataSource={data}
              renderItem={item => (
                <List.Item>
          <div style={{position:"relative", marginBottom:"20px"}}>
            <Layout style={{ background: '#fff', padding:"20px 30px"}}>
              <Sider theme="light" width="210px" style={{ height: "230px" }}>
                <img className="master-image" src={photo} alt="师傅带徒"/>
              </Sider>
              <Layout style={{backgroundColor:'#fff'}}>
                <Content style={{ paddingLeft:"20px", margin: 0}}>
                  <Descriptions title="师傅有偿带徒做任务" column={1}>
                    <Descriptions.Item label="师傅昵称">哈哈哈哈</Descriptions.Item>
                    <Descriptions.Item label="任务名称">哈哈哈 <Link to={'/masterDetail/1'} style={{fontSize:"10px"}}>[查看详情]</Link></Descriptions.Item>
                    <Descriptions.Item label="项目介绍" span={2}>还好</Descriptions.Item>
                    <Descriptions.Item label="周期"><p style={{color:"#00FF00", display:"inline"}}>10</p>天</Descriptions.Item>
                    <Descriptions.Item label="价格"><p style={{color:"red", display:"inline", fontSize:"20px", fontWeight:"bold"}}>￥10.0</p></Descriptions.Item>
                  </Descriptions>
                </Content>
              </Layout>
            </Layout>
            <div className="editMasterPost">
              编辑   
            </div>
          </div>
           </List.Item>
              )}
            />
        </Col>
        <Col md={4} />
      </Row>
    );
  }
}

export default MasterPostList;
