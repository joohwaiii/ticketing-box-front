import {
  AreaInBrandProps,
  BrandProps,
  TheaterInBrandProps,
} from "admin/Setting";
import axios from "axios";
import TabItem from "components/tab/TabItem";
import TabLayout from "components/tab/TabLayout";
import WarnningMsg from "components/warnning/WarnningMsg";
import { SectionLabel } from "main/Main";
import { theaterBrandList } from "mock";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TheaterAreaProps, TheaterProps } from "type";
import * as api from "../../api/api";

interface Props {
  selectedBrand: BrandProps | undefined;
  updateSelectedBrand: React.Dispatch<
    React.SetStateAction<BrandProps | undefined>
  >;

  selectedArea: AreaInBrandProps | undefined;
  updateSelectedArea: React.Dispatch<
    React.SetStateAction<AreaInBrandProps | undefined>
  >;

  selectedTheater: TheaterInBrandProps | undefined;
  updatedSelectedTheater: React.Dispatch<
    React.SetStateAction<TheaterInBrandProps | undefined>
  >;
}
const Theater: React.FC<Props> = (props) => {
  const [brands, updateBarnds] = useState<BrandProps[]>([]);
  const [areas, updateAreas] = useState<AreaInBrandProps[]>([]);
  const [theaters, updateTheaters] = useState<TheaterInBrandProps[]>([]);

  const getAllBrand = async () => {
    try {
      const result = await axios.get(api.getAllBrand());
      if (result.status === 200) {
        const _brands: BrandProps[] = result.data.map(
          (item: any): BrandProps => ({ ...item })
        );
        updateBarnds([..._brands]);
        props.updateSelectedBrand(_brands[0]);
        updateAreas([..._brands[0].areaInBrand]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const selectBrand = (brandItem: BrandProps) => {
    if (props.selectedBrand?.theaterBrandsId === brandItem.theaterBrandsId) {
      props.updateSelectedBrand(undefined);
      updateAreas([]);
    } else {
      props.updateSelectedBrand(brandItem);
      updateAreas([...brandItem.areaInBrand]);
    }
    updateTheaters([]);
    props.updateSelectedArea(undefined);
    props.updatedSelectedTheater(undefined);
  };

  const selectArea = (areaItem: AreaInBrandProps) => {
    if (props.selectedArea?.areaInBrandId === areaItem.areaInBrandId) {
      props.updateSelectedArea(undefined);
      updateTheaters([]);
    } else {
      props.updateSelectedArea(areaItem);
      updateTheaters([
        ...areaItem.theaterInBrand.sort((a, b) => {
          if (a.title > b.title) return 1;
          else if (a.title < b.title) return -1;
          else return 0;
        }),
      ]);
    }
    props.updatedSelectedTheater(undefined);
  };

  useEffect(() => {
    getAllBrand();
  }, []);

  return (
    <Container>
      <SectionLabel>영화관을 선택해 주세요!</SectionLabel>
      <TabLayout>
        {brands.map((item, index) => {
          return (
            <TabItem
              key={index}
              isSelected={
                item.theaterBrandsId === props.selectedBrand?.theaterBrandsId
              }
              onClick={() => {
                selectBrand(item);
              }}
            >
              {item.title}
            </TabItem>
          );
        })}
      </TabLayout>
      <TheaterContainer>
        <div className="area__list">
          {areas.map((item, index) => {
            return (
              <div
                key={index}
                className={`area__item ${
                  item.areaInBrandId === props.selectedArea?.areaInBrandId &&
                  "selected"
                }`}
                onClick={() => {
                  selectArea(item);
                }}
              >
                {item.title}
              </div>
            );
          })}
          {areas.length < 7 && <div className="remainder"></div>}
        </div>
        <div className="theater__wrapper">
          <div className="theater__list">
            {theaters.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`theater__item ${
                    item.theaterInBrandId ===
                      props.selectedTheater?.theaterInBrandId && "selected"
                  }`}
                  onClick={() => {
                    props.updatedSelectedTheater(item);
                  }}
                >
                  {item.title}
                </div>
              );
            })}
            {theaters.length % 2 === 1 && <div className="theater__item" />}
          </div>
        </div>
      </TheaterContainer>
      <WarnningMsg
        style={{ marginTop: 15 }}
        color={"#0011F2"}
        message={`예매 가능 : 2D 일반관, CGV 리클라이너관, 메가박스 컴포트관, 메가박스 MX관, 메가박스 더부티크관`}
      />
      <WarnningMsg
        style={{ marginTop: 4 }}
        message={`예매 불가 : 롯데시네마 리클라이너관, IMAX, 3/4D, 돌비시네마, 씨네컴포트, 메가박스 더부티크 스위트, 컴포트시트, 스크린X 등 특별관, 자동차 극장, 뮤지컬, 콘서트, CGV 청담씨네시티`}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 40px;
`;

const TheaterContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 245px;
  border: 1px solid var(--color__border);
  margin-top: 15px;
  overflow: hidden;
  .area__list {
    flex: 1;
    overflow: scroll;
    display: flex;
    flex-direction: column;
    background-color: var(--color__border);
    border-right: 1px solid var(--color__border);
    gap: 1px;

    .remainder {
      flex-grow: 1;
      background-color: white;
    }

    .area__item {
      height: 40px;
      min-height: 40px;
      max-height: 40px;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding-left: 10px;
      font-size: 14px;
      font-weight: 700;
      background-color: white;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    .area__item.selected {
      background-color: #eee;
    }
  }
  .theater__wrapper {
    flex: 2;
    overflow: scroll;
  }
  .theater__list {
    height: fit-content;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    .theater__item {
      width: calc(50% - 21px);
      height: 40px;
      min-height: 40px;
      max-height: 40px;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 0 10px;
      font-size: 12px;
      font-weight: 500;
      border-bottom: 1px solid var(--color__border);
      cursor: pointer;
      white-space: normal;
      transition: all 0.3s ease;
    }
    .theater__item.selected {
      background-color: #eee;
    }

    .theater__item:nth-child(odd) {
      border-right: 1px solid var(--color__border);
    }
  }
`;

export default Theater;
