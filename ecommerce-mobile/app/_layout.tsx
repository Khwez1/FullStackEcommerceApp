import "@/global.css";
import { Link, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, Text, Pressable } from "react-native";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Icon } from "@/components/ui/icon";
import { ShoppingCart } from "lucide-react-native";
import { useCart } from "@/store/cartStore";

const queryClinet = new QueryClient()
 
export default function RootLayout() {
  const cartItemsNum = useCart((state) => state.items.length);
  return (
    <View style={{ flex: 1, marginTop: 8 }}>
      <StatusBar style="auto" />
      <QueryClientProvider client={queryClinet}>
        <GluestackUIProvider>
          <Stack 
            screenOptions={{ 
              headerTitleAlign: 'center', 
              headerRight: () => (
                <Link href={'/cart'} asChild>
                  <Pressable className="flex-row gap-2">
                    <Icon as={ShoppingCart} />
                    <Text>{cartItemsNum}</Text>
                  </Pressable>
                </Link>
              )
            }}
          >
            <Stack.Screen name="index" options={{ title: 'Shop' }} />
            <Stack.Screen name="product/[id]" options={{ title: 'Product' }} />
          </Stack>
        </GluestackUIProvider>
      </QueryClientProvider>
    </View>
  );
}
