import React from "react";
import { Colors, Layout, Sizing, Typography } from "../common/styles";
import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import {
  IMG_COMMON_ARR_LeftBlack,
  SOURCE_ARROW_DOWN_WHITE,
  SOURCE_MANAGER_ADD_DEVICES_WHITE, SOURCE_SCAN_WHITE,
} from "../common/ImageSource";
import NavigationService from "../common/NavigationService";
import Header from "../common/components/Header";
import PropTypes from "prop-types";

let leftBlack = IMG_COMMON_ARR_LeftBlack;

export const NavHeader = props => {
  return (
    <>
      <StatusBar barStyle={"dark-content"} translucent={false} backgroundColor={Colors.neutral.white} />
      <Header
        onPressLeft={() => {
          NavigationService.navigate("");
        }}
        leftIconStyle={styles.leftIconStyle}
        leftIcon={leftBlack}
        titleStyle={styles.titleStyle}
        style={{ borderBottomWidth: 1, borderBottomColor: "#eeeeee" }}
        {...props}
      />
    </>
  );
};

export const HomeHeader = props => {
  const {title,isManager}=props
  return (
    <>
      <StatusBar barStyle={"light-content"} translucent={false} backgroundColor={Colors.theme.primary} />
      <View style={{
        backgroundColor: Colors.theme.primary,
        borderBottomLeftRadius:Sizing.adaptionSpace(24),
        borderBottomRightRadius:Sizing.adaptionSpace(24),
      }}>
        <SafeAreaView>
          <View style={{
            ...Layout.flex.row,
            ...Layout.crossAxis.spaceBetween,
            ...Layout.mainAxis.center,
            height: Sizing.adaptionSpace(60),
            paddingHorizontal: Sizing.t20,
          }}>
            <View style={[Layout.flex.row,Layout.mainAxis.center]}>
              <Text style={{ color: "white", fontSize: Sizing.t16 }}>{title}</Text>
              <Image source={SOURCE_ARROW_DOWN_WHITE} style={{marginLeft:Sizing.t4}}/>
            </View>
            <View style={Layout.center}>
              <Image source={isManager?SOURCE_MANAGER_ADD_DEVICES_WHITE:SOURCE_SCAN_WHITE} style={{marginBottom:Sizing.t4}}/>
              {!isManager&&<Text style={{ color: "white", fontSize: Sizing.t10 }}>扫一扫</Text>}
            </View>
          </View>
        </SafeAreaView>
      </View>
    </>
  );
};
HomeHeader.prototype = {
  title: PropTypes.string,
};
export const NumHeader = props => {
  const { title, num } = props;
  const headTitle = title + `（${num}）`;
  return (
    <>
      <StatusBar barStyle={"light-content"} translucent={false} backgroundColor={Colors.theme.primary} />
      <View style={{
        backgroundColor: Colors.theme.primary,
        borderBottomLeftRadius:Sizing.adaptionSpace(20),
        borderBottomRightRadius:Sizing.adaptionSpace(20),
      }}>
        <SafeAreaView>
          <View style={{
            height: Sizing.adaptionSpace(68),
            paddingHorizontal: Sizing.t12,
            flexDirection: "column",
            justifyContent: "center",
          }}>
            <Text style={{ color: "white", fontSize: Sizing.t18 }}>{headTitle}</Text>
          </View>
        </SafeAreaView>
      </View>
    </>
  );
};
HomeHeader.prototype = {
  title: PropTypes.string,
  num: PropTypes.string,
};

const styles = StyleSheet.create({
  titleStyle: {
    fontWeight: Typography.fontWeight.medium,
    fontSize: Sizing.t18,
    color: Colors.neutral.gray33,
  },
  leftIconStyle: {
    width: Sizing.adaptionSpace(22),
    height: Sizing.adaptionSpace(22),
  },
  homeHeaderContainer: {
    height: Sizing.adaptionSpace(60),
    width: Sizing.screen.width,
    backgroundColor: Colors.theme.primary,
  },
});
