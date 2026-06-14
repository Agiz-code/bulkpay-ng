import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
} from "react-native";
import { COLORS, FONT, RADIUS, SPACING } from "../../constants/theme";

type Props = {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline";
  disabled?: boolean;
  loading?: boolean;
  style?: any;
};

export default function Button({
  title,
  onPress,
  variant = "primary",
  disabled,
  loading,
  style,
}: Props) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === "primary" && styles.primary,
        variant === "secondary" && styles.secondary,
        variant === "outline" && styles.outline,
        (disabled || loading) && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.85}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "primary" ? "#fff" : COLORS.primary}
        />
      ) : (
        <Text
          style={[
            styles.text,
            variant === "primary" && styles.primaryText,
            variant === "secondary" && styles.secondaryText,
            variant === "outline" && styles.outlineText,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: SPACING.lg,
    borderRadius: RADIUS.xl,
    alignItems: "center",
    marginVertical: SPACING.sm,
  },
  primary: { backgroundColor: COLORS.accent },
  secondary: { backgroundColor: COLORS.primary },
  outline: {
    borderWidth: 1.5,
    borderColor: COLORS.accent,
    backgroundColor: "transparent",
  },
  disabled: { opacity: 0.6 },
  text: { fontFamily: FONT.semibold, fontSize: 16 },
  primaryText: { color: "#fff" },
  secondaryText: { color: "#fff" },
  outlineText: { color: COLORS.accent },
});
