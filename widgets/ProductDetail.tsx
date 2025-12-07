import { Product } from "@/types/products";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";

interface ProductDetailProps {
  item: Product;
}

const ProductDetail = ({ item }: ProductDetailProps) => {
  return (
    <div
      key={item._id}
      className="shadow-lg shadow-primary/70 flex flex-col items-center justify-center gap-5 border mx-auto border-primary py-15 px-10 w-fit rounded-xl bg-black/40"
    >
      <img
        src={item.image}
        alt={item.name}
        className="w-fit border border-primary rounded-2xl"
      />
      <h2 className="text-xl font-semibold mb-2 text-primary">{item.name}</h2>
      <p className="text-gray-300">{item.description}</p>
      <p className="text-primary mt-3 font-bold">Price: {item.price} ₼</p>
      <Link href={"/products"}>
        <MdArrowBack size={35} className="text-primary" />
      </Link>
    </div>
  );
};

export default ProductDetail;
