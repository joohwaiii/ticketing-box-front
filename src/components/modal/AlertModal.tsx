import React from "react";
import styled from "styled-components";

interface Props {
  message: string;
  btnText?: string;
  close?: () => void;
}
const AlertModal: React.FC<Props> = (props) => {
  return (
    <Container>
      <Message>
        {props.message.split("|").map((item, index) => (
          <span key={index}>{item}</span>
        ))}
      </Message>
      <ButtonContainer>
        <button className="close__btn" onClick={props.close}>
          {props.btnText ? props.btnText : "닫기"}
        </button>
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  background: white;
`;
const Message = styled.div`
  padding: 0;
  margin: 0;
  padding: 40px 40px 20px 40px;
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
`;

const ButtonContainer = styled.div`
  padding: 20px 40px;
  .close__btn {
    width: 100%;
    height: 50px;
    border: 0;
    color: white;
    background-color: red;
    font-size: 16px;
    font-weight: 900;
    cursor: pointer;
  }
`;
export default AlertModal;
