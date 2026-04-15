import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { COLORS } from "../constants/theme";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: COLORS.background },
        }}
      >
        <Stack.Screen name="auth/login" options={{ presentation: "modal" }} />
        <Stack.Screen
          name="auth/register"
          options={{ presentation: "modal" }}
        />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </SafeAreaProvider>
  );
}
