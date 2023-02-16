import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import About from './pages/About';
import FindEpisode from './pages/FIndEpisode';
import RandomEpisode from './pages/RandomEpisode';
import Episode from './components/Episode';
// import { useState } from 'react';

function App() {
  const [selectedEpisode, setSelectedEpisode] = useState();

  return (
    <div className="App container">
      <Header />
      <Navigation />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} exact />
          <Route path="/about" element={<About />} />
          <Route path="/find-episode" element={<FindEpisode setSelectedEpisode={setSelectedEpisode} />} />
          <Route path="/random-episode" element={<RandomEpisode setSelectedEpisode={setSelectedEpisode} />} />
          <Route path="/episode" element={<Episode selectedEpisode={selectedEpisode} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
