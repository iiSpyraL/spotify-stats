import styled, { css } from "styled-components";

export const AnimatedToggle = ({
  filterOptions,
  selectedFilter,
  setSelectedFilter,
  backgroundColor,
}: {
  filterOptions: FilterOptions[];
  selectedFilter: FilterOptions;
  setSelectedFilter: (selectedFilter: FilterOptions) => void;
  backgroundColor: string;
}) => {
  const filterPosition = () => {
    switch (true) {
      case selectedFilter === filterOptions[0]:
        return "0.5rem";
      case selectedFilter === filterOptions[1]:
        return "7rem";
      case selectedFilter === filterOptions[2]:
        return "13.5rem";
      default:
        return "0.5rem";
    }
  };
  return (
    <FilterWrapper
      position={filterPosition()}
      backgroundColor={backgroundColor}
    >
      {filterOptions.map((filterOption) => (
        <ToggleOption
          key={filterOption.value}
          selected={selectedFilter === filterOption}
          onClick={() => setSelectedFilter(filterOption)}
        >
          {filterOption.displayName}
        </ToggleOption>
      ))}
    </FilterWrapper>
  );
};

const FilterWrapper = styled.div<{ position: string; backgroundColor: string }>`
  display: inline-flex;
  justify-content: space-evenly;
  border-radius: 10rem;
  background-color: ${({ backgroundColor }) => backgroundColor};
  padding: 0.5rem;
  position: relative;
  margin-top: 1rem;
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    top: 0.4rem;
    left: 0;
    background: white;
    height: calc(100% - 0.8rem);
    width: 6.5rem;
    border-radius: 10rem;
    transition: transform 200ms ease;

    ${({ position }) =>
      css`
        transform: translateX(${position});
      `};
  }
`;

const ToggleOption = styled.div<{ selected: boolean }>`
  display: block;
  border-radius: 10rem;
  width: 6.5rem;
  z-index: 1;
  font-weight: 600;

  ${({ selected }) =>
    selected &&
    css`
      color: #2c2c2c;
      transition: color 200ms ease;
    `}
`;
