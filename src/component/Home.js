import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';
import home1 from '../images/home1.png';
import home2 from '../images/home2.png';
import Calendar from 'react-calendar';
import './Home.css';
import testImg from '../images/author.jpg';
import actImg from '../images/act.png';

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
                <Carousel>
                    <Carousel.Item>
                        <img className="d-block w-100" src={home2} alt="First slide"/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="d-block w-100" src={home1} alt="Third slide"/>
                    </Carousel.Item>
                </Carousel>
            </div>
            <div className='home-container'>
                <div className='left-container'>

                </div>
                <div className='middle-container'>
                    <div className='mid-header'>
                        <img src={actImg} alt=''/>
                        <div>实/战/演/练</div>
                        <img src={actImg} alt=''/>
                    </div>
                    <div className='mid-project'>
                        <img/>
                        <div className='pro-detail'>
                            <div className='pro-name'>VUE后台项目管理</div>
                            <div>技术栈： XX</div>
                            <div>代练价格： 10元/练一次</div>
                            <div>代练时间： 晚上8点开始练完为止</div>
                            <button>查看详情</button>
                        </div>
                    </div>
                </div>
                <div className='right-container'>
                    <div className='cal-box'>
                        <div className='cal-head'>棒棒团学习日程表</div>
                        <Calendar
                            onChange={this.onChange}
                            value={this.state.date}
                            calendarType="Hebrew"
                            className='calender'
                            locale='zn-ch'
                            prevLabel='' prev2Label='' nextLabel='' next2Label=''
                            // formatShortWeekday={value => ['S', 'M', 'T', 'W', 'T', 'F', 'S'][value.getDay()]}
                        />
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
                </div>
            </div>
        </div>
    }
}

export default Home;