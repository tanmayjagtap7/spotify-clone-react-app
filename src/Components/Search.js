import { useEffect, useState } from "react"
import SpotifyWebApi from 'spotify-web-api-node'
import { Form } from 'react-bootstrap';
import TrackSearchResult from "../TrackSearchResult";

const SpotifyApi = new SpotifyWebApi({
    clientId: "2eeccb733b0646f096d637bd0ac48cc4"
})

export default function Search({ accessToken, lyrics, setPlayingTrack, setLyrics }) {
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const SpotifyApi = new SpotifyWebApi({
        clientId: "2eeccb733b0646f096d637bd0ac48cc4"
    })
    const chooseTrack = (track) => {
        setPlayingTrack(track)
        setSearch('')
        setLyrics('')
    }

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
        <>
            <Form.Control type="search" className="" placeholder="Search Songs" value={search} onChange={e => setSearch(e.target.value)} />
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
        </>
    )
}
