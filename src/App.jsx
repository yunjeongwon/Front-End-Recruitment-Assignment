import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ProductList from "./components/ProductList";
import ProductSearchBar from "./components/ProductSearchBar";

import styles from "./App.module.scss";
import { fetchProducts } from "./redux/productSlice";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { totalProductsNumber } = useSelector((state) => state.product);

  const getQuery = () => {
    const data = {};
    decodeURI(location.search)
      ?.split("?")?.[1]
      ?.split("&")
      .forEach((item) => {
        const splited = item.split("=");
        data[splited[0]] = splited[1];
      });
    return data;
  };

  useEffect(() => {
    const data = getQuery();
    dispatch(fetchProducts(data));
  }, []);

  return (
    <div className={styles.container}>
      <ProductSearchBar />
      <div className={styles.result__count}>
        검색된 데이터 : {totalProductsNumber}건
      </div>
      <ProductList />
    </div>
  );
}

export default App;
