import React from 'react';

function RandomEpisode() {
    return(
        <div className="container" id="rand-ep-container">
            <div className="jumbotron rounded-lg shadow" id="rand-ep-jumbo">
                <h1 className="display-4">Get a random episode</h1>
                <hr className="my-4"></hr>
                <p className="lead">Click the button to get a random episode!</p>
                <button type="submit" className="btn btn-dark">Generate!</button>
            </div>
        </div>
    );
}

export default RandomEpisode;