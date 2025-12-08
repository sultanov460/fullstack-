import { Product } from "@/types/products";
import Link from "next/link";

interface ProductCardProps {
  item: Product;
}

const ProductCard = ({ item }: ProductCardProps) => {
  return (
    <Link
      href={`/products/${item._id}`}
      className="p-4 rounded-xl shadow-lg border shadow-primary/60 border-gray-700 bg-gray-800 hover:scale-105 transition flex flex-col gap-3 justify-center items-center"
    >
      <img
        src={item.image}
        alt={item.name}
        className="w-full
            "
      />
      <h2 className="text-xl font-semibold mb-2 text-primary">{item.name}</h2>
      <p className="text-gray-300">{item.description}</p>
      <p className="text-primary mt-3 font-bold">Price: {item.price} ₼</p>
    </Link>
  );
};

export default ProductCard;
