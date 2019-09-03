/*
Created by peng on 08/30/2019
*/

import React, { Component } from 'react';
import { Table, Card } from 'antd';
import './Order.css';
const { Column } = Table;

class UserOrderList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            history: [1,2,3,4,5]
        }
    }

    componentWillMount() {

    }

    render() {
        const data = [{
            key: '1',
            commodityName: "积分兑换",
            commodityPrice: '169积分',
            commodityNumber: '2',
            aggregateScore: "388积分",
            commodityImage: 'q'
        }];
        const cardTitle = <div style={{display: 'flex'}}>
            <div>收件方</div>
            <div>订单号</div>
            <div>下单时间</div>
        </div>;
        return(
            <div>
                <Table locale={{ emptyText: ' ' }} pagination={ false } className='header-only'>
                    <Column title="商品信息" key="commodityName" />
                    <Column title="积分" key="commodityPrice" />
                    <Column title="数量" key="commodityNumber" />
                    <Column title="总计" key="aggregateScore" />
                    <Column title="状态" key="action" />
                </Table>
                <Card title={cardTitle} extra={<a href="#">删除</a>} className='card' style={{margin: '10px 0 15px', border:'none'}} >
                    <Table dataSource={data} pagination={false} bordered className='card-table'>
                        <Column dataIndex="commodityName" key="commodityName"
                                render={(text, record) => (
                                    <div style={{display: 'flex'}}>
                                        <img src={record.commodityImage}/>
                                        <div>{text}</div>
                                    </div>)}
                        />
                        <Column dataIndex="commodityPrice" key="commodityPrice" />
                        <Column dataIndex="commodityNumber" key="commodityNumber" />
                        <Column dataIndex="aggregateScore" key="aggregateScore" />
                        <Column dataIndex="age" key="age" render={(text, record) => (
                            <div style={{display: 'flex'}}>
                                <a href='/orderDetails'>订单详情</a>
                            </div>)} />
                    </Table>
                </Card>
                <Card title={cardTitle} extra={<a href="#">删除</a>} className='card' style={{margin: '10px 0', border:'none'}} >
                    <Table dataSource={data} pagination={false} bordered className='card-table'>
                        <Column dataIndex="commodityName" key="commodityName"
                                render={(text, record) => (
                                    <div style={{display: 'flex'}}>
                                        <img src={record.commodityImage}/>
                                        <div>{text}</div>
                                    </div>)}
                        />
                        <Column dataIndex="commodityPrice" key="commodityPrice" />
                        <Column dataIndex="commodityNumber" key="commodityNumber" />
                        <Column dataIndex="aggregateScore" key="aggregateScore" />
                        <Column dataIndex="age" key="age" />
                    </Table>
                </Card>
                {/*<Column title="商品信息" dataIndex="commodityName" key="commodityName" />*/}
                {/*<Column title="积分" dataIndex="commodityPrice" key="commodityPrice" />*/}
                {/*<Column title="数量" dataIndex="commodityNumber" key="commodityNumber" />*/}
                {/*<Column title="总计" dataIndex="aggregateScore" key="aggregateScore" />*/}
                {/*<Column title="状态" dataIndex="age" key="age" />*/}
            </div>
        )
    }
}

export default UserOrderList;


