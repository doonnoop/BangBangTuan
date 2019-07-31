import React, { Component } from 'react';
import chatImg from '../../images/chat.png';
import likeImg from '../../images/like.png';
import seeImg from '../../images/see.png';
import './Article.css';
import { Link } from 'react-router-dom';

class ArticleItem extends Component{
    render() {
        let articles = this.props.articles;
        return (
            <div className='article-list'>
                {
                    articles && articles.map((item, index) => {
                        return <Link to={'/article/' + item.id} style={{ textDecoration: 'none', color: '#666666' }} className='article-item' key={index}>
                            <div className='head'>
                                <div>
                                    <div className='article-name'>{item.title}</div>
                                    <div className='author-course'>
                                        <div className='author-name'>作者 {item.name}</div>
                                    </div>
                                </div>
                                <div className='date'>{item.createTime}</div>
                            </div>
                            <div className='body'>{item.content}</div>
                            <div className='foot'>
                                <div className='see'>
                                    <img src={seeImg} alt='' />
                                    <p>{item.browserNumber}</p>
                                </div>
                                <div className='comment1'>
                                    <img src={chatImg} alt='' />
                                    <p>{item.commentNumber}</p>
                                </div>
                                <div className='like1'>
                                    <img src={likeImg} alt='' />
                                    <p>{item.praiseNumber}</p>
                                </div>
                            </div>
                        </Link>
                    })
                }

            </div>
        )
    }
}

export default ArticleItem;