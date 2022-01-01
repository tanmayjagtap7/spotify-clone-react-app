const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const LyricsFinder = require('lyrics-finder')
const SpotifyWebApi = require('spotify-web-api-node');
require('dotenv').config()

const app = express();
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken
    const spotifyApi = new SpotifyWebApi({
        redirectUri: process.env.REDIRECT_URI,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken
    })

    // clientId, clientSecret and refreshToken has been set on the api object previous to this call.
    spotifyApi
        .refreshAccessToken()
        .then(
            data => {
                res.json({
                    accessToken: data.body.accessToken,
                    expiresIn: data.body.expiresIn
                })
            })
        .catch(() => {
            res.sendStatus(400)
        })
})

app.post('/login', (req, res) => {
    const code = req.body.code
    const spotifyApi = new SpotifyWebApi({
        redirectUri: process.env.REDIRECT_URI,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET
    })

    spotifyApi
        .authorizationCodeGrant(code)
        .then(data => {
            res.json({
                accessToken: data.body.access_token,
                refreshToken: data.body.refresh_token,
                expiresIn: data.body.expires_in,
            })
        })
        .catch(() => {
            res.sendStatus(400);
        })
})

app.get('/lyrics', async (req, res) => {
    const lyrics = await LyricsFinder(req.query.artist, req.query.track) || "No Lyrics found for this track"
    res.json({ lyrics })
})

app.listen(3001);