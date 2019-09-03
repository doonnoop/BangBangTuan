/*
Created by peng on 09/03/2019
*/

import React, { Component } from 'react';
import { Col, Row, Breadcrumb, Divider, Progress, Descriptions } from 'antd';
import './Order.css';

class OrderDetails extends Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentWillMount() {

    }

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
                    <div className='order-header'>
                        <div className='order-header-title'>订单详情</div>
                        <div>订单号：723847833748288</div>
                        <Divider />
                        <div className='order-header-status'>已兑换</div>
                    </div>
                    <div>
                        <Progress percent={40} showInfo={false} strokeColor='#8bc34a' strokeWidth={20} style={{zIndex: -1}} />
                        <div className='progress-text'>
                            <p>下单</p>
                            <p>兑换</p>
                            <p>配货</p>
                            <p>出库</p>
                            <p>交易完成</p>
                        </div>
                        <div className='progress-date'>
                            <p>07月15日 14：59</p>
                            <p>07月15日 14：59</p>
                        </div>
                    </div>
                    <div className='order-detail-list'>
                        <Descriptions column={3}>
                            <Descriptions.Item>dd</Descriptions.Item>
                            <Descriptions.Item>兑换小可爱刘昊然一只</Descriptions.Item>
                            <Descriptions.Item>198积分*1</Descriptions.Item>
                        </Descriptions>
                        <Divider />
                    </div>
                    <div className='order-detail-list'>
                        <Descriptions column={3}>
                            <Descriptions.Item>dd</Descriptions.Item>
                            <Descriptions.Item>兑换小可爱刘昊然一只</Descriptions.Item>
                            <Descriptions.Item>198积分*1</Descriptions.Item>
                        </Descriptions>
                        <Divider />
                    </div>
                    <div className='contact'>
                        <Descriptions column={1} title="收货信息">
                            <Descriptions.Item label="姓   名">刘昊然的小虎牙</Descriptions.Item>
                            <Descriptions.Item label="联系电话">137****0222</Descriptions.Item>
                            <Descriptions.Item label="收获地址">北京 北京市 昌平区 昌平路 哈哈哈哈哈哈哈</Descriptions.Item>
                        </Descriptions>
                        <Divider />
                    </div>
                    <div className='subtotal contact'>
                        <Descriptions column={1} >
                            <Descriptions.Item label="商品总价">427积分</Descriptions.Item>
                            <Descriptions.Item label="运费">427元</Descriptions.Item>
                            <Descriptions.Item label="实付积分">427积分</Descriptions.Item>
                        </Descriptions>
                    </div>
                </Col>
                <Col span={5} />
            </Row>
        )
    }
}

export default OrderDetails;


