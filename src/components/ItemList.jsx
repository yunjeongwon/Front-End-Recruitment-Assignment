import ItemPagination from "./ItemPagination";
import styles from "./ItemList.module.scss";

const ItemList = () => {
  return (
    <div className={styles.container}>
      <div className={styles.searchTitle}>상품검색</div>
      <div className={styles.searchBar}>검색</div>
      <ItemPagination />
    </div>
  );
};

export default ItemList;
