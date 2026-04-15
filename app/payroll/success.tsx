import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeIn, ZoomIn } from "react-native-reanimated";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { COLORS, FONT, SPACING } from "../../constants/theme";

export default function PayrollSuccessScreen() {
  const { reference, amount, employeeCount } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Animated.View
        entering={ZoomIn.duration(800).springify()}
        style={styles.iconContainer}
      >
        <Ionicons name="checkmark-circle" size={120} color={COLORS.success} />
      </Animated.View>

      <Animated.Text entering={FadeIn.delay(300)} style={styles.title}>
        Payroll Sent Successfully
      </Animated.Text>

      <Card style={styles.detailsCard}>
        <Text style={styles.label}>Reference</Text>
        <Text style={styles.reference}>{reference || "BP-" + Date.now()}</Text>

        <Text style={styles.label}>Amount Disbursed</Text>
        <Text style={styles.amount}>
          ₦{Number(amount || 2450000).toLocaleString()}
        </Text>

        <Text style={styles.label}>Employees Paid</Text>
        <Text style={styles.meta}>{employeeCount || 45} team members</Text>
      </Card>

      <Text style={styles.message}>
        Your employees will receive their salaries within 1–2 hours.
      </Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Back to Dashboard"
          onPress={() => router.replace("../(tabs)")}
        />
        <Button
          title="View Transaction History"
          variant="secondary"
          onPress={() => router.replace("../transactions/index")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
    padding: SPACING.xl,
  },
  iconContainer: {
    marginBottom: SPACING.xxxl,
  },
  title: {
    fontSize: 26,
    fontFamily: FONT.bold,
    color: COLORS.primary,
    textAlign: "center",
    marginBottom: SPACING.xl,
  },
  detailsCard: {
    width: "100%",
    marginBottom: SPACING.xl,
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    fontFamily: FONT.medium,
    color: COLORS.mutedForeground,
    marginTop: SPACING.lg,
  },
  reference: {
    fontSize: 16,
    fontFamily: FONT.semibold,
    color: COLORS.primary,
    marginBottom: SPACING.md,
  },
  amount: {
    fontSize: 32,
    fontFamily: FONT.extrabold,
    color: COLORS.payroll,
    marginBottom: SPACING.md,
  },
  meta: {
    fontSize: 16,
    fontFamily: FONT.medium,
    color: COLORS.primary,
  },
  message: {
    fontSize: 15,
    color: COLORS.mutedForeground,
    textAlign: "center",
    marginBottom: SPACING.xxl,
    lineHeight: 22,
  },
  buttonContainer: {
    width: "100%",
    gap: SPACING.md,
  },
});
