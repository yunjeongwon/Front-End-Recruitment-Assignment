import styles from "./ProductPagination.module.scss";

const selectList = [10, 20, 50];

const ItemPagination = ({
  rows,
  onHandleRows,
  pageNumber,
  onHandleBtnClick
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.filter__title}>페이지 당 행:</div>
      <select className={styles.select} value={rows} onChange={onHandleRows}>
        {selectList.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <div className={styles.page__btn__list}>
        {new Array(pageNumber)
          .fill(0)
          .map((_, index) => index + 1)
          .map((item) => (
            <div
              key={item}
              className={styles.page__btn}
              onClick={onHandleBtnClick}
              aria-hidden="true"
            >
              {item}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ItemPagination;
