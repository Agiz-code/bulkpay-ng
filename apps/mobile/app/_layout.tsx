import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { COLORS } from "../constants/theme";
import { AuthProvider } from "../context/AuthContext";
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
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
      </AuthProvider>
    </SafeAreaProvider>
  );
}
