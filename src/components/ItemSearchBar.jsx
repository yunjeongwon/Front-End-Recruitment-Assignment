import { useState } from "react";
import styles from "./ItemSearchBar.module.scss";

const selectList = ["전체", "상품명", "브랜드", "상품내용"];

const ItemSearchBar = () => {
  const [selected, setSelected] = useState("전체");
  const [inputValue, setInputValue] = useState("");

  const onHandleSelect = (e) => {
    e.preventDefault();
    setSelected(e.target.value);
  };

  const onHandleInput = (e) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.search__title}>상품검색</div>
      <div className={styles.searchBar}>
        <div className={styles.searchBar__name}>검색</div>
        <select
          className={styles.searchBar__select}
          value={selected}
          onChange={onHandleSelect}
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
          value={inputValue}
          onChange={onHandleInput}
        />
        <div className={styles.searchBar__btn}>조회</div>
      </div>
    </div>
  );
};

export default ItemSearchBar;
