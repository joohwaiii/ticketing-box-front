import { BrandProps } from "admin/Setting";
import axios from "axios";
import { AddComma } from "commonUtil";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import * as api from "../../api/api";

const PriceManage = () => {
  const [brand, updateBrand] = useState<BrandProps[]>([]);
  const brandRef = useRef<BrandProps[]>([]);

  const BrandPrice = ({ brandItem }: { brandItem: BrandProps }) => {
    const [brandPrice, updateBrandPrice] = useState<string>(
      AddComma(`${brandItem.price}`)
    );

    const onChangeValue = (value: string) => {
      const _brandRef = brandRef.current.find(
        (item) => item.theaterBrandsId === brandItem.theaterBrandsId
      );
      if (_brandRef) {
        _brandRef.price = parseInt(value);
      }
      updateBrandPrice(value);
    };

    return (
      <Brand>
        <span style={{ fontSize: 14, fontWeight: 500 }}>{brandItem.title}</span>
        <div className="price__wrapper">
          <input
            className="price"
            type="text"
            placeholder={"숫자만 입력"}
            value={brandPrice}
            onChange={(e) => onChangeValue(e.target.value)}
            onFocus={(e) => {
              updateBrandPrice(e.target.value.replaceAll(",", ""));
              e.target.type = "number";
            }}
            onBlur={(e) => {
              updateBrandPrice(AddComma(e.target.value));
              e.target.type = "text";
            }}
          />
          <span className="won" style={{ fontSize: 14, fontWeight: 400 }}>
            원
          </span>
        </div>
      </Brand>
    );
  };

  const getAllBrand = async () => {
    try {
      const result = await axios.get(api.getAllBrand());
      if (result.status === 200) {
        const brands = result.data.map(
          (item: any): BrandProps => ({ ...item })
        );
        updateBrand(brands);
        brandRef.current = brands;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveBrandInfo = async () => {
    try {
      const result = await axios.put(api.modifyBrand(), brandRef.current);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBrand();
  }, []);
  return (
    <Conatiner>
      {brand.map((item) => {
        return <BrandPrice brandItem={item} />;
      })}
      <button className="save__btn" onClick={saveBrandInfo}>
        저장
      </button>
    </Conatiner>
  );
};

const Conatiner = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  .save__btn {
    width: 70px;
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

const Brand = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  .price__wrapper {
    width: 160px;
    max-width: 160px;
    display: flex;
    flex-direction: row;
    .price {
      flex-grow: 1;
      max-width: 116px;
      height: 30px;
      padding: 0 7px;
      border: 1px solid #d9d9d9;
      text-align: end;
      :focus {
        outline: none;
        border: 1px solid #1890ff;
      }
    }
    .won {
      width: 30px;
      min-width: 30px;
      height: 30px;
      min-height: 30px;
      border: 1px solid #d9d9d9;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
  }
`;

export default PriceManage;
