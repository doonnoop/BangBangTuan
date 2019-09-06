/*
Created by peng on 08/30/2019
*/

import React, { Component } from 'react';
import {Col, Row, Layout, Button, Descriptions} from 'antd';
import './Shop.css';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const { Sider, Content } = Layout;

class ExchangeFail extends Component{
    constructor(props) {
        super(props);
        this.state = {
            history: [1,2,3,4,5]
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


    backToGoods = () => {
        this.props.history.push('/shop');
    };

    render() {
        let time = moment().format('YYYY-MM-DD hh:mm:ss');
        console.log(time)
        return(
            <Row>
                <Col md={5} />
                <Col md={14}>
                    {
                        this.props.location.state && this.state.shippingInfo && <Layout style={{marginTop: 80}} className='exchange-info'>
                            <Sider width='45%' className='sider' style={{backgroundColor: '#f64b4c'}}>
                                <div className='div1'>兑换失败</div>
                                <div className='div2'>{this.props.location.state.aggregateScore}积分</div>
                                <div className='fail'>
                                    <Button onClick={this.backToGoods}>继续兑换其他物品》</Button>
                                </div>
                                <div>本公司不会以任何理由要求您登录银行卡信息或支付额外费用,请谨防钓鱼链接或诈骗电话</div>
                            </Sider>
                            <Content>
                                <Descriptions column={1} className='content'>
                                    <Descriptions.Item label="失败原因" className='title'>您的积分不足</Descriptions.Item>
                                    <Descriptions.Item className='info'>（建议多做任务来获取更多积分兑换商品）</Descriptions.Item>
                                    <Descriptions.Item label="收货信息">
                                        <div>{this.state.shippingInfo.consignee} {this.state.shippingInfo.phone}</div>
                                        <div>{this.state.shippingInfo.provincial} {this.state.shippingInfo.detailedAddress}</div>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="下单时间">{time}</Descriptions.Item>
                                    <Descriptions.Item label="商品名称">{this.props.location.state.commodityName}</Descriptions.Item>
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

export default withRouter(ExchangeFail);


