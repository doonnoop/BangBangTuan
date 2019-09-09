/*
Created by peng on 09/03/2019
*/

import React, { Component } from 'react';
import {Col, Row, Breadcrumb, Divider, Progress, Descriptions, Button} from 'antd';
import './Order.css';
import { withRouter } from 'react-router-dom';
import storage from "../storage";

class OrderDetails extends Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentWillMount() {
        console.log(this.props.match.params.id);
        fetch('https://api.bangneedu.com/orderForm/details/' + this.props.match.params.id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + storage.get('token')
            }})
            .then((res) => res.json())
            .then( res => {
                console.log(res);
                this.setState({
                    orderDetail: res.data
                });
                fetch('https://api.bangneedu.com/bbtUserAddress/' + res.data.bbtUserAddressId, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }})
                    .then((res) => res.json())
                    .then( res => {
                        console.log(res.data);
                        this.setState({
                            shippingInfo: res.data
                        });
                    })
                    .catch( err => console.log(err))
            })
            .catch( err => console.log(err))

    }

    orderStatus = (status) => {
        let text;
        if(status === "1") {
            text = "已下单，待支付运费"
        } else if(status === "2") {
            text = "已兑换"
        } else if(status === "3") {
            text = "正在配货"
        } else if(status === "4") {
            text = "等待确认收货"
        } else if(status === "5") {
            text = "交易完成"
        }
        return <div className='order-header-status'>{text}</div>
    };
    orderPercent = (status) => {
        let percent;
        if(status === "1") {
            percent = 20
        } else if(status === "2") {
            percent = 40
        } else if(status === "3") {
            percent = 60
        } else if(status === "4") {
            percent = 80
        } else if(status === "5") {
            percent = 100
        }
        return percent;
    };
    orderAction = (status) => {
        let text;
        if(status === "1") {
            text = "去支付"
        } else if(status === "4") {
            text = "确认收货"
        }
        return <div className='order-action-button'><Button>{text}</Button></div>
    };

    render() {
        return(
            <Row>
                <Col span={5} />
                <Col span={14}>
                    <Breadcrumb className='con-header' style={{ paddingLeft: 10, fontSize: 14, marginTop: 30, marginBottom: 30}}>
                        <Breadcrumb.Item>个人中心</Breadcrumb.Item>
                        <Breadcrumb.Item>积分商城</Breadcrumb.Item>
                        <Breadcrumb.Item>订单详情</Breadcrumb.Item>
                    </Breadcrumb>
                    {
                        this.state.orderDetail && this.state.shippingInfo &&
                        <div>
                            <div className='order-header'>
                                <div className='order-header-title'>订单详情</div>
                                <div>订单号：{this.state.orderDetail.id}</div>
                                <Divider />
                                {this.orderStatus(this.state.orderDetail.orderFormStatus)}
                            </div>
                            <div>
                                <Progress percent={this.orderPercent(this.state.orderDetail.orderFormStatus)} showInfo={false} strokeColor='#8bc34a' strokeWidth={20} style={{zIndex: -1}} />
                                <div className='progress-text'>
                                    <p>下单</p>
                                    <p>支付</p>
                                    <p>配货</p>
                                    <p>出库</p>
                                    <p>交易完成</p>
                                </div>
                                <div className='progress-date'>
                                    <p>{this.state.orderDetail.createTime ? this.state.orderDetail.createTime : ""}</p>
                                    <p>{this.state.orderDetail.paymentTime ? this.state.orderDetail.paymentTime : ""}</p>
                                    <p>{this.state.orderDetail.outboundTime ? this.state.orderDetail.outboundTime : ""}</p>
                                    <p>{this.state.orderDetail.distributionTime ? this.state.orderDetail.distributionTime : ""}</p>
                                    <p>{this.state.orderDetail.completeTime ? this.state.orderDetail.completeTime : ""}</p>
                                </div>
                            </div>
                            <div className='contact'>
                                <Descriptions column={1} title="收货信息">
                                    <Descriptions.Item label="姓   名">{this.state.shippingInfo.consignee}</Descriptions.Item>
                                    <Descriptions.Item label="联系电话">{this.state.shippingInfo.phone}</Descriptions.Item>
                                    <Descriptions.Item label="收获地址">{this.state.shippingInfo.provincial} {this.state.shippingInfo.detailedAddress}</Descriptions.Item>
                                </Descriptions>
                                <Divider />
                            </div>
                            <div className='subtotal contact'>
                                <Descriptions column={1} >
                                    <Descriptions.Item label="商品总价">{this.state.orderDetail.aggregateScore}积分</Descriptions.Item>
                                    <Descriptions.Item label="运费">{this.state.orderDetail.commodityFreight}元</Descriptions.Item>
                                    <Descriptions.Item label="实付积分">{this.state.orderDetail.aggregateScore}积分</Descriptions.Item>
                                </Descriptions>
                            </div>
                            {this.orderAction(this.state.orderDetail.orderFormStatus)}
                        </div>
                    }
                </Col>
                <Col span={5} />
            </Row>
        )
    }
}

export default withRouter(OrderDetails);


