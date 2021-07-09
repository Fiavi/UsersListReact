import React, { Component } from "react";
import axios from "axios";

export default class EditUser extends Component {
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeSurrname = this.onChangeSurrname.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: "",
            surrname: "",
            description: ""
        };
    }

    componentDidMount() {
        axios
            .get("http://localhost:3001/users/" + this.props.match.params.id)
            .then((res) => {
                this.setState({
                    name: res.data.name,
                    surrname: res.data.surrname,
                    description: res.data.description
                });
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }
    onChangeSurrname(e) {
        this.setState({
            surrname: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }
    // oncChangeAvatar(e) {
    //     this.setState({
    //         avatar: e.target.value
    //     });
    // }

    onSubmit(e) {
        e.preventDefault();

        const editedUser = {
            name: this.state.name,
            surrname: this.state.surrname,
            description: this.state.description
        };
        axios
            .post(
                "http://localhost:3001/users/update/" +
                    this.props.match.params.id,
                editedUser
            )
            .then((res) => {
                console.log(res.data);
            });
        this.props.history.push("/");
    }

    render() {
        return (
            <div>
                <h3>Edit info about user</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group mt-2">
                        <label>Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.name}
                            onChange={this.onChangeName}
                        />
                    </div>
                    <div className="form-group mt-2">
                        <label>Surrname</label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.surrname}
                            onChange={this.onChangeSurrname}
                        />
                    </div>
                    <div className="form-group mt-2">
                        <label>Description</label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group mt-2">
                        <label>Choose an avatar</label>
                        <input type="file" className="form-control" />
                    </div>
                    <div className="form-group mt-4">
                        <input
                            type="submit"
                            value="Edit the information"
                            className="btn btn-primary"
                        />
                    </div>
                </form>
            </div>
        );
    }
}
