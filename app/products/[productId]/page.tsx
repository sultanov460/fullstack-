import Container from "@/app/components/Container";
import { Product } from "@/types/products";
import ProductCard from "@/widgets/ProductCard";
import axios from "axios";
interface ProductDetailsProps {
  params: Promise<{ productId: string }>;
}

const ProductDetails = async ({ params }: ProductDetailsProps) => {
  const { productId } = await params;
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}`
  );
  const product: Product = res.data;

  console.log(product);

  return (
    <Container className="mt-10">
      <ProductCard item={product} />
    </Container>
  );
};

export default ProductDetails;
