export const dateFormat = (_date: string | Date) => {
  const date = typeof _date === "string" ? new Date(_date) : _date;

  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekDay = ["일", "월", "화", "수", "목", "금", "토"];

  return `${date.getFullYear()}년 ${month}월 ${day}일 (${
    weekDay[date.getDay()]
  })`;
};

export const RegexpPhone = (num: string | number) => {
  if (typeof num === "number") num = `${num}`;
  let formatNum = "";

  if (num.length === 11) {
    formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  }
  return formatNum;
};

export const RemoveHypen = (num: string | number) => {
  if (typeof num === "number") num = `${num}`;

  return num.replace(/[^\d]+/g, "");
};

export const AddComma = (num: string | number) => {
  if (typeof num === "number") num = `${num}`;
  var regexp = /\B(?=(\d{3})+(?!\d))/g;
  return num.replace(regexp, ",");
};

export const diffTime = (
  y: number | string,
  M: number | string,
  d: number | string,
  h: number | string,
  m: number | string
): number => {
  let year = typeof y === "string" ? parseInt(y) : y;
  let month = typeof M === "string" ? parseInt(M) : M;
  let day = typeof d === "string" ? parseInt(d) : d;
  let hour = typeof h === "string" ? parseInt(h) : h;
  let minutes = typeof m === "string" ? parseInt(m) : m;

  if (hour === 24 && minutes > 0) {
    day += 1;
    hour = 0;
  }

  const _selectedDate = new Date(`${year}/${month}/${day} ${hour}:${minutes}`);

  const nowDate = new Date();
  const leftTime = (_selectedDate.getTime() - nowDate.getTime()) / (60 * 1000);

  return leftTime;
};
