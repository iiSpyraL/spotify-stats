import { useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { DownArrow } from "../assets/icons";

const Accordian = ({ header, items }: { header: string; items: string[] }) => {
  const [open, setOpen] = useState(false);
  return (
    <AccordianWrapper>
      <AccordianHeader open={open} onClick={() => setOpen(!open)}>
        {header}
        {open ? (
          <DownArrow rotation="180" fill="white" />
        ) : (
          <DownArrow fill="white" />
        )}
      </AccordianHeader>

      <AccordianContent open={open}>
        {items.map((item) => (
          <AccordianItem key={item}>{item}</AccordianItem>
        ))}
      </AccordianContent>
    </AccordianWrapper>
  );
};

export default Accordian;

const AccordianWrapper = styled.div`
  width: 100%;
  height: 100%;
`;
const AccordianItem = styled.div`
  padding: 0.5rem 0;
  font-weight: 600;
`;

const AccordianHeader = styled.div<{ open: boolean }>`
  background-color: #121212;
  ${({ open }) =>
    open
      ? css`
          border-top-left-radius: 1rem;
          border-top-right-radius: 1rem;
        `
      : css`
          border-radius: 1rem;
          transition: all 500ms ease 350ms;
        `}

  padding: 1rem;
  font-weight: 600;
  cursor: pointer;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const animateOpen = keyframes`
from {
max-height: 0;
display: none;
}

to {
max-height: 90%;
display: block;
}
`;

const animateClose = keyframes`
from {
max-height: 90%;
display: block;
}

to {
max-height: 0;
display: none;
}
`;

const AccordianContent = styled.div<{ open: boolean }>`
  display: ${({ open }) => (open ? "block" : "none")};

  padding: 0 1rem;
  overflow: scroll;
  background-color: #313131;
  color: #1ed760;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  max-height: 90%;
  animation: ${({ open }) =>
    open
      ? css`
          ${animateOpen} 500ms ease
        `
      : css`
          ${animateClose} 500ms ease
        `};

  &::-webkit-scrollbar {
    display: none;
  }
`;
