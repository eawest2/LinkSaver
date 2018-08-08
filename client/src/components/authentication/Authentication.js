import React, { Component } from "react";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import HomePage from "../HomePage.jsx";
import LoginPage from "../../containers/LoginPage.jsx";
import LogoutFunction from "../../containers/LogoutFunction.jsx";
import SignUpPage from "../../containers/SignUpPage.jsx";
import DashboardPage from "../../containers/DashboardPage.jsx";
import Auth from "../../modules/Auth";

const LoggedOutRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            Auth.isUserAuthenticated() ? (
                <Redirect
                    to={{
                        pathname: "/",
                        state: { from: props.location }
                    }}
                />
            ) : (
                    <Component {...props} {...rest} />
                )
        }
    />
);

const PropsRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => <Component {...props} {...rest} />} />
);

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            Auth.isUserAuthenticated() ? (
                <Component {...props} {...rest} />
            ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: props.location }
                        }}
                    />
                )
        }
    />
);

class Authentication extends Component {

    render() {
        console.log('>>>>> Authentication > toggleAuth: ', this.props.toggleAuthenticateStatus);
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <Router>
                    <div className="col-12">
                        <div className="row">
                            <div className="col-1"></div>
                            <div className="col-md-10">
                                <PropsRoute
                                    exact
                                    path="/"
                                    component={HomePage}
                                    toggleAuthenticateStatus={()=>this.props.toggleAuthenticateStatus()}
                                />
                                <PrivateRoute path="/dashboard" component={DashboardPage} />
                                <LoggedOutRoute
                                    path="/login"
                                    component={LoginPage}
                                    toggleAuthenticateStatus={()=>this.props.toggleAuthenticateStatus()}
                                />
                                <LoggedOutRoute path="/signup" component={SignUpPage} />
                                <Route path="/logout" component={LogoutFunction} />
                                <div className="">
                                    {this.props.authenticated ? (
                                        <div className="row my-3">
                                            <div className="col-md-3"></div>
                                            <div className="col-md-6 m-*-auto text-center">
                                                <Link to="/dashboard"> <button className="btn btn-sm align-middle px-5 mr-2 btn-success" type="button">Home</button></Link>
                                                <Link to="/logout"> <button className="btn btn-sm align-middle px-5 ml-2 btn-success" type="button">Log Out</button></Link>
                                            </div>
                                            <div className="col-md-3"></div>
                                        </div>
                                    ) : (
                                            <div className="row my-3">
                                                <div className="col-md-3"></div>
                                                <div className="col-md-6 m-*-auto text-center">
                                                    <Link to="/login"> <button className="btn btn-sm align-middle px-5 mr-2 btn-success" type="button">Log In</button></Link>
                                                    <Link to="/signup"> <button className="btn btn-sm align-middle px-5 ml-2 btn-success" type="button">Sign Up</button></Link>
                                                </div>
                                                <div className="col-md-3"></div>
                                            </div>
                                        )}
                                </div>
                            </div>
                            <div className="col-1"></div>
                        </div>
                    </div>
                </Router>
            </MuiThemeProvider>
        );
    };
};

export default Authentication;