import Layout from './Components/Layout';
import Login from './Components/Login';
import Search from './Components/Search';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const code = new URLSearchParams(window.location.search).get("code");

function App() {
  return (
    // code ? <Layout code={code} /> : <Login />
    <Router>
      <Routes>
        {
          code ?
            <Route path="/" element={<Layout code={code} />} >
              <Route path="search" element={<Search />} />
            </Route> :
            <Route path="/" element={<Navigate to="/login" />} />
        }
        <Route path="login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App;
