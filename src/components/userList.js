import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import userDefAvatar from "../img/userDefAvatar.png";
import editButton from "../img/edit.png";
import deleteButton from "../img/delete.png";
import "../App.css";

const User = (props) => (
    <tr className="trEffect">
        <td>{props.id}</td>
        <td>{props.user.name}</td>
        <td>{props.user.surrname}</td>
        <td>{props.user.description}</td>
        <td>
            <img src={userDefAvatar} alt="user-avatar" width="30" height="30" />
        </td>
        <td className="pl-2">
            <Link to={"/edit/" + props.user._id}>
                <img src={editButton} alt="edit" width="30" height="30" />
            </Link>
        </td>
        <td>
            <a onClick={props.deleteUser}>
                <img src={deleteButton} alt="edit" width="30" height="30" />
            </a>
        </td>
    </tr>
);

export default class UsersList extends Component {
    constructor(props) {
        super(props);
        this.state = { users: [] };
    }

    getUsers = () => {
        axios
            .get("http://localhost:3001/users/")
            .then((res) => {
                this.setState({ users: res.data });
            })
            .catch(function (err) {
                console.log(err);
            });
    };

    deleteReq = (id, e) => {
        axios.delete(`http://localhost:3001/users/delete/${id}`).then((res) => {
            this.getUsers();
        });
    };

    componentDidMount() {
        this.getUsers();
    }

    componentDidUpdate() {
        this.getUsers();
    }

    render() {
        const user = this.state.users.map((current, i) => {
            return (
                <User
                    key={i}
                    user={current}
                    deleteUser={() => this.deleteReq(current._id)}
                />
            );
        });
        return (
            <div>
                <h3>Users List</h3>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Surrname</th>
                            <th>Description</th>
                            <th>Avatar</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>{user}</tbody>
                </table>
            </div>
        );
    }
}
