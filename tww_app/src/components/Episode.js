import React from 'react';

function Episode({ selectedEpisode }) {
    console.log("IN EPISODE: ", selectedEpisode);
    return (
        <div>{selectedEpisode[0].episodeName}</div>
    );
}

export default Episode;