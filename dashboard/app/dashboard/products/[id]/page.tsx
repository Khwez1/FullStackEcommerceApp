import { fetchProduct } from "@/api/products";
import ProductListItem from "../productListItem";

export default async function ProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await fetchProduct(Number(id));

  return (
    <div className="max-w-screen-xl mx-auto w-full">
      <ProductListItem product={product}/>
    </div>
  )
}
