import Button from "@/components/ui/Button";
import { COLORS, FONT, RADIUS, SPACING } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";
import { useState } from "react";
import {
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      return Alert.alert("Error", "Please fill in your email and password.");
    }

    setLoading(true);
    try {
      await login(email.trim(), password);
      router.replace("../(tabs)");
    } catch {
      Alert.alert(
        "Login failed",
        "Please check your credentials and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.brand}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>BP</Text>
            </View>
            <Text style={styles.brandName}>bulkpay-ng</Text>
          </View>

          <Text style={styles.heading}>Welcome Back</Text>
          <Text style={styles.subheading}>Sign in to manage your payroll.</Text>

          <TextInput
            style={styles.input}
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            placeholderTextColor="#8f95a1"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#8f95a1"
          />

          <Button
            title={loading ? "Signing in..." : "Sign In"}
            onPress={handleLogin}
            disabled={loading}
          />

          <Text
            style={styles.link}
            onPress={() => router.push("/auth/register")}
          >
            Don&apos;t have an account?{" "}
            <Text style={styles.linkAccent}>Create one</Text>
          </Text>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.xxxl, paddingTop: SPACING.xxxl + 40 },
  brand: { alignItems: "center", marginBottom: SPACING.xxxl },
  logo: {
    width: 90,
    height: 90,
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.xxl,
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: { fontSize: 42, fontFamily: FONT.extrabold, color: "#fff" },
  brandName: {
    fontSize: 32,
    fontFamily: FONT.extrabold,
    color: COLORS.primary,
    marginTop: 12,
  },
  heading: {
    fontSize: 28,
    fontFamily: FONT.bold,
    color: COLORS.primary,
    textAlign: "center",
  },
  subheading: {
    fontSize: 16,
    color: COLORS.mutedForeground,
    textAlign: "center",
    marginTop: 8,
    marginBottom: SPACING.xxl,
  },
  input: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    fontSize: 16,
    marginBottom: SPACING.lg,
    fontFamily: FONT.medium,
  },
  link: {
    textAlign: "center",
    marginTop: SPACING.xl,
    fontSize: 15,
    color: COLORS.mutedForeground,
  },
  linkAccent: { color: COLORS.accent, fontFamily: FONT.semibold },
});
