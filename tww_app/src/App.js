import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Help from './pages/Help';
import FindEpisode from './pages/FIndEpisode';
import RandomEpisode from './pages/RandomEpisode';
import Episode from './components/Episode';

function App() {
  const [selectedEpisode, setSelectedEpisode] = useState();

  /* Creates HTML list elements from array of JSON objects containing names and roles */
  const createChildElements = (elemArray, arrayType) =>  {
    if (!elemArray) {
      return null;
    }
    let wrappedElemArray = [];
    let elemClassName;
    if (arrayType === "cast" || arrayType === "guest") {
      elemClassName = arrayType + '-element';
    } else {
      elemClassName = arrayType +'-element d-inline';
    }
    for (let x = 0; x < elemArray.length; x++) {
      let name = elemArray[x].firstName + ' ' + elemArray[x].lastName
      let role;
      elemArray[x].role ? role = '(' + elemArray[x].role + ') ' : role = null;
      wrappedElemArray.push(<li className={elemClassName} key={x}>{name} {role}</li>);
    }
    return wrappedElemArray;
  }

  return (
    <div className="App container">
      <Header />
      <Navigation />
      <BrowserRouter>
        <Routes>
          <Route path="/"
                 element={<HomePage />}
                 exact
          />
          <Route path="/about"
                 element={<About />}
          />
          <Route path="/help"
                 element={<Help />}
          />
          <Route path="/find-episode"
                 element={<FindEpisode setSelectedEpisode={setSelectedEpisode} />}
          />
          <Route path="/random-episode"
                 element={<RandomEpisode setSelectedEpisode={setSelectedEpisode} />}
          />
          <Route path="/episode"
                 element={<Episode selectedEpisode={selectedEpisode}
                                   createChildElements={createChildElements} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
