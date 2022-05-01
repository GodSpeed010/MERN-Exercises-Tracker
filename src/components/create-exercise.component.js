import { React, useEffect, useState } from 'react'
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default function CreateExercises() {
    const [state, setState] = useState({
        username: '',
        description: '',
        duration: '',
        date: new Date(),
        users: []
    })

    useEffect(() => {
        axios.get('http://localhost:5000/users/')
            .then(res => {
                if (res.data.length > 0)
                    setState({
                        ...state,
                        users: res.data.map(user => user.username),
                        username: res.data[0].username
                    })
            })
    }, [])

    const onChangeUsername = (e) => {
        setState({
            ...state,
            username: e.target.value
        })
    }
    const onChangeDescription = (e) => {
        console.log(JSON.stringify(state))
        setState({
            ...state,
            description: e.target.value
        })
    }
    const onChangeDuration = (e) => {
        setState({
            ...state,
            duration: e.target.value
        })
    }
    const onChangeDate = (date) => {
        setState({
            ...state,
            date: date
        })
    }
    const onChangeUsers = (e) => {
        setState({
            ...state,
            users: e.target.value
        })
    }
    const onSubmit = (e) => {
        e.preventDefault();

        const {
            users,
            ...exercise
        } = state

        console.log(JSON.stringify(exercise))

        axios.post('http://localhost:5000/exercises/add', exercise)
            .then(res => {
                console.log(res.data)
                window.location.href = '/'
            })
    }

    return (
        <div>
            <h3>Create New Exercise Log</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <select
                        required
                        className="form-select"
                        value={state.username}
                        onChange={onChangeUsername}>
                        {
                            state.users.map(function (user) {
                                return <option
                                    key={user}
                                    value={user}>{user}
                                </option>;
                            })
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label>Description: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={state.description}
                        onChange={onChangeDescription}
                    />
                </div>
                <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input
                        type="text"
                        className="form-control"
                        value={state.duration}
                        onChange={onChangeDuration}
                    />
                </div>
                <div className="form-group">
                    <label>Date: </label>
                    <div>
                        <DatePicker
                            selected={state.date}
                            onChange={onChangeDate}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}
