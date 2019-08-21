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
            history: [1,2,3,4,5]
        }
    }

    componentWillMount() {

    }

    render() {
        return(
            <div className='sider'>
                <Divider>兑换动态</Divider>
                {
                    this.state.history && this.state.history.map((item, index) => {
                        return <div key={index}>
                            <div>刘昊然的虎牙在我手里</div>
                            <div>兑换了 <span className='mainColor'>拍立得</span></div>
                            <Divider />
                        </div>
                    })
                }
            </div>
        )
    }
}

export default ExchangeActivity;


