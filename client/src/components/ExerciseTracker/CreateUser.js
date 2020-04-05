import React from 'react'
import axios from 'axios'

class CreateUser extends React.Component{
    constructor(){
        super();
        this.state={
            username : ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(event){
        const { name, value} = event.target;
        this.setState({
                [name] : value
            });
    }
    
    handleSubmit(event){
        event.preventDefault();
        const user={
            username: this.state.username
        };
        console.log(user);
        axios.post('http://localhost:5000/user/add', user).then(res => 
            console.log(res.data));

        this.setState({
            username : ''  
        });
    }
    render(){
        return(
            <form onSubmit={this.handleSubmit}>  
            <h2>Create User</h2>
            
            <div className="form-group">
                <label>Username: </label>
                <input type='text' required className='form-control' name='username' value={this.state.username} onChange={this.handleChange}/>
            </div>
            
            <div className="form-group">
                <button className='btn btn-primary'>Create!</button>
            </div>
        </form>
        );
    }
}
export default CreateUser