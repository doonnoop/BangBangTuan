import React from 'react';
import './App.css';
import Navigation from './Navigation';
import Home from './Home';
import Clock from './Clock/Clock';
import Login from './Login';
import Register from './Register';
import PageNotFound from "./PageNotFound";
import Profile from './Profile/Profile';
import Article from './Articles/Article';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ArticleDetails from "./Articles/ArticleDetails";
import Team from "./Team/Team";
import PrivateRoute from './PrivateRoute'
import AddArticle from "./Articles/AddArticle";
import UserProfile from "./Profile/UserProfile";
import Logout from "./Logout";
import Project from "./Project/Project";
import ProjectDetails from "./Project/ProjectDetails";
import ProjectTasks from "./Project/ProjectTasks";
import StudyPath from "./StudyPath/StudyPath";
import PathDetails from "./StudyPath/PathDetails";
import Shop from "./Shop/Shop";
import ShopItem from "./Shop/ShopItem";
import OrderInfo from "./Shop/OrderInfo";
import ExchangeSuccess from "./Shop/ExchangeSuccess";
import ExchangeFail from "./Shop/ExchangeFail";
import UserOrderList from "./Shop/UserOrderList";
import OrderDetails from "./Shop/OrderDetails";
import ResetPassword from "./ResetPassword";

class App extends React.Component {

    render() {
        const GetBaidu = props => {
            let children = props.children;
            let _hmt = _hmt || [];
            (function() {
                var hm = document.createElement("script");
                hm.src = "https://hm.baidu.com/hm.js?bf70ceb2c42d7b7d52cb1d2843881cf6";
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(hm, s);
            })();
            return children;
        };

        document.body.style.backgroundColor = "#f8fbfd";
        return (
            <div>
                <Navigation />
                <BrowserRouter>
                    <Switch>
                        {/*<GetBaidu>*/}
                            <Route path="/" component={Home} exact />
                            <Route path="/clock" render={() => {
                                return <Clock />
                            }} />
                            <Route path="/articles" render={() => {
                                return <Article />
                            }} />
                            <Route path="/article/:id" render={(history, match) => {
                                return <ArticleDetails history={history} match={match} />
                            }} />
                            <PrivateRoute  path="/profile" render={(history, match) => {
                                return <Profile history={history} match={match} />
                            }} />
                            <Route path="/userProfile/:id" render={() => {
                                return <UserProfile />
                            }} />
                            <Route path="/cpMatch" render={() => {
                                return <Team />
                            }} />
                            <Route path="/addArticle" render={() => {
                                return <AddArticle />
                            }} />
                            <Route path="/projects" render={() => {
                                return <Project />
                            }} />
                            <Route path="/project/:id" render={() => {
                                return <ProjectDetails />
                            }} />
                            <Route path="/task/:id" render={() => {
                                return <ProjectTasks />
                            }} />
                            <Route path="/path" render={() => {
                                return <StudyPath />
                            }} />
                            <Route path="/pathDetail/:id/:index" render={() => {
                                return <PathDetails />
                            }} />
                            <Route path="/shop" render={() => {
                                return <Shop />
                            }} />
                            <Route path="/shopitem/:id" render={() => {
                                return <ShopItem />
                            }} />
                            <Route path="/orderInfo" render={() => {
                                return <OrderInfo />
                            }} />
                            <Route path="/exchangeSuccess" render={() => {
                                return <ExchangeSuccess />
                            }} />
                            <Route path="/exchangeFail" render={() => {
                                return <ExchangeFail />
                            }} />
                            <Route path="/orderList" render={() => {
                                return <UserOrderList />
                            }} />
                            <Route path="/orderDetails/:id" render={() => {
                                return <OrderDetails />
                            }} />
                            <Route path="/login" render={() => {
                                return <Login />
                            }} />
                            <Route path="/register" render={() => {
                                return <Register />
                            }} />
                            <Route path="/logout" render={() => {
                                return <Logout/>
                            }} />
                            <Route path="/reset" render={() => {
                                return <ResetPassword/>
                            }} />
                            <Route component={PageNotFound}/>
                        {/*</GetBaidu>*/}
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
