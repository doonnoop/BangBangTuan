/*
Created by peng on 08/20/2019
*/

import React, { Component } from 'react';
import {Row, Col, Button, Card, Divider, Breadcrumb, Descriptions, InputNumber, Tabs, message} from 'antd';
import './ShopItem.css';
import ExchangeActivity from "./ExchangeActivity";
import {withRouter} from 'react-router-dom';
import storage from "../storage";
const { TabPane } = Tabs;

class ShopItem extends Component{
    constructor(props) {
        super(props);
        this.state = {
            changeNum: 1
        }
    }

    componentWillMount() {
        console.log(this.props.match.params.id);
        fetch('https://api.bangneedu.com/commodity/' + this.props.match.params.id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }})
            .then((res) => res.json())
            .then( res => {
                console.log(res);
                this.setState({
                    commodity: res.data
                });
            })
            .catch( err => console.log(err))
    }

    numChange = (value) => {
        this.setState({
            changeNum: value
        })
    };

    orderItem = () => {
        if(storage.get('token')) {
            this.props.history.push({ pathname:'/orderInfo',state:{id: this.props.match.params.id, num: this.state.changeNum} })
        } else {
            message.error("请登录后进行兑换")
        }

    };

    render() {
        return(
            <Row>
                <Col md={5} />
                <Col md={14}>
                    <div className='content'>
                        <Breadcrumb className='con-header' style={{ paddingLeft: 10, fontSize: 14, marginTop: 30, marginBottom: 30}}>
                            <Breadcrumb.Item>
                                <a href="/shop">积分商城</a>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>商品详情</Breadcrumb.Item>
                        </Breadcrumb>
                        {
                            this.state.commodity && <Col span={18}>
                                <div className='item-head'>
                                    <Col span={10}>
                                        <Card
                                            hoverable
                                            style={{ width: 220 }}
                                            bordered={false}
                                            cover={<img alt="商品图片" src={this.state.commodity.commodityImage} />}
                                        />
                                    </Col>
                                    <Col span={14}>
                                        <Descriptions title={this.state.commodity.commodityName} column={1}>
                                            <Descriptions.Item label="价值">{this.state.commodity.commodityPrice}积分</Descriptions.Item>
                                            <Descriptions.Item label="运费">{this.state.commodity.commodityFreight}</Descriptions.Item>
                                        </Descriptions>
                                        <Divider />
                                        <Descriptions column={1}>
                                            <Descriptions.Item label="兑换份数">
                                                <InputNumber min={1} max={10000} defaultValue={1} onChange={this.numChange} />
                                            </Descriptions.Item>
                                            <Descriptions.Item>
                                                <Button shape='round' onClick={this.orderItem}>兑换商品</Button>
                                            </Descriptions.Item>
                                        </Descriptions>
                                    </Col>
                                </div>
                                <div className='item-content'>
                                    <Tabs defaultActiveKey="1">
                                        <TabPane tab="商品详情" key="1">
                                            <div className='desc'>
                                                <div>{this.state.commodity.commodityName}</div>
                                                <div>{this.state.commodity.commoditySpecifications}</div>
                                                <div className='img'>
                                                    <img alt="商品图片" src={this.state.commodity.commodityImage} />
                                                </div>
                                                <div>注意事项</div>
                                                <div>{this.state.commodity.commodityDetails}</div>
                                            </div>
                                        </TabPane>
                                        {/*<TabPane tab="Tab 2" key="2">*/}
                                        {/*    Content of Tab Pane 2*/}
                                        {/*</TabPane>*/}
                                        {/*<TabPane tab="Tab 3" key="3">*/}
                                        {/*    Content of Tab Pane 3*/}
                                        {/*</TabPane>*/}
                                    </Tabs>
                                </div>
                            </Col>
                        }

                        <Col span={6}>
                            <ExchangeActivity />
                        </Col>
                    </div>
                </Col>
                <Col md={5} />
            </Row>
        )
    }
}

export default withRouter(ShopItem);


