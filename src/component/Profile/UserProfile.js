import React, { Component } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import storage from "../storage";
import './UserProfile.css';
import noImg from '../../images/no-image.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class UserProfile extends Component{
    constructor(props){
        super(props);
        this.state = {
            token: storage.get('token'),
            userInfo: '',
            radioValue: '',
            name: '',
            phone: '',
            weixin: '',
            description: '',
            sex: ''
        }
    }

    componentWillMount() {
        console.log(this.props.match.params.id);
        this.getUserInfo();
    };

    getUserInfo = () => {
        fetch('https://api.bangneedu.com/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + this.state.token
            }})
            .then((res) => res.json())
            .then( res => {
                console.log(res.data);
                this.setState({
                    userInfo: res.data,
                    name: res.data.name,
                    phone: res.data.phone,
                    weixin: res.data.weixin,
                    description: res.data.description,
                    sex: res.data.sex
                });
            })
            .catch( err => console.log(err));
    };

    fileSelectedHandler = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('file', e.target.files[0]);
        fetch('https://api.bangneedu.com/upload', {
            method: 'POST',
            headers: {
                // 'Content-Type': 'multipart/form-data',
                "Authorization": "Bearer " + this.state.token
            },
            body: formData
        })
            .then((res) => res.json())
            .then( res => {
                console.log(res);
                let body = {
                    'headPortrait': res.data
                }
                fetch('https://api.bangneedu.com/user', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": "Bearer " + this.state.token
                    },
                    body: JSON.stringify(body)
                })
                    .then((res) => res.json())
                    .then( res => {
                        console.log(res);
                        this.getUserInfo();
                        toast.success("修改成功", {
                            position: toast.POSITION.TOP_CENTER,
                            autoClose: 1000
                        });
                    })
                    .catch( err => console.log(err));
            })
            .catch( err => console.log(err));

    };

    handleChange1 = (e) => {
        this.setState({name: e.target.value});
    };
    handleChange2 = (e) => {
        this.setState({phone: e.target.value});
    };
    handleChange3 = (e) => {
        this.setState({weixin: e.target.value});
    };
    handleChange4 = (e) => {
        this.setState({description: e.target.value});
    };
    handleRadioChange = (e) => {
        console.log(e.target.value);
        this.setState({
            radioValue:e.target.value
        })
    };

    handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        let body = {
            name: this.state.name,
            phone: this.state.phone,
            weixin: this.state.weixin,
            description: this.state.description,
            sex: this.state.sex
        }
        console.log(body);
        fetch('https://api.bangneedu.com/user', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + this.state.token
            },
            body: JSON.stringify(body)
        })
            .then((res) => res.json())
            .then( res => {
                console.log(res.data);
                this.getUserInfo();
                toast.success("修改成功", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1000
                });
            })
            .catch( err => console.log(err));
    };

    render() {
        let userInfo = this.state.userInfo;
        return (
            <Container id='container'>
                <Row>
                    <Col sm={2} />
                    <Col sm={8}>
                        <ToastContainer/>
                        {
                            userInfo && <div>
                                <div className='headPortrait'>
                                    <div className="userImg">
                                        <input className='upload' type='file' name='file' multiple={false} accept="image/*" onChange={this.fileSelectedHandler}/>
                                        {
                                            userInfo.headPortrait ? <img src={userInfo.headPortrait} alt='' /> : <img src={noImg} alt='' />
                                        }
                                    </div>
                                </div>
                                <Form>
                                    <Form.Group as={Row} controlId="formname">
                                        <Form.Label column sm={2}>昵称</Form.Label>
                                        <Col sm={10}>
                                            <Form.Control type="text" name='name' onChange={this.handleChange1}
                                                          value={this.state.name ? this.state.name : ''}/>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formsex">
                                        <Form.Label column sm={2}>性别</Form.Label>
                                        <Col sm={10}>
                                            <div className='sexcheck'>
                                                <label key='male'>
                                                    <input type="radio" value='male' checked={this.state.radioValue === 'male'}
                                                           onChange={this.handleRadioChange} />
                                                    <span>男</span>
                                                </label>
                                                <label key='female'>
                                                    <input type="radio" value='female' checked={this.state.radioValue === 'female'}
                                                           onChange={this.handleRadioChange} />
                                                    <span>女</span>
                                                </label>
                                            </div>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formphone">
                                        <Form.Label column sm={2}>手机号</Form.Label>
                                        <Col sm={10}>
                                            <Form.Control type="text" name='phone' onChange={this.handleChange2}
                                                          value={this.state.phone ? this.state.phone : ''}/>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formweixin">
                                        <Form.Label column sm={2}>微信号</Form.Label>
                                        <Col sm={10}>
                                            <Form.Control type="text" name='weixin' onChange={this.handleChange3}
                                                          value={this.state.weixin ? this.state.weixin : ''}/>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formdescription">
                                        <Form.Label column sm={2}>个人介绍</Form.Label>
                                        <Col sm={10}>
                                            <Form.Control as="textarea" rows="3" name='description' onChange={this.handleChange4}
                                                          value={this.state.description ? this.state.description : ''}/>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formHorizontalCheck">
                                        <Col sm={{ span: 10, offset: 2 }}>
                                            <Form.Check label="Remember me" />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row}>
                                        <Col sm={{ span: 10, offset: 2 }}>
                                            <Button type="submit" onClick={this.handleSubmit}>Sign in</Button>
                                        </Col>
                                    </Form.Group>
                                </Form>
                            </div>
                        }
                    </Col>
                    <Col sm={2} />
                </Row>
            </Container>
        )
    }
}

export default withRouter(UserProfile);