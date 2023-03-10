import { HourProps, MinuteProps, TheaterAreaProps, TheaterProps } from "type";

export const theaterBrandList = ["CGV", "메가박스", "롯데시네마"];
export const preferredSeatType = ["좌석 입력", "구역 선택"];

export const theaterList: TheaterProps[] = [
  { id: 1, title: "강남", areaId: 1 },
  { id: 2, title: "강변", areaId: 1 },
  { id: 3, title: "건대입구", areaId: 1 },
  { id: 4, title: "구로", areaId: 1 },
  { id: 5, title: "대학로", areaId: 1 },
  { id: 6, title: "동대문", areaId: 1 },
  { id: 7, title: "등촌", areaId: 1 },
  { id: 8, title: "명동", areaId: 1 },
  { id: 9, title: "명동역 씨네라이브러리", areaId: 1 },
  { id: 10, title: "목동", areaId: 1 },
  { id: 11, title: "미아", areaId: 1 },
  { id: 12, title: "불광", areaId: 1 },
  { id: 13, title: "상봉", areaId: 1 },
  { id: 14, title: "성신여대입구", areaId: 1 },
  { id: 15, title: "송파", areaId: 1 },
  { id: 16, title: "수유", areaId: 1 },
  { id: 18, title: "신촌아트레온", areaId: 1 },
  { id: 19, title: "압구정", areaId: 1 },
  { id: 20, title: "여의도", areaId: 1 },
  { id: 21, title: "연남", areaId: 1 },
  { id: 22, title: "영등포", areaId: 1 },
  { id: 23, title: "왕십리", areaId: 1 },
  { id: 24, title: "용산아이파크몰", areaId: 1 },
  { id: 25, title: "중계", areaId: 1 },
  { id: 26, title: "천호", areaId: 1 },
  { id: 27, title: "피카디리1958", areaId: 1 },
  { id: 28, title: "하계", areaId: 1 },
  { id: 29, title: "홍대", areaId: 1 },
  { id: 30, title: "경기광주", areaId: 2 },
  { id: 31, title: "고양", areaId: 2 },
  { id: 32, title: "행신", areaId: 2 },
  { id: 33, title: "광교", areaId: 2 },
  { id: 34, title: "광교상현", areaId: 2 },
  { id: 35, title: "구리", areaId: 2 },
  { id: 36, title: "기흥", areaId: 2 },
  { id: 37, title: "김포", areaId: 2 },
  { id: 38, title: "김포운양", areaId: 2 },
  { id: 39, title: "김포풍무", areaId: 2 },
  { id: 40, title: "김포한강", areaId: 2 },
  { id: 41, title: "동백", areaId: 2 },
  { id: 42, title: "동수원", areaId: 2 },
  { id: 43, title: "동탄", areaId: 2 },
  { id: 44, title: "동탄역", areaId: 2 },
  { id: 45, title: "동탄호수공원", areaId: 2 },
  { id: 46, title: "배곧", areaId: 2 },
  { id: 47, title: "범계", areaId: 2 },
  { id: 48, title: "부천", areaId: 2 },
  { id: 49, title: "부천역", areaId: 2 },
  { id: 50, title: "부천옥길", areaId: 2 },
  { id: 51, title: "북수원", areaId: 2 },
  { id: 52, title: "산본", areaId: 2 },
  { id: 53, title: "서현", areaId: 2 },
  { id: 54, title: "성남모란", areaId: 2 },
  { id: 55, title: "소풍", areaId: 2 },
  { id: 56, title: "수원", areaId: 2 },
  { id: 57, title: "스타필드시티위례", areaId: 2 },
  { id: 58, title: "시흥", areaId: 2 },
  { id: 59, title: "안산", areaId: 2 },
  { id: 60, title: "안성", areaId: 2 },
  { id: 61, title: "야탑", areaId: 2 },
  { id: 62, title: "양주옥정", areaId: 2 },
  { id: 63, title: "역곡", areaId: 2 },
  { id: 64, title: "오리", areaId: 2 },
  { id: 65, title: "오산", areaId: 2 },
  { id: 66, title: "오산중앙", areaId: 2 },
  { id: 67, title: "용인", areaId: 2 },
  { id: 68, title: "의정부", areaId: 2 },
  { id: 69, title: "의정부태흥", areaId: 2 },
  { id: 70, title: "이천", areaId: 2 },
  { id: 71, title: "일산", areaId: 2 },
  { id: 72, title: "정왕", areaId: 2 },
  { id: 73, title: "죽전", areaId: 2 },
  { id: 74, title: "파주문산", areaId: 2 },
  { id: 75, title: "파주야당", areaId: 2 },
  { id: 76, title: "판교", areaId: 2 },
  { id: 77, title: "평촌", areaId: 2 },
  { id: 78, title: "평택", areaId: 2 },
  { id: 79, title: "평택고덕", areaId: 2 },
  { id: 80, title: "평택소사", areaId: 2 },
  { id: 81, title: "포천", areaId: 2 },
  { id: 82, title: "하남미사", areaId: 2 },
  { id: 83, title: "화성", areaId: 2 },
  { id: 84, title: "봉담", areaId: 2 },
  { id: 85, title: "화정", areaId: 2 },
  { id: 86, title: "계양", areaId: 3 },
  { id: 87, title: "부평송도", areaId: 3 },
  { id: 88, title: "타임스페이스", areaId: 3 },
  { id: 89, title: "연수역", areaId: 3 },
  { id: 90, title: "인천", areaId: 3 },
  { id: 91, title: "인천논현", areaId: 3 },
  { id: 92, title: "인천도화", areaId: 3 },
  { id: 93, title: "인천연수", areaId: 3 },
  { id: 94, title: "인천학익", areaId: 3 },
  { id: 95, title: "주안역", areaId: 3 },
  { id: 96, title: "청라", areaId: 3 },
  { id: 97, title: "강릉", areaId: 4 },
  { id: 98, title: "원주", areaId: 4 },
  { id: 99, title: "춘천", areaId: 4 },
  { id: 100, title: "논산", areaId: 5 },
  { id: 101, title: "당진", areaId: 5 },
  { id: 102, title: "대전", areaId: 5 },
  { id: 103, title: "대전가수원", areaId: 5 },
  { id: 104, title: "대전가오", areaId: 5 },
  { id: 105, title: "대전탄방", areaId: 5 },
  { id: 106, title: "대전터미널", areaId: 5 },
  { id: 107, title: "보령", areaId: 5 },
  { id: 108, title: "서산", areaId: 5 },
  { id: 109, title: "세종", areaId: 5 },
  { id: 110, title: "유성노은", areaId: 5 },
  { id: 111, title: "천안", areaId: 5 },
  { id: 112, title: "천안시청", areaId: 5 },
  { id: 113, title: "천안터미널", areaId: 5 },
  { id: 114, title: "천안펜타포트", areaId: 5 },
  { id: 115, title: "청주(서문)", areaId: 5 },
  { id: 116, title: "청주성안길", areaId: 5 },
  { id: 117, title: "청주율량", areaId: 5 },
  { id: 118, title: "청주지웰시티", areaId: 5 },
  { id: 119, title: "청주터미널", areaId: 5 },
  { id: 120, title: "충북혁신", areaId: 5 },
  { id: 121, title: "충주교현", areaId: 5 },
  { id: 122, title: "홍성", areaId: 5 },
  { id: 123, title: "대구수성", areaId: 6 },
  { id: 124, title: "대구스타디움", areaId: 6 },
  { id: 125, title: "대구아카데미", areaId: 6 },
  { id: 126, title: "대구연경", areaId: 6 },
  { id: 127, title: "대구월성", areaId: 6 },
  { id: 128, title: "대구이시아", areaId: 6 },
  { id: 129, title: "대구칠곡", areaId: 6 },
  { id: 130, title: "대구한일", areaId: 6 },
  { id: 131, title: "대구현대", areaId: 6 },
  { id: 132, title: "남포", areaId: 7 },
  { id: 133, title: "대연", areaId: 7 },
  { id: 134, title: "동래", areaId: 7 },
  { id: 135, title: "부산명지", areaId: 7 },
  { id: 136, title: "서면", areaId: 7 },
  { id: 137, title: "서면삼정타워", areaId: 7 },
  { id: 138, title: "서면상상마당", areaId: 7 },
  { id: 139, title: "센텀시티", areaId: 7 },
  { id: 140, title: "아시아드", areaId: 7 },
  { id: 141, title: "울산동구", areaId: 7 },
  { id: 142, title: "울산삼산", areaId: 7 },
  { id: 143, title: "울산신천", areaId: 7 },
  { id: 144, title: "울산진장", areaId: 7 },
  { id: 145, title: "정관", areaId: 7 },
  { id: 146, title: "하단아트몰링", areaId: 7 },
  { id: 147, title: "해운대", areaId: 7 },
  { id: 148, title: "화명", areaId: 7 },
  { id: 149, title: "거제", areaId: 8 },
  { id: 150, title: "경산", areaId: 8 },
  { id: 151, title: "고성", areaId: 8 },
  { id: 152, title: "구미", areaId: 8 },
  { id: 153, title: "김천율곡", areaId: 8 },
  { id: 154, title: "김해", areaId: 8 },
  { id: 155, title: "김해율하", areaId: 8 },
  { id: 156, title: "김해장유", areaId: 8 },
  { id: 157, title: "마산", areaId: 8 },
  { id: 158, title: "북포항", areaId: 8 },
  { id: 159, title: "안동", areaId: 8 },
  { id: 160, title: "양산물금", areaId: 8 },
  { id: 161, title: "양산삼호", areaId: 8 },
  { id: 162, title: "진주혁신", areaId: 8 },
  { id: 163, title: "창원", areaId: 8 },
  { id: 164, title: "창원더시티", areaId: 8 },
  { id: 165, title: "창원상남", areaId: 8 },
  { id: 166, title: "통영", areaId: 8 },
  { id: 167, title: "포항", areaId: 8 },
  { id: 168, title: "광양", areaId: 9 },
  { id: 169, title: "광양 엘에프스퀘어", areaId: 9 },
  { id: 170, title: "광주금남로", areaId: 9 },
  { id: 171, title: "광주상무", areaId: 9 },
  { id: 172, title: "광주용봉", areaId: 9 },
  { id: 173, title: "광주첨단", areaId: 9 },
  { id: 174, title: "광주충장로", areaId: 9 },
  { id: 175, title: "광주터미널", areaId: 9 },
  { id: 176, title: "광주하남", areaId: 9 },
  { id: 177, title: "군산", areaId: 9 },
  { id: 178, title: "나주", areaId: 9 },
  { id: 179, title: "목포", areaId: 9 },
  { id: 180, title: "목포평화광장", areaId: 9 },
  { id: 181, title: "서전주", areaId: 9 },
  { id: 182, title: "순천", areaId: 9 },
  { id: 183, title: "순천신대", areaId: 9 },
  { id: 184, title: "여수웅천", areaId: 9 },
  { id: 185, title: "익산", areaId: 9 },
  { id: 186, title: "전주고사", areaId: 9 },
  { id: 187, title: "전주에코시티", areaId: 9 },
  { id: 188, title: "전주효자", areaId: 9 },
  { id: 189, title: "정읍", areaId: 9 },
  { id: 190, title: "제주", areaId: 9 },
  { id: 191, title: "제주노형", areaId: 9 },
];

