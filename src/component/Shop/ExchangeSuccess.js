/*
Created by peng on 08/30/2019
*/

import React, { Component } from 'react';
import {Col, Row, Layout, Button, Descriptions} from 'antd';
import './Shop.css';
import { withRouter } from 'react-router-dom'
const { Sider, Content } = Layout;

class ExchangeSuccess extends Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentWillMount() {

        console.log(this.props.location.state);
        fetch('https://api.bangneedu.com/bbtUserAddress/' + this.props.location.state.bbtUserAddressId, {
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
    }

    orderInfo = () => {
        this.props.history.push('/orderDetails/' + this.props.location.state.id);
    };

    render() {
        return(
            <Row>
                <Col md={5} />
                <Col md={14}>
                    {
                        this.props.location.state && this.state.shippingInfo && <Layout style={{marginTop: 80}} className='exchange-info'>
                            <Sider width='45%' className='sider' style={{backgroundColor: '#8bc34a'}}>
                                <div className='div1'>兑换成功</div>
                                <div className='div2'>{this.props.location.state.aggregateScore}积分</div>
                                <div className='success'><Button onClick={this.orderInfo}>查看订单详情/支付运费</Button></div>
                                <div>本公司不会以任何理由要求您登录银行卡信息或支付额外费用,请谨防钓鱼链接或诈骗电话</div>
                            </Sider>
                            <Content>
                                <Descriptions column={1} className='content'>
                                    <Descriptions.Item label="订单编号">{this.props.location.state.id}</Descriptions.Item>
                                    <Descriptions.Item label="收货信息">
                                        <div>{this.state.shippingInfo.consignee} {this.state.shippingInfo.phone}</div>
                                        <div>{this.state.shippingInfo.provincial} {this.state.shippingInfo.detailedAddress}</div>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="下单时间">{this.props.location.state.createTime}</Descriptions.Item>
                                    <Descriptions.Item label="商品名称">{this.props.location.state.commodityName}</Descriptions.Item>
                                    <Descriptions.Item label="配送时间">{this.props.location.state.deliveryTime}</Descriptions.Item>
                                </Descriptions>
                            </Content>
                        </Layout>
                    }
                </Col>
                <Col md={5} />
            </Row>
        )
    }
}

export default withRouter(ExchangeSuccess);


