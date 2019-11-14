import React, { Component } from 'react';
import { Col, Row, message, Form, Input, Select } from 'antd';
import Editor from "for-editor";
import { withRouter } from 'react-router-dom';
import { postArticles } from '../../fetch';
const { Option } = Select;

class AddArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            type: ''
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
            "content": this.state.content,
            "type": this.state.type
        };
        console.log(body);
        if(body.title && body.content && body.type){
            postArticles(body).then((res) => {
                console.log(res);
                if(res.status === 200) {
                    message.success("发表成功", 2);
                    this.props.history.push("/articles")
                }
            });
        } else {
            message.error("请输入文章标题和分类", 2);
        }
    };

    handleSelect = (value) => {
        console.log(`selected ${value}`);
        this.setState({
            type: value
        })
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
                                        rules: [{ required: true, message: '请输入文章标题' }],
                                    })( <Input placeholder="请输入标题" onChange={this.onFieldChange} name='title' />)}
                                </Form.Item>
                                <Form.Item label="分类标签">
                                    {getFieldDecorator('type', {
                                        rules: [{ required: true, message: '请选择文章分类' }],
                                    })(
                                        <Select style={{ width: 120 }} onChange={this.handleSelect}>
                                            <Option value="前端">前端</Option>
                                            <Option value="Java">Java</Option>
                                            <Option value="产品经理">产品经理</Option>
                                            <Option value="Python">Python</Option>
                                        </Select>,
                                    )}
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
