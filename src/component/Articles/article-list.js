import React, { Component } from 'react';
// import chatImg from '../../images/chat.png';
// import likeImg from '../../images/like.png';
// import seeImg from '../../images/see.png';
import './Article.css';
import { Link } from 'react-router-dom';
import { Comment, Icon} from 'antd';
// import countImg from "../../images/count.png";

class ArticleItem extends Component{
    render() {
        let articles = this.props.articles.reverse();
        return (
            <div className='article-list'>
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
                                    <div>
                                        <p className='content' style={{marginTop: 30}}>{item.content}</p>
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
