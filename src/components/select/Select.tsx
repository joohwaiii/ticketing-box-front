import React, { ReactNode, useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface Props {
  style?: React.CSSProperties;
  selectedTitle?: string;
  placeholder?: string;
  childrenCount: number;
  children: ReactNode;
}
const Select: React.FC<Props> = (props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [isOpen, updateOpen] = useState<boolean>(false);

  const handleMouseDown = (event: any) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      updateOpen(false);
    }
  };

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTo({ top: 320 });
    }
    window.addEventListener("mousedown", handleMouseDown);
    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  useEffect(() => {
    if (!listRef.current) return;
  }, [props.selectedTitle]);

  return (
    <Container
      ref={containerRef}
      style={{ ...props.style }}
      className={isOpen ? "open" : undefined}
      onClick={() => updateOpen((prev) => !prev)}
    >
      <span className={`selected__title ${isOpen ? "open" : ""}`}>
        {props.selectedTitle
          ? props.selectedTitle
          : props.placeholder
          ? props.placeholder
          : "선택해주세요"}
      </span>
      <OptionList
        ref={listRef}
        className={isOpen ? "open" : undefined}
        maxCount={props.childrenCount >= 8 ? 8 : props.childrenCount}
      >
        {props.children}
      </OptionList>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  height: 40px;
  min-height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--color__border);
  padding: 0 24px;

  cursor: pointer;
  user-select: none;
  transition: all 0.3s ease;

  :hover {
    border-color: #40a9ff;
  }

  &.open {
    outline: none;
    border-color: #40a9ff;
    box-shadow: 0 0 0 2px rgb(24 144 255 / 20%);
  }

  .selected__title {
    font-size: 14px;
    font-weight: 500;
    color: black;
    transition: all 0.3s ease;
  }
  .selected__title.open {
    color: var(--color__border);
  }
`;

const OptionList = styled.ul<{ maxCount: number }>`
  margin: 0;
  padding: 0;

  position: absolute;
  width: 100%;
  height: 0;
  min-height: 0;
  max-height: calc(40px * ${(props) => props.maxCount});
  display: flex;
  flex-direction: column;
  overflow: scroll;

  background-color: white;
  top: 45px;
  left: 0px;

  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.16);
  user-select: none;
  z-index: 1;

  transition: all 0.2s ease;
  &.open {
    height: calc(40px * ${(props) => props.maxCount});
  }
`;

export default Select;
