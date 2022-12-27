import axios from "axios";
import { Cookies } from "react-cookie";

//Router
const USERS = "/users";
const BRAND = "/brand";
const BRAND_AREA = "/brand/area";
const BRAND_AREA_THEATER = "/brand/area/theater";
const PAYMENT_TYPE = "paymentType";
const LOG = "/log";

export const interceptor = () => {
  axios.interceptors.request.use((config) => {
    const cookie = new Cookies();
    const accessToken = cookie.get("access_token");
    config.withCredentials = config.url?.includes(
      "https://api.odcloud.kr/api/nts-businessman"
    )
      ? false
      : true;

    if (accessToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  });
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const {
        config,
        response: { status },
      } = error;

      // if (status === 401) {
      //   const cookie = new Cookies();
      //   console.log(cookie.get("sessing"));
      //   if (
      //     cookie.get("sessing") &&
      //     error.response.data.message === "notVerifiedSessionInfo"
      //   ) {
      //     alert("세션이 만료 되었습니다. 다시 로그인 해주시기 바랍니다.");
      //   } else if (cookie.get("sessing") === undefined) {
      //   }
      // }
      return Promise.reject(error);
    }
  );
};

export const settingLogin = () => {
  const cookie = new Cookies();
  const accessToken = cookie.get("access_token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
};

export const setInitAxioSetting = () => {
  axios.defaults.baseURL = process.env.REACT_APP_DOMAIN;
  interceptor();
};

//로그인
export const login = (): string => `${USERS}/login`;

//전체 브랜드 정보 조회
export const getAllBrand = (): string => BRAND;

//브랜드 생성
export const createBrand = (): string => BRAND;

//브랜드 수정
export const modifyBrand = (): string => BRAND;

//브랜드 삭제
export const deleteBrand = (id: string | number): string => `${BRAND}/${id}`;

//브랜드 지역추가
export const createAreaInBrand = (): string => BRAND_AREA;

//브랜드 지역 수정
export const modifyAreaInBrand = (): string => BRAND_AREA;

//브랜드 지역 삭제
export const deleteAreaInBrand = (id: string | number): string =>
  `${BRAND_AREA}/${id}`;

//브랜드 지역 영화관추가
export const createTheaterInBrand = (): string => BRAND_AREA_THEATER;

//브랜드 지역 영화관수정
export const modifyTheaterInBrand = (): string => BRAND_AREA_THEATER;

//브랜드 지역 영화관삭제
export const deleteTheaterInBrand = (id: string | number): string =>
  `${BRAND_AREA_THEATER}/${id}`;

//결제 방식 조회
export const getPaymentTypes = (): string => PAYMENT_TYPE;

//결제 방식 추가
export const createPaymentTypes = (): string => PAYMENT_TYPE;

//결제 방식 삭제
export const deletePaymentTypes = (id: string | number): string =>
  `${PAYMENT_TYPE}/${id}`;

//로그 남기기
export const logging = (): string => LOG;
