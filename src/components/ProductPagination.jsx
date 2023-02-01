import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  BsChevronBarLeft,
  BsChevronLeft,
  BsChevronBarRight,
  BsChevronRight
} from "react-icons/bs";

import { rowList } from "../contants/product";
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

  const onChangeRow = (e) => {
    dispatch(setRow(e.target.value));
    if (column && word) {
      navigate(
        `?column=${column}&word=${word}&row=${e.target.value}&page=${1}`
      );
    }
    if (pageRef.current) {
      pageRef.current.children[page - 1].id = "";
      pageRef.current.children[0].id = `${styles.clicked}`;
    }
  };

  const clickPage = (nowPage, nextPage) => {
    dispatch(setPage(nextPage));
    navigate(`?column=${column}&word=${word}&row=${row}&page=${nextPage}`);
    if (pageRef.current.children?.[nowPage - 1]) {
      pageRef.current.children[nowPage - 1].id = "";
    }
    if (pageRef.current.children?.[nextPage - 1]) {
      pageRef.current.children[nextPage - 1].id = `${styles.clicked}`;
    }
  };

  const onChangePage = (e) => {
    clickPage(page, parseInt(e.target.innerText, 10));
  };

  const onClickBarLeft = () => {
    clickPage(page, 1);
  };

  const onClickBarRight = () => {
    clickPage(page, totalPageNumber);
  };

  const onClickLeft = () => {
    if (page - 1 > 0) {
      clickPage(page, page - 1);
    }
  };

  const onClickRight = () => {
    if (page + 1 <= totalPageNumber) {
      clickPage(page, page + 1);
    }
  };

  useEffect(() => {
    if (pageRef.current?.children?.[page - 1]) {
      pageRef.current.children[page - 1].id = `${styles.clicked}`;
    }
    return () => {
      if (pageRef.current?.children?.[page - 1]) {
        pageRef.current.children[page - 1].id = "";
      }
    };
  }, [page]);

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
          {totalPageNumber === 0
            ? null
            : new Array(totalPageNumber)
                .fill(0)
                .map((_, index) => index + 1)
                .map((item) => (
                  <div
                    key={item}
                    className={`${styles.page__btn__list__item} ${styles.nonClicked}`}
                    onClick={onChangePage}
                  >
                    {item}
                  </div>
                ))}
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
