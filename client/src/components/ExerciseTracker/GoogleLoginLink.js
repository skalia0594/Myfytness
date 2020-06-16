import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import axios from 'axios';

class GoogleLoginLink extends Component {
    state = {
        isLoggedIn: false,
    }
    responseGoogle = response => {
        console.log(response);
        if(response.profileObj){
            const user = {
                email: response.profileObj.email,
                authId: response.profileObj.googleId,
                username: response.profileObj.name
            }
            axios.post('/user/googleauthlogin', user).then(res => {
                // console.log(res.data);
                sessionStorage.setItem('auth-token',res.data);
                this.setState({
                    isLoggedIn: true
                });
            }).catch(e => {
                console.error(e.response.data);
            });

        }
    }
    render() {
        let googleContent;
        if(this.state.isLoggedIn) {
            googleContent = (
                <Redirect from='/' to ='/create' />
            );
        }else {
            googleContent = (<GoogleLogin
                clientId="708846274623-tbp8t50pah7bn2arcj0lbrsgcfd8br8k.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                cookiePolicy={'single_host_origin'}
               />)
        }

        return (
            <div>
                {googleContent}
            </div>
        );
    }
}

export default GoogleLoginLink;