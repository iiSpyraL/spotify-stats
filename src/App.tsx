import "./App.css";
import { Home } from "./pages/home";
import { useGetToken } from "./use-get-token";

function App() {
  const { ready } = useGetToken();

  return ready ? <Home accessToken={ready} /> : <div>...Loading</div>;
}

export default App;
