import { useEffect, useState } from "react";

import getProducts from "./api/product";
import ProductList from "./components/ProductList";
import ProductSearchBar from "./components/ProductSearchBar";

import styles from "./App.module.scss";

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [rows, setRows] = useState(10);
  const [pageNumber, setPageNumber] = useState(10);
  const [clickedPage, setClickedPage] = useState(1);

  const onHandleRows = (e) => {
    setRows(e.target.value);
    setPageNumber(100 / e.target.value);
    setClickedPage(1);
  };

  const onHandleBtnClick = (e) => {
    setClickedPage(parseInt(e.target.innerText, 10));
  };

  useEffect(() => {
    getProducts(100).then((res) => {
      setProducts(res.data.products);
      setFilteredProducts(res.data.products.slice(0, 10));
    });
  }, []);

  useEffect(() => {
    setFilteredProducts(
      products.slice((clickedPage - 1) * rows, clickedPage * rows)
    );
  }, [rows, clickedPage]);

  return (
    <div className={styles.container}>
      <ProductSearchBar />
      <div className={styles.result__count}>검색된 데이터 : 100건</div>
      {filteredProducts?.length > 0 && (
        <ProductList
          products={filteredProducts}
          rows={rows}
          onHandleRows={onHandleRows}
          pageNumber={pageNumber}
          onHandleBtnClick={onHandleBtnClick}
        />
      )}
    </div>
  );
}

export default App;
