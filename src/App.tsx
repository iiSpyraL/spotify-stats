import styled from "styled-components";
import "./App.css";
import { Home } from "./pages/home";
import { useGetToken } from "./use-get-token";

function App() {
  const { token } = useGetToken();

  return (
    <Wrapper className="app-wrapper">
      {token ? <Home accessToken={token} /> : <div>...Loading</div>}
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
`;
