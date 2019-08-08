import React, { Component } from 'react';
import { Col, Row, message, Tabs, List, Radio } from "antd";
import cpHeaderImg from '../../images/cp.png';
import cpLogo from '../../images/cp-logo.png';
import './Team.css';
import storage from "../storage";
import {  withRouter } from 'react-router-dom';
const { TabPane } = Tabs;

class Team extends Component{
    constructor(props) {
        super(props);
        this.state = {
            radioValue:'',
            notes: [
                {
                    id: "1",
                    note: "CP组队是概率事件，总能碰到自己合适的。"
                },
                {
                    id: "2",
                    note: "组队之后请移步学习日记进行监督分享学习。"
                },
                {
                    id: "3",
                    note: "未匹配成功之前请勿重复提交匹配信息。"
                }
            ],
        }
    }

    componentWillMount() {
        let token = storage.get('token');
        fetch('https://api.bangneedu.com/classify', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": token ? "Bearer " + token : ''
            }})
            .then((res) => res.json())
            .then( res => {
                console.log(res.data[0].childList);
                this.setState({
                    frontend: res.data[0].childList[1].childList,
                    backend: res.data[0].childList[0].childList
                });
            })
            .catch( err => console.log(err))
    }

    handleChange = (e) => {
        console.log(e.target.value);
        this.setState({
            radioValue:e.target.value
        })
    };

    formSubmit = () => {
        console.log(this.state.radioValue)
        let body = {
            "technology": this.state.radioValue
        };
        let token = storage.get('token');
        if(!token) {
            message.error("请登陆后再提交", 2);
            this.props.history.push("/login")
        }
        if(this.state.radioValue) {
            fetch('https://api.bangneedu.com/cpMatching/technology', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": token
                },
                body: JSON.stringify(body)
            })
                .then((res) => res.json())
                .then(res => {
                    console.log("更新技术栈: " + res)
                    fetch('https://api.bangneedu.com/cpMatching', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            "Authorization": "Bearer " + token
                        },
                        body: JSON.stringify(body)})
                        .then((res) => res.json())
                        .then(res => {
                            console.log(res);
                            if(res.status === 200) {
                                message.success(res.msg);
                            } else {
                                message.error(res.msg);
                            }
                        })
                        .catch( err => console.log(err))
                })
                .catch( err => console.log(err))
        }
    };

    render() {
        const{radioValue}=this.state;
        return (
            <div id='container'>
                <Row>
                    <Col md={5} />
                    <Col md={14}>
                        <div className='headerImg'>
                            <img src={cpHeaderImg} alt=''/>
                        </div>
                        <div className='cp-container'>
                            <div className='cp-header'>
                                <div>
                                    <img src={cpLogo} alt=''/>
                                </div>
                                <div className='caption'>寻/找/小/伙/伴</div>
                                <div>
                                    <img src={cpLogo} alt=''/>
                                </div>
                            </div>
                            <div className='tabs'>
                                <Tabs tabPosition="left">
                                    <TabPane tab="技术点选择" key="1" className='tab-box stack-container'>
                                        <Radio.Group onChange={this.handleChange} >
                                            <div className='stack-row'>
                                                <Radio.Button value="frontend" className={radioValue ==='frontend' ? 'radioActive':''}><span className='head'>前端</span></Radio.Button>
                                                {
                                                    this.state.frontend && this.state.frontend.map((item, index) => {
                                                        return <Radio.Button key={index} value={item.name} className={radioValue ===item.name ? 'radioActive':''}><span>{item.name}</span></Radio.Button>
                                                    })
                                                }
                                            </div>
                                            <div className='stack-row'>
                                                <Radio.Button value="backend" className={radioValue ==='backend' ? 'radioActive':''}><span className='head'>后端</span></Radio.Button>
                                                {
                                                    this.state.backend && this.state.backend.map((item, index) => {
                                                        return <Radio.Button key={index} value={item.name} className={radioValue ===item.name ? 'radioActive':''}><span>{item.name}</span></Radio.Button>
                                                    })
                                                }
                                            </div>
                                        </Radio.Group>
                                    </TabPane>
                                    <TabPane tab="项目经验" key="2" className='tab-box'>
                                        <div className='info'>
                                            <div>个人描述</div>
                                            <textarea name='experience' />
                                        </div>
                                    </TabPane>
                                    <TabPane tab="其他信息" key="3" className='tab-box'>
                                        <List
                                            size="large"
                                            split={false}
                                            dataSource={this.state.notes}
                                            renderItem={item => <List.Item>
                                                <div>
                                                    <span style={{color: '#ff6e37', marginRight: 30}}>{item.id}</span>{item.note}
                                                </div>
                                            </List.Item>}
                                        />
                                    </TabPane>
                                </Tabs>
                            </div>
                            <button className='submit-button' onClick={this.formSubmit}> 提交 </button>
                        </div>
                    </Col>
                    <Col md={5} />
                </Row>
            </div>
        )
    }
}

export default withRouter(Team);
