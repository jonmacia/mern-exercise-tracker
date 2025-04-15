import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddExercisePage from './pages/AddExercisePage';
import EditExercisePage from './pages/EditExercisePage';
import { useState} from 'react';
import Navigation from './components/navigator';

function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState([]);

  return (
    <div className="App">
      <Router>
      <header className="header">
          <h1>Exercise Tracker</h1>
          <p><cite>Full Stack MERN App Project</cite>, Assignment 7 CS 290</p>
        </header>
      <Navigation />
        <div className="App-header">
          <Route path="/" exact>
            <HomePage setExerciseToEdit={setExerciseToEdit} />
          </Route>
          <Route path="/add-exercise">
            <AddExercisePage />
          </Route>
          <Route path="/edit-exercise">
            <EditExercisePage exerciseToEdit={exerciseToEdit}/>
          </Route>
          </div>
          <footer>
          <p>Modified on 6/04/2022. &copy; 2022 Jonathan Macias.</p>
        </footer>
      </Router>
    </div>
  );
}

export default App;