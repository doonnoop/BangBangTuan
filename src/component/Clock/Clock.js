import React, { Component } from 'react';
import {  Row, Col, message } from 'antd';
import './Clock.css';
import ClockItem from './clock-list';
import storage from "../storage";
import { withRouter } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import './paginate.css'
import { getClocks } from '../../fetch';

class Clock extends Component{
    constructor(props) {
        super(props);
        this.state = {
            textarea: '',
            current: 1,
            changed: false
        }
    }

    componentDidMount() {
        this.getDakaList(this.state.current);
    };

    getDakaList = (page) => {
        getClocks(page).then((res) => {
            console.log(res)
            this.setState({
                dakaList: res.records,
                pages: parseInt(res.pages),
                changed: true
            });
        })
    };

    onFieldChange = (e) => {
        this.setState({textarea: e.target.value});
    };

    dakaSubmit = () => {
        let token = storage.get('token');
        if(token) {
            if(this.state.textarea) {
                let body = {
                    "content": this.state.textarea
                };
                fetch('https://api.bangneedu.com/punchTheClock', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": "Bearer " + token
                    },
                    body: JSON.stringify(body)
                })
                    .then((res) => res.json())
                    .then( res => {
                        console.log(res);
                        if(res.status === 200) {
                            this.getDakaList(this.state.current);
                            message.success(res.msg, 1);
                            this.setState({
                                textarea: ''
                            });
                        } else if (res.status === 500) {
                            message.error(res.msg, 2);
                        }
                    });
            } else {
                message.info("请填写打卡内容");
            }
        } else {
            message.error("请登陆后再提交", 2);
            this.props.history.push("/login");
        }
    };

    handlePageClick = (data) => {
        console.log(data.selected)
        let selected = data.selected + 1;
        this.setState({ current: selected, changed: false }, () => {
            this.getDakaList(selected);
        });
    };

    render() {
        return (
            <Row>
                <Col md={5} />
                <Col md={14}>
                    <div className='daka'>
                        <textarea rows='5' className='textarea' value={this.state.textarea} onChange={this.onFieldChange} />
                        <input rows='5' className='textarea' value={this.state.textarea} onChange={this.onFieldChange} />
                        <button className='ml-auto button' onClick={this.dakaSubmit}>打卡</button>
                    </div>
                    {
                        (this.state.dakaList && this.state.changed && <div>
                                <ClockItem dakaList={this.state.dakaList} />
                                <ReactPaginate
                                    previousLabel={'<'}
                                    nextLabel={'>'}
                                    pageCount={this.state.pages}
                                    marginPagesDisplayed={1}
                                    pageRangeDisplayed={9}
                                    onPageChange={this.handlePageClick}
                                    containerClassName={'pagination'}
                                    pageLinkClassName={'page'}
                                    subContainerClassName={'pages pagination'}
                                    activeClassName={'active'}
                                    previousLinkClassName={'link'}
                                    nextLinkClassName={'link'}
                                    disableInitialCallback={false}
                                    forcePage={this.state.current - 1}
                                />
                            </div>
                        )
                    }

                </Col>
                <Col md={5} />
            </Row>
        )
    }
}

export default withRouter(Clock);
