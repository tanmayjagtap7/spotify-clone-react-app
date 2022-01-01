import Login from './Login';
import Dashboard from './Dashboard'
import Spotifylogo from '../static/logo/Spotifylogo.png'

export default function Layout({ code }) {

    return (
        // <div>
        //     <button className="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
        //     <img src={Spotifylogo} className="mx-auto d-block" style={{height:"50px"}} alt="Spotify-logo" />
        //     </button>
        // </div>
        <div className="row m-0">
            <div className="navi col-lg-2 p-0 position-fixed" style={{ backgroundColor: "rgb(0, 0, 0)" }}>
                {/* <div className="affix row m-0"> */}
                <div className="col-md-12">
                    <img src={Spotifylogo} className="mw-100" style={{ height: "100px" }} alt="Spotify-logo" />
                </div>
                <button className="btn btn-danger col-md-12">Home</button>
                {/* </div> */}
            </div>
            <div className="navo offset-md-2 col-lg-10 bg-dark">
                {code ? <Dashboard code={code} /> : <Login />}
            </div>
        </div>
    )
}
