import styled from "styled-components";
import { SpotifyDark } from "../assets/icons";

const Header = ({ displayName }: { displayName: string }) => {
  const onLogout = () => {
    window.location.reload();
    localStorage.removeItem("accessToken");
  };

  return (
    <HeaderWrapper>
      <WelcomeMessage>
        <SpotifyDark />
        Hi, {displayName}
      </WelcomeMessage>
      <LogoutWrapper>
        <Logout onClick={onLogout}>Logout</Logout>
      </LogoutWrapper>
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.div`
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #121212;
  font-weight: 700;
  padding: 2rem 1rem 1rem;
`;

const WelcomeMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LogoutWrapper = styled.div``;

const Logout = styled.button`
  background: transparent;
  color: #2c2c2c;
  font-weight: 700;
`;
