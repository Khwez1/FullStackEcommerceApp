import "@/global.css";
// app/_layout.tsx
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

export default function RootLayout() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <GluestackUIProvider>
        <Stack screenOptions={{ headerTitleAlign: 'center' }}>
          <Stack.Screen name="index" options={{ title: 'Shop' }} />
          <Stack.Screen name="product/[id]" options={{ title: 'Product' }} />
        </Stack>
      </GluestackUIProvider>
    </View>
  );
}
