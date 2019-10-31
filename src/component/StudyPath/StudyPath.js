import React, { Component } from 'react';
import {Row, Col} from 'antd';
import './StudyPath.css';
import PathInfo from "./PathInfo";

class StudyPath extends Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentWillMount() {
        this.getStudyPath();
    }

    getStudyPath = () => {
        fetch('https://api.bangneedu.com/learningPath?current' + this.state.current +'&size=10', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }})
            .then((res) => res.json())
            .then( res => {
                console.log(res)
                // this.getPathInfo(res.data.records);
                this.setState({
                    path: res.data.records
                })
            })
            .catch( err => console.log(err))
    };

    render() {
        return(
            <Row>
                <Col md={5} />
                <Col md={14}>
                    <div className='con-header'>学习路径</div>
                    {
                        this.state.path && this.state.path.map((item, index) => {
                            return <div key={index}>
                                <div className='path-header'>
                                    <div>{item.title}</div>
                                    <div>用时： {item.time}</div>
                                </div>
                                <PathInfo item={item} />
                            </div>
                        })
                    }
                </Col>
                <Col md={5} />
            </Row>
        )
    }
}

export default StudyPath;


