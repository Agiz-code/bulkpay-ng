import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { COLORS, FONT, SPACING } from "@/constants/theme";
import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function PayrollScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Disburse Payroll</Text>
        <Text style={styles.subtitle}>Send salaries securely to your team</Text>
      </View>

      <Card>
        <Text style={styles.label}>Total Payout Amount</Text>
        <Text style={styles.amount}>₦2,450,000.00</Text>
        <Text style={styles.meta}>45 employees • Due today</Text>
      </Card>

      <View style={styles.actions}>
        <Button
          title="Upload CSV & Validate"
          variant="secondary"
          onPress={() => router.push("/payroll/validate")}
        />
        <Button
          title="Initiate Bulk Payout"
          onPress={() => router.push("/payroll/validate")}
        />
      </View>

      <Card>
        <Text style={styles.infoTitle}>Secured by Flutterwave</Text>
        <Text style={styles.infoText}>
          All transfers are protected. Employees receive funds in 1-2 hours.
        </Text>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { padding: SPACING.xl, paddingTop: SPACING.xxxl },
  title: { fontSize: 28, fontFamily: FONT.bold, color: COLORS.primary },
  subtitle: { fontSize: 16, color: COLORS.mutedForeground, marginTop: 4 },
  label: {
    fontSize: 16,
    fontFamily: FONT.medium,
    color: COLORS.mutedForeground,
  },
  amount: {
    fontSize: 42,
    fontFamily: FONT.extrabold,
    color: COLORS.payroll,
    marginVertical: SPACING.sm,
  },
  meta: { fontSize: 15, color: COLORS.mutedForeground },
  actions: {
    paddingHorizontal: SPACING.xl,
    gap: SPACING.md,
    marginVertical: SPACING.xl,
  },
  infoTitle: {
    fontFamily: FONT.semibold,
    color: COLORS.primary,
    marginBottom: SPACING.sm,
  },
  infoText: { fontSize: 14, lineHeight: 22, color: COLORS.mutedForeground },
});
