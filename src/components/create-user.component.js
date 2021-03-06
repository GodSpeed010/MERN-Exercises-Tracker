import { React, useState } from 'react'
import axios from 'axios'

export default function CreateUser() {
    const [state, setState] = useState({
        username: ''
    })

    function onChangeUsername(e) {
        setState({
            ...state,
            username: e.target.value
        })
    }

    function onSubmit(e) {
        e.preventDefault();

        const user = {
            username: state.username
        }

        console.log(user);

        axios.post('http://localhost:5000/users/add', user)
            .then(res => console.log(res.data));

        setState({
            ...state,
            username: ''
        })
    }

    return (
        <div>
            <h3>Create New User</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={state.username}
                        onChange={onChangeUsername}
                    />
                </div>
                <div className="form-group">
                    <input type="submit" value="Create User" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}

