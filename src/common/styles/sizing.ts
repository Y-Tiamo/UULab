import { Dimensions, Platform, StatusBar } from "react-native";
// @ts-ignore
import { isIphoneX } from "react-native-iphone-x-helper";

const { height: screenHeight, width: screenWidth } = Dimensions.get("screen");

// iPhoneX
const X_WIDTH = 375;
// const X_HEIGHT = 812;

type Screen = "width" | "height";
export const screen: Record<Screen, number> = {
  width: screenWidth,
  height: screenHeight
};

//状态栏高度
export const statusBar: { height: any } = {
  height: Platform.OS === "android" ? StatusBar.currentHeight : isIphoneX() ? 44 : 20
};
//导航栏高度
export const navHeight: { height: any } = {
  height: Platform.OS === "android" ? StatusBar.currentHeight + 44 : isIphoneX() ? 88 : 64
};

export const adaptionSpace = (number: number) => {
  return Math.floor(number * (screen.width / X_WIDTH));
};

type Layout = "t1" | "t2" | "t3" | "t4" | "t5" | "t6" | "t7" | "t8" | "t9" | "t10";
export const layout: Record<Layout, number> = {
  t1: 1,
  t2: 2,
  t3: 3,
  t4: 4,
  t5: 5,
  t6: 6,
  t7: 7,
  t8: 8,
  t9: 9,
  t10: 10
};

/** 4px */
export const t4 = adaptionSpace(layout.t4);
/** 5px */
export const t5 = adaptionSpace(layout.t5);
/** 8px */
export const t8 = adaptionSpace(layout.t8);
/** 10px */
export const t10 = adaptionSpace(layout.t10);
/** 12px */
export const t12 = adaptionSpace(layout.t6 * layout.t2);
/** 14px */
export const t14 = adaptionSpace(layout.t7 * layout.t2);
/** 15px */
export const t15 = adaptionSpace(layout.t10 + layout.t5);
/** 16px */
export const t16 = adaptionSpace(layout.t8 * layout.t2);
/** 18px */
export const t18 = adaptionSpace(layout.t9 * layout.t2);
/** 20px */
export const t20 = adaptionSpace(layout.t10 * layout.t2);
/** 28px */
export const t28 = adaptionSpace(layout.t4 * layout.t7);
