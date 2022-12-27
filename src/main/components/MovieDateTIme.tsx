import { diffTime } from "commonUtil";
import Checkbox from "components/checkbox/Checkbox";
import Select from "components/select/Select";
import SelectItem from "components/select/SelectItem";
import WarnningMsg from "components/warnning/WarnningMsg";
import { SectionLabel } from "main/Main";
import { beforeShowTime30Message, hourList, minuteList } from "mock";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { TheaterAreaProps, TheaterProps } from "type";

interface Props {
  dateList: string[];
  selectedDate: string | undefined;
  selectedHour: string | undefined;
  selectedMinute: string | undefined;
  isBeforeShowTime30: boolean;
  updateSelectedDate: React.Dispatch<React.SetStateAction<string | undefined>>;
  updateSelectedHour: React.Dispatch<React.SetStateAction<string | undefined>>;
  updateSelectedMinute: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  updateBeforeShowTime30: React.Dispatch<React.SetStateAction<boolean>>;
}
const MovieDateTIme: React.FC<Props> = (props) => {
  const selectedDateRef = useRef<string[]>([]);
  const selectedHour = useRef<string>("");
  const selectedMinute = useRef<string>("");
  const [render, updateRender] = useState<boolean>(false);

  const isSelectableHour = (date: Date) => {
    const nowDate = new Date();

    if (selectedDateRef.current.length === 0) return false;
    if (
      date.getFullYear() === nowDate.getFullYear() &&
      date.getMonth() === nowDate.getMonth() &&
      date.getDate() === nowDate.getDate()
    ) {
      return date.getHours() >= nowDate.getHours();
    }

    if (
      date.getFullYear() === nowDate.getFullYear() &&
      date.getMonth() === nowDate.getMonth() &&
      date.getDate() > nowDate.getDate()
    ) {
      return true;
    }

    return false;
  };

  const isSelectableMinute = (date: Date) => {
    const nowDate = new Date();
    if (
      selectedDateRef.current.length === 0 ||
      selectedHour.current.length === 0
    )
      return false;
    const leftTime = (date.getTime() - nowDate.getTime()) / (60 * 1000);
    return leftTime >= 10;
  };
  useEffect(() => {
    if (props.selectedDate) {
      const arr = props.selectedDate.split(" ");
      selectedDateRef.current = arr;
    }
    if (props.selectedHour) {
      selectedHour.current = props.selectedHour.slice(0, 2);
    }
    if (props.selectedMinute) {
      selectedMinute.current = props.selectedMinute.slice(0, 2);
    }
    if (props.selectedDate && props.selectedHour && props.selectedMinute) {
      const leftTime = diffTime(
        selectedDateRef.current[0],
        selectedDateRef.current[1],
        selectedDateRef.current[2],
        selectedHour.current,
        selectedMinute.current
      );

      props.updateBeforeShowTime30(leftTime >= 0 && leftTime <= 30);
    }

    updateRender((prev) => !prev);
  }, [props.selectedDate, props.selectedHour, props.selectedMinute]);
  return (
    <Container>
      <SectionLabel>상영 시간을 선택해 주세요!</SectionLabel>
      <Select
        childrenCount={props.dateList.length}
        selectedTitle={props.selectedDate}
        placeholder={"날짜를 선택해 주세요"}
      >
        {props.dateList.map((item, index) => {
          return (
            <SelectItem
              key={index}
              isSelected={props.selectedDate === item}
              onClick={() => props.updateSelectedDate(item)}
            >
              {item}
            </SelectItem>
          );
        })}
      </Select>
      <Row>
        <TimeRow>
          <Select
            childrenCount={hourList.length}
            selectedTitle={props.selectedHour}
            placeholder={"시간"}
          >
            {hourList.map((item, index) => {
              return (
                <SelectItem
                  key={index}
                  // disabled={
                  //   !isSelectableHour(
                  //     new Date(
                  //       `${selectedDateRef.current} ${item.title.slice(
                  //         0,
                  //         2
                  //       )}:00`
                  //     )
                  //   )
                  // }
                  isSelected={props.selectedHour === item.title}
                  onClick={() => props.updateSelectedHour(item.title)}
                >
                  {item.title}
                </SelectItem>
              );
            })}
          </Select>
          <span>시</span>
        </TimeRow>
        <TimeRow>
          <Select
            childrenCount={minuteList.length}
            selectedTitle={props.selectedMinute}
            placeholder={"분"}
          >
            {minuteList.map((item, index) => {
              return (
                <SelectItem
                  key={index}
                  // disabled={
                  //   !isSelectableMinute(
                  //     new Date(
                  //       `${selectedDateRef.current} ${props.selectedHour?.slice(
                  //         0,
                  //         2
                  //       )}:${item.title.slice(0, 2)}`
                  //     )
                  //   )
                  // }
                  isSelected={props.selectedMinute === item.title}
                  onClick={() => props.updateSelectedMinute(item.title)}
                >
                  {item.title}
                </SelectItem>
              );
            })}
          </Select>
          <span>분</span>
        </TimeRow>
      </Row>
      {/* <Checkbox
        style={{ marginTop: 20 }}
        message={beforeShowTime30Message}
        checked={props.isBeforeShowTime30}
        updateChecked={props.updateBeforeShowTime30}
      /> */}
      <WarnningMsg
        style={{ marginTop: 15 }}
        message={`정확한 상영 시간이 아닐 경우, 예매가 진행되지 않습니다.`}
      />
      <WarnningMsg
        style={{ marginTop: 4 }}
        message={`최소 10분 이상 남은 영화만 예매 신청이 가능합니다.`}
      />
      <WarnningMsg
        style={{ marginTop: 4 }}
        message={` 문화의 날은 매월 마지막 주 수요일 17~21시 시작 영화입니다.`}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 40px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 15px;
  gap: 20px;
`;

const TimeRow = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;

export default MovieDateTIme;
