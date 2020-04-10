import React from 'react';
import {Link} from 'react-router-dom'
class Exercise extends React.Component{
    constructor(props){
        super(props);
        this.props= props;
    }
    render(){
    return(
        <tr> 
            {this.props.user_id === this.props.exercise.user_id ? <td style={{ color: '#495057', fontWeight: 'bold'}}>{this.props.exercise.username}</td>  : <td>{this.props.exercise.username}</td> }
            <td>{this.props.exercise.description}</td>
            <td>{this.props.exercise.duration}</td>
            <td>{this.props.exercise.date.substring(0,10)}</td>
            {
                this.props.user_id === this.props.exercise.user_id ? <td><Link to={'/edit/'+ this.props.exercise._id} >Edit</Link> | <button style={{border: 'none',padding: '0',color: '#007bff',cursor: 'pointer'}} onClick={() =>
                {this.props.deleteExercise(this.props.exercise._id)}}>Delete</button></td> : <td>No Actions</td>
            }
        </tr>  
    );
    }
}

export default Exercise