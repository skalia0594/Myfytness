import React from 'react'
import axios from 'axios'
import Exercise from './Exercise'
import Navbar from './Navbar'
class ExerciseList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            exercises: [],
            currentUser: '',
            isLoading: true
        }
        this.deleteExercise = this.deleteExercise.bind(this);
    }
    componentDidMount(){
        axios.get('/user' ,{
            headers: {Authorization: sessionStorage.getItem('auth-token')}
        }).then(response => {
                        this.setState({
                            currentUser: response.data._id
                        });

        axios.get('/exercise',{
            headers: {Authorization: sessionStorage.getItem('auth-token')}
        }).then(res => 
                this.setState({
                    exercises : res.data,
                    isLoading : false
                })).catch(err => console.log(err));
         
        
        })
    }
    deleteExercise(id){
        axios.delete('/exercise/delete/' + id,{
            headers: {Authorization: sessionStorage.getItem('auth-token')}
        }).then(res => 
                    console.log(res));
        this.setState({
            exercises: this.state.exercises.filter(x => x._id !== id)
        });
    }
    displayList(){
        return this.state.exercises.map(currentexercise => {
            return <Exercise key={currentexercise._id} user_id={this.state.currentUser} exercise={currentexercise} deleteExercise={this.deleteExercise} />});
    }
    render(){
        return(
            <div>
                <Navbar /> <br />
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