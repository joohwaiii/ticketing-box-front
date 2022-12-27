import React, { ReactNode, useEffect, useRef } from "react";
import styled from "styled-components";

interface Props {
  isSelected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
}
const SelectItem: React.FC<Props> = (props) => {
  const ref = useRef<HTMLDivElement>(null);
  const onClick = () => {
    if (props.disabled) return;
    props.onClick && props.onClick();
  };
  return (
    <Container
      ref={ref}
      disabled={props.disabled}
      className={`${props.isSelected && "selected"}`}
      onClick={onClick}
    >
      {props.children}
    </Container>
  );
};

const Container = styled.div<{ disabled?: boolean }>`
  height: 40px;
  min-height: 40px;
  max-height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: ${(props) => (props.disabled ? "#AEAEB2" : "#000000")};
  background-color: ${(props) => (props.disabled ? "#E5E5EA" : "#FFFFFF")};
  font-weight: 500;
  cursor: pointer;

  transition: all 0.3s ease;

  :hover {
    background-color: #f4f4f4;
  }

  &.selected {
    font-weight: bold;
    background-color: #e1f6ff;
  }
`;

export default SelectItem;
