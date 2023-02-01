import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  BsChevronBarLeft,
  BsChevronLeft,
  BsChevronBarRight,
  BsChevronRight
} from "react-icons/bs";

import { rowList } from "../constants/product";
import styles from "./ProductPagination.module.scss";
import { setRow, setPage } from "../redux/productSlice";

const ItemPagination = () => {
  const pageRef = useRef();
  const leftRef = useRef();
  const barLeftRef = useRef();
  const rightRef = useRef();
  const barRightRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { column, word, row, totalPageNumber, page } = useSelector(
    (state) => state.product
  );
  const [pageList, setPageList] = useState([]);

  const onChangeRow = (e) => {
    dispatch(setRow(e.target.value));
    if (column && word) {
      navigate(
        `?column=${column}&word=${word}&row=${e.target.value}&page=${1}`
      );
    }
  };

  const clickPage = (nextPage) => {
    dispatch(setPage(nextPage));
    navigate(`?column=${column}&word=${word}&row=${row}&page=${nextPage}`);
  };

  const onChangePage = (e) => {
    clickPage(parseInt(e.target.innerText, 10));
  };

  const onClickBarLeft = () => {
    clickPage(1);
  };

  const onClickBarRight = () => {
    clickPage(totalPageNumber);
  };

  const onClickLeft = () => {
    if (page - 1 > 0) {
      clickPage(page - 1);
    }
  };

  const onClickRight = () => {
    if (page + 1 <= totalPageNumber) {
      clickPage(page + 1);
    }
  };

  useEffect(() => {
    if (page >= 1 && page <= 4) {
      setPageList([1, 2, 3, 4, 5, 0, 10]);
      return;
    }
    if (page >= 5 && page <= 6) {
      setPageList([1, 0, page - 1, page, page + 1, 0, 10]);
      return;
    }
    setPageList([1, 0, 6, 7, 8, 9, 10]);
  }, [page, totalPageNumber]);

  useEffect(() => {
    if (page === 1) {
      if (leftRef.current && barLeftRef.current) {
        leftRef.current.id = `${styles.disabled}`;
        barLeftRef.current.id = `${styles.disabled}`;
        rightRef.current.id = "";
        barRightRef.current.id = "";
      }
    } else if (page === totalPageNumber) {
      if (rightRef.current && barRightRef.current) {
        leftRef.current.id = "";
        barLeftRef.current.id = "";
        rightRef.current.id = `${styles.disabled}`;
        barRightRef.current.id = `${styles.disabled}`;
      }
    } else {
      leftRef.current.id = "";
      barLeftRef.current.id = "";
      rightRef.current.id = "";
      barRightRef.current.id = "";
    }
  }, [page, totalPageNumber]);

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
      <div className={styles.page__btn}>
        <div
          ref={barLeftRef}
          className={styles.page__btn__arrow}
          onClick={onClickBarLeft}
        >
          <BsChevronBarLeft />
        </div>
        <div
          ref={leftRef}
          className={styles.page__btn__arrow}
          onClick={onClickLeft}
        >
          <BsChevronLeft />
        </div>
        <div ref={pageRef} className={styles.page__btn__list}>
          {pageList.map((item, index) => {
            if (item === 0) {
              return (
                <div
                  key={`eclipse${String(index)}`}
                  className={styles.page__btn__list__eclipse}
                >
                  ...
                </div>
              );
            }
            if (item === page) {
              return (
                <div
                  key={item}
                  id={styles.clicked}
                  className={styles.page__btn__list__item}
                  onClick={onChangePage}
                >
                  {item}
                </div>
              );
            }
            return (
              <div
                key={item}
                className={styles.page__btn__list__item}
                onClick={onChangePage}
              >
                {item}
              </div>
            );
          })}
        </div>
        <div
          ref={rightRef}
          className={styles.page__btn__arrow}
          onClick={onClickRight}
        >
          <BsChevronRight />
        </div>
        <div
          ref={barRightRef}
          className={styles.page__btn__arrow}
          onClick={onClickBarRight}
        >
          <BsChevronBarRight />
        </div>
      </div>
    </div>
  );
};

export default ItemPagination;
