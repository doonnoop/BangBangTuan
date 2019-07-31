import React, { Component } from 'react';
import './Clock.css';
import noAuthor from '../../images/no-author.png';
import chatImg from '../../images/chat.png';
import likeImg from '../../images/like.png';
import likeActImg from '../../images/like-act.png';
import countImg from '../../images/count.png';
import storage from "../storage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { withRouter } from 'react-router-dom';

class ClockItem extends Component{
    constructor(props) {
        super(props);
        this.state = {
            token: storage.get('token'),
            usercomment: '',
            headPortrait: storage.get('headPortrait')
        }
    }

    componentWillMount() {
        let dakaList = this.props.dakaList;
        for(let item of dakaList) {
            item.comments = []
            if(item.comments && item.comments.length === 0) {
                fetch('https://api.bangneedu.com/punchTheClockComment/' + item.id, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": this.state.token ? "Bearer " + this.state.token : ''
                    }})
                    .then((res) => res.json())
                    .then( res => {
                        item.comments = res.data;
                    })
                    .catch( err => console.log(err))
            }
            item.isToggleOn = false;
            item.display = 'none';
            item.liked = false
        }

        let likeCollection = storage.get('like_collection');
        if (likeCollection) {
            for(let i = 0; i < dakaList.length; i++) {
                if(likeCollection[dakaList[i].id] === true) {
                    dakaList[i].liked = true;
                } else {
                    dakaList[i].liked = false;
                }
            }
        } else {
            let likeCollection = {};
            storage.set('like_collection', likeCollection)
        }
        this.setState(function(prevState, props){
            return {dakaList: dakaList}
        });
        console.log(dakaList);
    }

    getComments = (index) => {
        let dakaList = this.state.dakaList;
        fetch('https://api.bangneedu.com/punchTheClockComment/' + dakaList[index].id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + this.state.token
            }})
            .then((res) => res.json())
            .then( res => {
                dakaList[index].comments = res.data;
            })
            .catch( err => console.log(err))
        this.setState(function(prevState, props){
            return {dakaList: dakaList}
        });
    };

    handleClick = (id) => {
        let dakaList = this.state.dakaList;
        dakaList[id].isToggleOn = !dakaList[id].isToggleOn;
        dakaList[id].display = dakaList[id].isToggleOn ? 'block' : 'none';

        this.setState({
            dakaList: this.state.dakaList
        });
        console.log(this.state.dakaList)
    };

    onLikeTap = (id) => {
        let dakaList = this.state.dakaList;
        let likeCollection = storage.get('like_collection');
        let likeCollected = likeCollection[dakaList[id].id];
        likeCollected = !likeCollected;
        likeCollection[dakaList[id].id] = likeCollected;
        storage.set('like_collection', likeCollection);

        let extension = likeCollected ? 'like' : 'not_like';
        let body = {
            "punchTheClockId": this.state.dakaList[id].id
        }
        fetch('https://api.bangneedu.com/punchTheClock/' + extension, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + this.state.token
            },
            body: JSON.stringify(body)
        })
            .then((res) => res.json())
            .then( res => {
                console.log(res);
                toast.info(res.msg, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1000
                });
                if (res.status === 200) {
                    dakaList[id].liked = likeCollected;
                    dakaList[id].praiseNumber = (parseInt(dakaList[id].praiseNumber) + (likeCollected ? 1 : (-1))).toString();
                    this.setState({
                        dakaList: dakaList
                    });
                    console.log(dakaList)
                }
            })
            .catch( err => console.log(err));
    };

    onFieldChange = (e) => {
        this.setState({usercomment: e.target.value});
    };

    commentSubmit = (index) => {
        let dakaList = this.state.dakaList;
        let body = {
            "content": this.state.usercomment,
            "punchTheClockId": dakaList[index].id
        };
        if(this.state.token) {
            fetch('https://api.bangneedu.com/punchTheClockComment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + this.state.token
                },
                body: JSON.stringify(body)
            })
                .then((res) => res.json())
                .then( res => {
                    console.log(res);
                    if(res.status === 200) {
                        this.setState({
                            usercomment: ''
                        });
                        dakaList[index].commentNumber = (parseInt(dakaList[index].commentNumber) + 1).toString();
                        this.getComments(index);
                        this.props.history.push("/clock")
                    }
                })
                .catch( err => console.log(err));
        } else {
            toast.error("请登陆后再评论", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000
            });
            if(this.timer){
                clearTimeout(this.timer);
            }
            this.timer = setTimeout(()=>{
                this.props.history.push("/login")
            },1500);
        }
    };

    render() {
        let dakaList = this.state.dakaList;
        return (
            <div className='dakas'>
                <ToastContainer/>
                <div className='daka-container'>
                        {
                            dakaList && dakaList.map((item, index) => {
                                return <div key={index} className='daka-box'>
                                    <div className='daka-item'>
                                        <div>
                                            <img src={item.headPortrait} alt='' className='author-img' />
                                        </div>
                                        <div className='body-container'>
                                            <div className='author'>{item.name}</div>
                                            <div className='data-container'>
                                                <p>{item.createTime}</p>
                                                <div className='count'>
                                                    <img src={countImg} alt=''/>
                                                    <p>坚持{item.day}天</p>
                                                </div>
                                            </div>
                                            <div>{item.content}</div>
                                            <div className='comment-like'>
                                                <div className='comment' onClick={() => this.handleClick(index)}>
                                                    <img src={chatImg} alt='' />
                                                    <p>{item.commentNumber}</p>
                                                </div>
                                                <div className='like' onClick={() => this.onLikeTap(index)}>
                                                    <img src={item.liked ? likeActImg : likeImg } alt='' />
                                                    <p>{item.praiseNumber}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='comments' style={{display: item.display}}>
                                        <div className='comment-input'>
                                            <img src={this.state.headPortrait ? this.state.headPortrait : noAuthor} alt='' />
                                            <input onChange={this.onFieldChange} value={this.state.usercomment}/>
                                            <button onClick={() => this.commentSubmit(index)}>评论</button>
                                        </div>
                                        <div className='comment-list'>
                                            {
                                                item.comments && item.comments.map((key, index) => {
                                                    return <div className='comment-item' key={index}>
                                                        <div className='avatar'>
                                                            <img src={key.headPortrait} alt='' />
                                                        </div>
                                                        <div className='comment-detail'>
                                                            <div className='user-comment'>
                                                                <div className='username'>{key.name}:</div>
                                                                <div className='detail'>{key.content}</div>
                                                            </div>
                                                            <div className='data'>{key.createTime}</div>
                                                        </div>
                                                    </div>
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                </div>
            </div>
        )
    }
}

export default withRouter(ClockItem);