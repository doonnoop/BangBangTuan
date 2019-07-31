import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Clock.css';
import ClockItem from './clock-list';
import storage from "../storage";
import { withRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactPaginate from 'react-paginate';
import './paginate.css'

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
        this.getDakaList();
    };

    getDakaList = () => {
        fetch('https://api.bangneedu.com/punchTheClock?current=' + this.state.current +'&size=10', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }})
            .then((res) => res.json())
            .then( res => {
                this.setState({
                    dakaList: res.data.records,
                    pages: parseInt(res.data.pages),
                    changed: true
                });
            })
            .catch( err => console.log(err))
        console.log(this.state.dakaList)
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
                            this.getDakaList();
                            toast.success(res.msg, {
                                position: toast.POSITION.TOP_CENTER,
                                autoClose: 1000
                            });
                            this.setState({
                                textarea: ''
                            });
                            this.getDakaList();
                        } else if (res.status === 500) {
                            toast.error(res.data.msg, {
                                position: toast.POSITION.TOP_CENTER,
                                autoClose: false
                            });
                        }
                    });
            } else {
                toast.info("请填写打卡内容", {
                    position: toast.POSITION.TOP_CENTER,
                });
            }
        } else {
            toast.error("请登陆后再提交", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000
            });
            if(this.timer){
                clearTimeout(this.timer);
            }
            this.timer = setTimeout(()=>{
                this.props.history.push("/login")
            },2000);
        }
    };

    handlePageClick = (data) => {
        console.log(data.selected)
        let selected = data.selected + 1;
        this.setState({ current: selected, changed: false }, () => {
            this.getDakaList();
        });
    };

    render() {
        return (
            <Container id='container'>
                <Row>
                    <Col sm={2} />
                    <Col sm={8}>
                        <ToastContainer />
                        <div className='daka'>
                            <textarea rows='5' className='textarea' value={this.state.textarea} onChange={this.onFieldChange} />
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
                                        pageRangeDisplayed={this.state.pages}
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
                    <Col sm={2} />
                </Row>
            </Container>
        )
    }
}

export default withRouter(Clock);