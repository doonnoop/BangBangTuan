import {Component} from "react";
import {  withRouter } from 'react-router-dom';
import storage from "./storage";

class Logout extends Component{
    componentWillMount() {
        storage.remove('token');
        storage.remove('headPortrait');

        this.props.history.push("/")
    }
    render() {
        return null
    }

}
export default withRouter(Logout);