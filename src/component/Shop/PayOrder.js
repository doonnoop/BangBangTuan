/*
Created by Taryn on 10/21/2019
*/

import React, { Component } from 'react';
import { Row, Col, Divider, Breadcrumb, Descriptions, message, Avatar } from 'antd';
import { withRouter } from 'react-router-dom'
import './ShopItem.css';
import storage from "../storage";
import QRCode from 'qrcode.react';

class PayOrder extends Component{
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }

    componentWillMount() {
        console.log(this.props.location.state);
        this.createPayOrder();
    }

    createPayOrder = () => {
        let body = {
            outTradeNo: this.props.location.state.id,
            body: this.props.location.state.commodityName,
            totalFee: this.props.location.state.commodityFreight * 100,
            spbillCreateIp: '192.168.1.21',
            tradeType: 'NATIVE'
        };
        fetch('https://api.bangneedu.com/pay/createOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + storage.get('token')
            },
            body: JSON.stringify(body)
        })
            .then((res) => res.json())
            .then( res => {
                console.log(res);
                if(res.codeUrl) {
                    this.setState({
                        payURL: res.codeUrl
                    });

                    let socket = new WebSocket('ws://api.bangneedu.com/myHandler/ID=' + this.props.location.state.id);
                    socket.addEventListener('open', function (event) {
                        socket.send('Hello Server!');
                    });
                    socket.addEventListener('message', function (event) {
                        console.log('Message from server', event.data);
                        if(event.data.includes('付款成功')) {
                            this.props.history.push({ pathname:'/exchangeSuccess', state: this.props.location.state });
                        } else if(event.data.includes('付款失败')) {
                            this.props.history.push({ pathname:'/payOrder', state: this.props.location.state });
                        }
                    });

                } else {
                    message.error(res.msg);
                }
            })
            .catch( err => console.log(err))
    };

    orderInfo = () => {
        this.props.history.push('/orderDetails/' + this.props.location.state.id);
    };

    render() {
        return(
            <Row style={{backgroundColor: '#ffffff', marginTop: 10}}>
                <Col md={5} />
                <Col md={14}>
                    <div className='content'>
                        <Breadcrumb className='con-header' style={{ paddingLeft: 10, fontSize: 14, marginTop: 30, marginBottom: 30}}>
                            <Breadcrumb.Item>
                                <a href="/shop">积分商城</a>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>支付商品</Breadcrumb.Item>
                        </Breadcrumb>
                        {
                            this.props.location.state && <div className='pay-content'>
                                <div className='pay-order'>
                                    <div className='pay-order-head'>
                                        <Col md={5}>
                                            <img alt="商品图片" src={this.props.location.state.commodityImage} style={{width: 120}} />
                                        </Col>
                                        <Col md={17} span={20}>
                                            <Descriptions title={this.props.location.state.commodityName} column={1}>
                                                <Descriptions.Item label="订单编号">{this.props.location.state.id}</Descriptions.Item>
                                            </Descriptions>
                                        </Col>
                                        <Col md={2}><span style={{color: '#ff6e37'}}>{this.props.location.state.commodityFreight}</span>元</Col>
                                    </div>
                                    <Divider />
                                </div>
                                {
                                    this.state.payURL && <div className='pay-container'>
                                        <div className='pay-img'>
                                            <QRCode value={this.state.payURL} />
                                        </div>
                                    </div>
                                }
                            </div>
                        }
                    </div>
                </Col>
                <Col md={5} />
            </Row>
        )
    }
}

export default withRouter(PayOrder);


