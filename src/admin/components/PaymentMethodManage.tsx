import { PaymentTypeProps } from "admin/Setting";
import axios from "axios";
import { AddComma } from "commonUtil";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as api from "../../api/api";
import { ReactComponent as Delete } from "../../assets/delete.svg";

const PaymentMethodManage = () => {
  const [payments, updatePayments] = useState<PaymentTypeProps[]>([]);
  const [addPaymentTypeTitle, updateAddPaymentTypeTitle] = useState<string>("");
  const getAllPaymentType = async () => {
    try {
      const result = await axios.get(api.getPaymentTypes());
      if (result.status === 200) {
        const data: PaymentTypeProps[] = result.data.map(
          (item: PaymentTypeProps) => ({ ...item })
        );
        updatePayments(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createPaymentType = async () => {
    try {
      if (addPaymentTypeTitle.length === 0)
        return alert("결제 방식을 입력해주세요.");

      const newPaymentType = {
        title: addPaymentTypeTitle,
      };
      const result = await axios.post(api.createPaymentTypes(), newPaymentType);
      if (result.status === 201) {
        getAllPaymentType();
        updateAddPaymentTypeTitle("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deletePaymentType = async (item: PaymentTypeProps) => {
    try {
      const result = await axios.delete(
        api.deletePaymentTypes(item.paymentTypesId)
      );
      if (result.status === 200) {
        getAllPaymentType();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPaymentType();
  }, []);
  return (
    <Conatiner>
      <Section>
        <ListContainer>
          {payments.map((item) => {
            return (
              <ListItem onClick={() => {}}>
                {item.title}
                <div
                  className="delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (window.confirm("결제방식을 삭제 합니다.")) {
                      deletePaymentType(item);
                    }
                  }}
                >
                  <Delete width={16} height={16} />
                </div>
              </ListItem>
            );
          })}
          {payments.length < 6 && <div className="remainder"></div>}
        </ListContainer>
        <AddItem>
          <input
            className="add__item"
            type={"text"}
            value={addPaymentTypeTitle}
            onChange={(e) => updateAddPaymentTypeTitle(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                createPaymentType();
              }
            }}
          />
          <button className="add__btn" onClick={createPaymentType}>
            추가
          </button>
        </AddItem>
      </Section>
    </Conatiner>
  );
};

const Conatiner = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 1px;
  border: 1px solid black;
  background-color: black;
`;

const Section = styled.div`
  flex: 1;
  height: 300px;
  max-height: 300px;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const ListContainer = styled.div`
  flex-grow: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #eee;
  gap: 1px;
  overflow: scroll;

  .remainder {
    flex-grow: 1;
    background-color: white;
  }
`;

const ListItem = styled.div`
  width: calc(100% - 48px);
  height: 40px;
  min-height: 40px;
  max-height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;

  background-color: white;
  padding: 0 24px;
  cursor: pointer;

  transition: all 0.3s;

  .delete {
    display: none;
    z-index: 10;
    width: 36px;
    height: 36px;
    transition: all 0.3s;

    :hover {
      background-color: #ddd;
      border-radius: 4px;
    }
  }

  :hover {
    background-color: #f1f4f7;
    .delete {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  &.selected {
    background-color: #eee;
  }
`;

const AddItem = styled.div`
  width: calc(100% - 24px);
  height: 60px;
  min-height: 60px;
  max-height: 60px;
  border-top: 1px solid #eee;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;
  gap: 10px;

  .add__item {
    flex-grow: 1;
    height: 30px;
    padding: 0 7px;
    border: 1px solid #d9d9d9;

    transition: all 0.3s;
    :focus {
      outline: none;
      border: 1px solid #1890ff;
    }
  }

  .add__btn {
    width: 50px;
    height: 32px;
    background-color: white;
    border: 1px solid #d9d9d9;
    border-radius: 2px;
    transition: all 0.3s;
    cursor: pointer;
    :hover {
      border: 1px solid #1890ff;
    }
  }
`;
export default PaymentMethodManage;
