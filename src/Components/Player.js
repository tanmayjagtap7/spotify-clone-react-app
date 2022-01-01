import React, { useEffect, useState } from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'

export default function Player({ accessToken, TrackUri }) {
    const [play, setPlay] = useState(false)

    useEffect(() => {
        setPlay(true)
    }, [TrackUri])

    if (!accessToken) return null
    return (
        <div className="fixed-bottom player">
            <SpotifyPlayer token={accessToken} showSaveIcon callback={state => { if (!state.isPlaying) setPlay(false) }} play={play} uris={TrackUri ? [TrackUri] : []} />
        </div>
    )
}
