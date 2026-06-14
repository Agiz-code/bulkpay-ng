/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { COLORS } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

type ThemeColorName = keyof typeof COLORS;

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: ThemeColorName,
) {
  const theme = useColorScheme() ?? "light";
  const colorFromProps = props[theme];

  return colorFromProps ?? COLORS[colorName];
}
