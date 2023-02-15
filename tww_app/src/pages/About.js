import React from 'react';

function About() {
    return(
        <div className="container" id="about-page-container">
        <article className="jumbotron rounded-lg shadow" id="aobut-page-jumbo">
            <h1 className="display-4">About . . .</h1>
            <hr className="my-4"></hr>
            <div>
                <h2>The App</h2>
                <p>The West Wing Episode Info Retriever was created to allow users to easily find interesting information about specific episodes from The West Wing television series. You can search for a specific episode by season and episode number or you can let the app show you information about a random episode. Use the navigation bar, located at the top of every page, to access these options.</p>
            </div>
            <hr className="my-4"></hr>
            <div>
                <h2>The West Wing Series</h2>
                <p>The West Wing was a drama series that ran on NBC from 1999 through 2006. The show follows the fictional presidency of US President Josiah Bartlet and his staff.</p>
            </div>
            <hr className="my-4"></hr>
            <div>
                <h2>How to Use the App</h2>
                <p>The main navigation bar will always be displayed to you. From any page, you are able to access any of the options on the main navigation bar, including the "home" link. Select "Find a Specific Episode" to search for an episode by season and episode number. Select "Get a Random Episode" to let the app show you an episode of its choice.</p>
                <p>More detailed information is available on the help page and through tooltips within the app.</p>
            </div>
        </article>
        </div>
    );
}

export default About;