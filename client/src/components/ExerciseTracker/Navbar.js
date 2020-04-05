import React from 'react';
import {Link} from 'react-router-dom';

function Navbar(){
    return(
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">MY FITNESS</Link>
    
            <div className="navbar-collapse collapse">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Excercises</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/create">Create Exercise Log</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/user">Create User</Link>
                    </li>
                </ul>
            </div>
        </nav>

    );
}
export default Navbar