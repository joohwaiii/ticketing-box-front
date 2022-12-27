import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { ReactComponent as EYE } from "../assets/eye.svg";
import { ReactComponent as EYESLASH } from "../assets/eye-slash.svg";
import axios from "axios";
import * as api from "../api/api";
import { Cookies } from "react-cookie";

const Login = () => {
  const [id, updateId] = useState<string>("");
  const [pw, updatePw] = useState<string>("");
  const [showPWD, updateShowPWD] = useState<boolean>(false);
  const navigate = useNavigate();

  const login = async () => {
    try {
      const cookie = new Cookies();

      const result = await axios.post(api.login(), { email: id, password: pw });
      if (result.status) {
        cookie.set("access_token", result.data.access_token);
        api.settingLogin();

        navigate("/admin/setting", { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const cookie = new Cookies();
    cookie.remove("access_token");
  }, []);
  return (
    <Conatiner>
      <LoginContainer>
        <span style={{ fontWeight: "bold", fontSize: 20 }}>Ticketing Box</span>
        <div className="input__wrapper">
          <input
            placeholder="ID"
            type="text"
            value={id}
            onChange={(e) => updateId(e.target.value)}
          />
        </div>
        <div className="input__wrapper">
          <input
            placeholder="PW"
            type={showPWD ? "text" : "password"}
            value={pw}
            onChange={(e) => updatePw(e.target.value)}
          />
          {showPWD ? (
            <EYE
              className="eye"
              width={14}
              height={14}
              onClick={() => updateShowPWD(!showPWD)}
            />
          ) : (
            <EYESLASH
              className="eye"
              width={14}
              height={14}
              onClick={() => updateShowPWD(!showPWD)}
            />
          )}
        </div>
        <div className="input__wrapper">
          <button
            className="login__btn"
            disabled={id.length === 0 || pw.length === 0}
            onClick={() => {
              login();
            }}
          >
            로그인
          </button>
        </div>
      </LoginContainer>
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

const LoginContainer = styled.div`
  width: 400px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  gap: 10px;

  .input__wrapper {
    position: relative;
    width: 100%;
    max-width: 200px;

    input {
      width: calc(100% - 22px);
      height: 32px;
      padding-left: 11px;
      padding-right: 11px;
      color: rgba(0, 0, 0, 0.85);
      font-size: 14px;
      background-color: #fff;
      border: 1px solid #d9d9d9;
      border-radius: 2px;
      transition: all 0.3s;
      :hover {
        border: 1px solid #1890ff;
      }
    }
    .eye {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
    }

    .login__btn {
      width: 100%;
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
  }
`;

export default Login;
