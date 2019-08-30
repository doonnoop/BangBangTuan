/*
Created by peng on 08/30/2019
*/

import React, { Component } from 'react';
import {Col, Row, Layout, Button, Descriptions} from 'antd';
import './Shop.css';
const { Sider, Content } = Layout;

class ExchangeFail extends Component{
    constructor(props) {
        super(props);
        this.state = {
            history: [1,2,3,4,5]
        }
    }

    componentWillMount() {

    }

    render() {
        return(
            <Row>
                <Col md={5} />
                <Col md={14}>
                    <Layout style={{marginTop: 80}} className='exchange-info'>
                        <Sider width='45%' className='sider' style={{backgroundColor: '#f64b4c'}}>
                            <div className='div1'>兑换失败</div>
                            <div className='div2'>477积分</div>
                            <div className='fail'>
                                <Button>查看订单详情</Button>
                                <Button>继续兑换其他物品》</Button>
                            </div>
                            <div>本公司不会以任何理由要求您登录银行卡信息或支付额外费用,请谨防钓鱼链接或诈骗电话</div>
                        </Sider>
                        <Content>
                            <Descriptions column={1} className='content'>
                                <Descriptions.Item label="失败原因" className='title'>您的积分不足</Descriptions.Item>
                                <Descriptions.Item className='info'>（建议多做任务来获取更多积分兑换商品）</Descriptions.Item>
                                <Descriptions.Item label="收货信息">
                                    <div>刘昊然的小虎牙 131****0224</div>
                                    <div>北京 北京市 昌平区 昌平路 哈哈哈哈哈哈哈</div>
                                </Descriptions.Item>
                                <Descriptions.Item label="下单时间">2019-10-10 20:58:30</Descriptions.Item>
                                <Descriptions.Item label="商品名称">兑换刘昊然小可爱一只</Descriptions.Item>
                            </Descriptions>
                        </Content>
                    </Layout>
                </Col>
                <Col md={5} />
            </Row>
        )
    }
}

export default ExchangeFail;


