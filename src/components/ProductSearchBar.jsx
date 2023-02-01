import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { columnList } from "../contants/product";
import { fetchProducts, resetProducts } from "../redux/productSlice";
import styles from "./ProductSearchBar.module.scss";

const ItemSearchBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { column, word, row } = useSelector((state) => state.product);

  const [columnV, setColumnV] = useState("전체");
  const [wordV, setWordV] = useState("");

  const onChangeColumnV = (e) => {
    setColumnV(e.target.value);
  };

  const onChangeWordV = (e) => {
    setWordV(e.target.value);
  };

  const onSearch = () => {
    // e.preventDefault();
    if (wordV.trim() === "") {
      return alert("검색어를 입력해주세요!");
    }
    dispatch(fetchProducts({ column: columnV, word: wordV, page: 1, row }));
    navigate(`?column=${columnV}&word=${wordV}&row=${row}&page=${1}`);
  };

  const onClickSearchTitle = () => {
    dispatch(resetProducts());
    navigate(`/`);
  };

  useEffect(() => {
    setColumnV(column);
    setWordV(word);
  }, [column, word]);

  return (
    <div className={styles.container}>
      <div className={styles.search__title} onClick={onClickSearchTitle}>
        상품검색
      </div>
      <div className={styles.searchBar}>
        <div className={styles.searchBar__name}>검색</div>
        <select
          className={styles.searchBar__select}
          value={columnV}
          onChange={onChangeColumnV}
        >
          {columnList.map((item) => (
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
