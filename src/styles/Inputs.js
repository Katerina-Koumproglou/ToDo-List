import styled from "styled-components";

export const TaskInput = styled.input`
  flex: 1;
  padding: 0.7rem 0.8rem;
  border-radius: 1.2rem;
  border: none;
  outline: none;
  font-size: 1.3rem;
  box-shadow: 0 0.2rem 0.6rem rgba(0, 0, 0, 0.1);
`;

/* Edit icon */
export const EditInput = styled.input`
  flex: 1;
  font-size: 1.4rem;
  padding: 0.5rem;
  border-radius: 0.6rem;
  outline: none;
  text-align: left;
  caret-color: black;
  transition: all 0.3s ease;
  border-color: ${({ editing }) => (editing ? "#f57a00" : "transparent")};
`;
