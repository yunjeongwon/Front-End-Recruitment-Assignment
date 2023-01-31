import { useEffect, useState } from "react";

import getProducts from "./api/product";
import ProductList from "./components/ProductList";
import ProductSearchBar from "./components/ProductSearchBar";

import styles from "./App.module.scss";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts(10).then((res) => {
      setProducts(res.data);
    });
  }, []);

  return (
    <div className={styles.container}>
      <ProductSearchBar />
      <div className={styles.result__count}>검색된 데이터 : 100건</div>
      <ProductList products={products.products} />
    </div>
  );
}

export default App;
