import styled from "styled-components";
import { getRecommendations } from "./queries";
import Accordian from "./accordian";

const Recommendations = ({
  accessToken,
  tracks,
  artists,
}: {
  accessToken: string;
  tracks: string;
  artists: string;
}) => {
  const { recommendations, recommendationsLoading } = getRecommendations({
    token: accessToken,
    artists,
    tracks,
  });

  if (recommendationsLoading || !recommendations)
    return <LoadingWrapper>Loading recommendations...</LoadingWrapper>;

  const recs = recommendations.tracks.map(
    (track) => track.name + " by " + track.artists[0].name
  );

  return (
    <Wrapper>
      <Accordian header="Song recommendations" items={recs} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 70%;
`;

const LoadingWrapper = styled.div`
  background-color: #121212;
  border-radius: 1rem;
  padding: 1rem;
  font-weight: 600;
  cursor: pointer;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default Recommendations;
