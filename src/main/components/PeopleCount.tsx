import { SectionLabel } from "main/Main";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as Minus } from "../../assets/minus.svg";
import { ReactComponent as Plus } from "../../assets/plus.svg";

interface Props {
  peopleCount: number;
  updatePeopleCount: React.Dispatch<React.SetStateAction<number>>;
}
const PeopleCount: React.FC<Props> = (props) => {
  const increaseCount = () => {
    if (props.peopleCount === 30) {
      return;
    }
    props.updatePeopleCount((prev) => prev + 1);
  };

  const decreaseCount = () => {
    if (props.peopleCount === 1) {
      return;
    }

    props.updatePeopleCount((prev) => prev - 1);
  };
  return (
    <Container>
      <SectionLabel>인원을 추가해 주세요!</SectionLabel>
      <PeopleContainer>
        <Minus className="minus" onClick={decreaseCount} />
        <span className="people__count">{`${props.peopleCount}명`}</span>
        <Plus className="plus" onClick={increaseCount} />
      </PeopleContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 40px;
`;

const PeopleContainer = styled.div`
  width: 100%;
  height: 50px;
  border: 2px solid rgb(238, 238, 238);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  user-select: none;

  gap: 10px;

  .minus {
    width: 47px;
    height: 47px;
    cursor: pointer;
  }
  .people__count {
    font-size: 16px;
    font-weight: bold;
    color: #000000;
  }

  .plus {
    width: 47px;
    height: 47px;
    cursor: pointer;
  }
`;

export default PeopleCount;
