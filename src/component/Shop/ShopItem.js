/*
Created by peng on 08/20/2019
*/

import React, { Component } from 'react';
import { Row, Col, Button, Card, Divider, Breadcrumb, Descriptions, InputNumber, Tabs } from 'antd';
import './ShopItem.css';
import ExchangeActivity from "./ExchangeActivity";
const { TabPane } = Tabs;

class ShopItem extends Component{
    constructor(props) {
        super(props);
        this.state = {
            changeNum: 1
        }
    }

    componentWillMount() {

    }

    numChange = (value) => {
        this.setState({
            changeNum: value
        })
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
                        <Col span={18}>
                            <div className='item-head'>
                                <Col span={10}>
                                    <Card
                                        hoverable
                                        style={{ width: 220 }}
                                        bordered={false}
                                        cover={<img alt="example" src="https://i.imgur.com/qbpIXLX.jpg" />}
                                    />
                                </Col>
                                <Col span={14}>
                                    <Descriptions title="拍立得" column={1}>
                                        <Descriptions.Item label="价值">500积分</Descriptions.Item>
                                        <Descriptions.Item label="可用积分">500积分</Descriptions.Item>
                                    </Descriptions>
                                    <Divider />
                                    <Descriptions column={1}>
                                        <Descriptions.Item label="兑换份数">
                                            <InputNumber min={1} max={5} defaultValue={1} onChange={this.numChange} />
                                        </Descriptions.Item>
                                        <Descriptions.Item>
                                            <Button shape='round'>兑换商品</Button>
                                        </Descriptions.Item>
                                    </Descriptions>
                                </Col>
                            </div>
                            <div className='item-content'>
                                <Tabs defaultActiveKey="1">
                                    <TabPane tab="商品详情" key="1">
                                        <div className='desc'>
                                            <div>复式拍立得</div>
                                            <div>哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</div>
                                            <div className='img'></div>
                                            <div>注意事项</div>
                                            <div>哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</div>
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

export default ShopItem;


