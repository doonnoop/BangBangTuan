/*
Created by peng on 08/19/2019
*/

import React, { Component } from 'react';
import { Row, Col, Comment, Avatar, Button, Card } from 'antd';
import storage from "../storage";
import noAuthor from '../../images/no-author.png';
import './Shop.css';
import { withRouter } from 'react-router-dom';
import ExchangeActivity from "./ExchangeActivity";
const { Meta } = Card;

class Shop extends Component{
    constructor(props) {
        super(props);
        this.state = {
            goods: [1,2,3,4]
        }
    }

    componentWillMount() {

    }

    chooseShopItem = (id) => {
        this.props.history.push("/shopitem/id")
    };

    render() {
        let headPortrait = storage.get('headPortrait');
        return(
            <Row>
                <Col md={5} />
                <Col md={14}>
                    <div className='shop-head'>
                        <Comment
                            className='points'
                            avatar={
                                <Avatar
                                    src={headPortrait ? headPortrait : noAuthor}
                                    alt="avatar"
                                />
                            }
                            author="aaa"
                            content={
                                <p>积分：23</p>
                            }
                        />
                        <Button shape='round'>兑换记录</Button>
                    </div>
                    <div>
                        <Col span={18}>
                            {
                                this.state.goods && this.state.goods.map((item, index) => {
                                    return <Col span={8} key={index} className='col'>
                                        <Card
                                            hoverable
                                            style={{ width: 190 }}
                                            bordered={false}
                                            cover={<img alt="example" src="https://i.imgur.com/qbpIXLX.jpg" />}
                                        >
                                            <Meta title="拍立得"
                                                  className='item-desc'
                                                  description={
                                                      <div>
                                                          <div>价值： 500积分</div>
                                                          <div align="center">
                                                              <Button shape='round' onClick={() => this.chooseShopItem(index)}>兑换商品</Button>
                                                          </div>
                                                      </div>
                                                  }
                                            />
                                        </Card>
                                    </Col>
                                })
                            }
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

export default withRouter(Shop);


