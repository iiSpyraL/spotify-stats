import styled from "styled-components";
import { useGetTopTracks } from "./queries";

export const FavouriteSong = () => {
  const { tracks, tracksLoading } = useGetTopTracks({
    range: "short_term",
    limit: 1,
  });

  if (tracksLoading || !tracks)
    return <SongWrapper>Loading track...</SongWrapper>;

  return (
    <SongWrapper>
      <span>Your favourite song right now is:</span>
      <span>
        <Green>{tracks[0].name}</Green> by{" "}
        <Green>{tracks[0].artists[0].name}</Green>.
      </span>
    </SongWrapper>
  );
};

const SongWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  color: #171313;
`;

const Green = styled.span`
  color: #1ed760;
  font-weight: 600;
`;
