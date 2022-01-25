import TrackSearchResult from './TrackSearchResult/TrackSearchResult';
import { Clock } from 'react-bootstrap-icons';

export default function Searchee({search, searchResults, chooseTrack, lyrics}) {
    return (
        <div className="flex-grow-1 my-2">
            {
                search != 0 &&
                <div className="search-track-head mx-0 pb-1 my-3 border-bottom border-secondary row d-flex align-items-center">
                    <div className="col-md-7 mx-0 row align-items-center">
                        <div className="col-md-2 mx-0 px-0 row align-items-center">
                            <div className="col-md-1 text-light d-flex justify-content-end">#</div>
                            <div className="col-md-2 text-light">TITLE</div>
                        </div>
                        <div className="col-md-10">
                        </div>
                    </div>
                    <div className="col-md-4 text-light">ALBUM</div>
                    <div className="col-md-1 ps-4 text-light"><Clock /></div>
                </div>
            }
<div className="bg-info">ttytg  ttz yt tts</div>
            {searchResults.map(track => (
                <TrackSearchResult track={track} key={track.uri} chooseTrack={chooseTrack} />
            ))}
            {searchResults.length === 0 && (
                <div className="text-center">
                    {lyrics}
                </div>
            )}
        </div>
    )
}
