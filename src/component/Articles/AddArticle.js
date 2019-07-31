import React, { Component } from 'react';
import {Col, Container, Row} from "react-bootstrap";
import Editor from "for-editor";
import { InputGroup, FormControl } from 'react-bootstrap'
import storage from "../storage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
                    toast.success("发表成功", {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 2000
                    });
                    if(this.timer){
                        clearTimeout(this.timer);
                    }
                    this.timer = setTimeout(()=>{
                        this.props.history.push("/articles")
                    },3000);
                }
            })
            .catch( err => console.log(err))
    };

    render() {
        return (
            <Container id='container'>
                <Row>
                    <Col sm={1} />
                    <Col sm={10}>
                        <ToastContainer />
                        <div className='addArticle'>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="title">文章标题</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl placeholder="请输入标题" aria-label="title" aria-describedby="title"
                                             onChange={this.onFieldChange} name='title'/>
                            </InputGroup>
                            <Editor value={this.state.value} onChange={this.handleChange} />
                            <button className='submitArticle' onClick={this.bindSubmit}>发表日记</button>
                        </div>
                    </Col>
                    <Col sm={1} />
                </Row>
            </Container>
        )
    }
}

export default withRouter(AddArticle);