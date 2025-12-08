import Link from "next/link";
import axios from "axios";
import Container from "../../components/Container";
import { Product } from "@/types/products";
import ProductCard from "@/widgets/ProductCard";

export default async function ProductsPage() {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products`
  );
  const products: Product[] = res.data;
  console.log(products);

  return (
    <div
      className="min-h-screen p-6"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <h1
        className="text-3xl font-bold text-center mb-8"
        style={{ color: "var(--color-primary)" }}
      >
        Products
      </h1>

      <Container className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((item) => (
          <ProductCard key={item._id} item={item} />
        ))}
      </Container>
    </div>
  );
}
