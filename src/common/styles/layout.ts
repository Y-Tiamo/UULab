import { ViewStyle } from "react-native";

type MainAxis = "center" | "flexStart" | "flexEnd" | "stretch";
export const mainAxis: Record<MainAxis, ViewStyle> = {
  center: {
    alignItems: "center"
  },
  flexStart: {
    alignItems: "flex-start"
  },
  flexEnd: {
    alignItems: "flex-end"
  },
  stretch: {
    alignItems: "stretch"
  }
};

type CrossAxis = "center" | "flexEnd" | "evenly" | "spaceBetween" | "around";
export const crossAxis: Record<CrossAxis, ViewStyle> = {
  center: {
    justifyContent: "center"
  },
  evenly: {
    justifyContent: "space-evenly"
  },
  around: {
    justifyContent: "space-around"
  },
  flexEnd: {
    justifyContent: "flex-end"
  },
  spaceBetween: {
    justifyContent: "space-between"
  }
};

export const center: ViewStyle = {
  ...mainAxis.center,
  ...crossAxis.center
};

type Flex = "full" | "row" | "wrap" | "column";
export const flex: Record<Flex, ViewStyle> = {
  full: {
    flex: 1
  },
  row: {
    flexDirection: "row"
  },
  wrap: {
    flexWrap: "wrap"
  },
  column: {
    flexDirection: "column"
  }
};
