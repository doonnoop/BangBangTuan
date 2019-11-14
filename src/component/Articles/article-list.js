import React, { Component } from 'react';
import './Article.css';
import { Link } from 'react-router-dom';
import { Comment, Icon} from 'antd';
import ReactMarkdown from 'react-markdown';

class ArticleItem extends Component{
    render() {
        let articles = this.props.articles;
        return (
            <div>
                {
                    articles && articles.map((item, index) => {
                        return <Link to={'/article/' + item.id} style={{ textDecoration: 'none', color: '#666666' }} className='article-item' key={index}>
                            <Comment
                                author={
                                    <div>
                                        <div className='article-name'>{item.title}</div>
                                        <div>作者 <span style={{color: '#ff6e37'}}>{item.name}</span></div>
                                    </div>

                                }
                                content={
                                    <div style={{marginTop: 40}}>
                                        <ReactMarkdown className='content-markdown' source={item.content.substring(0,150)} />
                                    </div>
                                }
                                datetime={
                                    <div className='article-date'>{item.createTime}</div>
                                }
                                actions={
                                    [
                                        <span className='comment-like'>
                                            <div className='vertical-alain'>
                                                <Icon type="eye" style={{fontSize: 18}} />
                                                <span style={{ paddingLeft: 8, cursor: 'auto', fontSize: 14 }}>{item.commentNumber}</span>
                                            </div>
                                            <div className='vertical-alain'>
                                                <Icon type="message" style={{fontSize: 16}} />
                                                <span style={{ paddingLeft: 8, cursor: 'auto', fontSize: 14 }}>{item.commentNumber}</span>
                                            </div>
                                            <div className='vertical-alain'>
                                                <Icon type="like" style={{fontSize: 16}} />
                                                <span style={{ paddingLeft: 8, cursor: 'auto', fontSize: 14 }}>{item.praiseNumber}</span>
                                            </div>
                                        </span>
                                    ]
                                }
                            />
                        </Link>
                    })
                }

            </div>
        )
    }
}

export default ArticleItem;
