import "@/global.css";
// app/_layout.tsx
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClinet = new QueryClient()
 
export default function RootLayout() {
  return (
    <View style={{ flex: 1, marginTop: 16 }}>
      <StatusBar style="auto" />
      <QueryClientProvider client={queryClinet}>
        <GluestackUIProvider>
          <Stack screenOptions={{ headerTitleAlign: 'center' }}>
            <Stack.Screen name="index" options={{ title: 'Shop' }} />
            <Stack.Screen name="product/[id]" options={{ title: 'Product' }} />
          </Stack>
        </GluestackUIProvider>
      </QueryClientProvider>
    </View>
  );
}
