import React, { Component } from 'react';
import {List, Button} from 'antd';
import './StudyPath.css';
import { Link } from 'react-router-dom'

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
        fetch('https://api.bangneedu.com/learningPathDetails/' + this.props.id, {
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
            <div>
                {
                    this.state.pathInfo && <div>
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
                        <div className={this.state.pathInfo.length + 1 % 2 === 0 ? 'load dark' : 'load light'}>
                            <div>查看更多》</div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default PathInfo;
