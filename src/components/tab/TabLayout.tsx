import React, { ReactNode } from "react";
import styled from "styled-components";

interface Props {
  children: ReactNode;
}
const TabLayout: React.FC<Props> = (props) => {
  return <Container>{props.children}</Container>;
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 10px;

  .brand__item {
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
  }

  .brand__item.selected {
    border: 1px solid red;
    color: white;
    background-color: red;
  }
`;

export default TabLayout;
