import React from 'react'
import axios from 'axios'
import { Redirect , Link} from 'react-router-dom';
import Navbar from './Navbar'
class CreateUser extends React.Component{
    constructor(){
        super();
        this.state={
            username : '',
            email: '',
            password: '',
            errorMessage: '',
            isUserCreated: false,
            autoLoggedIn:false
        }
        this.logout = false
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.autoLogin = this.autoLogin.bind(this)
    }
    handleChange(event){
        const { name, value} = event.target;
        this.setState({
                [name] : value,
                errorMessage :''
            });
    }
    
    handleSubmit(event){
        event.preventDefault();
        const user={
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        };
        // console.log(user);
        axios.post('/user/add', user).then(res => {
            if(res.data) console.log(res.data)
            this.setState({ 
                isUserCreated: true
            });
        }).catch(e => {
            console.log(e.response.data.message);
            this.setState({ password:'', errorMessage : e.response.data.message });
        });

    }
    autoLogin(){
        const user={
            email: this.state.email,
            password: this.state.password
        };
        axios.post('/user/login', user).then(res => {
            console.log(res.data);
            sessionStorage.setItem('auth-token',res.data);   
            this.setState({
                autoLoggedIn: !this.state.autoLoggedIn,
                isUserCreated: !this.state.isUserCreated
            });
        });
        
    }
    render(){
        if(this.state.isUserCreated){
            this.autoLogin();
        } 
        if(this.state.autoLoggedIn) return <Redirect to='/create' />;

        if(!this.state.isUserCreated && !this.state.autoLoggedIn) this.logout = true;
        return(
            <div>
            <Navbar signOut={this.logout}/> <br />
            <p style={{width: '40%',backgroundColor: 'chocolate',textAlign: 'center'}}>{this.state.errorMessage}</p>
           
            <form onSubmit={this.handleSubmit}>  
            <h2>Create User</h2>
            <br />
            <div className="form-group">
                <label>Username: </label>
                <input type='text' required className='form-control' name='username' value={this.state.username} onChange={this.handleChange}/>
            </div>
            <div className="form-group">
                <label>Email: </label>
                <input type='email' required className='form-control' name='email' value={this.state.email} onChange={this.handleChange}/>
            </div>
            <div className="form-group">
                <label>Password: </label>
                <input type='password' required className='form-control' name='password' value={this.state.password} onChange={this.handleChange}/>
            </div>
            
            <div className="form-group">
                <button className='btn btn-dark'>Create!</button>
            </div>
            <Link to='/'>Have Account?</Link>
        </form>
        </div>
        );
    }
}
export default CreateUser