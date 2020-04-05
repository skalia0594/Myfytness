import React from 'react'
import {Redirect} from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
// import { response } from 'express'

class CreateExercise extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username: '',
            description: '',
            duration: 0 ,
            date: new Date(),
            user : [],
            isSubmit: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        axios.get('http://localhost:5000/user').then(response => {
                   if(response.data.length > 0){
                        this.setState({
                            user: response.data.map(u => u.username)
                        });
                   } 
        })
        
    }
    handleChange(event){
        const { type,name, value} = event.target;
        (type==="number")? this.setState({
            [name] : Number(value)
        }) 
        :
        this.setState({
                [name] : value
            });
    }
    handleDateChange(date){
         this.setState({
            date : date
        });
    }
    handleSubmit(event){
        event.preventDefault();
        const exercise={
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration ,
            date: this.state.date
        };
        console.log(exercise);
        axios.post('http://localhost:5000/exercise/add', exercise).then(response => {
            console.log(response.data);
            this.setState({
                isSubmit: true  
            });
        });
        
    }
    render(){
        if (this.state.isSubmit) return <Redirect to='/' />;
        return(
            <form onSubmit={this.handleSubmit}>  
                <h2>Create Exercise Log</h2>
                <div className="form-group">
                <label>User  Name: </label>
                    <select required className='form-control' name='username' onChange={this.handleChange}>
                        <option>---Select Value---</option>
                        {this.state.user.map(x => <option key ={x} value={x}>{x}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label>Description: </label>
                    <input type='text' required className='form-control' name='description' value={this.state.description} onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <label>Duration(in minutes): </label>
                    <input type='number' className='form-control' name='duration' value={this.state.duration}  onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label>Date: </label> <br />
                    <DatePicker className='form-control' selected={this.state.date} onChange={this.handleDateChange} />
                </div>
                <div className="form-group">
                    <button className='btn btn-primary'>Create!</button>
                </div>
            </form>
        );
    }
}
export default CreateExercise