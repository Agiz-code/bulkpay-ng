import EmptyState from "@/components/ui/EmptyState";
import { COLORS, FONT, SPACING } from "@/constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";

const STORAGE_KEY = "employees";
const { width: WINDOW_WIDTH } = Dimensions.get("window");

function parseSalary(raw?: string) {
  if (!raw) return 0;
  const digits = raw.toString().replace(/[^0-9]/g, "");
  if (!digits) return 0;
  return Number(digits);
}

export default function ReportsScreen() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      const list = raw ? JSON.parse(raw) : [];
      setEmployees(list);
      return list;
    } catch {
      setEmployees([]);
      return [];
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  }, [load]);

  const salaries = employees.map((e) => parseSalary(e.salary || e.salary));
  const total = salaries.reduce((s, n) => s + n, 0);
  const withSalary = salaries.filter((s) => s > 0);
  const avg = withSalary.length ? Math.round(total / withSalary.length) : 0;
  const max = withSalary.length ? Math.max(...withSalary) : 0;

  const top = [...employees]
    .map((e) => ({ ...e, _salary: parseSalary(e.salary || e.salary) }))
    .sort((a, b) => b._salary - a._salary)
    .slice(0, 5);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reports</Text>

      {employees.length === 0 ? (
        <EmptyState
          icon="bar-chart-outline"
          title="No data yet"
          subtitle="Add team members to see basic reports"
        />
      ) : (
        <>
          <View style={{ marginBottom: SPACING.lg }}>
            <Text style={styles.statLabel}>Team size</Text>
            <Text style={styles.statValue}>{employees.length}</Text>
            <Text style={styles.statLabel}>Total payroll</Text>
            <Text style={styles.statValue}>₦{total.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Average (reported salaries)</Text>
            <Text style={styles.statValue}>₦{avg.toLocaleString()}</Text>
          </View>

          <Text style={[styles.statLabel, { marginBottom: SPACING.sm }]}>
            Top salaries
          </Text>

          {max === 0 ? (
            <Text style={{ color: COLORS.textSecondary }}>
              No salary data available
            </Text>
          ) : (
            <FlatList
              data={top}
              keyExtractor={(i) => i.id}
              refreshing={refreshing}
              onRefresh={onRefresh}
              renderItem={({ item }) => {
                const val = item._salary || 0;
                const pct = max
                  ? Math.max(4, Math.round((val / max) * 100))
                  : 0;
                const barWidth = (WINDOW_WIDTH - SPACING.xl * 2) * (pct / 100);
                return (
                  <View style={styles.row}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.itemName}>
                        {item.fullName || item.name}
                      </Text>
                      <View style={styles.barBg}>
                        <View style={[styles.bar, { width: barWidth }]} />
                      </View>
                    </View>
                    <Text style={styles.itemMeta}>
                      ₦{(val || 0).toLocaleString()}
                    </Text>
                  </View>
                );
              }}
            />
          )}
        </>
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
  statLabel: { fontFamily: FONT.medium, color: COLORS.textSecondary },
  statValue: {
    fontFamily: FONT.bold,
    fontSize: 22,
    color: COLORS.primary,
    marginBottom: SPACING.sm,
  },
  row: {
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    flexDirection: "row",
    alignItems: "center",
  },
  itemName: { fontFamily: FONT.medium, color: COLORS.text, marginBottom: 6 },
  itemMeta: {
    fontFamily: FONT.regular,
    color: COLORS.textSecondary,
    marginLeft: SPACING.md,
  },
  barBg: {
    height: 12,
    backgroundColor: COLORS.card,
    borderRadius: 6,
    overflow: "hidden",
  },
  bar: { height: 12, backgroundColor: COLORS.accent, borderRadius: 6 },
});
