/*
Created by peng on 08/29/2019
*/

import React, { Component } from 'react';
import { Row, Col, Button, Modal, Divider, Breadcrumb, Icon, Descriptions, List, Form, Input } from 'antd';
import './ShopItem.css';
import {  withRouter } from 'react-router-dom';
import { pcaa } from 'area-data';
import { AreaCascader } from 'react-area-linkage';
import 'react-area-linkage/dist/index.css';
const FormItem = Form.Item;

class OrderInfo extends Component{
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            confirmLoading: false,
        }
    }

    componentWillMount() {

    }

    showModal = () => {
        this.setState({ visible: true });
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    handleSelectedChange = () => {

    };

    handleOk = () => {
        this.setState({
            confirmLoading: true,
        });
        const form = this.form;
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log('Received values of form: ', values);
            setTimeout(() => {
                this.setState({
                    visible: false,
                    confirmLoading: false,
                });
            }, 2000);
            // form.resetFields();
            // this.setState({ visible: false });
            // createProjects(values).then((res) => {
            //     console.log(res);
            //     this.props.start();
            // });
        });

    };

    saveFormRef = (form) => {
        this.form = form;
    };

    ConformExchange = () => {
        // this.props.history.push("/exchangeSuccess");
        this.props.history.push("/exchangeFail");
    };

    render() {
        const { visible, confirmLoading } = this.state;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
                md: { span: 5 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
                md: { span: 16 }
            },
        };
        const defaultArea=['440000','440300','440305'];
        return(
            <Row style={{backgroundColor: '#ffffff', marginTop: 10}}>
                <Col md={5} />
                <Col md={14}>
                    <div className='content'>
                        <Breadcrumb className='con-header' style={{ paddingLeft: 10, fontSize: 14, marginTop: 30, marginBottom: 30}}>
                            <Breadcrumb.Item>
                                <a href="/shop">积分商城</a>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>商品详情</Breadcrumb.Item>
                            <Breadcrumb.Item>订单信息</Breadcrumb.Item>
                        </Breadcrumb>
                        <div>
                            <div className='receiver'>
                                <div className='title'>收货人信息</div>
                                <div>
                                    <Button onClick={this.showModal} style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center'}}>
                                        <Icon type="plus" style={{ display: 'inline-block', verticalAlign: 'middle' }} />新增收货地址
                                    </Button>
                                    <Modal
                                        title="新增收货地址"
                                        visible={visible}
                                        onOk={this.handleOk}
                                        confirmLoading={confirmLoading}
                                        onCancel={this.handleCancel}
                                        okText="保存新地址"
                                        cancelText="取消"
                                    >
                                        <Form layout="vertical" {...formItemLayout}>
                                            <FormItem label="所在地区">
                                                {getFieldDecorator('name', {
                                                    rules: [{ required: true, message: '请输入项目名称!' }],
                                                })(
                                                    <AreaCascader type='all' level={1} defaultArea={defaultArea} onChange={this.handleSelectedChange} data={pcaa} />
                                                )}
                                            </FormItem>
                                            <FormItem label="详细地址">
                                                {getFieldDecorator('details', {
                                                    rules: [{required: true, message: '请输入详细地址!' }]
                                                })(<Input type="textarea" row={3} placeholder="无需重复填写省市区" />)}
                                            </FormItem>
                                            <FormItem label="收货人姓名">
                                                {getFieldDecorator('technology', {
                                                    rules: [{ required: true, message: '请输入收货人姓名!' }],
                                                })(<Input placeholder="请使用真实姓名" />)}
                                            </FormItem>
                                            <FormItem label="手机号码">
                                                {getFieldDecorator('hh', {
                                                    rules: [{ required: true, message: '请输入手机号码!' }],
                                                })(<Input placeholder="手机号码、电话号码必须填写" />)}
                                            </FormItem>
                                            <FormItem label="邮政编码编码">
                                                {getFieldDecorator('aa', {
                                                    rules: [{ message: '请输入技术栈!' }],
                                                })(<Input placeholder="选填" />)}
                                            </FormItem>

                                        </Form>
                                    </Modal>
                                </div>
                            </div>
                            <Divider style={{margin: '10px 0'}} />
                            <List
                                renderItem={item => (
                                    <List.Item>

                                    </List.Item>
                                )}
                            />
                        </div>
                        <div>
                            <div className='title'>确认商品信息</div>
                            <Divider style={{margin: '10px 0'}} />
                            <div>
                                <Descriptions layout="vertical" bordered column={5} className='order-details'>
                                    <Descriptions.Item label="商品信息">
                                        <img alt="example" src="https://i.imgur.com/qbpIXLX.jpg" />拍立得
                                    </Descriptions.Item>
                                    <Descriptions.Item label="规格">重量：60kg</Descriptions.Item>
                                    <Descriptions.Item label="单件商品积分">169积分</Descriptions.Item>
                                    <Descriptions.Item label="数量">2</Descriptions.Item>
                                    <Descriptions.Item label="消费总积分">338积分</Descriptions.Item>
                                </Descriptions>
                                <div className='checkout-details'>
                                    <Descriptions column={1} className='checkout'>
                                        <Descriptions.Item label="2件商品，总消费积分">338积分</Descriptions.Item>
                                        <Descriptions.Item label="运费">¥ 0.00</Descriptions.Item>
                                        <Descriptions.Item label="应付金额">338积分</Descriptions.Item>
                                    </Descriptions>
                                    <Button onClick={this.ConformExchange}>确认兑换</Button>
                                </div>

                            </div>
                        </div>
                    </div>
                </Col>
                <Col md={5} />
            </Row>
        )
    }
}

export default Form.create({ name: 'address' })(withRouter(OrderInfo));


