import express from 'express';
import cors from 'cors';
import seriesList from './episode_db.js';
import 'zeromq';

const PORT = 3218;

const app = express();
const corsOptions = {
    origin: "http://localhost:3000"
}

app.use(cors(corsOptions));

/* Creation of proxy server to fix CORS error based on example from:
https://medium.com/@dtkatz/3-ways-to-fix-the-cors-error-and-how-access-control-allow-origin-works-d97d55946d9 */
app.use(express.json());

const validateNumbers = (season, episode) => {
    // 7 seasons
    // 22 episodes per season except season 3 (21) and season 4 (23)
    if (season < 0 || season > 7) {
        return false;
    } else if (episode < 0) {
        return false;
    } else if (episode > 21 && season === 3) {
        return false;
    } else if (episode > 22 && season !== 4) {
        return false;
    } else if (episode > 23) {
        return false;
    }

    return true;
}

const findEpisode = (seas, epi) => {
    let foundSeason = seriesList.seasons.filter( seasonObj => seasonObj.seasonNumber === seas );
    let foundEpisode = foundSeason[0].episodes.filter( epiObj => epiObj.episodeNumber === epi );
    console.log(foundEpisode);
    return foundEpisode[0];
}

app.post('/find-episode', (req, res) => {
    console.log("Episode request received!");
    const targetSeason = parseInt(req.body.season);
    const targetEpisode = parseInt(req.body.episode);
    if (validateNumbers(targetSeason, targetEpisode)) {
        const data = findEpisode(targetSeason, targetEpisode);
        console.log("DATA: ", data);
        res.status(200).setHeader('content-type', 'application/json').json(data);
        console.log("Response sent");
        // .catch(error => {
        //     res.status(500).setHeader('content-type', 'application/json').json({Error: "Episode not found!"});
        // });
    }
});

app.listen(PORT, () => {
    console.log(`TWW Server listening on port ${PORT}...`);
});