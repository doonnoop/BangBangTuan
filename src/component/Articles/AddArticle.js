import React, { Component } from 'react';
import { Col, Row, message, Form, Input } from 'antd';
import Editor from "for-editor";
import storage from "../storage";
import { withRouter } from 'react-router-dom';

class AddArticle extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            content: ''
        }
    }

    onFieldChange = (e) => {
        this.setState({
            title: e.target.value
        })
    };

    handleChange = (value) => {
        this.setState({
            content: value
        })
    };

    bindSubmit = () => {
        let body = {
            "title": this.state.title,
            "content": this.state.content
        };
        console.log(body);
        let token = storage.get('token');
        if(body.title && body.content){
            fetch('https://api.bangneedu.com/article', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify(body)
            })
                .then((res) => res.json())
                .then( res => {
                    console.log(res.data);
                    if(res.status === 200) {
                        message.success("发表成功", 2);
                        this.props.history.push("/articles")
                    }
                })
                .catch( err => console.log(err))
        } else {
            message.error("请输入文章标题", 2);
        }
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                md: { span: 5},
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                md: { span: 15},
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        return (
            <div>
                <Row>
                    <Col md={4} />
                    <Col sm={16}>
                        <div className='addArticle'>
                            <Form {...formItemLayout}>
                                <Form.Item label="文章标题">
                                    {getFieldDecorator('title', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '请输入文章标题',
                                            },
                                        ],
                                    })( <Input placeholder="请输入标题" onChange={this.onFieldChange} name='title' />)}
                                </Form.Item>
                            </Form>
                            <Editor value={this.state.value} onChange={this.handleChange} />
                            <button className='submitArticle' onClick={this.bindSubmit}>发表日记</button>
                        </div>
                    </Col>
                    <Col md={4} />
                </Row>
            </div>
        )
    }
}

export default Form.create({ name: 'register' })(withRouter(AddArticle));
