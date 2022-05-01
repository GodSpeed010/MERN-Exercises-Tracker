import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ExercisesList() {
    const [state, setState] = useState({ exercises: [] });

    const deleteExercise = (id) => {
        axios.delete('http://localhost:5000/exercises/' + id)
            .then(res => console.log(res.data));
    }

    useEffect(() => {
        axios.get('http://localhost:5000/exercises')
            .then(res => setState({ exercises: res.data }))
            .catch(e => console.log(e))
        setState({ exercises: state.exercises.filter(x => x.id !== id) })
    }, [])

    return (
        <div>
            <p>You are on the Exercises List component!</p>
        </div>
    )
}