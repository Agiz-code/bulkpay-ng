import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import { COLORS, FONT, SPACING } from "@/constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

type Employee = {
  id: string;
  fullName: string;
  salary?: string;
  bankName?: string;
};

const SAMPLE_EMPLOYEES: Employee[] = [
  {
    id: "1",
    fullName: "Adaeze Nnaji",
    salary: "345,000",
    bankName: "Zenith Bank",
  },
  {
    id: "2",
    fullName: "Chinedu Okeke",
    salary: "280,000",
    bankName: "Access Bank",
  },
];

const STORAGE_KEY = "employees";

export default function EmployeesScreen() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const params = useLocalSearchParams();

  const loadEmployees = useCallback(async () => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (raw) {
        setEmployees(JSON.parse(raw));
      } else {
        // Initialize with sample employees if none exist
        setEmployees(SAMPLE_EMPLOYEES);
        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(SAMPLE_EMPLOYEES),
        );
      }
    } catch {
      // ignore for now
    }
  }, []);

  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

  // If navigated back with a refresh param, reload
  useEffect(() => {
    if (params?.refresh) {
      loadEmployees();
    }
  }, [params?.refresh, loadEmployees]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Team Members</Text>

      <Button
        title="+ Add New Employee"
        onPress={() => router.push("/employees/new")}
        style={{ marginBottom: SPACING.lg }}
      />

      {employees.length === 0 ? (
        <EmptyState
          icon="people-outline"
          title="No employees yet"
          subtitle="Add your first team member to start payroll"
        />
      ) : (
        <FlatList
          data={employees}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card>
              <Text style={styles.name}>{item.fullName}</Text>
              <Text style={styles.detail}>
                {item.salary
                  ? `₦${item.salary} • ${item.bankName}`
                  : item.bankName}
              </Text>
            </Card>
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.xl,
  },
  listContent: {
    paddingBottom: SPACING.xl,
  },
  title: {
    fontSize: 28,
    fontFamily: FONT.bold,
    color: COLORS.primary,
    marginBottom: SPACING.xl,
  },
  name: { fontSize: 18, fontFamily: FONT.semibold, color: COLORS.primary },
  detail: { fontSize: 15, color: COLORS.mutedForeground, marginTop: 4 },
});
