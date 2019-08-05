import React, { Component } from 'react';
import './Login.css';
import { Row, Col, message, Tabs, Form, Input, Icon, Button } from 'antd';
import storage from './storage';
import {  withRouter } from 'react-router-dom';
import Register from "./Register";
const { TabPane } = Tabs;

class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    loginFormSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
            fetch('https://api.bangneedu.com/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)})
                .then((res) => res.json())
                .then(res => {
                    console.log(res.data);
                    this.setState({
                        token: res.data
                    });
                    if(res.data) {
                        message.success("登陆成功", 2);
                        this.props.history.push("/profile");
                        storage.set('token',res.data);
                    } else {
                        message.error("登陆失败");
                    }

                });
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Row>
                <Col md={6}></Col>
                <Col md={12} className='box'>
                    <Col md={4}></Col>
                    <Col md={16}>
                        <Tabs defaultActiveKey="1" className='nav-tab'>
                            <TabPane tab="登陆" key="1">
                                <Form onSubmit={this.loginFormSubmit}>
                                    <Form.Item>
                                        {getFieldDecorator('username', {
                                            rules: [{ required: true, message: '请输入用户名' }],
                                        })(
                                            <Input
                                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)', fontSize: 16 }} />}
                                                placeholder="请输入用户名"
                                            />,
                                        )}
                                    </Form.Item>
                                    <Form.Item>
                                        {getFieldDecorator('password', {
                                            rules: [{ required: true, message: '请输入密码' }],
                                        })(
                                            <Input
                                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)', fontSize: 16 }} />}
                                                type="password"
                                                placeholder="请输入密码"
                                            />,
                                        )}
                                    </Form.Item>
                                    <Form.Item>
                                        <a className="login-form-forgot" href="">忘记密码？</a>
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" className="login-form-button">登陆</Button>
                                    </Form.Item>
                                </Form>
                            </TabPane>
                            <TabPane tab="注册" key="2">
                                <Register />
                            </TabPane>
                        </Tabs>
                    </Col>
                    <Col md={6}></Col>
                </Col>
                <Col md={6}></Col>
            </Row>
        )
    }
}

export default Form.create({ name: 'login' })(withRouter(Login));
