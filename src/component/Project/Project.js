import React, { Component } from 'react';
import {Row, Col, Descriptions, Layout } from 'antd';
import './Project.css';
import { Link } from 'react-router-dom'
const { Sider, Content } = Layout;

class Project extends Component{
    constructor(props) {
        super(props);
        this.state = {
            current: 1
        }
    }

    componentDidMount() {
        this.getProjects();
    }

    getProjects = () => {
        fetch('https://api.bangneedu.com/project?current' + this.state.current +'&size=10', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }})
            .then((res) => res.json())
            .then( res => {
                console.log(res)
                this.setState({
                    projects: res.data.records.reverse(),
                    pages: parseInt(res.data.pages)
                });
            })
            .catch( err => console.log(err))
    };

    redirectToProjectDetail = (id) => {

    };

    render() {
        return(
        <div>
            <Row>
                <Col md={4} />
                <Col md={16}>
                    <div className='con-header'>实战演练</div>
                    <div>
                        {
                            this.state.projects && this.state.projects.map((item, index) => {
                                return <div key={index} className='relative-box'>
                                    <div style={{marginBottom: 20}}>
                                        <Layout>
                                            <Sider width={200} height={200} style={{ background: '#fff' }}>
                                                <img className='pro-image' src={item.image} alt='' />
                                            </Sider>
                                            <Layout>
                                                <Content style={{background: '#fff', padding: 20, margin: 0}}>
                                                    <Descriptions title={item.name} column={1}>
                                                        <Descriptions.Item label="技术栈">{item.technology}</Descriptions.Item>
                                                        <Descriptions.Item label="项目介绍">{item.details}</Descriptions.Item>
                                                    </Descriptions>
                                                </Content>
                                            </Layout>
                                        </Layout>
                                        <Link to={'/project/' + item.id} className='btn-detail'>查看详情</Link>
                                    </div>
                                </div>
                            })
                        }

                    </div>
                </Col>
                <Col md={4} />
            </Row>
        </div>)
    }
}

export default Project;


