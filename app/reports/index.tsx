import Card from "@/components/ui/Card";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { COLORS, FONT, SPACING } from "../../constants/theme";

export default function ReportsScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Business Overview</Text>

      <Card>
        <Text style={styles.label}>Total Disbursed in 2026</Text>
        <Text style={styles.bigAmount}>₦28,450,000</Text>
      </Card>

      <View style={styles.row}>
        <Card style={styles.half}>
          <Text style={styles.label}>Active Employees</Text>
          <Text style={styles.bigNumber}>47</Text>
        </Card>
        <Card style={styles.half}>
          <Text style={styles.label}>Avg Salary</Text>
          <Text style={styles.bigNumber}>₦58,200</Text>
        </Card>
      </View>

      <Card>
        <Text style={styles.label}>Cashflow Trend</Text>
        <Text style={styles.trend}>↑ 22.4% this quarter</Text>
        <Text style={styles.subtext}>
          Smart prediction: Next payout needs ₦3.2M funding
        </Text>
      </Card>
    </ScrollView>
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
  label: {
    fontSize: 15,
    fontFamily: FONT.medium,
    color: COLORS.mutedForeground,
  },
  bigAmount: {
    fontSize: 38,
    fontFamily: FONT.extrabold,
    color: COLORS.payroll,
    marginTop: 8,
  },
  bigNumber: {
    fontSize: 32,
    fontFamily: FONT.bold,
    color: COLORS.primary,
    marginTop: 8,
  },
  row: { flexDirection: "row", gap: SPACING.md, marginVertical: SPACING.lg },
  half: { flex: 1 },
  trend: {
    fontSize: 18,
    fontFamily: FONT.semibold,
    color: COLORS.success,
    marginTop: 8,
  },
  subtext: {
    fontSize: 14,
    color: COLORS.mutedForeground,
    marginTop: 8,
    lineHeight: 20,
  },
});
