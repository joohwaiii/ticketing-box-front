import { SectionLabel } from "main/Main";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TheaterAreaProps, TheaterProps } from "type";

interface Props {
  movieName: string;
  updateMovieName: React.Dispatch<React.SetStateAction<string>>;
}
const MovieTItle: React.FC<Props> = (props) => {
  return (
    <Container>
      <SectionLabel>영화명을 입력해 주세요!</SectionLabel>
      <InputMovieTitle
        placeholder="예) 닥터스트레인지 대혼돈의 멀티버스"
        value={props.movieName}
        onChange={(e) => props.updateMovieName(e.target.value)}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 40px;
`;

const InputMovieTitle = styled.input`
  height: 30px;
  margin: 0;
  padding: 4px 11px;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  transition: all 0.3s ease;

  :hover {
    border-color: #40a9ff;
    box-shadow: 0 0 0 2px rgb(24 144 255 / 20%);
  }

  :focus {
    outline: none;
    border-color: #40a9ff;
    box-shadow: 0 0 0 2px rgb(24 144 255 / 20%);
  }
`;

export default MovieTItle;
