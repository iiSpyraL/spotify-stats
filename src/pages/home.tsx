import styled from "styled-components";
import { fetchName, getTopArtists, getTopTracks } from "./queries";

import Recommendations from "./recommendations";
import Header from "./header";

const FavouriteSong = ({ song }: { song: any }) => {
  return (
    <SongWrapper>
      <span>Your favourite song right now is:</span>
      <span>
        <Green>{song.items[0].name}</Green> by{" "}
        <Green>{song.items[0].artists[0].name}</Green>.
      </span>
    </SongWrapper>
  );
};

export const Home = ({ accessToken }: { accessToken: string }) => {
  const { profile } = fetchName(accessToken);
  const { topItems: topTrack } = getTopTracks({
    token: accessToken,
    range: "short_term",
    limit: 1,
    queryKey: "topTrack",
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

  const artists = topFiveArtistsThisYear.items.map(
    (artist: { id: any }) => artist.id
  );

  const tracks = topFiveTracksThisYear.items.map(
    (track: { id: any }) => track.id
  );

  return (
    <Wrapper>
      <HeaderWrapper>
        <Header displayName={profile.display_name} />
      </HeaderWrapper>
      <ContentWrapper>
        <Content>
          <FavouriteSong song={topTrack} />
          <Recommendations
            accessToken={accessToken}
            artists={artists.toString().split(",").join("%2C")}
            tracks={tracks.toString().split(",").join("%2C")}
          />
        </Content>
      </ContentWrapper>
    </Wrapper>
  );
};

const SongWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;

const Content = styled.div`
  padding: 2rem;
  height: 100%;
  width: calc(100% - 4rem);
`;
const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const Green = styled.span`
  color: #1ed760;
  font-weight: 600;
`;

const HeaderWrapper = styled.div`
  height: 4rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  height: calc(100% - 4rem);
`;
