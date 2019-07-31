import React, { Component } from 'react';
import './Login.css';
import { Container, Row, Col, Form, FormGroup, InputGroup, Button, Nav } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import storage from './storage';
import {  withRouter } from 'react-router-dom';

class Login extends Component{
    constructor(props) {
        super(props);

        this.state = {
            key: 'login',
            username: '',
            password: ''
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

    loginFormSubmit = (e) => {
        console.log(this.state);
        let body = {
            "username": this.state.username,
            "password": this.state.password,
        };
        if (this.state.username && this.state.username) {
            fetch('https://api.bangneedu.com/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)})
                .then((res) => res.json())
                .then(res => {
                    console.log(res.data);
                    this.setState({
                        token: res.data
                    });
                    if(res.data) {
                         toast.success("登陆成功", {
                             position: toast.POSITION.TOP_CENTER,
                             autoClose: 2000
                         });
                        storage.set('token',res.data);
                        if(this.timer){
                            clearTimeout(this.timer);
                        }
                        this.timer = setTimeout(()=>{
                            this.props.history.push("/profile")
                        },2000);

                    } else {
                        toast.error("登陆失败", {
                            position: toast.POSITION.TOP_CENTER
                        });
                    }

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
                                <Nav justify variant="tabs" defaultActiveKey="/login">
                                    <Nav.Item id='active'>
                                        <Nav.Link href="/login">登陆</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link href="/register">注册</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                                <ToastContainer />
                                <form>
                                    <FormGroup>
                                        <InputGroup>
                                            <Form.Control  placeholder="请输入手机号码/邮箱/用户名" aria-label="username" aria-describedby="username"
                                                           value={this.state.username} name='username' onChange={this.onFieldChange1} id='user'/>
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup>
                                            <Form.Control placeholder="请输入密码" aria-label="password" aria-describedby="password"
                                                          value={this.state.password} name='password' onChange={this.onFieldChange2} id='password'/>
                                        </InputGroup>
                                    </FormGroup>
                                    <Nav className='forget justify-content-end'>
                                        <Nav.Item>
                                            <Nav.Link href="/">忘记密码？</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                    <Button onClick={this.loginFormSubmit}>登陆</Button>
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

export default withRouter(Login);