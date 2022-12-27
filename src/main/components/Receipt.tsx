import React from "react";
import WarnningMsg from "components/warnning/WarnningMsg";
import { SectionLabel } from "main/Main";
import styled from "styled-components";
import { ResultProsp } from "type";

interface Props {
  result: ResultProsp;
}
const Receipt: React.FC<Props> = (props) => {
  return (
    <Container>
      <SectionLabel>입력하신 예매 양식을 확인해 주세요!</SectionLabel>
      <ReceiptContainer>
        {props.result.theaterBrand && (
          <ReceiptRow>
            <div className="receipt__title">영화관</div>
            <div className="receipt__contents">{`[${props.result.theaterBrand}] ${props.result.theaterArea} - ${props.result.theater}`}</div>
          </ReceiptRow>
        )}
        {props.result.movie && (
          <ReceiptRow>
            <div className="receipt__title">영화명</div>
            <div className="receipt__contents">{props.result.movie}</div>
          </ReceiptRow>
        )}
        {props.result.date && (
          <ReceiptRow>
            <div className="receipt__title">상영 날짜</div>
            <div className="receipt__contents">{props.result.date}</div>
          </ReceiptRow>
        )}
        {props.result.people && (
          <ReceiptRow>
            <div className="receipt__title">인원수</div>
            <div className="receipt__contents">{props.result.people}명</div>
          </ReceiptRow>
        )}
        {props.result.preferredSeat1 && (
          <ReceiptRow>
            <div className="receipt__title">선호 좌석 1순위</div>
            <div className="receipt__contents">
              {props.result.preferredSeat1}
            </div>
          </ReceiptRow>
        )}
        {props.result.preferredSeat2 && (
          <ReceiptRow>
            <div className="receipt__title">선호 좌석 2순위</div>
            <div className="receipt__contents">
              {props.result.preferredSeat2}
            </div>
          </ReceiptRow>
        )}
        {props.result.preferredSeat3 && (
          <ReceiptRow>
            <div className="receipt__title">선호 좌석 3순위</div>
            <div className="receipt__contents">
              {props.result.preferredSeat3}
            </div>
          </ReceiptRow>
        )}
        {props.result.preferredSection && (
          <ReceiptRow>
            <div className="receipt__title">선호 구역</div>
            <div className="receipt__contents">
              {props.result.preferredSection}
            </div>
          </ReceiptRow>
        )}
        {props.result.paymentType && (
          <ReceiptRow>
            <div className="receipt__title">결제 수단</div>
            <div className="receipt__contents">{props.result.paymentType}</div>
          </ReceiptRow>
        )}
        {props.result.payerName && (
          <ReceiptRow>
            <div className="receipt__title">결제자 이름</div>
            <div className="receipt__contents">{props.result.payerName}</div>
          </ReceiptRow>
        )}
        {props.result.phoneNumber && (
          <ReceiptRow>
            <div className="receipt__title">핸드폰번호</div>
            <div className="receipt__contents">{props.result.phoneNumber}</div>
          </ReceiptRow>
        )}
      </ReceiptContainer>
      <WarnningMsg
        style={{ marginTop: 15 }}
        message="일반관이 아닌 예매 양식일 경우 변경이 필요할 수 있습니다."
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 40px;
`;

const ReceiptContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color__border);

  div:nth-last-child(1) {
    border-bottom: 0;
  }
`;

const ReceiptRow = styled.div`
  display: flex;
  flex-direction: row;
  height: 40px;
  border-bottom: 1px solid var(--color__border);

  .receipt__title {
    flex: 3;
    font-size: 14px;
    font-weight: bold;
    padding: 0 10px;
    display: flex;
    flex-direction: row;
    align-items: center;

    border-right: 1px solid var(--color__border);
  }

  .receipt__contents {
    flex: 5;
    font-size: 14px;
    font-weight: bold;
    padding: 0 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;
export default Receipt;
