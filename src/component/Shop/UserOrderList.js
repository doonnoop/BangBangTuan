/*
Created by peng on 08/30/2019
*/

import React, { Component } from 'react';
import {Button, Card, Descriptions, message} from 'antd';
import './Order.css';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/zh-cn';
import storage from "../storage";
moment.locale('zh-cn');

class UserOrderList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            orders: this.props.orders
        }
    }

    componentWillMount() {

    }

    deleteOrder = (id, index) => {
        fetch('https://api.bangneedu.com/orderForm/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + storage.get('token')
            }})
            .then((res) => res.json())
            .then( res => {
                console.log(res);
                this.setState({
                    orders: this.state.orders.splice(index, 1)
                });
                message.success('删除成功')
            })
            .catch( err => console.log(err))
    };

    orderDetails = (id) => {
        this.props.history.push('/orderDetails/' + id);
    };

    orderActions = (status, id) => {
        if(status === "1") {
            return <div className='order-action'>
                <div style={{color: '#ff6e37'}}>待支付</div>
                <div onClick={() => this.orderDetails(id)} style={{cursor: 'pointer'}}>订单详情</div>
                <Button>立即支付</Button>
            </div>;
        }
        else if(status === "2") {
            return <div className='order-action'>
                <div style={{color: '#0bba76'}}>待配货</div>
                <div onClick={() => this.orderDetails(id)} style={{cursor: 'pointer'}}>订单详情</div>
            </div>;
        }
        else if(status === "3") {
            return <div className='order-action'>
                <div style={{color: '#0bba76'}}>待发货</div>
                <div onClick={() => this.orderDetails(id)} style={{cursor: 'pointer'}}>订单详情</div>
            </div>;
        }
        else if(status === "4") {
            return <div className='order-action'>
                <div style={{color: '#2e7ff8'}}>待收货</div>
                <div onClick={() => this.orderDetails(id)} style={{cursor: 'pointer'}}>订单详情</div>
                <Button>确认收货</Button>
            </div>;
        }
        else if(status === "5") {
            return <div className='order-action'>
                <div>交易成功</div>
                <div onClick={() => this.orderDetails(id)} style={{cursor: 'pointer'}}>订单详情</div>
                <div style={{color: '#b9a26c'}}>再次兑换</div>
            </div>;
        }
    };

    render() {
        return(
            <div>
                <div className='header-only'>
                    <div>商品信息</div>
                    <div style={{marginLeft: 90}}>积分</div>
                    <div>数量</div>
                    <div>总计</div>
                    <div>状态</div>
                </div>
                {
                    this.props.orders && this.props.orders.map((item, index) => {
                        return <Card
                            title={
                                <div style={{display: 'flex'}} className='order-list-title'>
                                    <div>收件方 : <span>{item.consignee}</span></div>
                                    <div>订单号 : <span>{item.id}</span></div>
                                    <div>下单时间 : <span>{moment(item.createTime).format("YYYY-MM-DD")}</span></div>
                                </div>
                            } key={index}
                            extra={<div onClick={() => this.deleteOrder(item.id, index)} style={{color: '#f02b2b', cursor: 'pointer'}}>删除</div>}
                            className='card' style={{margin: '10px 0 15px', border:'none'}} >
                            <Descriptions bordered column={5} className='table-list'>
                                <Descriptions.Item>
                                    <div style={{display: 'flex'}}>
                                        <img src={item.commodityImage} alt='商品图片'/>
                                        <div>{item.commodityName}</div>
                                   </div></Descriptions.Item>
                                <Descriptions.Item>{item.commodityPrice}积分</Descriptions.Item>
                                <Descriptions.Item>{item.commodityNumber}</Descriptions.Item>
                                <Descriptions.Item>{item.aggregateScore}积分</Descriptions.Item>
                                <Descriptions.Item>
                                    <div className='order-action'>
                                        {this.orderActions(item.orderFormStatus, item.id)}
                                    </div>
                                </Descriptions.Item>
                            </Descriptions>
                        </Card>
                    })
                }
            </div>
        )
    }
}

export default withRouter(UserOrderList);


