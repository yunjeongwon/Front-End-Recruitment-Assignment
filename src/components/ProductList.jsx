import { useSelector } from "react-redux";

import ProductPagination from "./ProductPagination";
import styles from "./ProductList.module.scss";

const ItemList = () => {
  const { viewedProducts } = useSelector((state) => state.product);

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.thead__tr}>
            <td className={styles.thead__td}>상품번호</td>
            <td className={styles.thead__td}>상품명</td>
            <td className={styles.thead__td}>브랜드</td>
            <td className={styles.thead__td}>상품내용</td>
            <td className={styles.thead__td}>가격</td>
            <td className={styles.thead__td}>평점</td>
            <td className={styles.thead__td}>재고</td>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {viewedProducts?.length > 0 &&
            viewedProducts.map((product) => (
              <tr key={product.id} className={styles.tbody__tr}>
                <td className={styles.tbody__td}>{product.id}</td>
                <td className={styles.tbody__td}>{product.title}</td>
                <td className={styles.tbody__td}>{product.brand}</td>
                <td className={styles.tbody__td}>
                  {product.description.length > 40 &&
                    `${product.description.slice(0, 41)}...`}
                </td>
                <td className={styles.tbody__td}>{`$${product.price}`}</td>
                <td className={styles.tbody__td}>{product.rating}</td>
                <td className={styles.tbody__td}>{product.stock}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <ProductPagination />
    </div>
  );
};

export default ItemList;
