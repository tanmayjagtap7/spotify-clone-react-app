import { useState } from 'react';
import './TrackSearchResult.css';
import { ImPlay3 } from "react-icons/im";

export default function TrackSearchResult({ track, chooseTrack }) {
    const [hovered, setHovered] = useState(false)

    const toggleHover = () => setHovered(!hovered)

    const handlePlay = () => {
        chooseTrack(track)
    }

    return (
        <div className="search-track mx-0 row d-flex align-items-center" onMouseEnter={toggleHover} onMouseLeave={toggleHover} style={{ cursor: "pointer" }} onClick={handlePlay}>
            <div className="col-md-7 mx-0 row align-items-center">
                <div className="col-md-2 mx-0 px-0 row align-items-center">
                    <div className="col-md-1 d-flex justify-content-end">
                        <div className="text-light play-icon">
                            {hovered ? <ImPlay3 /> : track.searchNo}
                        </div>
                    </div>
                    <div className="col-md-2">
                        <img src={track.albumUrl} className="p-1" alt={track.name} style={{ height: "64px", width: "64px" }} />
                    </div>
                </div>
                <div className="col-md-10">
                    <div className="text-light">{track.name}</div>
                    <div className={hovered ? "text-light" : "text-muted"} >{track.artists.map(artist => track.artists.indexOf(artist) == 0 ? artist : ', ' + artist)}</div>
                </div>
            </div>
            <div className={"col-md-4 " + (hovered ? "text-light" : "text-muted")}>{track.albumName}</div>
            <div className="col-md-1 px-4 text-light">
                {track.duration[0] + ':' + (track.duration[1] > 9 ? '' : '0') + track.duration[1]}
            </div>
        </div>
    )
}
