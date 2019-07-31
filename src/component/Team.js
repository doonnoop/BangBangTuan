import React, { Component } from 'react';
import { Col, Container, Row, Tab, Nav } from "react-bootstrap";
import cpHeaderImg from '../images/cp.png';
import cpLogo from '../images/cp-logo.png';
import './Team.css';
import storage from "./storage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  withRouter } from 'react-router-dom';

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
            toast.error("请登陆后再提交", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000
            });
            if(this.timer){
                clearTimeout(this.timer);
            }
            this.timer = setTimeout(()=>{
                this.props.history.push("/login")
            },2000);
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
                                toast.success(res.msg, {
                                    position: toast.POSITION.TOP_CENTER
                                });
                            } else {
                                toast.error(res.msg, {
                                    position: toast.POSITION.TOP_CENTER,
                                    autoClose: false
                                });
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
            <Container id='container'>
                <Row>
                    <Col sm={2} />
                    <Col sm={8}>
                        <div className='headerImg'>
                            <img src={cpHeaderImg} alt=''/>
                        </div>
                        <ToastContainer/>
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
                            <Tab.Container defaultActiveKey="first">
                                <Row>
                                    <Col xs={3}>
                                        <Nav variant="pills" className="flex-column">
                                            <Nav.Item>
                                                <div className='nav-blue'><Nav.Link eventKey="first" >技术点选择</Nav.Link></div>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <div className='nav-blue'><Nav.Link eventKey="second" id='nav-blue'>项目经验</Nav.Link></div>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <div className='nav-blue'><Nav.Link eventKey="third" id='nav-blue'>其他信息</Nav.Link></div>
                                            </Nav.Item>
                                        </Nav>
                                    </Col>
                                    <Col xs={9}>
                                        <Tab.Content id='content'>
                                            <Tab.Pane eventKey="first">
                                                <div className='stack-container'>
                                                    <div className='stack'>
                                                        <label>
                                                            <input type="radio" value="frontend" checked={radioValue ==='frontend'}
                                                                   onChange={this.handleChange} className={radioValue ==='frontend' ? 'radioActive':''} />
                                                            <span className='head'>前端</span>
                                                        </label>
                                                        {
                                                            this.state.frontend && this.state.frontend.map((item, index) =>{
                                                                return <label key={index}>
                                                                    <input type="radio" value={item.name} checked={radioValue ===item.name}
                                                                           onChange={this.handleChange} className={radioValue ===item.name ? 'radioActive':''}/>
                                                                    <span>{item.name}</span>
                                                                </label>

                                                            })
                                                        }
                                                    </div>
                                                    <div className='stack'>
                                                        <label>
                                                            <input type="radio" value="backend" checked={radioValue ==='backend'}
                                                                   onChange={this.handleChange} className={radioValue ==='backend' ? 'radioActive':''} />
                                                            <span className='head'>后端</span>
                                                        </label>
                                                        {
                                                            this.state.backend && this.state.backend.map((item, index) =>{
                                                                return <label key={index}>
                                                                    <input type="radio" value={item.name} checked={radioValue ===item.name}
                                                                           onChange={this.handleChange} className={radioValue ===item.name ? 'radioActive':''}/>
                                                                    <span>{item.name}</span>
                                                                </label>

                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="second">
                                                <div className='info'>
                                                    <div>个人描述</div>
                                                    <textarea name='experience' />
                                                </div>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="third">
                                                <div className='note'>
                                                    {
                                                        this.state.notes.map((item, index) => {
                                                            return <div className='note-item' key={index}>
                                                                        <div className='number'>{item.id}</div>
                                                                        <div>{item.note}</div>
                                                                    </div>
                                                        })
                                                    }
                                                </div>
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </Col>
                                </Row>
                            </Tab.Container>
                            <button className='submit-button' onClick={this.formSubmit}> 提交 </button>
                        </div>
                    </Col>
                    <Col sm={2} />
                </Row>
            </Container>
        )
    }
}

export default withRouter(Team);