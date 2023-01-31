import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchProducts } from "../redux/productSlice";
import styles from "./ProductSearchBar.module.scss";

const selectList = ["전체", "상품명", "브랜드", "상품내용"];

const ItemSearchBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [columnV, setColumnV] = useState("전체");
  const [wordV, setWordV] = useState("");

  const { column, word } = useSelector((state) => state.product);

  const onChangeColumnV = (e) => {
    setColumnV(e.target.value);
  };

  const onChangeWordV = (e) => {
    setWordV(e.target.value);
  };

  const onSearch = (e) => {
    e.preventDefault();
    dispatch(fetchProducts({ column: columnV, word: wordV, page: 1, row: 10 }));
    navigate(`?column=${columnV}&word=${wordV}&page=${1}&row=${10}`);
  };

  useEffect(() => {
    setColumnV(column);
  }, [column]);

  useEffect(() => {
    setWordV(word);
  }, [word]);

  return (
    <div className={styles.container}>
      <div className={styles.search__title}>상품검색</div>
      <div className={styles.searchBar}>
        <div className={styles.searchBar__name}>검색</div>
        <select
          className={styles.searchBar__select}
          value={columnV}
          onChange={onChangeColumnV}
        >
          {selectList.map((item) => (
            <option
              className={styles.searchBar__option}
              value={item}
              key={item}
            >
              {item}
            </option>
          ))}
        </select>
        <input
          className={styles.searchBar__input}
          value={wordV}
          onChange={onChangeWordV}
        />
        <div className={styles.searchBar__btn} onClick={onSearch}>
          조회
        </div>
      </div>
    </div>
  );
};

export default ItemSearchBar;
