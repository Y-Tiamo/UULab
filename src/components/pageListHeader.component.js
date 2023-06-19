import React from "react";
import { Image, StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";
import { Colors, Layout, Sizing, Typography } from "../common/styles";
import DoubleClick from "../common/components/DoubleClick";
import { SOURCE_MANAGER_ADD_DEVICES_GRAY } from "../common/ImageSource";
import NavigationService from "../common/NavigationService";
import I18n from "react-native-i18n";

export const ListFooter = props => {
  const { hasMore, pageCount } = props;
  const tip = hasMore ? "正在加载中~" : "~ 已经到底了~";
  return pageCount <= 0 ? <></> : <Text style={styles.textStyle}>{tip}</Text>;
};

ListFooter.propTypes = {
  hasMore: PropTypes.bool,
  pageCount: PropTypes.number,
};
ListFooter.defaultProps = {
  hasMore: false,
  pageCount: 0,
};

export const DeviceHeader=()=>{
  return (
    <DoubleClick
      style={styles.addBtnStyle}
      onPress={()=>{
        NavigationService.navigate("AddDevicesPage");
      }}
    >
      <Image source={SOURCE_MANAGER_ADD_DEVICES_GRAY} style={{ marginRight: Sizing.t10 }} />
      <Text style={styles.addTextStyle}>{I18n.t('add_device')}</Text>
    </DoubleClick>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: Sizing.t14,
    color: Colors.neutral.gray99,
    paddingVertical: Sizing.t12,
    ...Typography.align.center,
  },
  addBtnStyle: {
    ...Layout.center,
    ...Layout.flex.row,
    backgroundColor: "#DCFBFF",
    marginRight: Sizing.t15,
    height: Sizing.adaptionSpace(61),
    marginHorizontal: Sizing.t20,
    borderRadius: Sizing.adaptionSpace(6),
    borderWidth: 1,
    borderColor: Colors.theme.primary,
    marginTop:Sizing.adaptionSpace(24)
  },
  addTextStyle: {
    fontSize: Sizing.t14,
    color: Colors.neutral.gray66,
    fontWeight: "500",
  },
});
