import { PaymentTypeProps } from "admin/Setting";
import axios from "axios";
import { RegexpPhone, RemoveHypen } from "commonUtil";
import Select from "components/select/Select";
import SelectItem from "components/select/SelectItem";
import WarnningMsg from "components/warnning/WarnningMsg";
import { SectionLabel } from "main/Main";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import * as api from "../../api/api";

interface Props {
  selectedPaytype: PaymentTypeProps | undefined;
  payersName: string;
  phoneNumber: string;
  updateSelectedPaytype: React.Dispatch<
    React.SetStateAction<PaymentTypeProps | undefined>
  >;
  updatePayerName: React.Dispatch<React.SetStateAction<string>>;
  updatePhoneNumber: React.Dispatch<React.SetStateAction<string>>;
}
const Payment: React.FC<Props> = (props) => {
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const [payType, updatePayType] = useState<PaymentTypeProps[]>([]);
  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*)\./g, "$1");

    props.updatePhoneNumber(e.target.value);
  };

  const onFocus = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    if (phoneInputRef.current === null) return;
    phoneInputRef.current.maxLength = 11;
    props.updatePhoneNumber(RemoveHypen(e.target.value));
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    if (phoneInputRef.current === null) return;

    phoneInputRef.current.maxLength = 13;
    props.updatePhoneNumber(RegexpPhone(e.target.value));
  };

  const getAllPaymentType = async () => {
    try {
      const result = await axios.get(api.getPaymentTypes());
      if (result.status === 200) {
        const data: PaymentTypeProps[] = result.data.map(
          (item: PaymentTypeProps) => ({ ...item })
        );
        updatePayType(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPaymentType();
  }, []);

  return (
    <Container>
      <SectionLabel>????????????</SectionLabel>
      <PaymentContainer>
        <div className="payment__row">
          <div className="payment__row__title">?????? ??????</div>
          <div className="payment__row__contents">
            <Select
              style={{ flexGrow: 1 }}
              selectedTitle={props.selectedPaytype?.title}
              childrenCount={payType.length}
              placeholder={"?????? ????????? ????????? ?????????"}
            >
              {payType.map((item, index) => {
                return (
                  <SelectItem
                    key={index}
                    isSelected={
                      props.selectedPaytype?.paymentTypesId ===
                      item.paymentTypesId
                    }
                    onClick={() => {
                      props.updateSelectedPaytype(item);
                    }}
                  >
                    {item.title}
                  </SelectItem>
                );
              })}
            </Select>
          </div>
        </div>
        <div className="payment__row">
          <div className="payment__row__title">????????? ??????</div>
          <div className="payment__row__contents">
            <InputText
              placeholder="????????? ????????? ??????????????????!"
              value={props.payersName}
              onChange={(e) => props.updatePayerName(e.target.value)}
            />
          </div>
        </div>
        <div className="payment__row">
          <div className="payment__row__title">???????????????</div>
          <div className="payment__row__contents">
            <InputText
              ref={phoneInputRef}
              placeholder="010-0000-0000"
              value={props.phoneNumber}
              onChange={onChangeValue}
              onBlur={onBlur}
              onFocus={onFocus}
            />
          </div>
        </div>
      </PaymentContainer>
      <WarnningMsg
        style={{ marginTop: 15, marginBottom: 0 }}
        message={`?????? ????????? ?????? ???????????? ???????????? ????????? ???????????????!`}
      />
      <WarnningMsg
        style={{ marginTop: 4, marginBottom: 0 }}
        message={`?????? ?????????/?????? ?????? ??????????????? ???????????? ?????? ?????? ???????????? ??????  ???????????? ????????? ?????????????????? ?????????.`}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 40px;
`;

const PaymentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  .payment__row {
    width: 100%;
    height: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 0px;

    .payment__row__title {
      flex: 2;
      height: 22px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      font-weight: bold;
      font-size: 14px;
    }
    .payment__row__contents {
      flex: 5;
      display: flex;
      flex-direction: row;
    }
  }
`;

const InputText = styled.input`
  flex-grow: 1;
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

export default Payment;
