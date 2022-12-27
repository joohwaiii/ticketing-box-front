import TabItem from "components/tab/TabItem";
import TabLayout from "components/tab/TabLayout";
import WarnningMsg from "components/warnning/WarnningMsg";
import { SectionLabel } from "main/Main";
import { preferredSeatType, theaterSectionList } from "mock";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TheaterAreaProps, TheaterProps } from "type";

interface Props {
  selectedSeatType: string;
  preferredSeat1: string | undefined;
  preferredSeat2: string | undefined;
  preferredSeat3: string | undefined;
  preferredSection: string | undefined;

  updateSelectedSeatType: React.Dispatch<React.SetStateAction<string>>;
  updatePreferredSeat1: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  updatePreferredSeat2: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  updatePreferredSeat3: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  updatePreferredSection: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
}
const PreferredSeat: React.FC<Props> = (props) => {
  return (
    <Container>
      <SectionLabel>선호 자리를 입력 또는 선택해 주세요!</SectionLabel>
      <TabLayout>
        {preferredSeatType.map((item, index) => {
          return (
            <TabItem
              key={index}
              isSelected={item === props.selectedSeatType}
              onClick={() => props.updateSelectedSeatType(item)}
            >
              {item}
            </TabItem>
          );
        })}
      </TabLayout>
      {props.selectedSeatType === preferredSeatType[0] && (
        <Type1Container>
          <div className="type__1__row">
            <div className="type__1__row__title">선호 좌석 1순위</div>
            <input
              className="type__1__row__input"
              placeholder="예) A1, A2"
              value={props.preferredSeat1}
              onChange={(e) => props.updatePreferredSeat1(e.target.value)}
            />
          </div>
          <div className="type__1__row">
            <div className="type__1__row__title">선호 좌석 2순위</div>
            <input
              className="type__1__row__input"
              placeholder="예) B1, B2"
              value={props.preferredSeat2}
              onChange={(e) => props.updatePreferredSeat2(e.target.value)}
            />
          </div>
          <div className="type__1__row">
            <div className="type__1__row__title">선호 좌석 3순위</div>
            <input
              className="type__1__row__input"
              placeholder="예) C1, C2"
              value={props.preferredSeat3}
              onChange={(e) => props.updatePreferredSeat3(e.target.value)}
            />
          </div>
          <WarnningMsg
            style={{ marginTop: 15 }}
            message="선호 좌석이 없을 시, 가장 가까운 좌석으로 예매됩니다.|
                    좌석 확인이 불가능하시다면 선호 구역을 선택해 주세요!"
          />
        </Type1Container>
      )}

      {props.selectedSeatType === preferredSeatType[1] && (
        <Type2Container>
          <div className="seat__grid__container">
            {theaterSectionList.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`seat__grid__item ${
                    props.preferredSection === item ? "selected" : ""
                  }`}
                  onClick={() => props.updatePreferredSection(item)}
                >
                  {item}
                </div>
              );
            })}
          </div>
          <WarnningMsg
            style={{ marginTop: 15 }}
            message="선호 좌석이 없을 시, 가장 가까운 좌석으로 예매됩니다."
          />
        </Type2Container>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 40px;
`;

const Type1Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 15px;

  .type__1__row {
    width: 100%;
    height: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    border: 1px solid var(--color__border);
    border-bottom: 0px;

    .type__1__row__title {
      flex: 2;
      height: 22px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      border-right: 1px solid var(--color__border);
      font-weight: bold;
      font-size: 14px;
    }
    .type__1__row__input {
      flex: 3;
      height: calc(100% - 13px);
      border: 0;
      padding: 4px 11px;
      margin: 0 3px;
      transition: all 0.3s ease;
      border-radius: 2px;
      text-transform: uppercase;
      :focus {
        outline: none;
        box-shadow: 0 0 0 2px rgb(24 144 255 / 20%);
      }
    }
  }
  .type__1__row:nth-last-child(2) {
    border-bottom: 1px solid var(--color__border);
  }
`;

const Type2Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  .seat__grid__container {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;

    .seat__grid__item {
      width: calc((100% / 3) - 7px);
      height: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #aaa;
      font-size: 12px;
      color: #fff;
      font-weight: 700;
      transition: all 0.3s ease;
      cursor: pointer;
    }
    .seat__grid__item:hover {
      background-color: rgba(255, 0, 0, 0.6);
    }
    .seat__grid__item.selected:hover {
      background-color: #f00;
    }
    .seat__grid__item.selected {
      background-color: #f00;
    }
  }
`;

export default PreferredSeat;
