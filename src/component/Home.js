import React, { Component } from 'react';
import home1 from '../images/home1.png';
import home2 from '../images/home2.png';
import './Home.css';
import testImg from '../images/author.jpg';
import actImg from '../images/act.png';
import {Row, Col, Carousel, Calendar, Descriptions } from "antd";
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
        }
    }

    onChange = date => this.setState({ date })

    render() {
        return <div className='home'>
            <div className='carousel-container'>
                <Carousel autoplay>
                    <div>
                        <img  src={home2} alt="First slide"/>
                    </div>
                    <div>
                        <img  src={home1} alt="Third slide"/>
                    </div>
                </Carousel>
            </div>
            <Row gutter={8} className='home-container'>
                <Col md={4} className='left-container'></Col>
                <Col md={14}>
                    <div className='mid-header'>
                        <img src={actImg} alt=''/>
                        <div>实/战/演/练</div>
                        <img src={actImg} alt=''/>
                    </div>
                    <div className='mid-project'>
                        <Row>
                            <Col md={6}>
                                <img />
                            </Col>
                            <Col md={18}>
                                <Descriptions title="VUE后台项目管理" column={1} className='pro-detail'>
                                    <Descriptions.Item label="技术栈: ">XX</Descriptions.Item>
                                    <Descriptions.Item label="代练价格: ">10元/练一次</Descriptions.Item>
                                    <Descriptions.Item label="代练时间: ">晚上8点开始练完为止</Descriptions.Item>
                                </Descriptions>
                                <button>查看详情</button>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col md={6}>
                    <div className='cal-box'>
                        <div className='cal-head'>棒棒团学习日程表</div>
                            <Calendar fullscreen={false}  />
                        <div className='cal-foot'>
                            <div className='left-foot'>
                                <div>今日安排</div>
                            </div>
                            <div className='right-foot'>
                                <img src={testImg} alt=''/>
                                <p>扫一扫获得更多资讯</p>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    }
}

export default Home;
