import React, { Component } from 'react';
import './Profile.css';
import { Container, Row, Col } from 'react-bootstrap';
import '../Clock/Clock.css';
import ClockItem from '../Clock/clock-list';
import ArticleItem from '../Articles/article-list';
import storage from '../storage';
import { withRouter } from 'react-router-dom';

class Profile extends Component{
    constructor(props, context) {
        super(props, context);
        this.state = {
            key: 'home',
            tabs:[
                {tabName:"动态",id:1},
                {tabName:"学习日记",id:2},
                {tabName:"个人中心",id:3},
                {tabName:"收藏",id:4},
            ],
            currentIndex:1,
        };
    }

    componentWillMount() {
        let token = storage.get('token');
        this.setState({
            token: token
        });
        if (token) {
            fetch('https://api.bangneedu.com/user', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + token
                }})
                .then((res) => res.json())
                .then( res => {
                    console.log(res.data);
                    this.setState({
                        userInfo: res.data
                    });
                })
                .catch( err => console.log(err));
            fetch('https://api.bangneedu.com/punchTheClock/user?current=0&size=10', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + token
                }})
                .then((res) => res.json())
                .then( res => {
                    console.log(res.data.records);
                    this.setState({
                        userDaka: res.data.records
                    });
                })
                .catch( err => console.log(err))
            fetch('https://api.bangneedu.com/article/user?current=0&size=10', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + token
                }})
                .then((res) => res.json())
                .then( res => {
                    console.log(res.data.records);
                    this.setState({
                        userArticle: res.data.records
                    });
                })
                .catch( err => console.log(err))
            // fetch('https://api.bangneedu.com/projectTaskUser/1', {
            //     method: 'GET',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         "Authorization": "Bearer " + token
            //     }})
            //     .then((res) => res.json())
            //     .then( res => {
            //         console.log(res);
            //         // this.setState({
            //         //     userArticle: res.data.records
            //         // });
            //     })
            //     .catch( err => console.log(err))
        } else {
            storage.set('token', false);
        }

    }

    tabChoiced=(id)=>{
        //tab切换到方法
        this.setState({
            currentIndex:id
        });
    };

    handleClick = (id) => {
        this.props.history.push("/userProfile/" + id)
    };

    render() {
        let _this=this;
        let isBox1Show=this.state.currentIndex===1 ? 'block' : 'none';
        let isBox2Show=this.state.currentIndex===2 ? 'block' : 'none';
        let isBox3Show=this.state.currentIndex===3 ? 'block' : 'none';
        let isBox4Show=this.state.currentIndex===4 ? 'block' : 'none';

        let tabList= this.state.tabs.map(function(res,index) {
            // 遍历标签页，如果标签的id等于tabid，那么该标签就加多一个active的className
            var tabStyle=res.id===this.state.currentIndex ? 'nav active' : 'nav';

            return    <li key={index} onClick={this.tabChoiced.bind(_this,res.id)} className={tabStyle}>{res.tabName}</li>

        }.bind(_this));
        return (
            <div>
                <div className='header'>
                    <Container>
                        <Row>
                            <Col sm={2}/>
                            <Col sm={8}>
                                {
                                    (this.state.userInfo && (

                                <div className='head-container'>
                                    <img src={this.state.userInfo.headPortrait} alt='' onClick={() => this.handleClick(this.state.userInfo.id)}/>
                                    <div className='text'>
                                        <p className='author'>{this.state.userInfo.name}</p>
                                        <p>微信号： {this.state.userInfo.weixin}</p>
                                        <p className='sign'>个人简介： {this.state.userInfo.description ? this.state.userInfo.description : '什么都没有'}</p>
                                    </div>
                                </div>
                                    ))
                                }
                            </Col>
                            <Col sm={2}/>
                        </Row>
                    </Container>
                </div>
                <div className='nav-container'>
                    <Container>
                        <Row>
                            <Col sm={2}/>
                            <Col sm={8}>
                                <div className="listWrap">
                                    <ul className="navbar">
                                        {tabList}
                                    </ul>
                                </div>
                            </Col>
                            <Col sm={2}/>
                        </Row>
                    </Container>
                </div>
                <div className="content-container">
                    <Container>
                        <Row>
                            <Col sm={2}/>
                            <Col sm={8}>
                                <div style={{"display":isBox1Show}} >
                                    {
                                        (this.state.userDaka &&
                                            <ClockItem dakaList={this.state.userDaka} />)
                                    }

                                </div>
                                <div style={{"display":isBox2Show}}>
                                    {
                                        (this.state.userArticle &&
                                            <ArticleItem articles={this.state.userArticle} />)
                                    }
                                </div>
                                <div style={{"display":isBox3Show}}>
                                    娱乐圈
                                </div>
                                <div style={{"display":isBox4Show}}>
                                    收藏
                                </div>
                            </Col>
                            <Col sm={2}/>
                        </Row>
                    </Container>
                </div>
            </div>
        )
    }
}

export default withRouter(Profile);
