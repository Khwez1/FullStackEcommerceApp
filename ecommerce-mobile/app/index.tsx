import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";

export default function HomeScreen() {
  return (
    <View>
      <StatusBar style="auto" />
      <Text style={{ fontSize: 30 }}>Home Screen</Text>
    </View>
  );
}
