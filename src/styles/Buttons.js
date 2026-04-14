import styled from "styled-components";

// Add button
export const AddButton = styled.button`
  padding: 0.6rem 0.8rem;
  border-radius: 1.2rem;
  border: none;
  cursor: pointer;
  min-width: 5rem;
  font-size: 1.2rem;
  font-weight: bold;
  transform: translateY(0);
  transition:
    transform 0.3s cubic-bezier(0.2, 0.9, 0.2, 1),
    box-shadow 0.18s ease;
  background-color: #f57a00;

  &:hover {
    transform: translateY(-0.3rem);
    box-shadow: 0 0.6rem 1.1rem rgba(0, 0, 0, 0.15);
  }
`;

export const IconButton = styled.button`
  background: transparent;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  display: block;
  position: relative;
  transform: translateY(0);
  transition:
    transform 0.3s cubic-bezier(0.2, 0.9, 0.2, 1),
    box-shadow 0.18s ease;

  svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover {
    transform: translateY(-0.3rem);
  }

  &:after {
    content: "";
    position: absolute;
    left: 15%;
    bottom: 0rem;
    height: 0.2rem;
    width: 70%;
    border-radius: 0.1rem;
    transform: scaleX(0);
    transform-origin: left center;
    transition:
      transform 260ms cubic-bezier(0.2, 0.9, 0.2, 1),
      opacity 200ms ease;
    background: #f57a00;
    opacity: 0;
  }

  &:hover::after {
    transform: scaleX(1);
    opacity: 1;
  }
  ${(props) => props.$edit && ``}
`;

/* Chechbox icon - NOT A BUTTON */
export const Checkbox = styled.div`
  position: relative;
  margin-right: 0.6rem;
  cursor: pointer;
  display: flex;
  align-items: center;

  svg {
    height: 1.8rem;
    width: 1.8rem;
  }
`;

// export const TickIcon = styled.
