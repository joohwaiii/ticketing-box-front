import { AddComma, dateFormat, diffTime } from "commonUtil";
import Checkbox from "components/checkbox/Checkbox";
import AlertModal from "components/modal/AlertModal";
import ModalLayout from "components/modal/ModalLayout";
import SelectItem from "components/select/SelectItem";
import {
  areaList,
  hourList,
  minuteList,
  preferredSeatType,
  theaterBrandList,
  theaterList,
} from "mock";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ResultProsp, TheaterAreaProps } from "type";
import MovieDateTIme from "./components/MovieDateTIme";
import MovieTItle from "./components/MovieTItle";
import Payment from "./components/Payment";
import PeopleCount from "./components/PeopleCount";
import PreferredSeat from "./components/PreferredSeat";
import Receipt from "./components/Receipt";
import Theater from "./components/Theater";
import { ReactComponent as ArrowLeft } from "../assets/arrow_left.svg";
import {
  AreaInBrandProps,
  BrandProps,
  PaymentTypeProps,
  TheaterInBrandProps,
} from "admin/Setting";
import { Cookies } from "react-cookie";
import {
  default_next_page_message,
  within_30_minute_running_time,
} from "wording";
import WarnningMsg from "components/warnning/WarnningMsg";

const Main = () => {
  const result = useRef<ResultProsp>({});
  const refSection1 = useRef<HTMLElement>(null);
  const refSection2 = useRef<HTMLElement>(null);
  const refSection3 = useRef<HTMLElement>(null);
  const refSection4 = useRef<HTMLElement>(null);
  const refSection5 = useRef<HTMLElement>(null);
  const refSection6 = useRef<HTMLElement>(null);

  const alertMessage = useRef<string>("");

  const [section1Error, updateSection1Error] = useState<boolean>(false);
  const [section2Error, updateSection2Error] = useState<boolean>(false);
  const [section3Error, updateSection3Error] = useState<boolean>(false);
  const [section4Error, updateSection4Error] = useState<boolean>(false);
  const [section5Error, updateSection5Error] = useState<boolean>(false);
  const [section6Error, updateSection6Error] = useState<boolean>(false);

  const [phase, updatePhase] = useState<number>(1);

  const [nextPageAlert, updateNextPageAlert] = useState<boolean>(false);

  const [isOpenAlertModal, updateOpenAleertModal] = useState(false);
  const [movieName, updateMovieName] = useState<string>("");
  const [theaterAreaList, updateTheaterAreaList] = useState<TheaterAreaProps[]>(
    []
  );
  const [dateList, updateDateList] = useState<string[]>([]);

  //------------------------------------------------------------------------------------
  const [selectedBrand, updateSelectedBrand] = useState<BrandProps | undefined>(
    undefined
  );
  const [selectedArea, updateSelectedArea] = useState<
    AreaInBrandProps | undefined
  >(undefined);
  const [selectedTheater, updatedSelectedTheater] = useState<
    TheaterInBrandProps | undefined
  >(undefined);
  //------------------------------------------------------------------------------------

  const [selectedDate, updateSelectedDate] = useState<string | undefined>(
    undefined
  );
  const [selectedHour, updateSelectedHour] = useState<string | undefined>(
    "??????"
  );
  const [selectedMinute, updateSelectedMinute] = useState<string | undefined>(
    "??????"
  );
  const [isBeforeShowTime30, updateBeforeShowTime30] = useState<boolean>(false);
  const [peopleCount, updatePeopleCount] = useState<number>(1);

  const [selectedSeatType, updateSelectedSeatType] = useState<string>(
    preferredSeatType[0]
  );

  const [preferredSeat1, updatePreferredSeat1] = useState<string | undefined>(
    ""
  );
  const [preferredSeat2, updatePreferredSeat2] = useState<string | undefined>(
    ""
  );
  const [preferredSeat3, updatePreferredSeat3] = useState<string | undefined>(
    ""
  );
  const [preferredSection, updatePreferredSection] = useState<
    string | undefined
  >(undefined);

  const [selectedPaytype, updateSelectedPaytype] = useState<
    PaymentTypeProps | undefined
  >(undefined);
  const [payersName, updatePayerName] = useState<string>("");
  const [phoneNumber, updatePhoneNumber] = useState<string>("");

  const [agreement1, updateAgreement1] = useState<boolean>(false);
  const [agreement2, updateAgreement2] = useState<boolean>(false);
  const [agreement3, updateAgreement3] = useState<boolean>(false);

  const getTheaterList = () => {
    const mockData = areaList.map((item) => {
      return {
        ...item,
        theaterList: theaterList.filter((data) => data.areaId === item.id),
      };
    });

    updateTheaterAreaList(mockData);
  };

  const getDateList = () => {
    const dates: string[] = [];
    for (let i = 0; i < 31; i++) {
      const day = new Date();
      day.setDate(day.getDate() + i);
      dates.push(dateFormat(day));
    }

    updateDateList(dates);
  };

  const validationChecking = () => {
    if (
      !refSection1.current ||
      !refSection2.current ||
      !refSection3.current ||
      !refSection4.current ||
      !refSection5.current ||
      !refSection6.current
    ) {
      return false;
    }

    const section1 =
      selectedBrand === undefined ||
      selectedArea === undefined ||
      selectedTheater === undefined;

    const section2 = movieName.trim().length === 0;
    const section3 =
      selectedDate === undefined ||
      selectedDate.length === 0 ||
      selectedHour === undefined ||
      selectedHour === "??????" ||
      selectedMinute === undefined ||
      selectedMinute === "??????";
    const section4 = peopleCount === 0;
    const section5_1 =
      selectedSeatType === preferredSeatType[0] &&
      preferredSeat1?.trim().length === 0 &&
      preferredSeat2?.trim().length === 0 &&
      preferredSeat3?.trim().length === 0;
    const section5_2 =
      selectedSeatType === preferredSeatType[1] &&
      preferredSection === undefined;
    const section6 =
      selectedPaytype === undefined ||
      payersName.trim().length === 0 ||
      phoneNumber.trim().length === 0;

    updateSection1Error(section1);
    updateSection2Error(section2);
    updateSection3Error(section3);
    updateSection4Error(section4);
    updateSection5Error(
      selectedSeatType === preferredSeatType[0] ? section5_1 : section5_2
    );
    updateSection6Error(section6);

    let result = !section1 && !section2 && !section3 && !section4 && !section6;

    if (selectedSeatType === preferredSeatType[0]) {
      result = result && !section5_1;
    } else {
      result = result && !section5_2;
    }

    console.log(section1);
    console.log(section2);
    console.log(section3);
    console.log(section4);
    console.log(
      selectedSeatType === preferredSeatType[0] ? section5_1 : section5_2
    );
    console.log(section6);

    console.log(`result : ${result}`);

    if (!result)
      alertMessage.current =
        "?????? ????????? ???????????? ???????????????.|?????? ??? ?????? ????????? ?????????";
    updateOpenAleertModal(!result);
    return result;
  };

  const asdf = () => {
    if (!selectedDate || !selectedHour || !selectedMinute) return false;

    const arr = selectedDate.split(" ");
    const year = arr[0].slice(0, arr[0].length - 1);
    const month = arr[1].slice(0, arr[1].length - 1);
    const day = arr[2].slice(0, arr[2].length - 1);
    const hour = selectedHour.slice(0, 2);
    const minutes = selectedMinute.slice(0, 2);

    // const _selectedDate = new Date(
    //   `${year}/${month}/${day} ${houre}:${minute}`
    // );

    // console.log(`${year}/${month}/${day} ${houre}:${minute}`);
    // console.log(_selectedDate);
    // const nowDate = new Date();
    // const leftTime =
    //   (_selectedDate.getTime() - nowDate.getTime()) / (60 * 1000);

    const leftTime = diffTime(year, month, day, hour, minutes);

    if (leftTime <= 10) {
      alertMessage.current =
        "???????????? ?????? ????????? ????????? ??????????????????.|???????????? ?????? ????????? ?????? ????????? ?????????.";
      updateOpenAleertModal(true);
    }
    return leftTime >= 10;
  };

  const onSubmit = () => {
    if (validationChecking() && asdf()) {
      const _result: ResultProsp = {
        theaterBrand: selectedBrand?.title,
        theaterArea: selectedArea?.title,
        theater: selectedTheater?.title,
        movie: movieName,
        date: `${selectedDate} ${selectedHour?.substring(
          0,
          2
        )}:${selectedMinute}`,
        beforeShowTime30: isBeforeShowTime30,
        people: peopleCount,
        paymentType: selectedPaytype?.title,
        payerName: payersName,
        phoneNumber: phoneNumber,
      };
      if (selectedSeatType === preferredSeatType[0]) {
        _result.preferredSeat1 = preferredSeat1?.toUpperCase();
        _result.preferredSeat2 = preferredSeat2?.toUpperCase();
        _result.preferredSeat3 = preferredSeat3?.toUpperCase();
      } else {
        _result.preferredSection = preferredSection;
      }

      updateNextPageAlert(true);
      result.current = _result;
    }
  };

  const copyClipbord = () => {
    if (!agreement1 || !agreement2 || !agreement3) {
      alertMessage.current =
        "??????????????? ??????????????????.|?????? ??? ?????? ???????????????!";
      updateOpenAleertModal(true);
      return;
    }
    const copyMessage =
      `${
        isBeforeShowTime30
          ? "\n??? ?????? ???????????? ?????? ????????? 30??? ???????????????.\n"
          : ""
      }` +
      `[${result.current.theaterBrand}] ${result.current.theaterArea} - ${result.current.theater}\n` +
      `"${result.current.movie}"\n` +
      `${result.current.date} - ${result.current.people}???\n\n` +
      `${
        result.current.preferredSeat1
          ? `???????????? 1?????? : ${result.current.preferredSeat1}\n`
          : ""
      }` +
      `${
        result.current.preferredSeat2
          ? `???????????? 2?????? : ${result.current.preferredSeat2}\n`
          : ""
      }` +
      `${
        result.current.preferredSeat3
          ? `???????????? 3?????? : ${result.current.preferredSeat3}\n`
          : ""
      }` +
      `${
        result.current.preferredSection
          ? `???????????? : ${result.current.preferredSection}\n`
          : ""
      }` +
      `\n` +
      `?????? ??????    : ${result.current.paymentType}\n` +
      `????????? ?????? : ${result.current.payerName}\n` +
      `???????????????  : ${result.current.phoneNumber}\n` +
      `\n` +
      `??? ?????? ?????? ??? ??????/?????? ????????? ???????????????.\n` +
      ` (?????? ?????? ?????? : ??????????????? ??? ?????? ?????? ??????)\n` +
      `??? ??????????????? ??? ?????? ??????, ?????? ????????? ?????? ?????? ????????? ???????????? ?????? ???????????????.\n` +
      `??? ?????? ?????? ?????? ???, ?????? ?????? ???????????? ???????????? ?????? ???????????????.\n`;

    copyToClipboard(copyMessage)
      .then(() => {
        alertMessage.current =
          "????????? ?????????????????????!|??????????????? ???????????????|???????????? ??? ????????? ?????????!";
        updateOpenAleertModal(true);
      })
      .catch(() => {
        console.log("error");
      });
  };

  const copyToClipboard = async (textToCopy: string) => {
    // navigator clipboard api needs a secure context (https)
    if (navigator.clipboard && window.isSecureContext) {
      // navigator clipboard api method'
      return navigator.clipboard.writeText(textToCopy);
    } else {
      // text area method
      let textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      // make the textarea out of viewport
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      return new Promise((res, rej) => {
        // here the magic happens
        document.execCommand("copy") ? res("success") : rej();
        textArea.remove();
      });
    }
  };

  useEffect(() => {
    if (
      !refSection1.current ||
      !refSection2.current ||
      !refSection3.current ||
      !refSection4.current ||
      !refSection5.current ||
      !refSection6.current
    ) {
      return;
    }

    refSection1.current.style.border = `1px solid ${
      section1Error ? "red" : "white"
    }`;
    refSection2.current.style.border = `1px solid ${
      section2Error ? "red" : "white"
    }`;
    refSection3.current.style.border = `1px solid ${
      section3Error ? "red" : "white"
    }`;
    refSection4.current.style.border = `1px solid ${
      section4Error ? "red" : "white"
    }`;
    refSection5.current.style.border = `1px solid ${
      section5Error ? "red" : "white"
    }`;
    refSection6.current.style.border = `1px solid ${
      section6Error ? "red" : "white"
    }`;
  }, [
    section1Error,
    section2Error,
    section3Error,
    section4Error,
    section5Error,
    section6Error,
  ]);

  useEffect(() => {
    const cookie = new Cookies();
    getTheaterList();
    getDateList();
    cookie.remove("access_token");
  }, []);

  const frontStyle: React.CSSProperties = {
    height: "100%",
    overflow: "scroll",
    zIndex: 1,
  };
  const backStyle: React.CSSProperties = {
    height: 10,
    overflow: "hidden",
    zIndex: 0,
  };
  return (
    <Container>
      <MainContainer style={phase === 1 ? frontStyle : backStyle}>
        <Section
          ref={refSection1}
          onClick={() => {
            updateSection1Error(false);
          }}
        >
          <Title>?????? ?????? ??????</Title>
          <Theater
            selectedBrand={selectedBrand}
            updateSelectedBrand={updateSelectedBrand}
            selectedArea={selectedArea}
            selectedTheater={selectedTheater}
            updateSelectedArea={updateSelectedArea}
            updatedSelectedTheater={updatedSelectedTheater}
          />
        </Section>

        <Section
          ref={refSection2}
          onClick={() => {
            updateSection2Error(false);
          }}
        >
          <MovieTItle movieName={movieName} updateMovieName={updateMovieName} />
        </Section>

        <Section
          ref={refSection3}
          onClick={() => {
            updateSection3Error(false);
          }}
        >
          <MovieDateTIme
            dateList={dateList}
            selectedDate={selectedDate}
            selectedHour={selectedHour}
            selectedMinute={selectedMinute}
            isBeforeShowTime30={isBeforeShowTime30}
            updateSelectedDate={updateSelectedDate}
            updateSelectedHour={updateSelectedHour}
            updateSelectedMinute={updateSelectedMinute}
            updateBeforeShowTime30={updateBeforeShowTime30}
          />
        </Section>

        <Section
          ref={refSection4}
          onClick={() => {
            updateSection4Error(false);
          }}
        >
          <PeopleCount
            peopleCount={peopleCount}
            updatePeopleCount={updatePeopleCount}
          />
        </Section>

        <Section
          ref={refSection5}
          onClick={() => {
            updateSection5Error(false);
          }}
        >
          <PreferredSeat
            selectedSeatType={selectedSeatType}
            preferredSeat1={preferredSeat1}
            preferredSeat2={preferredSeat2}
            preferredSeat3={preferredSeat3}
            preferredSection={preferredSection}
            updatePreferredSeat1={updatePreferredSeat1}
            updatePreferredSeat2={updatePreferredSeat2}
            updatePreferredSeat3={updatePreferredSeat3}
            updatePreferredSection={updatePreferredSection}
            updateSelectedSeatType={updateSelectedSeatType}
          />
        </Section>

        <Section
          ref={refSection6}
          onClick={() => {
            updateSection6Error(false);
          }}
        >
          <Payment
            selectedPaytype={selectedPaytype}
            payersName={payersName}
            phoneNumber={phoneNumber}
            updateSelectedPaytype={updateSelectedPaytype}
            updatePayerName={updatePayerName}
            updatePhoneNumber={updatePhoneNumber}
          />
          <SubmitBtn
            onClick={(e) => {
              e.stopPropagation();
              onSubmit();
            }}
          >
            ?????? ?????? ????????????
          </SubmitBtn>
        </Section>
      </MainContainer>

      <MainContainer style={phase === 2 ? frontStyle : backStyle}>
        {/* ????????? , ?????? ?????? ????????? */}
        <Section>
          <Title>
            <ArrowLeft
              className="back__icon"
              onClick={() => {
                updatePhase(1);
                updateAgreement1(false);
                updateAgreement2(false);
                updateAgreement3(false);
              }}
            />
            ?????? ?????? ??????
          </Title>
          <Receipt result={result.current} />
        </Section>

        {/* ?????? ?????? */}
        <Section>
          <div
            style={{
              padding: "20px 40px",
              fontSize: 18,
              fontWeight: "bold",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              userSelect: "none",
            }}
          >
            <span>?????? ??????</span>
            <span>
              {AddComma(
                (selectedBrand?.price || 0) * (result.current.people || 1)
              )}
              ???
            </span>
          </div>
        </Section>

        {/* ?????? ?????? */}
        <Section>
          <div
            style={{
              padding: "20px 40px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <WarnningMsg
              style={{ marginBottom: 4 }}
              message={`???????????? ????????? ????????? ???????????? ?????? ???????????? ????????? ??? ????????????. ????????? ????????? ???????????? ?????? ????????? ???????????? ?????? ?????? ?????? ??????????????????.`}
            />
            <WarnningMsg
              style={{ marginBottom: 4 }}
              message={`?????? ????????????????? ????????? ??????????????????????? ??????????????, ?????? ?????? ?????? ???????????????????????????? ?????? ?????????????????? ??????????????????.`}
            />
            <WarnningMsg
              style={{ marginBottom: 14 }}
              message={`?????????/?????? ?????? ??????????????? ????????? ???????????? ?????? ?????? ???????????? ??????  ?????? ????????? ???????????? ???????????? ???, ?????????????????? ????????? ??????????????? ?????????.`}
            />
            <Checkbox
              checked={agreement1}
              updateChecked={updateAgreement1}
              message="?????? ?????? ??? ??????/?????? ????????? ???????????????.|(?????? ?????? ?????? : ??????????????? ??? ?????? ?????? ??????)"
            />
            <Checkbox
              style={{ marginTop: 10 }}
              checked={agreement2}
              updateChecked={updateAgreement2}
              message="??????????????? ??? ?????? ??????, ?????? ????????? ?????? ?????? ????????? ???????????? ?????? ???????????????."
            />
            <Checkbox
              style={{ marginTop: 10 }}
              checked={agreement3}
              updateChecked={updateAgreement3}
              message="?????? ????????? ?????? ???, ?????? ?????? ???????????? ???????????? ?????? ???????????????."
            />
          </div>
        </Section>
        <Section>
          <div
            style={{
              padding: "20px 40px",
              fontSize: 15,
              fontWeight: "bold",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              userSelect: "none",
            }}
          >
            <span>?????? ?????? ????????? ??????????????????,</span>
            <span>????????? '?????? ?????? ????????????' ????????? ???????????????!</span>
          </div>
          <SubmitBtn onClick={copyClipbord}>?????? ?????? ????????????</SubmitBtn>
        </Section>
      </MainContainer>

      <ModalLayout isOpen={isOpenAlertModal} borderRadius={0}>
        <AlertModal
          message={alertMessage.current}
          close={() => updateOpenAleertModal(false)}
        />
      </ModalLayout>
      <ModalLayout isOpen={nextPageAlert} borderRadius={0}>
        <AlertModal
          message={
            result.current.beforeShowTime30
              ? within_30_minute_running_time
              : default_next_page_message
          }
          btnText={"??????"}
          close={() => {
            updateNextPageAlert(false);
            updatePhase(2);
          }}
        />
      </ModalLayout>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100%;
  min-height: 100vh;
  background-color: #f0f2f5;
  overflow: hidden;
`;

const MainContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 400px;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  gap: 10px;
`;

const Section = styled.section`
  width: calc(100% -1px);
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
`;

const Title = styled.div`
  position: relative;
  width: 100%;
  height: 54px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: #000000;
  font-size: 22px;
  font-weight: bold;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);

  .back__icon {
    position: absolute;
    top: 50%;
    left: 40px;
    width: 30px;
    height: 30px;
    cursor: pointer;

    transform: translateY(-50%);
  }
`;

const SubmitBtn = styled.button`
  width: 100%;
  height: 50px;
  border: 0;
  color: white;
  background-color: red;
  font-size: 16px;
  font-weight: 900;
  cursor: pointer;
`;
export const SectionLabel = styled.span`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 15px;
`;
export default Main;
