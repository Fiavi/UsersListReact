import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import CreateUser from "./components/createUser";
import EditUser from "./components/editUser";
import UsersList from "./components/userList";

import usersLogo from "./img/usersLogo.png";

class App extends Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <a className="navbar-brand">
                            <img
                                src={usersLogo}
                                alt="usersLogo"
                                width="30"
                                height="30"
                            />
                        </a>
                        <Link to="/" className="navbar-brand">
                            Users Database
                        </Link>
                        <div className="navbar-collapse">
                            <ul className="navbar-nav mr-auto">
                                <li className="navbar-item">
                                    <Link to="/" className="nav-link">
                                        Users List
                                    </Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/create" className="nav-link">
                                        Add User
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>

                    <Route path="/" exact component={UsersList} />
                    <Route path="/edit/:id" component={EditUser} />
                    <Route path="/create" component={CreateUser} />
                </div>
            </Router>
        );
    }
}

export default App;
