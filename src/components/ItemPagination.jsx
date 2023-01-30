import styles from "./ItemPagination.module.scss";

const ItemPagination = () => {
  return (
    <div className={styles.container}>
      <div className={styles.searchTitle}>상품검색</div>
      <div className={styles.searchBar}>검색</div>
    </div>
  );
};

export default ItemPagination;
