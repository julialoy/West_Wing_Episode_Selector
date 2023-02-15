import React from 'react';

function HomePage() {

    return (
        <div className="container" id="home-page-container">
            <div className="jumbotron rounded-lg shadow" id="home-page-jumbo">
                <h1 className="display-4">Welcome to the West Wing Episode Info Retriever!</h1>
                <hr className="my-4"></hr>
                <p className="lead">Explore information about your favorite episode of The West Wing or let us show you a random episode</p>
                <p>It goes without saying . . . this app contains SPOILERS!</p>
            </div>
        </div>
    );
}

export default HomePage;