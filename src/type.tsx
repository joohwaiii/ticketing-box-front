export interface TheaterProps {
  id: number;
  areaId: number;
  title: string;
}

export interface TheaterAreaProps {
  id: number;
  title: string;
  theaterList: TheaterProps[];
}

export interface DateProps {
  id: number;
  title: string;
}

export interface HourProps {
  id: number;
  title: string;
}

export interface MinuteProps {
  id: number;
  title: string;
}

export interface ResultProsp {
  theaterBrand?: string;
  theaterArea?: string;
  theater?: string;
  movie?: string;
  date?: string;
  beforeShowTime30?: boolean;
  people?: number;
  preferredSeat1?: string;
  preferredSeat2?: string;
  preferredSeat3?: string;
  preferredSection?: string;
  paymentType?: string;
  payerName?: string;
  phoneNumber?: string;
}
