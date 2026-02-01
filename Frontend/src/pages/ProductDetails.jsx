import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "../utils/Axios";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await Axios.get(`/product/${id}`);
      setProduct(res.data.data);
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="p-5">
      <img src={product.image} className="w-64" />
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="text-lg">₹{product.price}</p>
      <p>{product.description}</p>
    </div>
  );
};

export default ProductDetails;
