import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Colors, Layout, Sizing, Typography } from "../common/styles";
import { SOURCE_EMPTY_DEVICES_LIST } from "../common/ImageSource";

export const EmptyDeviceList = props => {
  return (
    <View style={[styles.content, props.style]}>
      <Image style={styles.imgStyle} source={SOURCE_EMPTY_DEVICES_LIST} />
      <Text style={styles.textStyle}>赶紧添加设备吧～</Text>
    </View>
  );
};

export const EmptyVersionList = props => {
  return (
      <View style={[styles.content, props.style]}>
        <Image style={styles.imgStyle} source={SOURCE_EMPTY_DEVICES_LIST} />
        <Text style={styles.textStyle}>暂无版本记录～</Text>
      </View>
  );
};

export const NormalEmptyList = props => {
  const { icon, desc } = props;
  return (
    <View style={[styles.content, props.style]}>
      <Image style={styles.imgStyle} source={icon} />
      <Text style={styles.textStyle}>{desc}</Text>
    </View>
  );
};

export const PageEmpty = {
  EmptyDeviceList,
  NormalEmptyList,
};
export default PageEmpty;

const styles = StyleSheet.create({
  content: {
    ...Layout.center,
    paddingTop: Sizing.adaptionSpace(120),
  },
  imgStyle: {
    width: Sizing.adaptionSpace(200),
    height: Sizing.adaptionSpace(200),
  },
  textStyle: {
    marginTop: Sizing.adaptionSpace(39),
    fontSize: Sizing.t14,
    color: Colors.neutral.gray99,
    paddingVertical: Sizing.t12,
    ...Typography.align.center,
  },
});
