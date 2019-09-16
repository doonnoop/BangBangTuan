/*
Created by peng on 08/29/2019
*/

import React, { Component } from 'react';
import {Row, Col, Button, Modal, Divider, Breadcrumb, Icon, Descriptions, List, Form, Input, message} from 'antd';
import './ShopItem.css';
import {  withRouter } from 'react-router-dom';
import { pcaa } from 'area-data';
import { AreaCascader } from 'react-area-linkage';
import 'react-area-linkage/dist/index.css';
import storage from "../storage";
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
        console.log(this.props.location.state);
        fetch('https://api.bangneedu.com/commodity/' + this.props.location.state.id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }})
            .then((res) => res.json())
            .then( res => {
                console.log(res);
                this.setState({
                    commodity: res.data,
                    totalAmount : res.data.commodityPrice * this.props.location.state.num
                });
                // console.log(this.state.totalAmount)
            })
            .catch( err => console.log(err))
        this.getUserAddressed();
    }

    getUserAddressed = () => {
        fetch('https://api.bangneedu.com/bbtUserAddress', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + storage.get('token')
            }})
            .then((res) => res.json())
            .then( res => {
                console.log(res);
                this.setState({
                    addressBook: res.data
                });
                // console.log(this.state.totalAmount)
            })
            .catch( err => console.log(err))
    };

    showModal = () => {
        this.setState({ visible: true });
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    handleSelectedChange = (e) => {
        console.log(e)
    };

    submitAddress = () => {
        this.setState({
            confirmLoading: true,
        });
        const form = this.form;
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            }
            let area = [];
            for (let i = 0; i < values.provincial.length; i++){
                area[i] = Object.values(values.provincial[i])[0];
            }
            values.provincial = area.join(' ');
            if(values.postalCode === undefined) {
                delete values.postalCode;
            }
            console.log('Received values of form: ', values);
            fetch('https://api.bangneedu.com/bbtUserAddress', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + storage.get('token')
                },
                body: JSON.stringify(values)
            })
                .then((res) => res.json())
                .then( res => {
                    console.log(res);
                    this.setState({
                        visible: false,
                        confirmLoading: false,
                    });
                    this.getUserAddressed();
                })
                .catch( err => console.log(err))
            form.resetFields();
        });

    };

    saveFormRef = (form) => {
        this.form = form;
    };

    ConformExchange = () => {
        let body = this.state.commodity;
        delete body.commodityDetails;
        delete body.commodityInventory;
        body.commodityNumber = this.props.location.state.num;
        body.bbtUserAddressId = this.state.bbtUserAddressId;
        body.commodityId = body.id;
        delete body.id;
        body.aggregateScore = this.state.totalAmount;

        console.log(body);

        if(!this.state.bbtUserAddressId) {
            message.error('请选择地址');
        } else {
            fetch('https://api.bangneedu.com/orderForm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + storage.get('token')
                },
                body: JSON.stringify(body)
            })
                .then((res) => res.json())
                .then( res => {
                    console.log(res.data);
                    let data = res.data;
                    if (res.status === 500) {
                        this.props.history.push({ pathname:'/exchangeFail', state: body });
                    } else if(res.status === 200 && data) {
                        this.props.history.push({ pathname:'/exchangeSuccess', state: data });
                    }

                })
                .catch( err => console.log(err))
        }
    };

    setShippingAddress = (bbtUserAddressId) => {
        this.setState({
            bbtUserAddressId: bbtUserAddressId
        })
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
        const defaultArea=['110000','110100','110101'];
        return(
            <Row style={{backgroundColor: '#ffffff', marginTop: 10}}>
                <Col md={5} />
                <Col md={14}>
                    <div className='content'>
                        <Breadcrumb className='con-header' style={{ paddingLeft: 10, fontSize: 14, marginTop: 30, marginBottom: 30}}>
                            <Breadcrumb.Item>
                                <a href="/shop">积分商城</a>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <a href={"/shopitem/"+ this.props.location.state.id}>商品详情</a>
                            </Breadcrumb.Item>
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
                                        onOk={this.submitAddress}
                                        confirmLoading={confirmLoading}
                                        onCancel={this.handleCancel}
                                        okText="保存新地址"
                                        cancelText="取消"
                                    >
                                        <Form layout="vertical" {...formItemLayout}>
                                            <FormItem label="所在地区">
                                                {getFieldDecorator('provincial', {
                                                    rules: [{ required: true, message: '请选择所在地区!' }],
                                                })(
                                                    <AreaCascader type='all' level={1} defaultArea={defaultArea} onChange={this.handleSelectedChange} data={pcaa} />
                                                )}
                                            </FormItem>
                                            <FormItem label="详细地址">
                                                {getFieldDecorator('detailedAddress', {
                                                    rules: [{required: true, message: '请输入详细地址!' }]
                                                })(<Input type="textarea" row={3} placeholder="无需重复填写省市区" />)}
                                            </FormItem>
                                            <FormItem label="收货人姓名">
                                                {getFieldDecorator('consignee', {
                                                    rules: [{ required: true, message: '请输入收货人姓名!' }],
                                                })(<Input placeholder="请使用真实姓名" />)}
                                            </FormItem>
                                            <FormItem label="手机号码">
                                                {getFieldDecorator('phone', {
                                                    rules: [{ required: true, message: '请输入手机号码!' }],
                                                })(<Input placeholder="手机号码、电话号码必须填写" />)}
                                            </FormItem>
                                            <FormItem label="邮政编码">
                                                {getFieldDecorator('postalCode')(<Input placeholder="选填" />)}
                                            </FormItem>

                                        </Form>
                                    </Modal>
                                </div>
                            </div>
                            <Divider style={{margin: '10px 0'}} />
                            {
                                this.state.addressBook &&
                                <List locale={{ emptyText: '你还没有添加地址哦～' }}
                                      dataSource={this.state.addressBook}
                                      className='address-book'
                                      renderItem={item => (
                                          <List.Item>
                                              <Button onClick={() => this.setShippingAddress(item.id)}>{item.consignee}</Button>
                                              <div>{item.provincial}</div>
                                              <div>{item.detailedAddress}</div>
                                              <div>{item.phone}</div>
                                              {/*<a>编辑</a>*/}
                                          </List.Item>
                                      )}
                                />
                            }
                        </div>
                        <div>
                            <div className='title'>确认商品信息</div>
                            <Divider style={{margin: '10px 0'}} />
                            {
                                this.state.totalAmount && this.state.commodity && <div>
                                    <Descriptions layout="vertical" bordered column={5} className='order-details'>
                                        <Descriptions.Item label="商品信息">
                                            <img alt="商品图片" src={this.state.commodity.commodityImage} />{this.state.commodity.commodityName}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="规格">重量：{this.state.commodity.commoditySpecifications}</Descriptions.Item>
                                        <Descriptions.Item label="单件商品积分">{this.state.commodity.commodityPrice}积分</Descriptions.Item>
                                        <Descriptions.Item label="数量">{this.props.location.state.num}</Descriptions.Item>
                                        <Descriptions.Item label="消费总积分">{this.state.totalAmount}积分</Descriptions.Item>
                                    </Descriptions>
                                    <div className='checkout-details'>
                                        <Descriptions column={1} className='checkout'>
                                            <Descriptions.Item label="2件商品，总消费积分">{this.state.totalAmount}积分</Descriptions.Item>
                                            <Descriptions.Item label="价格">¥ {this.state.commodity.commodityFreight}</Descriptions.Item>
                                            <Descriptions.Item label="应付金额">{this.state.totalAmount}积分 + {this.state.commodity.commodityFreight}元</Descriptions.Item>
                                        </Descriptions>
                                        <Button onClick={this.ConformExchange}>确认兑换</Button>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </Col>
                <Col md={5} />
            </Row>
        )
    }
}

export default Form.create({ name: 'address' })(withRouter(OrderInfo));


