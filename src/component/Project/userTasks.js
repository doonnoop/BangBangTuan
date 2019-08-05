import React, { Component } from 'react';
import {Descriptions, Tabs, Divider, Button} from "antd";
import storage from "../storage";
import './userTask.css';
const { TabPane } = Tabs;

class UserTasks extends Component{
    componentWillMount() {
        let token = storage.get('token');
        if (token) {
            fetch('https://api.bangneedu.com/projectTaskUser/1', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + token
                }})
                .then((res) => res.json())
                .then( res => {
                    console.log(res);
                    this.setState({
                        workingTacks: res.data
                    });
                })
                .catch( err => console.log(err))
            fetch('https://api.bangneedu.com/projectTaskUser/2', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + token
                }})
                .then((res) => res.json())
                .then( res => {
                    console.log(res);
                    this.setState({
                        workedTacks: res.data
                    });
                })
                .catch( err => console.log(err))
        }
    }
    render() {
        return <Tabs defaultActiveKey="1" className='myTasks'>
            <TabPane tab="未完成任务" key="1">
                <div className='workingTask'>
                    <div>
                        <Descriptions title={
                            <div>
                                任务2：哈哈哈哈
                                <div style={{float: 'right', fontWeight: 400, fontSize: 14}}>你已开始了：</div>
                            </div>
                        } column={1}>
                            <Descriptions.Item label="项目来自">工艺猫项目系统</Descriptions.Item>
                        </Descriptions>
                        <Button type="danger" shape='round' className='finish-btn'>完成任务</Button>
                        <Divider className='custom-divider'/>
                    </div>
                </div>
            </TabPane>
            <TabPane tab="已完成任务" key="2">
                <div className='workingTask'>
                    <Descriptions title={
                        <div>
                            任务2：哈哈哈哈  <span style={{color: '#05be60', fontSize: 14}}> (已完成)</span>
                            <div style={{float: 'right', fontWeight: 400, fontSize: 14}}>你一共用了：</div>
                        </div>
                     } column={1}>
                        <Descriptions.Item label="项目来自">工艺猫项目系统</Descriptions.Item>
                        <Descriptions.Item label="任务评价">哈哈哈哈哈哈哈哈啊啊啊啊啊啊啊</Descriptions.Item>
                    </Descriptions>
                    <Divider />
                </div>
                <div className='workingTask'>
                    <Descriptions title={
                        <div>
                            任务2：哈哈哈哈  <span style={{color: '#05be60', fontSize: 14}}> (已完成)</span>
                            <div style={{float: 'right', fontWeight: 400, fontSize: 14}}>你一共用了：</div>
                        </div>
                    } column={1}>
                        <Descriptions.Item label="项目来自">工艺猫项目系统</Descriptions.Item>
                        <Descriptions.Item label="任务评价">哈哈哈哈哈哈哈哈啊啊啊啊啊啊啊</Descriptions.Item>
                    </Descriptions>
                    <Divider />
                </div>
            </TabPane>
        </Tabs>
    }
}

export default UserTasks;
