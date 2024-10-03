import styled from "styled-components";
import { useGetTopTracks } from "./queries";

const TopSongs = () => {
  const { tracks, tracksLoading } = useGetTopTracks({
    range: "long_term",
    limit: 5,
    offset: 0,
  });

  if (tracksLoading || !tracks) return <div>loading...</div>;

  return (
    <Wrapper>
      <Heading>Top songs </Heading>
      <TrackWrapper>
        {tracks.map((track, i) => (
          <Items key={track.id}>
            <Rank>#{i + 1}</Rank>
            <AlbumCover src={track.album.images[0].url} />
            <Name>{track.name}</Name>
          </Items>
        ))}
      </TrackWrapper>
    </Wrapper>
  );
};

export default TopSongs;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Heading = styled.span`
  font-size: 2rem;
  text-align: start;
  font-weight: 600;
  color: #171313;
  width: 100%;
`;

const Rank = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;
const TrackWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background: #d696bb;
  border-radius: 1rem;
  padding: 1rem;
`;

const Name = styled.span`
  text-align: start;
  text-overflow: ellipsis;
  font-weight: bold;
  overflow: hidden;
  text-wrap: nowrap;
  width: 100%;
`;

const Items = styled.p`
  display: grid;
  grid-template-columns: 2rem 4rem 16rem;
  align-items: center;
  justify-items: start;

  color: #171313;
`;

const AlbumCover = styled.img`
  width: 3rem;
  border-radius: 0.5rem;
`;
