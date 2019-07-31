import React, { Component } from 'react';
import Invalid from '../images/page_not_found.jpg';
import './PageNotFound.css';
import { Redirect } from 'react-router-dom';

class PageNotFound extends Component{
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    };

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/' />
        }
    }

    render() {
        return <div className='invalid'>
            <img src={Invalid} alt=''/>
            <button onClick={this.setRedirect}>回到首页</button>
            {this.renderRedirect()}
        </div>
    }
}

export default PageNotFound;