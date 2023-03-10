import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Episode({ selectedEpisode }) {
    console.log("IN EPISODE: ", selectedEpisode);

    const [showExpandedSum, setShowExpandedSum] = useState(false);
    const [showExpandedPlot, setShowExpandedPlot] = useState(false);
    const [toggleSumText, setToggleSumText] = useState("See the expanded summary");
    const [togglePlotText, setTogglePlotText] = useState("See the episode plot");
    const [summaryText, setSummaryText] = useState(selectedEpisode[0].briefSummary);
    const [didSummaryStateUpdate, setSummaryStateUpdate] = useState(false);
    const [didPlotStateUpdate, setPlotStateUpdate] = useState(false);
    const [toggleCastText, setToggleCastText] = useState("Show full cast list");
    const [castList, setCastList] = useState([]);
    const [specialGuestStarText, setSpecialGuestStarText] = useState("Special Guest Stars");
    const [specialGuestStarList, setSpecialGuestStarList] = useState([]);
    const [guestStarText, setGuestStarText] = useState();
    const [guestStarList, setGuestStarList] = useState([]);
    const [didCastUpdate, setDidCastUpdate] = useState(false);
    const [showExpandedCast, setShowExpandedCast] = useState(false);
    const [castDescText, setCastDescText] = useState("Regular Cast");
    const [expandedCast, setExpandedCast] = useState([]);

    const navigate = useNavigate();

    const clearEpisode = (e) => {
        e.preventDefault();
        window.$('button').tooltip('hide');
        navigate('/find-episode');
    }

    /* createChildElements function copied from my photo-sharing-app project */
    const createCastElements = (castArray) =>  {
        let castElementsArray = [];
        for (let x = 0; x < castArray.length; x++) {
            let castName = castArray[x].firstName + ' ' + castArray[x].lastName
            let castRole = castArray[x].role
            castElementsArray.push(<li className="cast-element" key={x}>{castName} ({castRole})</li>);
        }
        return castElementsArray;
    }

    const toggleSummaryInfo = () => {
        console.log("toggle summary info");
        showExpandedSum ? setShowExpandedSum(false) : setShowExpandedSum(true);
        setSummaryStateUpdate(true);
    }

    const toggleLongPlot = () => {
        showExpandedPlot ? setShowExpandedPlot(false) : setShowExpandedPlot(true);
        setPlotStateUpdate(true);
    }
    
    const toggleCastList = () => {
        showExpandedCast ? setShowExpandedCast(false) : setShowExpandedCast(true);
        setDidCastUpdate(true);
    }

    useEffect( () => {
        window.$('[data-toggle="tooltip"]').tooltip();

        console.log("Did state update? ", didSummaryStateUpdate);
        if (didSummaryStateUpdate) {
            console.log("Use effect");
            showExpandedSum ? setShowExpandedSum(true) : setShowExpandedSum(false);
            showExpandedSum ? setToggleSumText("Hide expanded summary") : setToggleSumText("See the expanded summary");
            showExpandedSum ? setSummaryText(selectedEpisode[0].expandedSummary) : setSummaryText(selectedEpisode[0].briefSummary);
            setSummaryStateUpdate(false);
            setShowExpandedPlot(false);
            setTogglePlotText("See the episode plot");
            setPlotStateUpdate(false);
        }

        if (didPlotStateUpdate) {
            showExpandedPlot ? setShowExpandedPlot(true) : setShowExpandedPlot(false);
            showExpandedPlot ? setTogglePlotText("Hide episode plot") : setTogglePlotText("See the episode plot");
            showExpandedPlot ? setSummaryText(selectedEpisode[0].expandedPlot) : setSummaryText(selectedEpisode[0].briefSummary);
            setPlotStateUpdate(false);
            setShowExpandedSum(false);
            setToggleSumText("See the expanded Summary");
            setSummaryStateUpdate(false);
        }

        if (didCastUpdate) {
            if (showExpandedCast) {
                let combinedCastList = createCastElements(selectedEpisode[0].remainingCast);
                setExpandedCast([...combinedCastList]);
                setCastDescText("Full Cast List");
                setToggleCastText("Hide full cast list");
            } else {
                setExpandedCast([]);
                setCastDescText("Regular Cast");
                setToggleCastText("Show full cast list");
            }
            setDidCastUpdate(false);
        } else {
            let regularCastList = createCastElements(selectedEpisode[0].castRegular);
            setCastList(oldArray => [...regularCastList]);
        }

        if (!specialGuestStarList) {
            setSpecialGuestStarText("");
        } else {
            const specialGuestList = createCastElements(selectedEpisode[0].specialGuestStars);
            setSpecialGuestStarText("Special Guest Stars");
            setSpecialGuestStarList(specialGuestList);
        }

        if (!guestStarList) {
            setGuestStarText("");
        } else {
            const guestStars = createCastElements(selectedEpisode[0].guestStars);
            setGuestStarText("Guest Stars");
            setGuestStarList(guestStars);
        }
    }, [didSummaryStateUpdate, didCastUpdate, didPlotStateUpdate, specialGuestStarList, guestStarList, showExpandedSum, showExpandedPlot, selectedEpisode, showExpandedCast]);

    let linkClassName = "ep-link visible";
    if (!selectedEpisode[0].expandedPlot) {
        linkClassName = "ep-link invisible"
    }

    let specialGuestClassName = "visible";
    if (selectedEpisode[0].specialGuestStars.length < 1) {
        specialGuestClassName = "invisible";
    }

    return (
    <div className="container" id="ep-info-container">
        <div className="jumbotron rounded-lg shadow" id="ep-info-jumbo">
            <h1 className="display-5">{selectedEpisode[0].episodeName}</h1>
            <p className="lead">Aired {selectedEpisode[0].dateAired}</p>
            <button
                type="button" 
                className="btn btn-dark mt-3" 
                onClick={clearEpisode}
                data-toggle="tooltip"
                data-placement="right"
                title="Clears episode info and returns to select episode by season and episode number"
            >
                Clear
            </button>
            <hr className="my-4"></hr>
            <p className="lead" id="briefSum">{summaryText}</p>
            <div className="ep-links row">
                <p className="ep-link-lead" onClick={toggleSummaryInfo} id="expandedSum">{toggleSumText}</p>
                <p className={linkClassName} onClick={toggleLongPlot} id="expandedPlot" visibility="hidden">{togglePlotText}</p>
            </div>
            <hr className="my-4"></hr>
            <div className={specialGuestClassName}>
                <p className="lead">{specialGuestStarText}</p>
                <ul className="castListing">
                    {specialGuestStarList}
                </ul>
            </div>
            <div className="cast row">
                <p className="lead">{guestStarText}</p>
                <ul className="castListing col-lg">
                    {guestStarList}
                </ul>
                <div className="cast-label">
                    <p className="lead" id="cast">{castDescText}</p>
                    <p className="cast-link" onClick={toggleCastList} id="expandedCast">{toggleCastText}</p>
                </div>
                <ul className="castListing col-lg">
                    {castList}
                    {expandedCast}
                </ul>
            </div>
        </div>
    </div>
    );
}

export default Episode;