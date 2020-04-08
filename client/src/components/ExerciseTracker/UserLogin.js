import React from 'react'
import axios from 'axios'
import { Redirect,Link } from 'react-router-dom';
import Navbar from './Navbar'
class UserLogin extends React.Component{
    constructor(props){
        super(props);
        this.state={
            email : '',
            password : '',
            isLogin : false
        }
        sessionStorage.removeItem('auth-token');
        this.logout = false
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
            email: this.state.email,
            password: this.state.password
        };
        // console.log(user);
        axios.post('http://localhost:5050/user/login', user).then(res => {
            console.log(res.data);
            sessionStorage.setItem('auth-token',res.data);
            this.setState({
                isLogin : !this.state.isLogin 
            });
            
        });
        this.setState({
            email : '',
            password: '',
        });
    }
    render(){
        if(this.state.isLogin) return <Redirect from='/' to ='/exercises' />;
        else this.logout = true
        return( 
            <div>
            <Navbar signOut={this.logout}/> <br />
            <form onSubmit={this.handleSubmit}>  
            <h2>Login</h2>
            
            <div className="form-group">
                <label>Email: </label>
                <input type='email' required className='form-control' name='email' value={this.state.email} onChange={this.handleChange}/>
            </div>
            <div className="form-group">
                <label>Password: </label>
                <input type='password' required className='form-control' name='password' value={this.state.password} onChange={this.handleChange}/>
            </div>
            <div className="form-group">
                <button className='btn btn-primary'>Login!</button>
            </div>
            <Link to='/user'>Don't have Account?</Link>
        </form>
        </div>
        );
    }
}
export default UserLogin