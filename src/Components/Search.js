import { useEffect, useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import useAuth from '../useAuth'
import SpotifyWebApi from 'spotify-web-api-node'
import TrackSearchResult from './TrackSearchResult/TrackSearchResult';
import Player from './Player';
import axios from 'axios';
import { Clock } from 'react-bootstrap-icons';
import Searchee from './Searchee';
import { Routes, Route, Link, Outlet, useNavigate, useLocation } from 'react-router-dom';

const SpotifyApi = new SpotifyWebApi({
    clientId: "2eeccb733b0646f096d637bd0ac48cc4",
})

export default function Search() {
    const {loc} = useLocation()
    const code = loc.state.code
    const lyrics = loc.state.lyrics
    const chooseTrack = loc.state.chooseTrack
    const accessToken = useAuth(code);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    // const [playingTrack, setPlayingTrack] = useState();
    // const [lyrics, setLyrics] = useState('');
    let navigate = useNavigate()

    
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
                console.log(res)
                if (cancel) return
                setSearchResults(res.body.tracks.items.map(track => {
                    const smallestAlbumImage = track.album.images.reduce((smallest, image) => {
                        if (image.height < smallest.height) return image
                        return smallest
                    }, track.album.images[0])

                    return {
                        searchNo: parseInt(Object.keys(res.body.tracks.items).find(key => res.body.tracks.items[key] === track)) + 1,
                        name: track.name,
                        artists: track.artists.map(artist => artist.name),
                        albumName: track.album.name,
                        duration: [parseInt((track.duration_ms / 1000) / 60), parseInt((track.duration_ms / 1000) % 60)],
                        albumUrl: smallestAlbumImage.url,
                        uri: track.uri
                    }
                }))
            })

        return () => (cancel = true)
    }, [search, accessToken])

    return (
        <Container className={searchResults.length <= 8 ? "d-flex flex-column py-2" : "d-flex flex-column py-2 mb-5"} style={{ minHeight: "100vh" }}>
            {/* <Link to="/search" state={{search :  search , searchResults : searchResults , chooseTrack : chooseTrack , lyrics : lyrics }}> */}
            <div onClick={()=>navigate('/search')}>
                <Form.Control type="search" className="search input-lg bg-dark display-4" style={{ border: 0 }} placeholder="Search Songs" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <Searchee search={search} searchResults={searchResults} chooseTrack={chooseTrack} lyrics={lyrics}/>
            {/* <Outlet/> */}
            {/* <Routes>
                <Route path="search" element={<Searchee search={search} searchResults={searchResults} chooseTrack={chooseTrack} lyrics={lyrics}/>} />
            </Routes> */}
            {/* <Searchee search={search} searchResults={searchResults} chooseTrack={chooseTrack} lyrics={lyrics} /> */}
        </Container>
    )
}
