import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function EpisodeHeader({ selectedEpisode, createChildElements }) {
    /* EPISODE DATA */
    const director = createChildElements(selectedEpisode[0].director, "director");
    const writers = createChildElements(selectedEpisode[0].writer, "writer");
    const epCreator = createChildElements(selectedEpisode[0].creator, "ep-creator");

    /* ELEMENT FUNCTIONS */
    const navigate = useNavigate();
    const clearEpisode = (e) => {
        e.preventDefault();

        navigate('/find-episode');
    }

    useEffect( () => {
        window.$('button').tooltip('hide');
    }, []);

    return (
        <React.Fragment>
            <div className="d-flex flex-row justify-content-between ep-title-group">
                <div className="ep-title ">
                    <h1 className="display-5">{selectedEpisode[0].episodeName}</h1>
                </div>
                <div className="button-group ">
                    <button
                        type="button"
                        className="btn btn-dark mt-3"
                        onClick={clearEpisode}
                        data-toggle="tooltip"
                        data-placement="right"
                        title="Clears episode info and returns to select
                            episode by season and episode number">Clear</button>
                </div>
            </div>
            <p className="lead">Aired {selectedEpisode[0].dateAired}</p>
            <p className="lead d-inline">Directed by {director}</p>
            <p className="lead">Written by {writers}</p>
            <p className="lead">Created by {epCreator}</p>

        </React.Fragment>
    );
}

export default EpisodeHeader;