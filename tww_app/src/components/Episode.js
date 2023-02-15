import React from 'react';

function Episode({ episode }) {
    return (
     <div>{episode.episodeName}</div> ? episode : null
    );
}

export default Episode;