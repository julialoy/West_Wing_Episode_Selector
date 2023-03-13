import React from 'react';

function Help() {
    return(
        <div className="container" id="help-page-container">
        <article className="jumbotron rounded-lg shadow" id="help-page-jumbo">
            <h1 className="display-4">Help Topics</h1>
            <hr className="my-4"></hr>
            <div>
                <h2>How Do I ... Find a Specific Episode</h2>
                <p>To retrieve information about a specific episode
                of The West Wing, use the navigation bar at the top of the app and click on
                "Find a Specific Episode." The page will then prompt you to enter a season
                number and episode number.</p>
            </div>
            <hr className="my-4"></hr>
            <div>
                <h2>How Do I ... Find Episode Information without a Season/Episode Number</h2>
                <p>Don't know the season and/or episode number? Or don't want to
                select a specific episode but still want to read episode information? The app can
                pick an episode at random for you! Use the navigation bar at the top of the app and
                click on "Find a Random Episode." The page will display episode information for a
                randomly selected episode of The West Wing.</p>
            </div>
            <hr className="my-4"></hr>
            <div>
                <h2>How Do I ... Start Over?</h2>
                <p>If you are viewing episode information, you can click the
                "Clear" button to take you back to the Find a Specific Episode page. And you can
                always go to the app's homepage by clicking on "Home" in the navigation bar at the
                top of the app.</p>
            </div>
        </article>
        </div>
    );
}

export default Help;