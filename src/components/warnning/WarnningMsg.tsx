import React from "react";
import styled from "styled-components";
import { ReactComponent as RedCheck } from "../../assets/red_check.svg";

interface Props {
  message?: string;
  style?: React.CSSProperties;
  color?: string;
}

/**
 *
 * @param props
 * @returns
 *
 *  구분자 | 로 줄바꿈 할 수 있음
 */
const WarnningMsg: React.FC<Props> = (props) => {
  return (
    <Container style={{ ...props.style }} color={props.color}>
      <RedCheck className="rec__check" />
      {props.message && (
        <div className="checkbox__text">
          {props.message.split("|").map((item, index) => (
            <span key={index}>{item}</span>
          ))}
        </div>
      )}
    </Container>
  );
};

const Container = styled.div<{ color?: string }>`
  display: flex;
  flex-direction: row;
  gap: 4px;

  user-select: none;

  .rec__check {
    width: 14px;
    min-width: 14px;
    max-width: 14px;
    height: 14px;
    min-height: 14px;
    max-height: 14px;
    padding-top: 2px;

    circle {
      fill: ${(props) => (props.color ? props.color : "red")};
    }
  }

  .checkbox__text {
    display: flex;
    flex-direction: column;
    font-size: 12px;
    font-weight: bold;
    padding-top: 1px;
    color: ${(props) => (props.color ? props.color : "red")};
    margin: 0;
  }
`;

export default WarnningMsg;
