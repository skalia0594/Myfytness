import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';

class FacebookLoginLink extends Component {
    state = {
        isLoggedIn: false,
    }
    componentClicked = () => {
        console.log("Facebook-login");
    }
    responseFacebook = response => {
        // console.log(response);
        if(response.id){
            const user = {
                email: response.email,
                authId: response.id,
                username: response.name
            }
            axios.post('/user/fbauthlogin', user).then(res => {
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
        let fbContent;
        if(this.state.isLoggedIn) {
            fbContent = (
                <Redirect from='/' to ='/create' />
            );
        }else {
            fbContent = (<FacebookLogin
            appId="723472581753018"
            autoLoad={false}
            fields="name,email,picture"
            onClick={this.componentClicked}
            callback={this.responseFacebook} />)
        }

        return (
            <div>
                {fbContent}
            </div>
        );
    }
}

export default FacebookLoginLink;