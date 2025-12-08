import Container from "@/components/Container";
import { Product } from "@/types/products";
import ProductDetail from "@/widgets/ProductDetail";
import axios from "axios";
import { Metadata } from "next";
interface ProductDetailsProps {
  params: Promise<{ productId: string }>;
}

export async function generateMetadata({ params }: ProductDetailsProps): Promise<Metadata> {
  const { productId } = await params;
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}`
  );
  const product: Product = res.data;

  return {
    title: product.name,
    description: product.description,
  }
}

const ProductDetails = async ({ params }: ProductDetailsProps) => {
  const { productId } = await params;
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}`
  );
  const product: Product = res.data;



  return (
    <Container className="mt-10">
      <ProductDetail item={product} />
    </Container>
  );
};

export default ProductDetails;
