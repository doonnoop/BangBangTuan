import React, { Component } from 'react';
import { Row, Col, Breadcrumb, Descriptions, Layout } from 'antd';
import './Project.css';
import {Link, withRouter} from 'react-router-dom';
const { Content } = Layout;

class ProjectDetails extends Component{
    constructor(props) {
        super(props);
        this.state = {
            current: 1
        }
    }

    componentDidMount() {
        console.log(this.props.match.params.id);
        this.getProject();
        this.getProjectTask();
    }

    getProject = () => {
        fetch('https://api.bangneedu.com/project/' + this.props.match.params.id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }})
            .then((res) => res.json())
            .then( res => {
                console.log(res)
                this.setState({
                    project: res.data,
                });
            })
            .catch( err => console.log(err))
    };

    getProjectTask = () => {
        fetch('https://api.bangneedu.com/projectTask/' + this.props.match.params.id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }})
            .then((res) => res.json())
            .then( res => {
                console.log(res)
                this.setState({
                    tasks: res.data,
                });
            })
            .catch( err => console.log(err))
    };

    render() {
        return(
            <div>
                <Row>
                    <Col md={4}></Col>
                    <Col md={16}>
                        <Breadcrumb className='con-header' style={{ paddingLeft: 10, fontSize: 16, marginTop: 30, marginBottom: 30}}>
                            <Breadcrumb.Item>
                                <a href="/projects">实战演练</a>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>项目详情</Breadcrumb.Item>
                        </Breadcrumb>
                        {
                            this.state.project && <div>
                                <Layout>
                                    <Content style={{background: '#fff', padding: 20, margin: 0}} className='border-shadow'>
                                        <Descriptions title={this.state.project.name} column={1}>
                                            <Descriptions.Item label="技术栈">{this.state.project.technology}</Descriptions.Item>
                                            <Descriptions.Item label="项目介绍">{this.state.project.details}</Descriptions.Item>
                                        </Descriptions>
                                    </Content>
                                </Layout>
                            </div>
                        }
                        {
                            this.state.tasks && this.state.tasks.map((item, index) => {
                                return <div key={index} className='relative-box'>
                                    <Content style={{background: '#fff', padding: 20, marginTop: 10}} className='border-shadow'>
                                        <div className='task-card'>
                                            任务<span>{item.title}</span>: {item.name}
                                        </div>
                                    </Content>
                                    <Link to={'/task/' + item.id} className='btn-detail'>查看详情</Link>
                                </div>
                            })
                        }
                    </Col>
                    <Col md={4}></Col>
                </Row>
            </div>)
    }
}

export default withRouter(ProjectDetails);


