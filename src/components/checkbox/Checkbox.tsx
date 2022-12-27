import React, { ReactNode, useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface Props {
  message?: string;
  style?: React.CSSProperties;
  checked: boolean;
  updateChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

const Checkbox: React.FC<Props> = (props) => {
  return (
    <Container
      style={{ ...props.style }}
      onClick={() => props.updateChecked((prev) => !prev)}
    >
      <label className={`checkbox ${props.checked ? "checked" : ""}`}>
        <svg viewBox="0 0 22 16" fill="none">
          <path d="M1 6.85L8.09677 14L21 1" />
        </svg>
      </label>
      {props.message && (
        <label className="checkbox__text" htmlFor="check-box">
          {props.message.split("|").map((item, index) => (
            <span key={index}>{item}</span>
          ))}
        </label>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: fit-content;
  gap: 8px;

  user-select: none;
  cursor: pointer;

  .check__input {
    display: none;
  }

  .checkbox__text {
    display: flex;
    flex-direction: column;
    font-size: 13px;
    font-weight: bold;
    padding-top: 1px;
    cursor: pointer;
  }

  .checkbox {
    width: 16px;
    min-width: 16px;
    max-width: 16px;
    height: 16px;
    min-height: 16px;
    max-height: 16px;
    border-radius: 4px;
    border: 1px solid var(--color__border);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  .checkbox svg {
    width: 12px;
    height: 12px;
  }

  .checkbox.checked {
    background-color: #1890ff;
    border: 1px solid #1890ff;
  }

  .checkbox.checked svg path {
    stroke-dasharray: 500;
    stroke-dashoffset: 500;
    stroke: white;
    stroke-width: 3;
    animation: check 4s forwards;
  }

  .checkbox::before {
    content: " ";
    position: absolute;
    border-radius: 4px;
    transform: scale(0);
    display: block;
    width: 60px;
    height: 60px;
    background: #1890ff66;
    z-index: -1;
  }

  .checkbox.checked::before {
    animation: ripple 0.3s;
  }

  @keyframes check {
    to {
      stroke-dashoffset: 0;
    }
  }

  @keyframes ripple {
    to {
      transform: scale(1);
    }
  }
`;

export default Checkbox;
