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

export default function RegisterScreen() {
  const { register } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.password) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    setLoading(true);
    try {
      await register(form.name.trim(), form.email.trim(), form.password);
      Alert.alert("Success", "Account created successfully.");
      router.replace("/(tabs)");
    } catch (error: any) {
      // Extract error message from different sources
      let errorMessage = "Registration failed. Please try again.";

      if (error?.message) {
        errorMessage = error.message;
      } else if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error?.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error?.response?.statusText) {
        errorMessage = `Server error: ${error.response.statusText}`;
      }

      console.error("Registration error:", error);
      Alert.alert("Registration Failed", errorMessage);
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
            <Text style={styles.brandName}>BulkPay</Text>
          </View>

          <Text style={styles.heading}>Create Your Account</Text>

          <TextInput
            style={styles.input}
            placeholder="Business / Full Name"
            value={form.name}
            onChangeText={(v) => setForm({ ...form, name: v })}
            placeholderTextColor="#8f95a1"
          />
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            value={form.email}
            onChangeText={(v) => setForm({ ...form, email: v })}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            placeholderTextColor="#8f95a1"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={form.password}
            onChangeText={(v) => setForm({ ...form, password: v })}
            secureTextEntry
            placeholderTextColor="#8f95a1"
          />

          <Button
            title={loading ? "Creating Account..." : "Create Account"}
            onPress={handleRegister}
            disabled={loading}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.xxxl, paddingTop: SPACING.xxxl + 20 },
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
});

//http://127.0.0.1:33418    
// Starting a Docker PostgreSQL container and updating the backend connection string.
//https://vscode.dev/redirect