import styled from "styled-components";

export const WelcomeMessage = () => {
  return (
    <SongWrapper>
      <span>
        See your top songs and artists over the last <Green>4 weeks</Green>,{" "}
        <Green>6 months</Green> or <Green>1 year</Green>!
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
