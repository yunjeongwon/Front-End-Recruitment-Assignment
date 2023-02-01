import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { columnList } from "../contants/product";
import {
  fetchProducts,
  resetProducts,
  setColumn,
  setWord
} from "../redux/productSlice";
import styles from "./ProductSearchBar.module.scss";

const ItemSearchBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { column, word, row } = useSelector((state) => state.product);

  const onChangeColumn = (e) => {
    dispatch(setColumn(e.target.value));
  };

  const onChangeWord = (e) => {
    dispatch(setWord(e.target.value));
  };

  const onSearch = (e) => {
    e.preventDefault();
    if (word.trim() === "") {
      return alert("검색어를 입력해주세요!");
    }
    dispatch(fetchProducts({ column, word, page: 1, row }));
    navigate(`?column=${column}&word=${word}&row=${row}&page=${1}`);
  };

  const onClickSearchTitle = () => {
    dispatch(resetProducts());
    navigate(`/`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.search__title} onClick={onClickSearchTitle}>
        상품검색
      </div>
      <div className={styles.searchBar}>
        <div className={styles.searchBar__name}>검색</div>
        <select
          className={styles.searchBar__select}
          value={column}
          onChange={onChangeColumn}
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
          value={word}
          onChange={onChangeWord}
        />
        <div className={styles.searchBar__btn} onClick={onSearch}>
          조회
        </div>
      </div>
    </div>
  );
};

export default ItemSearchBar;
