import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
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
            <Container id='container'>
                <Row>
                    <Col sm={2} />
                    <Col sm={8}>
                        {
                            this.state.articles && <ArticleItem articles={this.state.articles}/>
                        }
                    </Col>
                    <Col sm={2} />
                </Row>
            </Container>
        )
    }
}

export default Article;