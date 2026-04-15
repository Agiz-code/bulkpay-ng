import { FlatList, StyleSheet, Text, View } from "react-native";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import { COLORS, FONT, SPACING } from "../../constants/theme";

export default function EmployeesScreen() {
  const employees: string | ArrayLike<any> | null | undefined = []; // Replace with real data from API

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Team Members</Text>

      <Button
        title="+ Add New Employee"
        onPress={() => {}}
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
          renderItem={({ item }) => (
            <Card>
              <Text style={styles.name}>{item.fullName}</Text>
              <Text style={styles.detail}>
                ₦{item.salary} • {item.bankName}
              </Text>
            </Card>
          )}
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
  title: {
    fontSize: 28,
    fontFamily: FONT.bold,
    color: COLORS.primary,
    marginBottom: SPACING.xl,
  },
  name: { fontSize: 18, fontFamily: FONT.semibold, color: COLORS.primary },
  detail: { fontSize: 15, color: COLORS.mutedForeground, marginTop: 4 },
});
