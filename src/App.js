import Layout from './Components/Layout';
import Login from './Components/Login';

const code = new URLSearchParams(window.location.search).get("code");

function App() {
  return code ? <Layout code={code} /> : <Login />
}

export default App;
