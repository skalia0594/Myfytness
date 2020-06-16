import React from 'react'
import axios from 'axios'
import { Redirect,Link } from 'react-router-dom';
import Navbar from './Navbar'
import FacebookLoginLink from './FacebookLoginLink';
import GoogleLoginLink from './GoogleLoginLink'
class UserLogin extends React.Component{
    constructor(props){
        super(props);
        this.state={
            email : '',
            password : '',
            errorMessage: '',
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
                [name] : value,
                errorMessage:''
            });
    }
    
    handleSubmit(event){
        event.preventDefault();
        const user={
            email: this.state.email,
            password: this.state.password
        };
        // console.log(user);
        axios.post('/user/login', user).then(res => {
            // console.log(res.data);
            sessionStorage.setItem('auth-token',res.data);
            this.setState({
                isLogin : !this.state.isLogin 
            });
        }).catch(e => {
            console.error(e.response.data);
            this.setState({ errorMessage : e.response.data });
        });
        this.setState({
            email : '',
            password: '',
        });
    }
    render(){
        if(this.state.isLogin) return <Redirect from='/' to ='/create' />;
        else this.logout = true
        return( 
            <div>
            <Navbar signOut={this.logout}/> <br /> <section className="landing">
            <div className="login-page">
                <div className="login-form">
                    <form onSubmit={this.handleSubmit} className='form-horizontal'>  
                    <h2>Login</h2> <br />
                    <p style={{width: '40%',backgroundColor: 'chocolate',textAlign: 'center'}}>{this.state.errorMessage}</p>
                    <div className="form-group">
                        <label className="control-label" htmlFor="email">Email: </label>
                        <input type='email' required className='form-control' id='email' name='email' value={this.state.email} onChange={this.handleChange}/>
                    </div>
                    
                    <div className="form-group">
                        <label className="control-label" htmlFor="pwd">Password: </label>
                        <input type='password' required id='pwd' className='form-control' name='password' value={this.state.password} onChange={this.handleChange}/>
                    </div>
                    
                    <div className="form-group">
                        <div className="col-sm-offset-2">
                            <button className='btn btn-dark'>Login!</button>
                        </div>    
                    </div>
                    
                    <Link to='/user'>Don't have Account?</Link>
                
                    </form>
                </div>    
                <div className="auth-login">
                    <FacebookLoginLink />
                    <GoogleLoginLink />
                </div>
            </div>
        
        </section>
        </div>
        );
    }
}
export default UserLogin