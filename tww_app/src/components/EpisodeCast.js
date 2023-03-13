import React, { useState, useEffect } from 'react';

function EpisodeCast({ selectedEpisode, createChildElements }) {
    /* EPISODE/ELEMENT DATA */
    const regCastText = "Regular Cast";
    const fullCastText = "All Remaining Cast";
    const regGuestText = "Guest Stars";
    const specialGuestText = "Special Guest Stars";
    const specialAppearText = "Special Appearances";
    const showFullCastText = "Show remaining cast";
    const hideFullCastText = "Show regular cast";
    const regCastList = createChildElements(selectedEpisode[0].castRegular, "cast");
    const combinedCastList = createChildElements(selectedEpisode[0].remainingCast, "cast");
    const specialAppearList = createChildElements(selectedEpisode[0].specialAppearances, "spec-ap");
    const regGuestList = createChildElements(selectedEpisode[0].guestStars, "guest");
    const specGuestList = createChildElements(selectedEpisode[0].specialGuestStars, "spec-guest");

    /* STATE VARIABLES AND FUNCTIONS */
    const [toggleCastText, setToggleCastText] = useState(showFullCastText);
    const [castList, setCastList] = useState([]);
    const [showExpandedCast, setShowExpandedCast] = useState(false);
    const [castDescText, setCastDescText] = useState(regCastText);
    const [expandedCast, setExpandedCast] = useState([]);
    const [specialGuestStarText, setSpecialGuestStarText] = useState(specialGuestText);
    const [specialGuestStarList, setSpecialGuestStarList] = useState([]);
    const [specialAppearancesText, setSpecialAppearancesText] = useState(specialAppearText);
    const [specialAppearancesList, setSpecialAppearancesList] = useState([]);
    const [guestStarText, setGuestStarText] = useState();
    const [guestStarList, setGuestStarList] = useState([]);
    const [didCastUpdate, setDidCastUpdate] = useState(false);

    /* ELEMENT CHANGE/TOGGLE FUNCTIONS */
    const toggleCastList = () => {
        showExpandedCast ? setShowExpandedCast(false) : setShowExpandedCast(true);
        setDidCastUpdate(true);
    }

    const updateCastList = (isCastUpdated) => {
        if (!isCastUpdated) {
            setCastList(oldArray => [...regCastList]);
        } else {
            if (showExpandedCast) {
                setExpandedCast([...combinedCastList]);
                setCastDescText(fullCastText);
                setToggleCastText(hideFullCastText);
            } else {
                setExpandedCast([]);
                setCastDescText(regCastText);
                setToggleCastText(showFullCastText);
            }
            setDidCastUpdate(false);
        }
    }

    const renderSpecGuestList = () => {
        if (!specialGuestStarList) {
            setSpecialGuestStarText("");
        } else {
            setSpecialGuestStarText(specialGuestText);
            setSpecialGuestStarList(specGuestList);
        }
    }

    const renderSpecAppearList = () => {
        if (!specialAppearList) {
            setSpecialAppearancesText(specialAppearText);
            setSpecialAppearancesList(specialAppearancesList);
        }
    }

    const renderGuestList = () => {
        if (!guestStarList) {
            setGuestStarText("");
        } else {
            setGuestStarText(regGuestText);
            setGuestStarList(regGuestList);
        }
    }

    /* CONDITIONAL HTML CLASS SETUP */
    let specialGuestClassName = "visible";
    if (selectedEpisode[0].specialGuestStars.length < 1) {
        specialGuestClassName = "invisible";
    }

    let specialAppearClassName = "visible";
    if (!selectedEpisode[0].specialAppearances) {
        specialAppearClassName = "invisible";
    }

    let guestStarClassName = "visible col-lg";
    if (selectedEpisode[0].guestStars.length < 1) {
        guestStarClassName = "invisible";
    }

    /* HOOKS */
    useEffect( () => {
        updateCastList(didCastUpdate);
        renderSpecGuestList();
        renderSpecAppearList();
        renderGuestList();
    }, [didCastUpdate]);

    return(
        <React.Fragment>
            <div className="specials row">
                <div className={specialGuestClassName}>
                    <p className="lead">{specialGuestStarText}</p>
                    <ul className="castListing">{specialGuestStarList}</ul>
                </div>
                <div className={specialAppearClassName}>
                    <p className="lead">{specialAppearancesText}</p>
                    <ul className="castListing">{specialAppearancesList}</ul>
                </div>
            </div>
            <div className="cast row">
                <div className={guestStarClassName}>
                    <p className="lead">{guestStarText}</p>
                    <ul className="castListing">{guestStarList}</ul>
                </div>
                <div className="cast col-lg">
                    <div className="cast-label">
                        <p className="lead" id="cast">{castDescText}</p>
                        <p className="cast-link"
                           onClick={toggleCastList}
                           id="expandedCast">{toggleCastText}</p>
                    </div>
                    <ul className="castListing">{castList}{expandedCast}</ul>
                </div>
            </div>
        </React.Fragment>
    );
}

export default EpisodeCast;