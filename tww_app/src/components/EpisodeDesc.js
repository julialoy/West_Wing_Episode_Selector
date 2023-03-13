import React, { useState, useEffect } from 'react';

function EpisodeDesc({ selectedEpisode }) {
    /* EPISODE/ELEMENT DATA */
    const showSumText = "See expanded summary";
    const hideSumText = "Hide expanded summary";
    const showPlotText = "See episode plot";
    const hidePlotText = "Hide episode plot";
    const shortSumText = selectedEpisode[0].briefSummary;
    const expandedSumText = selectedEpisode[0].expandedSummary;
    const plotText = selectedEpisode[0].expandedPlot;

    /* STATE VARIABLES AND FUNCTIONS */
    const [showExpandedSum, setShowExpandedSum] = useState(false);
    const [showExpandedPlot, setShowExpandedPlot] = useState(false);
    const [toggleSumText, setToggleSumText] = useState(showSumText);
    const [togglePlotText, setTogglePlotText] = useState(showPlotText);
    const [summaryText, setSummaryText] = useState(selectedEpisode[0].briefSummary);
    const [didSummaryStateUpdate, setSummaryStateUpdate] = useState(false);
    const [didPlotStateUpdate, setPlotStateUpdate] = useState(false);

    /* ELEMENT CHANGE/TOGGLE FUNCTIONS */
    const toggleSummaryInfo = () => {
        showExpandedSum ? setShowExpandedSum(false) : setShowExpandedSum(true);
        setSummaryStateUpdate(true);
    }

    const toggleLongPlot = () => {
        showExpandedPlot ? setShowExpandedPlot(false) : setShowExpandedPlot(true);
        setPlotStateUpdate(true);
    }

    const updateSummaryState = () => {
        showExpandedSum ? setShowExpandedSum(true) : setShowExpandedSum(false);
        showExpandedSum ? setToggleSumText(hideSumText) : setToggleSumText(showSumText);
        showExpandedSum ? setSummaryText(expandedSumText) : setSummaryText(shortSumText);
        setSummaryStateUpdate(false);
        setShowExpandedPlot(false);
        setTogglePlotText(showPlotText);
        setPlotStateUpdate(false);
    }

    const updatePlotState = () => {
        showExpandedPlot ? setShowExpandedPlot(true) : setShowExpandedPlot(false);
        showExpandedPlot ? setTogglePlotText(hidePlotText) : setTogglePlotText(showPlotText);
        showExpandedPlot ? setSummaryText(plotText) : setSummaryText(shortSumText);
        setPlotStateUpdate(false);
        setShowExpandedSum(false);
        setToggleSumText(showSumText);
        setSummaryStateUpdate(false);
    }

    /* CONDITIONAL HTML CLASS SETUP */
    let linkClassName = "ep-link visible";
    if (!plotText) {
        linkClassName = "ep-link invisible"
    }

    /* HOOKS */
    useEffect(() => {
        if (didSummaryStateUpdate) {
            updateSummaryState();
        }
        if (didPlotStateUpdate) {
            updatePlotState();
        }
    }, [didSummaryStateUpdate, didPlotStateUpdate]);

    return (
        <React.Fragment>
            <p className="lead" id="briefSum">{summaryText}</p>
            <div className="ep-links row">
                <p className="ep-link-lead"
                   onClick={toggleSummaryInfo}
                   id="expandedSum">{toggleSumText}</p>
                <p className={linkClassName}
                   onClick={toggleLongPlot}
                   id="expandedPlot">{togglePlotText}</p>
            </div>
        </React.Fragment>
    );
}

export default EpisodeDesc;