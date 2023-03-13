import React from 'react';
import { useNavigate } from 'react-router-dom';

export const RandomEpisode = ({ setSelectedEpisode }) => {
    const navigate = useNavigate();

    const getRandomEpisode = async (e) => {
        e.preventDefault();
        await fetch('http://localhost:3218/find-random-episode/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3218/find-random-episode/'
            },
            mode: 'cors',
        }).then( (response) => {
            if (!response) {
                alert("Error! Unable to retrieve an episode. Try again!");
            }
            return response.json();
        }).then( (data) => {
            setSelectedEpisode([data]);        
        }).catch(err => { 
            console.log(err);  
        });
        navigate('/episode');
    }

    return (
        <div className="container" id="rand-ep-container">
            <div className="jumbotron rounded-lg shadow" id="spec-ep-jumbo">
                <h1 className="display-4">Get a random episode</h1>
                <hr className="my-4"></hr>
                <p className="lead">Click the button to retrieve information about a randomly
                selected episode.</p>
                <button onClick={getRandomEpisode} className="btn btn-dark">Retrieve!</button>
            </div>
        </div>
    );
}

export default RandomEpisode;