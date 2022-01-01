import React from 'react'
import { Container } from 'react-bootstrap'

const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=2eeccb733b0646f096d637bd0ac48cc4&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

export default function Login() {
    return (
        <div>
            <Container className="d-flex justify-content-center align-items-center" style={{minHeight: '100vh'}}>
                <a href={AUTH_URL} className="btn btn-lg btn-success">
                    Login With Spotify
                </a>
            </Container>
        </div>
    )
}
