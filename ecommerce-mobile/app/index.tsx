import { ActivityIndicator, FlatList, Text } from "react-native";
import { ProductListItem } from "../components/ProductListItem";
import { useBreakpointValue } from "@/components/ui/utils/use-break-point-value";
import { useMemo } from "react";
import { listProducts } from "@/api/products";
import { useQuery } from "@tanstack/react-query";
import { Product } from "../components/ProductListItem";

export default function HomeScreen() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: listProducts,
  });

  const rawColumns = useBreakpointValue({
    default: 2,
    sm: 3,
    xl: 4,
  }) as number | undefined;

  // Ensure it's a number
  const numOfColumns = useMemo(() => rawColumns ?? 2, [rawColumns]);

  const renderItem = useMemo(() => (
      { item }: { item: Product }
    ) => <ProductListItem product={item} />, []
  );

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Error fetching products</Text>;
  }

  return (
    <FlatList
      key={numOfColumns}
      data={data}
      renderItem={renderItem}
      contentContainerClassName="gap-2 max-w-[960px] mx-auto w-full"
      columnWrapperClassName="gap-2"
      numColumns={numOfColumns}
    />
  );
}
