import { FlatList } from "react-native";
import products from "../assets/products.json";
import { ProductListItem } from "../components/ProductListItem";

export default function HomeScreen() {
  return (
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductListItem product={item} />}
        contentContainerClassName="gap-2"
        columnWrapperClassName="gap-2"
        numColumns={2}
      />
  );
}
