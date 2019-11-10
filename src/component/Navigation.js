import React from 'react';
import './Navigation.css';
import { Navbar, Nav } from 'react-bootstrap';
import noAuthor from '../images/no-author.png';
import logo from '../images/logo.png';
import storage from "./storage";
import authService from "../services/authService";

export default class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            headPortrait: ''
        }

    }

    fn(token){
        this.setState({
            token: token
        })
    }

    componentDidMount() {
        authService.checkUsrStatus().then(
            (valid) => {
                this.setState({
                    loginStatus: valid,
                    loaded: true
                })
            }
        )
    }

    logout = () => {
        localStorage.removeItem('user');
        this.props.history.push('/login')
    };

    menuClick = e => {
        console.log(e);
        e.key === 'logout' && this.logout();
    };
    masterPage = () => {
        if(this.state.loginStatus){
            return <Nav.Link href="/master">师徒计划</Nav.Link>
        }
        else{
            return null;
        }
    }

    render() {
        if (this.state.loaded === false) {
            return null
        }
        let token = storage.get('token');
        let headPortrait = storage.get('headPortrait');
        let navRight;
        if(token) {
            console.log("这个是token:"+token)
            if (!this.state.loginStatus) {
                navRight = null
            } else {
                navRight =
                    <Nav className="ml-auto">
                        <Nav.Link href="/profile">
                            <img src={headPortrait} alt='' className='profile'/>
                        </Nav.Link>
                        <div className='article-exit'>
                            <Nav.Link href="/addArticle">
                                <button className='article'>写文章</button>
                            </Nav.Link>
                            <Nav.Link href="/logout">
                                <button className='exit'>[退出]</button>
                            </Nav.Link>
                        </div>
                    </Nav>
            }
        } else {
            navRight =
                <Nav className="ml-auto">
                    <Nav.Link href="/profile">
                        <img src={noAuthor} alt='' className='profile'/>
                    </Nav.Link>
                    <Nav.Link href="/login" token={this.state.token} pfn={this.fn.bind(this)}>登陆/注册</Nav.Link>
                </Nav>
        }
        return (
            <div className='navigation'>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="/"><img src={logo} alt="棒棒团" className='logo' /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/">首页</Nav.Link>
                            <Nav.Link href="/cpMatch">组CP</Nav.Link>
                            <Nav.Link href="/articles">学习日记</Nav.Link>
                            <Nav.Link href="/clock">打卡记录</Nav.Link>
                            <Nav.Link href="/projects">实战演练</Nav.Link>
                            <Nav.Link href="/path">学习路径</Nav.Link>
                            {this.masterPage()}
                            <Nav.Link href="/shop">积分商城</Nav.Link>
                        </Nav>
                        {navRight}
                    </Navbar.Collapse>
                </Navbar>
            </div>


        );
    }
}
