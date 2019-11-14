import React, { Component } from 'react';
import {List, Button, Row, Col} from 'antd';
import './StudyPath.css';
import { Link, withRouter } from 'react-router-dom'

class MorePaths extends Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentWillMount() {
        console.log(this.props.location.state);
        this.getPathInfo();
    }

    getPathInfo = () => {
        fetch('https://api.bangneedu.com/learningPathDetails/' + this.props.location.state.id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }})
            .then((res) => res.json())
            .then( res => {
                console.log(res)
                this.setState({
                    pathInfo: res.data
                })
            })
            .catch( err => console.log(err))
    };

    render() {
        return(
            <Row>
                <Col md={5} />
                <Col md={14}>
                    <Link to={"/path"}>
                        <div className='path-header' style={{marginTop: 20}}>
                            <div>{this.props.location.state.title}</div>
                            <div>用时： {this.props.location.state.time}</div>
                        </div>
                    </Link>
                    {
                        this.state.pathInfo && <div className='path-item'>
                            <List
                                className='path-list'
                                split
                                dataSource={this.state.pathInfo}
                                renderItem={(item, index) => (
                                    <div>
                                        <List.Item className={index % 2 === 0 ? 'dark' : 'light'}>
                                            <div>{item.title}</div>
                                            <Link to={'/pathDetail/' + this.props.id + '/' + index}><Button shape='round'>查看详情</Button></Link>
                                        </List.Item>
                                    </div>
                                )}
                            />
                        </div>
                    }
                </Col>
                <Col md={5} />
            </Row>
        )
    }
}

export default withRouter(MorePaths);
