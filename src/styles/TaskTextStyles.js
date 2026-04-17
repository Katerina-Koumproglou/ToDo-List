import styled from "styled-components";

const duration = "0.8s";

/* Tick icon */
export const TaskWrapper = styled.span`
  padding: 0.5rem;
  border: 0.1rem solid transparent;
  flex: 1;
  display: flex;
  align-items: center;
  transition: all calc(${duration} / 2) linear calc(${duration} / 2);
  color: ${({ $checked }) => ($checked ? "#525252" : "inherit")};
`;

export const TaskText = styled.span`
  position: relative;
  display: inline-block;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 50%;
    background: #090801;
    height: 0.1rem;
    width: 0;
    transition: width ${duration} ease;
    width: ${({ $checked }) => ($checked ? "100%" : "0")};
  }
`;
