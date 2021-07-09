import React, { Component } from "react";
import axios from "axios";

export default class CreateUser extends Component {
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

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            surrname: this.state.surrname,
            description: this.state.description
        };

        axios
            .post("http://localhost:3001/users/add", newUser)
            .then((res) => console.log(res.data));

        this.setState({
            name: "",
            surrname: "",
            description: ""
        });
    }

    render() {
        return (
            <div className="mt-2 m-auto">
                <h3>Add New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group mt-2">
                        <label>Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.name}
                            onChange={this.onChangeName}
                            placeholder="Enter the name"
                        />
                    </div>
                    <div className="form-group mt-2">
                        <label>Surrname</label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.surrname}
                            onChange={this.onChangeSurrname}
                            placeholder="Enter the surrname"
                        />
                    </div>
                    <div className="form-group mt-2">
                        <label>Description</label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                            placeholder="Enter the description"
                        />
                    </div>
                    <div className="form-group mt-2">
                        <label>Choose an avatar</label>
                        <input type="file" className="form-control" />
                    </div>
                    <div className="form-group mt-4">
                        <input
                            type="submit"
                            value="Add New User"
                            className="btn btn-primary"
                        />
                    </div>
                </form>
            </div>
        );
    }
}
