import React, { useEffect, useRef } from "react";
import { Cookies } from "react-cookie";
import styled from "styled-components";
import BrandBranchManage from "./components/BrandBranchManage";
import PaymentMethodManage from "./components/PaymentMethodManage";
import PriceManage from "./components/PriceManage";
import { useNavigate } from "react-router-dom";

export interface BrandProps {
  theaterBrandsId: number;
  title: string;
  price: number;
  areaInBrand: AreaInBrandProps[];
}

export interface AreaInBrandProps {
  areaInBrandId: number;
  title: string;
  theaterInBrand: TheaterInBrandProps[];
}

export interface TheaterInBrandProps {
  theaterInBrandId: number;
  title: string;
}

export interface PaymentTypeProps {
  paymentTypesId: number;
  title: string;
}
const Setting = () => {
  const cookie = new Cookies();
  const navigate = useNavigate();
  const isExit = useRef<boolean>(false);

  const logout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      cookie.remove("access_token");
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    const cookie = new Cookies();
    const accessToken = cookie.get("access_token");
    if (!accessToken && !isExit.current) {
      alert("인증되지 않은 사용자 입니다.");
      navigate("/", { replace: true });
      isExit.current = true;
    }
  }, []);
  return (
    <Conatiner>
      <SettingContainer>
        <Header>
          <span style={{ fontWeight: "900", fontSize: 14 }}>티켓팅 박스</span>
          <button className="logout" onClick={logout}>
            로그아웃
          </button>
        </Header>
        <Body>
          <Section>
            <div className="title">가격 관리</div>
            <PriceManage />
          </Section>
          <Section>
            <div className="title">지점 관리</div>
            <BrandBranchManage />
          </Section>
          <SectionRow>
            <Section className="flex-1">
              <div className="title">결제 방식 관리</div>
              <PaymentMethodManage />
            </Section>
            <Section className="flex-2"></Section>
          </SectionRow>
        </Body>
      </SettingContainer>
    </Conatiner>
  );
};

const Conatiner = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f0f2f5;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const SettingContainer = styled.div`
  width: 900px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background-color: rgb(224, 224, 224);
`;

const Header = styled.div`
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  background-color: red;
  color: white;
  padding: 0 20px;

  .logout {
    color: white;
    background-color: red;
    border: none;
    font-weight: bold;
    font-size: 14px;
    cursor: pointer;
  }
`;

const Body = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const SectionRow = styled.div`
  width: calc(100%);

  display: flex;
  flex-direction: row;
  gap: 10px;

  .flex-1 {
    flex: 1;
  }

  .flex-2 {
    flex: 2;
  }
`;

const Section = styled.div`
  width: calc(100% - 20px);
  padding: 10px;
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 14px;
  .title {
    font-weight: bold;
    font-size: 14px;
  }
`;

export default Setting;
