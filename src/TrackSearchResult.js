
export default function TrackSearchResult({ track, chooseTrack }) {
    const handlePlay = () => {
        chooseTrack(track)
    }

    return (
        <div className="search-track d-flex m-2 align-items-center" style={{cursor:"pointer"}} onClick={handlePlay}>
            <img src={track.albumUrl} alt={track.name} style={{height:"64px", width:"64px"}} />
            <div className="ms-3">
                <div className="text-light">{track.name}</div>
                <div className="text-muted">{track.artist}</div>
            </div>
        </div>
    )
}
