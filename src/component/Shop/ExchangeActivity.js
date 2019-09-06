/*
Created by peng on 08/20/2019
*/

import React, { Component } from 'react';
import { Divider } from 'antd';
import './Shop.css';

class ExchangeActivity extends Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentWillMount() {
        fetch('https://api.bangneedu.com/orderForm', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((res) => res.json())
            .then( res => {
                console.log(res);
                this.setState({
                    history: res.data
                })
            })
            .catch( err => console.log(err))
    }

    render() {
        return(
            <div className='sider'>
                <Divider>兑换动态</Divider>
                {
                    this.state.history && this.state.history.map((item, index) => {
                        return <div key={index}>
                            <div>{item.name}</div>
                            <div>兑换了 <span className='mainColor'>{item.commodityName}</span></div>
                            <Divider />
                        </div>
                    })
                }
            </div>
        )
    }
}

export default ExchangeActivity;


