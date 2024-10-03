import styled from "styled-components";
import { fetchName, getTopArtists, getTopTracks } from "./queries";
// import Recommendations from "./recommendations";
import Header from "./header";
import TopSongs from "./TopSongs";
import { FavouriteSong } from "./favourite-song";

export const Home = ({ accessToken }: { accessToken: string }) => {
  const { profile } = fetchName(accessToken);

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

  // const artists = topFiveArtistsThisYear.items.map(
  //   (artist: { id: any }) => artist.id
  // );

  // const tracks = topFiveTracksThisYear.items.map(
  //   (track: { id: any }) => track.id
  // );

  return (
    <Wrapper>
      <HeaderWrapper>
        <Header displayName={profile.display_name} />
      </HeaderWrapper>

      <ContentWrapper>
        {/* <Content> */}
        <FavouriteSong />
        <TopSongs />
        {/* <Recommendations
          accessToken={accessToken}
          artists={artists.toString().split(",").join("%2C")}
          tracks={tracks.toString().split(",").join("%2C")}
        /> */}
        {/* </Content> */}
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: scroll;
`;

const HeaderWrapper = styled.div`
  height: 4rem;
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 10px;
  justify-items: center;
  padding: 1rem;
`;
