import React, { Component } from 'react';
import {  Row, Col } from 'antd';
import ArticleItem from './article-list';
import storage from "../storage";

class Article extends Component{
    constructor(props) {
        super(props);
        this.state = {
            token: storage.get('token'),
            articles: []
        }
    }

    componentWillMount() {
        fetch('https://api.bangneedu.com/article', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": this.state.token ? "Bearer " + this.state.token : ''
            }
        })
            .then((res) => res.json())
            .then( res => {
                console.log(res.data.records);
                if(res.status === 200) {
                    this.setState({
                        articles: res.data.records
                    })
                }
            })
            .catch( err => console.log(err))
    }

    render() {
        return (
            <Row>
                <Col md={4} />
                <Col md={16}>
                    {
                        this.state.articles && <ArticleItem articles={this.state.articles}/>
                    }
                </Col>
                <Col md={4} />
            </Row>
        )
    }
}

export default Article;
