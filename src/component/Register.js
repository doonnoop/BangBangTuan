import React, { Component } from 'react';
import { Container, Row, Col, Form, FormGroup, InputGroup, Button, Nav } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  withRouter } from 'react-router-dom';

class Register extends Component{
    constructor(props) {
        super(props);

        this.state = {
            key: 'register',
            username: '',
            password: '',
            password1: '',
            weixin: '',
            phone: '',
            captcha: '',
            count: 60
        };
    }

    onFieldChange1 = (e) => {
        const value = e.target.value;
        this.setState({username: value});
    };
    onFieldChange2 = (e) => {
        const value = e.target.value;
        this.setState({password: value});
    };
    onFieldChange3 = (e) => {
        const value = e.target.value;
        this.setState({password1: value});
    };
    onFieldChange4 = (e) => {
        const value = e.target.value;
        this.setState({weixin: value});
    };
    onFieldChange5 = (e) => {
        const value = e.target.value;
        this.setState({phone: value});
    };
    onFieldChange6 = (e) => {
        const value = e.target.value;
        this.setState({captcha: value});
    };

    getValidCode = () => {
        if (this.state.phone && this.state.count === 60) {
            this.tick();
            fetch('https://api.bangneedu.com/captcha/' + this.state.phone, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }})
                .then((res) => res.json())
                .then(res => {
                    console.log(res.data);
                    if(res.data.message !== "OK") {
                        toast.error(res.data.message, {
                            position: toast.POSITION.TOP_CENTER,
                            autoClose: false
                        });
                    }
                });
        } else if (!this.state.phone) {
            toast.error("请填写电话号码", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: false
            });
        }
    };

    tick =  () => {
        let vm = this;
        if (vm.state.count > 0) {
            vm.setState({
                count: vm.state.count - 1
            });
            setTimeout(function () {
                return vm.tick()
            }, 1000)
        } else {
            vm.setState({
                count: 60
            });
        }
    };

    loginFormSubmit = (e) => {
        console.log(this.state);
        if (this.state.username && this.state.password && this.state.password1 && this.state.weixin && this.state.phone && this.state.captcha) {
            if(this.state.password !== this.state.password1) {
                toast.error("两次密码不一致", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: false
                });
            } else {
                let body = {
                    "username": this.state.username,
                    "password": this.state.password,
                    "phone": this.state.phone,
                    "weixin": this.state.weixin,
                    "captcha": this.state.captcha,
                };
                fetch('https://api.bangneedu.com/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)})
                    .then((res) => res.json())
                    .then( res => {
                        console.log(res);
                        if(res.data.status === 200) {
                            this.props.history.push("/login")
                        } else if (res.data.status === 500) {
                            toast.error(res.data.msg, {
                                position: toast.POSITION.TOP_CENTER,
                                autoClose: false
                            });
                        }
                    });
            }
        } else {
            toast.error("请填写必填项", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: false
            });
        }
    };

    render() {
        return (
            <Container>
                <Row>
                    <Col xs={3}></Col>
                    <Col xs={6} className='box'>
                        <Row>
                            <Col sm={1}></Col>
                            <Col sm={10}>
                                <Nav justify variant="tabs" defaultActiveKey="/register">
                                    <Nav.Item>
                                        <Nav.Link href="/login">登陆</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item id='active'>
                                        <Nav.Link href="/register">注册</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                                <form>
                                    <ToastContainer/>
                                    <FormGroup>
                                        <InputGroup>
                                            <Form.Control  placeholder="请输入用户名" aria-label="username" aria-describedby="username"
                                                           value={this.state.username} name='username' onChange={this.onFieldChange1} id='user'/>
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup>
                                            <Form.Control placeholder="请输入密码" aria-label="password" aria-describedby="password"
                                                          value={this.state.password} name='password' onChange={this.onFieldChange2} id='password'/>
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup>
                                            <Form.Control placeholder="请确认密码" aria-label="password1" aria-describedby="password1"
                                                          value={this.state.password1} name='password1' onChange={this.onFieldChange3} id='password'/>
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup>
                                            <Form.Control placeholder="请输入微信号" aria-label="weixin" aria-describedby="weixin"
                                                          value={this.state.weixin} name='weixin' onChange={this.onFieldChange4} id='weixin'/>
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup>
                                            <Form.Control placeholder="请输入手机号" aria-label="phone" aria-describedby="phone"
                                                          value={this.state.phone} name='phone' onChange={this.onFieldChange5} id='phone' />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup>
                                            <Form.Control placeholder="请输入验证码" aria-label="captcha" aria-describedby="captcha"
                                                          value={this.state.captcha} name='captcha' onChange={this.onFieldChange6} id='captcha' />
                                            <InputGroup.Append>
                                                <Button variant="outline-secondary" id='get-captcha' onClick={this.getValidCode}>{this.state.count!==60 ? this.state.count+' s':'获取验证码'}</Button>
                                            </InputGroup.Append>
                                        </InputGroup>
                                    </FormGroup>
                                    <Button onClick={this.loginFormSubmit}>注册</Button>
                                </form>
                            </Col>
                            <Col sm={1}></Col>
                        </Row>
                    </Col>
                    <Col xs={3}></Col>
                </Row>
            </Container>
        )
    }
}

export default withRouter(Register);
