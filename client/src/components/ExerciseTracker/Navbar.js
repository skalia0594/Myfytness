import React from 'react';
import {Link} from 'react-router-dom';

function Navbar(){
    return(
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            <Link className="navbar-brand" to="/">MY FITNESS</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item"><Link className="nav-link" to="/">Excercises</Link></li>
                        <li className="navbar-item"><Link className="nav-link" to="/create">Create Exercise Log</Link></li>
                        <li className="navbar-item"><Link className="nav-link" to="/user">Create User</Link></li>
                    </ul>
               </div>     
        </nav>
    );
}
export default Navbar