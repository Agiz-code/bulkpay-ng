import Button from "@/components/ui/Button";
import { COLORS, FONT, SPACING } from "@/constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
// using timestamp ids to avoid extra dependency
import { router } from "expo-router";

const STORAGE_KEY = "employees";

export default function NewEmployeeScreen() {
  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");
  const [bank, setBank] = useState("");

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert("Validation", "Name is required");
      return;
    }

    const newEmp = {
      id: Date.now().toString(),
      fullName: name.trim(),
      salary: salary.trim(),
      bankName: bank.trim(),
    };

    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      const list = raw ? JSON.parse(raw) : [];
      list.unshift(newEmp);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      // navigate back to employees and ask it to refresh
      router.push({ pathname: "/(tabs)/employees", params: { refresh: "1" } });
    } catch {
      Alert.alert("Error", "Unable to save employee");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Team Member</Text>

      <TextInput
        style={styles.input}
        placeholder="Full name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Salary (optional)"
        value={salary}
        onChangeText={setSalary}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Bank name (optional)"
        value={bank}
        onChangeText={setBank}
      />

      <Button title="Save" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.xl,
  },
  title: {
    fontSize: 22,
    fontFamily: FONT.bold,
    color: COLORS.primary,
    marginBottom: SPACING.lg,
  },
  input: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
});
