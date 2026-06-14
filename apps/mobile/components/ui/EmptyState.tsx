import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { COLORS, FONT, SPACING } from "../../constants/theme";

type Props = {
  icon: string;
  title: string;
  subtitle?: string;
};

export default function EmptyState({ icon, title, subtitle }: Props) {
  return (
    <View style={styles.container}>
      <Ionicons name={icon as any} size={80} color={COLORS.mutedForeground} />
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: SPACING.xxxl,
  },
  title: {
    fontSize: 20,
    fontFamily: FONT.semibold,
    color: COLORS.primary,
    marginTop: 16,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.mutedForeground,
    textAlign: "center",
    marginTop: 8,
  },
});
