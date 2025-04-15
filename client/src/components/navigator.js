import React from 'react';
import { Link } from 'react-router-dom';

function Navigation(){
    return(
        <nav>  
            <Link className="App-link" to="/"> Home Page </Link><br>
            </br>

            <Link className="App-link" to="./edit-exercise"> Edit Exercises </Link><br>
            </br>

            <Link className="App-link" to="./add-exercise"> Create Exercises </Link>

        </nav>
    );
}

export default Navigation;