import {
  AreaInBrandProps,
  BrandProps,
  TheaterInBrandProps,
} from "admin/Setting";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as api from "../../api/api";
import { ReactComponent as Delete } from "../../assets/delete.svg";

const BrandBranchManage = () => {
  const [brand, updateBrand] = useState<BrandProps[]>([]);
  const [areas, updateAreas] = useState<AreaInBrandProps[]>([]);
  const [theaters, updateTheaters] = useState<TheaterInBrandProps[]>([]);

  const [addAreaTitle, updateAddAreaTitle] = useState<string>("");
  const [addTheaterTitle, updateAddTheaterTitle] = useState<string>("");

  const [selectedBrand, updateSelectedBrand] = useState<BrandProps | undefined>(
    undefined
  );
  const [selectedArea, updateSelectedArea] = useState<
    AreaInBrandProps | undefined
  >(undefined);
  const [selectedTheater, updateSelectedTheater] = useState<
    TheaterInBrandProps | undefined
  >(undefined);

  const selectBrand = (brandItem: BrandProps) => {
    if (selectedBrand?.theaterBrandsId === brandItem.theaterBrandsId) {
      updateSelectedBrand(undefined);
      updateAreas([]);
    } else {
      updateSelectedBrand(brandItem);
      updateAreas([...brandItem.areaInBrand]);
    }
    updateTheaters([]);
    updateSelectedArea(undefined);
    updateSelectedTheater(undefined);
  };

  const selectArea = (areaItem: AreaInBrandProps) => {
    if (selectedArea?.areaInBrandId === areaItem.areaInBrandId) {
      updateSelectedArea(undefined);
      updateTheaters([]);
    } else {
      updateSelectedArea(areaItem);
      updateTheaters([
        ...areaItem.theaterInBrand.sort((a, b) => {
          if (a.title > b.title) return 1;
          else if (a.title < b.title) return -1;
          else return 0;
        }),
      ]);
    }
    updateSelectedTheater(undefined);
  };

  const getAllBrand = async () => {
    try {
      const result = await axios.get(api.getAllBrand());
      if (result.status === 200) {
        const brands = result.data.map(
          (item: any): BrandProps => ({ ...item })
        );
        updateBrand([...brands]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createAreaInBarnd = async () => {
    try {
      if (!selectedBrand) return;

      if (addAreaTitle.length === 0) return alert("지역을 입력해주세요.");

      if (areas.find((item) => item.title.trim() === addAreaTitle.trim()))
        return alert("중복 된 지역 이름이 있습니다.");

      const newAreaInBrand = {
        theaterBrands: {
          theaterBrandsId: selectedBrand.theaterBrandsId,
        },
        title: addAreaTitle.trim(),
      };
      const result = await axios.post(api.createAreaInBrand(), newAreaInBrand);
      if (result.status === 201) {
        getAllBrand();
        updateAddAreaTitle("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAreaInBarnd = async (item: AreaInBrandProps) => {
    try {
      if (item.theaterInBrand.length > 0) {
        alert("지역에 영화관이 남아있어 삭제할 수 없습니다.");
        return;
      }
      const result = await axios.delete(
        api.deleteAreaInBrand(item.areaInBrandId)
      );
      if (result.status === 200) {
        updateSelectedArea(undefined);
        getAllBrand();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createTheaterInBarnd = async () => {
    try {
      if (!selectedArea) return;
      if (addTheaterTitle.length === 0) return alert("영화관을 입력해주세요.");

      if (theaters.find((item) => item.title.trim() === addTheaterTitle.trim()))
        return alert("중복 된 영화관 이름이 있습니다.");

      const newTheaterInBrand = {
        areaInBrand: {
          areaInBrandId: selectedArea.areaInBrandId,
        },
        title: addTheaterTitle.trim(),
      };
      const result = await axios.post(
        api.createTheaterInBrand(),
        newTheaterInBrand
      );
      if (result.status === 201) {
        getAllBrand();
        updateAddTheaterTitle("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTheaterInBarnd = async (item: TheaterInBrandProps) => {
    try {
      const result = await axios.delete(
        api.deleteTheaterInBrand(item.theaterInBrandId)
      );
      if (result.status === 200) {
        updateSelectedTheater(undefined);
        getAllBrand();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBrand();
  }, []);

  useEffect(() => {
    if (selectedBrand) {
      const _areas =
        brand.find(
          (item) => item.theaterBrandsId === selectedBrand.theaterBrandsId
        )?.areaInBrand || [];
      updateAreas([..._areas]);

      if (selectedArea) {
        const _theater =
          _areas.find(
            (item) => item.areaInBrandId === selectedArea.areaInBrandId
          )?.theaterInBrand || [];
        updateTheaters([..._theater]);
      }
    }
  }, [brand]);

  return (
    <Conatiner>
      <Section>
        <ListContainer>
          {brand.map((item) => {
            return (
              <ListItem
                className={`${
                  selectedBrand?.theaterBrandsId === item.theaterBrandsId
                    ? "selected"
                    : ""
                }`}
                onClick={() => {
                  selectBrand(item);
                }}
              >
                {item.title}
              </ListItem>
            );
          })}
          {brand.length < 6 && <div className="remainder"></div>}
        </ListContainer>
      </Section>
      <Section>
        <ListContainer>
          {areas.map((item) => {
            return (
              <ListItem
                className={`${
                  selectedArea?.areaInBrandId === item.areaInBrandId
                    ? "selected"
                    : ""
                }`}
                onClick={() => {
                  selectArea(item);
                }}
              >
                {item.title}
                <div
                  className="delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (window.confirm("지역을 삭제 합니다.")) {
                      deleteAreaInBarnd(item);
                    }
                  }}
                >
                  <Delete width={16} height={16} />
                </div>
              </ListItem>
            );
          })}
          {areas.length < 6 && <div className="remainder"></div>}
        </ListContainer>
        <AddItem>
          <input
            className="add__item"
            type={"text"}
            disabled={selectedBrand === undefined}
            value={addAreaTitle}
            onChange={(e) => updateAddAreaTitle(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                createAreaInBarnd();
              }
            }}
          />
          <button
            className="add__btn"
            disabled={selectedBrand === undefined}
            onClick={createAreaInBarnd}
          >
            추가
          </button>
        </AddItem>
      </Section>
      <Section>
        <ListContainer>
          {theaters.map((item) => {
            return (
              <ListItem
                className={`${
                  selectedTheater?.theaterInBrandId === item.theaterInBrandId
                    ? "selected"
                    : ""
                }`}
                onClick={() => {}}
              >
                {item.title}
                <div
                  className="delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (window.confirm("영화관을 삭제 합니다.")) {
                      deleteTheaterInBarnd(item);
                    }
                  }}
                >
                  <Delete width={16} height={16} />
                </div>
              </ListItem>
            );
          })}
          {theaters.length < 6 && <div className="remainder"></div>}
        </ListContainer>
        <AddItem>
          <input
            className="add__item"
            type={"text"}
            disabled={selectedArea === undefined}
            value={addTheaterTitle}
            onChange={(e) => updateAddTheaterTitle(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                createTheaterInBarnd();
              }
            }}
          />
          <button
            className="add__btn"
            disabled={selectedArea === undefined}
            onClick={createTheaterInBarnd}
          >
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
export default BrandBranchManage;
