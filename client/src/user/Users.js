import React, { Component } from "react";

import { list } from './apiUser'
import DefaultProfile from '../images/avatar.png'
import { Link } from 'react-router-dom'

class Users extends Component {
    constructor() {
        super();
        this.state = {
            users: []
        }
    }

    componentDidUpdate() {
        list().then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                this.setState({ users: data});
            }
        })
    }

    renderUsers = (users) => {
        <div className="row">
            {users.map((user, i) => {
                <div key={i} className="card col-md-4">
                    <img 
                        style={{ height: "200px", width: "auto" }}
                        className="img-thumbnail"
                        src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`}
                        onError={i => (i.target.src = DefaultProfile)}
                        alt={user.name}
                    />

                    <div className="card-body">
                        <h5 className="card-title">{user.name}</h5>
                        <p className="card-text">{user.email}</p>
                        <Link
                            to={`/user/${user._id}`}
                            className="btn btn-raised btn-sm btn-primary">
                            View Profile
                        </Link>
                    </div>
                </div>
            })}
        </div>
    }

    render() {
        const {users} = this.state;
        return(
            <div className="container">
                <h1 className="mt-5 mb-5">Users</h1>
                {this.renderUsers(users)}
            </div>
        )
    }
}

export default Users;