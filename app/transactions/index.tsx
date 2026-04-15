import Card from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { COLORS, FONT, SPACING } from "../../constants/theme";

const transactions = [
  {
    id: "1",
    title: "March 2026 Payroll",
    amount: "2,450,000",
    type: "debit",
    date: "Today",
    status: "Completed",
  },
  {
    id: "2",
    title: "Flutterwave Service Fee",
    amount: "12,500",
    type: "debit",
    date: "Mar 30",
    status: "Completed",
  },
];

export default function TransactionsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transaction History</Text>

      {transactions.length === 0 ? (
        <EmptyState
          icon="receipt-outline"
          title="No transactions yet"
          subtitle="Your payroll payments will appear here"
        />
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <View style={styles.row}>
                <View style={styles.left}>
                  <Text style={styles.titleText}>{item.title}</Text>
                  <Text style={styles.date}>{item.date}</Text>
                </View>
                <View style={styles.right}>
                  <Text style={[styles.amount, { color: COLORS.destructive }]}>
                    -₦{item.amount}
                  </Text>
                  <Text style={styles.status}>{item.status}</Text>
                </View>
              </View>
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
  card: { marginBottom: SPACING.md },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  left: { flex: 1 },
  titleText: { fontSize: 16, fontFamily: FONT.semibold, color: COLORS.primary },
  date: { fontSize: 13, color: COLORS.mutedForeground, marginTop: 4 },
  right: { alignItems: "flex-end" },
  amount: { fontSize: 17, fontFamily: FONT.bold },
  status: {
    fontSize: 12,
    fontFamily: FONT.medium,
    color: COLORS.success,
    marginTop: 4,
  },
});