export const areaList: TheaterAreaProps[] = [
  { id: 1, title: "서울", theaterList: [] },
  { id: 2, title: "경기", theaterList: [] },
  { id: 3, title: "인천", theaterList: [] },
  { id: 4, title: "강원", theaterList: [] },
  { id: 5, title: "대전/충청", theaterList: [] },
  { id: 6, title: "대구", theaterList: [] },
  { id: 7, title: "부산/울산", theaterList: [] },
  { id: 8, title: "경상", theaterList: [] },
  { id: 9, title: "광주/전라/제주", theaterList: [] },
];

export const hourList: HourProps[] = [
  { id: 1, title: "01(오전)" },
  { id: 2, title: "02(오전)" },
  { id: 3, title: "03(오전)" },
  { id: 4, title: "04(오전)" },
  { id: 5, title: "05(오전)" },
  { id: 6, title: "06(오전)" },
  { id: 7, title: "07(오전)" },
  { id: 8, title: "08(오전)" },
  { id: 9, title: "09(오전)" },
  { id: 10, title: "10(오전)" },
  { id: 11, title: "11(오전)" },
  { id: 12, title: "12(오후)" },
  { id: 13, title: "13(오후)" },
  { id: 14, title: "14(오후)" },
  { id: 15, title: "15(오후)" },
  { id: 16, title: "16(오후)" },
  { id: 17, title: "17(오후)" },
  { id: 18, title: "18(오후)" },
  { id: 19, title: "19(오후)" },
  { id: 20, title: "20(오후)" },
  { id: 21, title: "21(오후)" },
  { id: 22, title: "22(오후)" },
  { id: 23, title: "23(오후)" },
  { id: 24, title: "24(오전)" },
];

export const minuteList: MinuteProps[] = [
  { id: 1, title: "00" },
  { id: 2, title: "05" },
  { id: 3, title: "10" },
  { id: 4, title: "15" },
  { id: 5, title: "20" },
  { id: 6, title: "25" },
  { id: 7, title: "30" },
  { id: 8, title: "35" },
  { id: 9, title: "40" },
  { id: 10, title: "45" },
  { id: 11, title: "50" },
  { id: 12, title: "55" },
];

export const theaterSectionList = [
  "앞줄 왼쪽",
  "앞줄 가운데",
  "앞줄 오른쪽",
  "중간줄 왼쪽",
  "중간줄 가운데",
  "중간줄 오른쪽",
  "뒷줄 왼쪽",
  "뒷줄 가운데",
  "뒷줄 오른쪽",
];

export const payType = ["계좌이체", "네이버결제", "티몬결제", "11번가결제"];

export const beforeShowTime30Message = `상영 시작까지 남은 시간이 30분 이하일 때 체크!`;
