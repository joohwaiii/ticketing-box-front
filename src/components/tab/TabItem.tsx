import React, { ReactNode } from "react";
import styled from "styled-components";

interface Props {
  isSelected?: boolean;
  onClick?: () => void;
  children: ReactNode;
}
const TabItem: React.FC<Props> = (props) => {
  return (
    <Container
      className={`${props.isSelected && "selected"}`}
      onClick={props.onClick}
    >
      {props.children}
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  color: #000000;
  border: 1px solid var(--color__border);
  font-weight: 500;
  cursor: pointer;

  transition: all 0.3s ease;

  &.selected {
    border: 1px solid red;
    color: white;
    background-color: red;
  }
`;

export default TabItem;
