import React from "react";
import { Colors, Layout, Sizing } from "../common/styles";
import DoubleClick from "../common/components/DoubleClick";
import { StyleSheet, Text } from "react-native";

export const PrimaryButtonWithOpacity = (props) => {
  const { title, callback, opacity, style } = props;
  let backgroundColor = opacity === 1 ? "rgba(23, 209, 235, 1)" : "rgba(23, 209, 235, 0.5)";
  return (
    <DoubleClick
      style={{ ...styles.primaryBtnStyle, ...style, backgroundColor }}
      onPress={() => {
        callback && callback();
      }}>
      <Text style={styles.primaryTextStyle}>{title}</Text>
    </DoubleClick>
  );
}
export const PrimaryButtonWithBorder = (props) => {
  const { title, callback, style } = props;
  return (
    <DoubleClick
      style={{ ...styles.primaryBorderBtnStyle, ...style }}
      onPress={() => {
        callback && callback();
      }}>
      <Text style={styles.primaryBorderTextStyle}>{title}</Text>
    </DoubleClick>
  );
}
const styles = StyleSheet.create({
  primaryTextStyle: {
    fontSize: Sizing.t16,
    color: Colors.neutral.white,
  },
  primaryBtnStyle: {
    ...Layout.center,
    height: Sizing.adaptionSpace(44),
    borderRadius: Sizing.adaptionSpace(22),
  },
  primaryBorderBtnStyle: {
    ...Layout.center,
    height: Sizing.adaptionSpace(44),
    borderRadius: Sizing.adaptionSpace(22),
    borderWidth:1,
    borderColor:Colors.theme.primary,
    backgroundColor:Colors.neutral.white
  },
  primaryBorderTextStyle: {
    fontSize: Sizing.t16,
    color: Colors.theme.primary,
  },
});
