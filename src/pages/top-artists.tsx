import styled from "styled-components";
import { useGetTopArtists } from "./queries";
import { useState } from "react";
import { AnimatedToggle } from "../components/animated-toggle";

enum Ranges {
  short = "short_term",
  medium = "medium_term",
  long = "long_term",
}

const filterOptions = [
  {
    value: Ranges.short,
    displayName: "~4 weeks",
  },
  {
    value: Ranges.medium,
    displayName: "~6 months",
  },
  {
    value: Ranges.long,
    displayName: "~1 year",
  },
];

export const TopArtists = () => {
  const [rangeFilter, setRangeFilter] = useState<FilterOptions>(
    filterOptions[0]
  );
  const { artists, artistsLoading } = useGetTopArtists({
    range: rangeFilter.value,
    limit: 5,
    offset: 0,
  });

  if (artistsLoading || !artists)
    return (
      <Wrapper>
        <Heading>Top artists</Heading>
        <TrackWrapper>
          {[0, 1, 2, 3, 4].map((i) => (
            <Items key={i}>
              <Rank>#{i + 1}</Rank>
              <CoverWrapper>
                <BlankAlbumCover />
              </CoverWrapper>
              <Name>...</Name>
            </Items>
          ))}
        </TrackWrapper>
        <AnimatedToggle
          filterOptions={filterOptions}
          selectedFilter={rangeFilter}
          setSelectedFilter={setRangeFilter}
          backgroundColor="#578fd3"
        />
      </Wrapper>
    );
  return (
    <Wrapper>
      <Heading>Top artists</Heading>
      <TrackWrapper>
        {artists.map((artist, i) => (
          <Items key={artist.id}>
            <Rank>#{i + 1}</Rank>
            <CoverWrapper>
              <AlbumCover src={artist.images[0].url} />
            </CoverWrapper>
            <Name>{artist.name}</Name>
          </Items>
        ))}
      </TrackWrapper>
      <AnimatedToggle
        filterOptions={filterOptions}
        selectedFilter={rangeFilter}
        setSelectedFilter={setRangeFilter}
        backgroundColor="#578fd3"
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 2rem 0;
`;

const Heading = styled.span`
  font-size: 2rem;
  text-align: start;
  font-weight: 600;
  color: #171313;
  width: 85%;
`;

const Rank = styled.div`
  font-size: 1rem;
  font-weight: bold;
`;
const TrackWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: start;
  background: #578fd3;
  border-radius: 1rem;
  padding: 0.8rem;
  width: 80%;
`;

const Name = styled.span`
  text-align: start;
  text-overflow: ellipsis;
  font-weight: bold;
  overflow: hidden;
  text-wrap: nowrap;
  width: 100%;
`;

const Items = styled.div`
  display: grid;
  grid-template-columns: 1.5rem 3.5rem auto;
  align-items: center;
  justify-items: start;
  margin: 0.5rem 0;
  color: #171313;
`;

const AlbumCover = styled.img`
  width: 3rem;
  border-radius: 0.5rem;
`;

const BlankAlbumCover = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 0.5rem;
  background-color: grey;
`;

const CoverWrapper = styled.div`
  height: 3rem;
  width: 3rem;
  overflow: hidden;
  border-radius: 10%;
`;
