import BalanceCard from "@/components/ui/BalanceCard";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { COLORS, FONT, SPACING } from "../constants/theme";
import { useAuth } from "./context/AuthContext";

export default function HomeScreen() {
  const { user, logout } = useAuth();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good morning,</Text>
          <Text style={styles.username}>
            {user?.name?.split(" ")[0] || "Boss"}
          </Text>
        </View>
        <Button
          title="Logout"
          variant="outline"
          onPress={logout}
          style={{ paddingVertical: 10, paddingHorizontal: 20 }}
        />
      </View>

      <BalanceCard />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <Card>
          <Button
            title="New Bulk Payroll"
            onPress={() => router.push("/payroll")}
          />
          <Button
            title="Upload CSV Payroll"
            variant="secondary"
            onPress={() => router.push("/payroll/validate")}
          />
          <Button
            title="Manage Employees"
            variant="outline"
            onPress={() => router.push("/employees")}
          />
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    padding: SPACING.xl,
    paddingTop: SPACING.xxxl,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  greeting: {
    fontSize: 16,
    color: COLORS.mutedForeground,
    fontFamily: FONT.medium,
  },
  username: { fontSize: 28, fontFamily: FONT.bold, color: COLORS.primary },
  section: { paddingHorizontal: SPACING.xl, marginBottom: SPACING.xl },
  sectionTitle: {
    fontSize: 20,
    fontFamily: FONT.semibold,
    color: COLORS.primary,
    marginBottom: SPACING.md,
  },
});
