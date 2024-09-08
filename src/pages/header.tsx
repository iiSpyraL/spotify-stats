import styled from "styled-components";

const Header = ({ displayName }: { displayName: string }) => {
  const onLogout = () => {
    window.location.reload();
    localStorage.removeItem("accessToken");
  };

  return (
    <HeaderWrapper>
      <WelcomeMessage>Welcome, {displayName}</WelcomeMessage>
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
  background: #1ed760;
  color: #121212;
  font-weight: 600;
  padding: 0 1rem;
  height: 100%;
`;

const WelcomeMessage = styled.div``;

const LogoutWrapper = styled.div``;

const Logout = styled.button`
  background: #121212;
  color: #ffffff;
`;
