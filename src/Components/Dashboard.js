import { useEffect, useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import useAuth from '../useAuth'
import SpotifyWebApi from 'spotify-web-api-node'
import TrackSearchResult from '../TrackSearchResult';
import Player from './Player';
import axios from 'axios';

const SpotifyApi = new SpotifyWebApi({
    clientId: "2eeccb733b0646f096d637bd0ac48cc4",
})

export default function Dashboard({ code }) {
    const accessToken = useAuth(code);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [playingTrack, setPlayingTrack] = useState();
    const [lyrics, setLyrics] = useState('');
    const [searchmb, setSearchmb] = useState('');

    const chooseTrack = (track) => {
        setPlayingTrack(track)
        setSearch('')
        setLyrics('')
    }

    useEffect(() => {
        if (!playingTrack) return

        axios.get('http://localhost:3001/lyrics', {
            params: {
                track: playingTrack.title,
                artist: playingTrack.artist
            }
        }).then(res => {
            setLyrics(res.data.lyrics)
        })
    }, [playingTrack])

    useEffect(() => {
        if (!accessToken) return
        SpotifyApi.setAccessToken(accessToken)
    }, [accessToken])

    useEffect(() => {
        if (!search) return setSearchResults([])
        if (!accessToken) return

        let cancel = false
        SpotifyApi.searchTracks(search)
            .then(res => {
                if (cancel) return
                setSearchResults(res.body.tracks.items.map(track => {
                    const smallestAlbumImage = track.album.images.reduce((smallest, image) => {
                        if (image.height < smallest.height) return image
                        return smallest
                    }, track.album.images[0])

                    return {
                        name: track.name,
                        artist: track.artists[0].name,
                        uri: track.uri,
                        albumUrl: smallestAlbumImage.url
                    }
                }))
            })

        return () => (cancel = true)
    }, [search, accessToken])

    return (
        <Container className={"d-flex flex-column py-2"+ (searchResults.length >= 8) ? '' : ' mb-5'} style={{minHeight:"100vh"}}>
            <Form.Control type="search" className="search input-lg bg-dark display-4" style={{border : 0}} placeholder="Search Songs" value={search} onChange={e => setSearch(e.target.value)} />
            <div className="flex-grow-1 my-2">
                {searchResults.map(track => (
                    <TrackSearchResult track={track} key={track.uri} chooseTrack={chooseTrack} />
                ))}
                {searchResults.length === 0 && (
                    <div className="text-center">
                        {lyrics}
                    </div>
                )}
            </div>
            <div>
                <Player accessToken={accessToken} TrackUri={playingTrack?.uri} />
            </div>
        </Container>
    )
}
