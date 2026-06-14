import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { COLORS, FONT } from "../../constants/theme";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: COLORS.card,
          height: 75,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: COLORS.accent,
        tabBarInactiveTintColor: COLORS.mutedForeground,
        tabBarLabelStyle: { fontFamily: FONT.semibold, fontSize: 12 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="payroll"
        options={{
          title: "Payroll",
          tabBarIcon: ({ color }) => (
            <Ionicons name="cash" size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="employees"
        options={{
          title: "Team",
          tabBarIcon: ({ color }) => (
            <Ionicons name="people" size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: "History",
          tabBarIcon: ({ color }) => (
            <Ionicons name="receipt" size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="reports"
        options={{
          title: "Reports",
          tabBarIcon: ({ color }) => (
            <Ionicons name="bar-chart" size={26} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
