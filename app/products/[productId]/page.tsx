import Container from "@/app/components/Container";
import { Product } from "@/types/products";
import ProductDetail from "@/widgets/ProductDetail";
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
      <ProductDetail item={product} />
    </Container>
  );
};

export default ProductDetails;
