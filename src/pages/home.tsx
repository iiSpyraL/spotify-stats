import styled from "styled-components";
import { fetchName, getTopArtists, getTopTracks } from "./queries";
import Header from "./header";
import TopSongs from "./top-songs";
import { WelcomeMessage } from "./welcome-message";
import { useState } from "react";
import { TopArtists } from "./top-artists";

export const Home = ({ accessToken }: { accessToken: string }) => {
  const { profile } = fetchName(accessToken);

  const [backgroundColor, setBackgroundColor] = useState("#ffd0d5");

  window.addEventListener("scroll", () => {
    switch (true) {
      case window.scrollY <= 200:
        setBackgroundColor("#ffd0d5");
        break;
      case 200 < window.scrollY && window.scrollY <= 600:
        setBackgroundColor("#a4c9d8");
        break;
      default:
        setBackgroundColor("#ffbc4b");
    }
  });

  const { topItems: topFiveTracksThisYear, topItemsLoading: topTracksLoading } =
    getTopTracks({
      token: accessToken,

      range: "long_term",
      limit: 2,
      queryKey: "topFiveTracks",
    });

  const {
    topItems: topFiveArtistsThisYear,
    topItemsLoading: topArtistsLoading,
  } = getTopArtists({
    token: accessToken,

    range: "long_term",
    limit: 3,
    queryKey: "topFiveArtists",
  });

  const loading = topTracksLoading || topArtistsLoading;
  const noData = !topFiveTracksThisYear || !topFiveArtistsThisYear;

  if (!profile || loading || noData) return <div>...loading things</div>;

  return (
    <Wrapper background={backgroundColor}>
      <HeaderWrapper>
        <Header displayName={profile.display_name} />
      </HeaderWrapper>

      <ContentWrapper>
        <WelcomeMessage />
        <TopSongs />
        <TopArtists />
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ background: string }>`
  width: 100%;
  background: ${({ background }) => background};
  transition: background 500ms ease-out;
`;

const HeaderWrapper = styled.div`
  height: 4rem;
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  grid-gap: 10px;
  justify-items: center;
  padding: 1rem;
`;
