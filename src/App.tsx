import styled from "styled-components";
import "./App.css";
import { Home } from "./pages/home";
import { useGetToken } from "./use-get-token";

function App() {
  const { ready } = useGetToken();

  return (
    <Wrapper>
      {ready ? <Home accessToken={ready} /> : <div>...Loading</div>}
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;
