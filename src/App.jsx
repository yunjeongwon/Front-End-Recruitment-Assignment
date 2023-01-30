import ItemList from "./components/ItemList";
import ItemSearchBar from "./components/ItemSearchBar";

import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.container}>
      <ItemSearchBar />
      <div className={styles.result__count}>검색된 데이터 : 100건</div>
      <ItemList />
    </div>
  );
}

export default App;
