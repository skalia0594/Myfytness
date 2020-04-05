import React from 'react'
import axios from 'axios'
import Exercise from './Exercise'
class ExerciseList extends React.Component{
    constructor(){
        super();
        this.state={
            exercises: [],
            isLoading: true
        }
        this.deleteExercise = this.deleteExercise.bind(this);
    }
    componentDidMount(){
        axios.get('http://localhost:5000/exercise').then(res => 
                this.setState({
                    exercises : res.data,
                    isLoading : false
                })).catch(err => console.log(err));
    }
    deleteExercise(id){
        axios.delete('http://localhost:5000/exercise/delete/' + id).then(res => 
                    console.log(res));
        this.setState({
            exercises: this.state.exercises.filter(x => x._id !== id)
        });
    }
    displayList(){
        return this.state.exercises.map(currentexercise => {
            return <Exercise key={currentexercise._id} exercise={currentexercise} deleteExercise={this.deleteExercise} />});
    }
    render(){
        return(
            <div>
                <h2>Logged Exercises</h2> 
            <table className="table"> 
            <thead className="thead-light">  
                <tr> 
                    <th>Username</th> 
                    <th>Description</th>
                    <th>Duration</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>  
            </thead> 
            <tbody>
                    {!this.state.isLoading && this.displayList()}    
            </tbody> 
            </table>

            </div>
        );
    }
}
export default ExerciseList