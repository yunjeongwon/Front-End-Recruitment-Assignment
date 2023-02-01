import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import getProducts from "../api/product";

const initialState = {
  success: false,
  loading: false,
  error: null,
  products: [],
  totalProductsNumber: 0,
  viewedProducts: [],
  viewedProductsNumber: 0,
  column: "전체",
  word: "",
  page: 0,
  row: 10,
  totalPageNumber: 0
};

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async ({ column, word, row, page }) => {
    const res = await getProducts();
    if (!column && !word && !page && !row) {
      return { ...res.data, column: "전체", word: "", page: 1, row: 10 };
    }
    return { ...res.data, column, word, page, row };
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    fetchViewedProducts: (state, { payload }) => {
      state.viewedProducts = state.products.slice(
        (payload.page - 1) * payload.row,
        payload.page * payload.row
      );
    },
    setColumn: (state, { payload }) => {
      state.column = payload;
    },
    setRow: (state, { payload }) => {
      state.row = payload;
      if (state.totalProductsNumber !== 0) {
        state.totalPageNumber = 100 / payload;
        state.page = 1;
        state.viewedProducts = state.products.slice(0, payload);
      }
    },
    setWord: (state, { payload }) => {
      state.word = payload;
    },
    setPage: (state, { payload }) => {
      state.page = payload;
      state.viewedProducts = state.products.slice(
        (payload - 1) * state.row,
        payload * state.row
      );
    },
    resetProducts: (state) => {
      state.products = [];
      state.totalProductsNumber = 0;
      state.viewedProducts = [];
      state.viewedProductsNumber = 0;
      state.column = "전체";
      state.word = "";
      state.page = 0;
      state.row = 10;
      state.totalPageNumber = 0;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.products = payload.products;
      state.page = payload.page;
      state.word = payload.word;
      state.column = payload.column;
      state.row = payload.row;
      state.totalProductsNumber = payload.products.length;
      const share = Math.ceil(payload.products.length / payload.row);
      const remainder = payload.products.length % payload.row;
      state.totalPageNumber = share;
      if (state.totalPageNumber === state.page) {
        state.viewedProducts = payload.products.slice(
          (payload.page - 1) * payload.row,
          (payload.page - 1) * payload.row + remainder
        );
      } else {
        state.viewedProducts = payload.products.slice(
          (payload.page - 1) * payload.row,
          payload.page * payload.row
        );
      }
    });
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(fetchProducts.rejected, (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    });
  }
});

export const {
  fetchViewedProducts,
  setColumn,
  setRow,
  setWord,
  setPage,
  resetProducts
} = productSlice.actions;

export default productSlice.reducer;
