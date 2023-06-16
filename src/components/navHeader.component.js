import React from "react";
import { Colors, Sizing, Typography } from "../common/styles";
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import { IMG_COMMON_ARR_LeftBlack } from "../common/ImageSource";
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
            <Text style={{ color: "white", fontSize: Sizing.t18 }}>{props.title}</Text>
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
