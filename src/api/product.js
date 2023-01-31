import axios from "./index";

const getProducts = async (limit) => {
  const res = await axios.get(`/products?limit=${limit}`);
  return res;
};

export default getProducts;
