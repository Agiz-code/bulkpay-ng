import Button from "@/components/ui/Button";
import { router } from "expo-router";
import { useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { COLORS, FONT, RADIUS, SPACING } from "../../constants/theme";
import api from "../api/client";

export default function RegisterScreen() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    setLoading(true);
    try {
      await api.post("/auth/register", form);
      Alert.alert("Success", "Account created successfully");
      router.replace("/auth/login");
    } catch (e) {}
    setLoading(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.brand}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>BP</Text>
          </View>
          <Text style={styles.brandName}>bulkpay-ng</Text>
        </View>

        <Text style={styles.heading}>Create Your Account</Text>

        <TextInput
          style={styles.input}
          placeholder="Business / Full Name"
          value={form.name}
          onChangeText={(v) => setForm({ ...form, name: v })}
        />
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          value={form.email}
          onChangeText={(v) => setForm({ ...form, email: v })}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={form.password}
          onChangeText={(v) => setForm({ ...form, password: v })}
          secureTextEntry
        />

        <Button
          title={loading ? "Creating Account..." : "Create Account"}
          onPress={handleRegister}
          disabled={loading}
        />
      </View>
    </ScrollView>
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
