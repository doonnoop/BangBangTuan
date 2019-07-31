import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import authService from '../services/authService';

class PrivateRoute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            loginStatus: false
        }
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
    render() {
        if (this.state.loaded === false) {
            return null
        }
        return <span>
            {
                this.state.loginStatus ?
                    <Route path={this.props.path} render={this.props.render}/> :
                    <Redirect to="/login" />
            }
        </span>
    }
}

export default PrivateRoute;
