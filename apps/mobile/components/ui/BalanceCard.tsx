import { StyleSheet, Text, View } from "react-native";
import { COLORS, FONT, RADIUS, SPACING } from "../../constants/theme";

export default function BalanceCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>Available Balance</Text>
      <Text style={styles.amount}>₦4,892,450.00</Text>
      <Text style={styles.date}>Updated moments ago</Text>

      <View style={styles.growth}>
        <Text style={styles.growthText}>↑ 12.4% this month</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: SPACING.xl,
    padding: SPACING.xxl,
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.xxl,
    borderBottomLeftRadius: RADIUS.xxl,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 15,
  },
  label: {
    fontFamily: FONT.semibold,
    fontSize: 16,
    color: "rgba(255,255,255,0.85)",
  },
  amount: {
    fontFamily: FONT.extrabold,
    fontSize: 42,
    color: "#fff",
    marginVertical: SPACING.md,
    letterSpacing: -1,
  },
  date: {
    fontFamily: FONT.medium,
    color: "rgba(255,255,255,0.75)",
    fontSize: 15,
  },
  growth: {
    marginTop: SPACING.xl,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.2)",
  },
  growthText: { color: "#fff", fontFamily: FONT.semibold, fontSize: 16 },
});
