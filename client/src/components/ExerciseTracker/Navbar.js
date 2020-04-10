import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Navbar extends React.Component{
    constructor(props){
        super(props);
        this.state={
            session : false,
            username: ''
        }
        this.signOut = props.signOut;
        this.token = sessionStorage.getItem('auth-token');
        this.logOut =this.logOut.bind(this);
    }
    componentDidMount(){
        if(!this.signOut){
            axios.get('/user',{
                headers: {Authorization: sessionStorage.getItem('auth-token')}
            }).then(res => {
                console.log(res.data);
                this.setState({ 
                    session: true ,
                    username : res.data.username
                });
            }).catch(e => {
                if(null !== e.response)
                console.log(e.response);
            });    
        }    
    }
    logOut(event){
        sessionStorage.removeItem('auth-token');
        this.setState({
            session: false
        });
    }
    render(){
        
        return(
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                 <div className="navbar-brand">MY FITNESS</div>
                 
                 <div className="navbar-collapse collapse">
                     <ul className="navbar-nav">
                     
                       { this.state.session && <li className="nav-item"><Link className="nav-link" to="/exercises">Excercises</Link></li>}
                       { this.state.session && <li className="nav-item"><Link className="nav-link" to="/create">Create Exercise</Link></li>}
                       { this.state.session && <li className="nav-item" onClick={this.logOut}><Link className="nav-link" to="/">Sign Out</Link></li>}
                     </ul>
                     { this.state.session && <div style={{marginLeft: 'auto', color: '#fff'}}>Welcome {this.state.username}</div> }
                 
                 </div>
             </nav>
         );
    }
    
}
export default Navbar