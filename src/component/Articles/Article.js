import React, { Component } from 'react';
import {  Row, Col } from 'antd';
import ArticleItem from './article-list';
import storage from "../storage";
import ReactPaginate from "react-paginate";

class Article extends Component{
    constructor(props) {
        super(props);
        this.state = {
            token: storage.get('token'),
            articles: [],
            current: 1,
            changed: false
        }
    }

    componentWillMount() {
        this.getArticles();
    }

    getArticles = () => {
        fetch('https://api.bangneedu.com/article?current=' + this.state.current +'&size=10', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": this.state.token ? "Bearer " + this.state.token : ''
            }
        })
            .then((res) => res.json())
            .then( res => {
                console.log(res.data);
                if(res.status === 200) {
                    this.setState({
                        articles: res.data.records,
                        pages: parseInt(res.data.pages),
                        changed: true
                    })
                }
            })
            .catch( err => console.log(err))
    };

    handlePageClick = (data) => {
        console.log(data.selected)
        let selected = data.selected + 1;
        this.setState({ current: selected, changed: false }, () => {
            this.getArticles();
        });
    };

    render() {
        return (
            <Row>
                <Col md={4} />
                <Col md={16}>
                    {
                        this.state.articles && this.state.changed && <div>
                            <ArticleItem articles={this.state.articles}/>
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
                    }
                </Col>
                <Col md={4} />
            </Row>
        )
    }
}

export default Article;
