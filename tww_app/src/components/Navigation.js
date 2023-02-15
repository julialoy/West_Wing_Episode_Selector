import React from 'react';

function Navigation() {
    return(
        <div className="container">
            <nav className="navbar navbar-expand-lg fixed-top navbar-dark navbar-light bg-secondary">
                <div className="collapse navbar-collapse" id="navbarText">
                    <a href="/" className="nav-item nav-link">
                        Home
                    </a>
                    <a href="/about" className="nav-item nav-link">
                        About
                    </a>
                    <a href="#" className="nav-item nav-link">
                        Help
                    </a>
                    <a 
                        href="/find-episode" 
                        className="nav-item nav-link" 
                        data-toggle="tooltip" 
                        data-placement="bottom" 
                        title="Requires a season and episode number"
                        id="find-spec-ep"
                    >
                        Find a Specific Episode
                    </a>
                    <a 
                        href="/random-episode" 
                        className="nav-item nav-link" 
                        data-toggle="tooltip" 
                        data-placement="bottom" 
                        title="Random! No season/episode numbers required."
                        id="find-rand-ep"
                    >
                        Get a Random Episode
                    </a>
                </div>
            </nav>
        </div>
    );
}

export default Navigation;