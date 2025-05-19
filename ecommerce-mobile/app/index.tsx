import { FlatList } from "react-native";
import products from "../assets/products.json";
import { ProductListItem } from "../components/ProductListItem";
import { useBreakpointValue } from "@/components/ui/utils/use-break-point-value";
import { useMemo } from "react";

export default function HomeScreen() {
  // TypeScript now knows this is number | undefined
  const rawColumns = useBreakpointValue({
    default: 2,
    sm: 3,
    xl: 4,
  }) as number | undefined;

  // Ensure it's a number
  const numOfColumns = useMemo(() => rawColumns ?? 2, [rawColumns]);

  const renderItem = useMemo(
    () => ({ item }: { item: (typeof products)[0] }) => (
      <ProductListItem product={item} />
    ),
    []
  );

  return (
    <FlatList
      key={numOfColumns}
      data={products}
      renderItem={renderItem}
      contentContainerClassName="gap-2 max-w-[960px] mx-auto w-full"
      columnWrapperClassName="gap-2"
      numColumns={numOfColumns}
    />
  );
}
