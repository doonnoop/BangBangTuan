import React, { Component } from 'react';
import {List, Button} from 'antd';
import './StudyPath.css';
import { Link } from 'react-router-dom';

class PathInfo extends Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentWillMount() {
        this.getPathInfo();
    }

    getPathInfo = () => {
        fetch('https://api.bangneedu.com/learningPathDetails/' + this.props.item.id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }})
            .then((res) => res.json())
            .then( res => {
                console.log(res)
                this.setState({
                    pathInfo: res.data.length > 2 ? res.data.slice(0,2) : res.data
                })
            })
            .catch( err => console.log(err))
    };

    render() {
        const path = {
            pathname: '/pathDetails',
            state: this.props.item,
        };
        return(
            <div>
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
                        {
                            this.state.pathInfo.length > 0 &&
                            <div className={this.state.pathInfo.length % 2 === 0 ? 'load dark' : 'load light'}>
                                <Link to={path}>查看更多》</Link>
                            </div>
                        }

                    </div>
                }
            </div>
        )
    }
}

export default PathInfo;
