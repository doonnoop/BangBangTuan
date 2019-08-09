import React, { Component } from 'react';
import {List, Col, Row, Descriptions} from 'antd';
import { withRouter} from 'react-router-dom';
import './StudyPath.css';

class PathDetails extends Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentWillMount() {
        this.getPathDetails();
    }

    getPathDetails = () => {
        fetch('https://api.bangneedu.com/learningPathDetails/' + this.props.match.params.id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }})
            .then((res) => res.json())
            .then( res => {
                console.log(res)
                this.setState({
                    pathDetail: res.data[this.props.match.params.index]
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
                        this.state.pathDetail && <List className='path-detail'>
                            <List.Item className='detail-title'>
                                {this.state.pathDetail.title}
                            </List.Item>
                            <List.Item>
                                <Descriptions title={
                                    <div>
                                        内容简介
                                        <div style={{float: 'right', fontWeight: 400, fontSize: 14}}>用时
                                            <span className='mainColor'>{this.state.pathDetail.time}</span> 天
                                        </div>
                                    </div>
                                } column={1}>
                                    <Descriptions.Item>{this.state.pathDetail.details}</Descriptions.Item>
                                </Descriptions>
                            </List.Item>
                        </List>
                    }
                </Col>
                <Col md={5} />
            </Row>
        )
    }
}

export default withRouter(PathDetails);
