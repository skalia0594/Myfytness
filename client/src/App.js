import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
// import Navbar from './components/ExerciseTracker/Navbar';
import ExerciseList from './components/ExerciseTracker/ExerciseList';
import EditExercise from './components/ExerciseTracker/EditExercise';
import CreateExercise from './components/ExerciseTracker/CreateExercise';
import CreateUser from './components/ExerciseTracker/CreateUser';
import UserLogin from './components/ExerciseTracker/UserLogin';
// import About from './components/ExerciseTracker/About'
function App(){
    return(
        // <h1>Hello</h1>
        <Router>
            <div>
                <div className="container">
                    
                <Switch>
                    <Route path='/' exact component={UserLogin} />
                    <Route path='/exercises' component={ExerciseList} />
                    <Route path='/edit/:id' component={EditExercise} />
                    <Route path='/create' component={CreateExercise} />
                    <Route path='/user' component={CreateUser} />
                    
                </Switch>
                </div>
            </div>    
        </Router>
    );
}

export default App