import express from 'express';
import cors from 'cors';
import seriesList from './episode_db.js';
// import generateNumbers from './tww-client.js';
import zmq from 'zeromq';

const PORT = 3218;

const app = express();
const corsOptions = {
    origin: "http://localhost:3000"
}

const generateNumbers = async () => {
    const clientSock = new zmq.Request();
    console.log("Connecting to TWW Microservice server...");
    clientSock.connect('tcp://localhost:5555');

    console.log('Calling the red phone now...');
    await clientSock.send("What's your favorite episode, Mr. President?");
    const [receivedData] = await clientSock.receive();
    console.log("Received data ", JSON.parse(receivedData));
    return JSON.parse(receivedData);
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
    return foundEpisode[0];
}

app.post('/find-episode', (req, res) => {
    const targetSeason = parseInt(req.body.season);
    const targetEpisode = parseInt(req.body.episode);
    if (validateNumbers(targetSeason, targetEpisode)) {
        const data = findEpisode(targetSeason, targetEpisode);
        res.status(200).setHeader('content-type', 'application/json').json(data);
    }
});

const successCallback = (result) => {
    const targetSeason = parseInt(result.season);
    const targetEpisode = parseInt(result.episode);
    const data = findEpisode(targetSeason, targetEpisode);
    return data;
}

const failureCallback = (error) => {
    console.log("No data");
    return [];
}

app.get('/find-random-episode', async (req, res) => {
    console.log("Random episode requested...");
    const data = await generateNumbers().then(successCallback, failureCallback);

    if (data) {
        res.status(200).setHeader('content-type', 'application/json').json(data);
    } else {
        res.status(500).setHeader('content-type', 'application/json').json({Error: "Unable to retrieve episode."});
    }
});

app.listen(PORT, () => {
    console.log(`TWW Server listening on port ${PORT}...`);
});