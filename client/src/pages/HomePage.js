import React from 'react';
import ExerciseList from '../components/ExerciseList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function HomePage( { setExerciseToEdit } ) {
    const history = useHistory();
    const [exercises, setExercises] = useState([]);
    
    const onDelete = async id => {
        const response = await fetch(`/exercises/${id}`, { method: 'DELETE' });
        if (response.status === 204) {
        const getResponse = await fetch('/exercises');
        const exercises = await getResponse.json();
        setExercises(exercises);
        } else {
        console.error(`Failed to delete movie with id = ${id}, status code = ${response.status}`)
        }
    }	

    const onEdit = exercise => {
        setExerciseToEdit(exercise);
        history.push("/edit-exercise");
    }
	
    const loadExercises = async () => {
        const response = await fetch('/exercises');
        const data = await response.json();
        setExercises(data);
    }
	
    useEffect(() => {
        loadExercises();
    }, []);
	

    return (
        <>
            <h2>List of Exercises</h2>
            <ExerciseList exercises={exercises} onDelete={onDelete} onEdit={onEdit}></ExerciseList>
        </>
    );
}

export default HomePage;