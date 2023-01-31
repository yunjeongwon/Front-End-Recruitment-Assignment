import axios from "./index";

const getProducts = async () => {
  const res = await axios.get(`/products?limit=100`);
  return res;
};

export default getProducts;
