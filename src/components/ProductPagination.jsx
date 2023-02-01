import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { rowList } from "../contants/product";
import styles from "./ProductPagination.module.scss";
import { setRow, setPage } from "../redux/productSlice";

const ItemPagination = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { column, word, row, totalPageNumber } = useSelector(
    (state) => state.product
  );

  const onChangeRow = (e) => {
    dispatch(setRow(e.target.value));
    if (column && word) {
      navigate(
        `?column=${column}&word=${word}&row=${e.target.value}&page=${1}`
      );
    }
  };

  const onChangePage = (e) => {
    dispatch(setPage(parseInt(e.target.innerText, 10)));
    navigate(
      `?column=${column}&word=${word}&row=${row}&page=${parseInt(
        e.target.innerText,
        10
      )}`
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.filter__title}>페이지 당 행:</div>
      <select className={styles.select} value={row} onChange={onChangeRow}>
        {rowList.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <div className={styles.page__btn__list}>
        {totalPageNumber === 0
          ? null
          : new Array(totalPageNumber)
              .fill(0)
              .map((_, index) => index + 1)
              .map((item) => (
                <div
                  key={item}
                  className={styles.page__btn}
                  onClick={onChangePage}
                >
                  {item}
                </div>
              ))}
      </div>
    </div>
  );
};

export default ItemPagination;
