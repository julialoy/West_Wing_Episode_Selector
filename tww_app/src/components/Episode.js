import React from 'react';
import EpisodeHeader from "./EpisodeHeader";
import EpisodeDesc from "./EpisodeDesc";
import EpisodeCast from "./EpisodeCast";

function Episode({ selectedEpisode, createChildElements }) {

    return (
        <div className="container" id="ep-info-container">
            <div className="jumbotron rounded-lg shadow" id="ep-info-jumbo">
                <EpisodeHeader selectedEpisode={selectedEpisode}
                               createChildElements={createChildElements} />
                <hr className="my-4"></hr>
                <EpisodeDesc selectedEpisode={selectedEpisode} />
                <hr className="my-4"></hr>
                <EpisodeCast selectedEpisode={selectedEpisode}
                             createChildElements={createChildElements} />
            </div>
        </div>
    );
}

export default Episode;