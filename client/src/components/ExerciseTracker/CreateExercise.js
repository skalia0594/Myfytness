import React from 'react'
import {Redirect} from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
import Navbar from './Navbar'
class CreateExercise extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username: '',
            description: '',
            duration: '' ,
            date: new Date(),
            userId: '',
            errorMessage: '',
            // user : [],
            isSubmit: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        axios.get('/user' ,{
            headers: {Authorization: sessionStorage.getItem('auth-token')}
        }).then(response => {
                        this.setState({
                            username: response.data.username,
                            userId : response.data._id
                        });
        })
        
    }
    handleChange(event){
        const { type,name, value} = event.target;
        (type==="number")? this.setState({
            [name] : Number(value),
            errorMessage : ''
        }) 
        :
        this.setState({
                [name] : value,
                errorMessage : ''
            });
    }
    handleDateChange(date){
         this.setState({
            date : date,
            errorMessage : ''
        });
    }
    handleSubmit(event){
        event.preventDefault();
        const exercise={
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration ,
            date: this.state.date,
            user_id: this.state.userId
        };
        console.log(exercise);
        axios.post('/exercise/add', exercise,{
            headers: {Authorization: sessionStorage.getItem('auth-token')}
        }).then(response => {
            console.log(response.data);
            this.setState({
                isSubmit: true  
            });
        }).catch(e => {
            this.setState({ errorMessage : e.response.data.message });
        });
        
    }
    render(){
        if (this.state.isSubmit) return <Redirect to='/exercises' />;
        return(
            <div>
            <Navbar /> <br />
            <p style={{width: '40%',backgroundColor: 'chocolate',textAlign: 'center'}}>{this.state.errorMessage}</p>
           
            <form onSubmit={this.handleSubmit}>  
                <h2>Create Exercise Log</h2>
                <br />
                <div className="form-group">
                <label>User  Name: </label>
                    {/* <select required className='form-control' name='username' onChange={this.handleChange}>
                        <option>---Select Value---</option>
                        {this.state.user.map(x => <option key ={x} value={x}>{x}</option>)}
                    </select> */}
                    <span className='form-control' style={{backgroundColor: '#e9ecef',opacity: '1'}}>{this.state.username}</span>
                     {/* <input type='text' disabled className='form-control' name='username' value={this.state.username} onChange={this.handleChange}/> */}
                </div>
                <div className="form-group">
                    <label>Description: </label>
                    <input type='text' required className='form-control' name='description' value={this.state.description} onChange={this.handleChange} placeholder='ex. run, walk or bike'/>
                </div>
                <div className="form-group">
                    <label>Duration(in minutes): </label>
                    <input type='number' required className='form-control' name='duration' value={this.state.duration}  onChange={this.handleChange} placeholder='ex. 5 or 10'/>
                </div>
                <div className="form-group">
                    <label>Date: </label> <br />
                    <DatePicker className='form-control' selected={this.state.date} onChange={this.handleDateChange} />
                </div>
                <div className="form-group">
                    <button className='btn btn-dark'>Create!</button>
                </div>
            </form>
            </div>
        );
    }
}
export default CreateExercise