import React, { Component } from 'react';
import {Row, Col, Comment, List, Input, Button, message} from 'antd';
import { withRouter } from 'react-router-dom';
import storage from "../storage";
import noAuthor from "../../images/no-author.png";
import ReactMarkdown from 'react-markdown';
import { getArticleDetails, getArticleComments, postArticleComment } from '../../fetch'

class ArticleDetails extends Component{
    constructor(props){
        super(props);
        this.state = {
            usercomment: '',
            articleId: this.props.match.params.id
        }
    }

    componentWillMount() {
        console.log(this.props.match.params.id);
        this.getArticleDetails(this.state.articleId);
        this.getArticleComments(this.state.articleId);
    };

    getArticleDetails = (id) => {
        getArticleDetails(id).then((res) => {
            console.log(res)
            this.setState({
                article: res[0]
            });
        })
    };

    getArticleComments = (id) => {
        getArticleComments(id).then((res) => {
            console.log(res)
            this.setState({
                comments: res
            });
        })
    };

    onFieldChange = (e) => {
        this.setState({usercomment: e.target.value});
    };

    commentSubmit = () => {
        let body = {
            "content": this.state.usercomment,
            "articleId": this.state.articleId
        };
        if(!storage.get('token')) {
            message.error("请登陆后再评论", 2);
            if(this.timer){
                clearTimeout(this.timer);
            }
            this.timer = setTimeout(()=>{
                this.props.history.push("/login")
            },1500);
        } else {
            postArticleComment(body).then((res) => {
                console.log(res)
                if(res.status === 200) {
                    this.getArticleComments(this.state.articleId);
                }
            })
            // fetch('https://api.bangneedu.com/articleComment', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         "Authorization": "Bearer " + this.state.token
            //     },
            //     body: JSON.stringify(body)
            // })
            //     .then((res) => res.json())
            //     .then( res => {
            //         console.log(res);
            //
            //     })
            //     .catch( err => console.log(err));
        }
    };

    render() {
        let article = this.state.article;
        return (
            <div>
                <Row>
                    <Col md={4} />
                    <Col md={16}>
                        <div className='article-box'>
                            {
                                article && <div className='article'>
                                    <Comment
                                        author={
                                            <div>
                                                <div className='article-name'>{article.title}</div>
                                                <div>作者 <span style={{color: '#ff6e37'}}>{article.name}</span></div>
                                            </div>

                                        }
                                        content={
                                            <div style={{marginTop: 40}}>
                                                <ReactMarkdown className='content-markdown' source={article.content} />
                                            </div>
                                        }
                                        datetime={
                                            <div className='article-date'>{article.createTime}</div>
                                        }
                                    />
                                </div>
                            }
                            <div className='art-comments'>
                                <div className='comment-input'>
                                    <img src={this.state.headPortrait ? this.state.headPortrait : noAuthor} alt='' />
                                    <Input onChange={this.onFieldChange} value={this.state.usercomment} placeholder='说点什么...'/>
                                    <Button onClick={() => this.commentSubmit()}>评论</Button>
                                </div>
                                <div className='comment-list'>
                                    {
                                        this.state.comments && <List
                                            className="comment-list"
                                            header={`${this.state.comments.length} 条评论`}
                                            itemLayout="horizontal"
                                            dataSource={this.state.comments}
                                            renderItem={key => (
                                                <li>
                                                    <Comment
                                                        author={<span style={{color: '#ff6e37'}}>{key.name}</span>}
                                                        avatar={key.headPortrait}
                                                        content={key.content}
                                                        datetime={key.createTime}
                                                    />
                                                </li>
                                            )}
                                        />
                                    }
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col md={4} />
                </Row>
            </div>
        )
    }
}

export default withRouter(ArticleDetails);
