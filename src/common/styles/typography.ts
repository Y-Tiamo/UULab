import { TextStyle } from "react-native";

type FontSize = "xxs" | "xs" | "sm" | "base" | "lg" | "xl";
export const fontSize: Record<FontSize, TextStyle> = {
  xxs: {
    fontSize: 10
  },
  xs: {
    fontSize: 12
  },
  sm: {
    fontSize: 14
  },
  base: {
    fontSize: 16
  },
  lg: {
    fontSize: 18
  },
  xl: {
    fontSize: 20
  }
};

type FontWeight = "normal" | "medium" | "bold";

export const fontWeight: Record<FontWeight, TextStyle> = {
  // @ts-ignore
  normal: "normal",
  // @ts-ignore
  medium: "500",
  // @ts-ignore
  bold: "700"
};

type Align = "center" | "left" | "right";
export const align: Record<Align, TextStyle> = {
  center: {
    textAlign: "center"
  },
  left: {
    textAlign: "left"
  },
  right: {
    textAlign: "right"
  }
};
