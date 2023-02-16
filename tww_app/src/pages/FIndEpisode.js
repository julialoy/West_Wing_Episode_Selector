import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const FindEpisode = ({ setSelectedEpisode }) => {

    const [season, setSeason] = useState("0");
    const [episode, setEpisode] = useState(1);
    // const [episodeData, setEpisodeData] = useState([]);

    const navigate = useNavigate();

    const getEpisode = async (e) => {
        e.preventDefault();
        const targetEpisode = {season, episode};
        console.log("Search for ", season, episode);
        await fetch('http://localhost:3218/find-episode/', {
            method: 'POST',
            body: JSON.stringify(targetEpisode),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3218/find-episode/'
            },
            mode: 'cors',
        }).then( (response) => {
            if (!response) {
                alert("Error! Try again!");
            }
            console.log("Response");
            return response.json();
        }).then( (data) => {
            console.log("Data received: ", data);
            setSelectedEpisode([data]);
            //console.log("Episode data in app: ", episodeData);
        
        }).catch(err => { console.log(err);  });
        navigate('/episode');
    }


    return (
        <div className="container" id="spec-ep-container">
            <div className="jumbotron rounded-lg shadow" id="spec-ep-jumbo">
                <h1 className="display-4">Find a specific episode</h1>
                <hr className="my-4"></hr>
                <p className="lead">Fill out the form below to retrieve episode information by season and episode number.</p>
                <form>
                    <div className="form-group-row">
                        <label htmlFor="seasonNumber">Season number</label>
                        <select className="form-control" id="seasonNumber" name="seasonNumber" selected={season} value={season} onChange={e => setSeason(e.target.value)}>
                            <option value="0">Select a Season</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="episodeNumber">Episode number</label>
                        <input type="number" className="form-control" id="episodeNumber" min="1" max="23" step="1" name="episode" value={episode} selected={episode} onChange={e => setEpisode(e.target.value)} required/>
                    </div>
                    <button onClick={getEpisode} className="btn btn-dark">Search!</button>
                </form>
            </div>
        </div>
    );
}

export default FindEpisode;