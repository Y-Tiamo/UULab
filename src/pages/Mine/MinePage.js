/**
 * Desc：
 * Author：YYQ
 * Date: 2023/6/13
 *
 * * * * * * * * * * * * * * * * * * *
 * Content Desc:
 *
 * * * * * * * * * * * * * * * * * * *
 */

import React from "react";
import { ScrollView, SafeAreaView, StatusBar, StyleSheet, View, Text } from "react-native";
import { Colors, Sizing } from "../../common/styles";
import { connect } from "react-redux";
import Models from "../../models";

const MinePage = () => {
  /*-------------------------生命周期----------------------------*/
  /*-------------------------API----------------------------*/
  /*-------------------------回调事件----------------------------*/
  /*-------------------------事件----------------------------*/
  /*-------------------------子视图----------------------------*/
  function renderHeader() {
    return (
      <View style={styles.headerStyle} />
    );
  }

  /*-------------------------主视图----------------------------*/
  return (
    <>
      <StatusBar barStyle={"light-content"} translucent={false} />
      {renderHeader()}
      <SafeAreaView style={styles.container}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={styles.avatarStyle} />
          <Text style={styles.nicknameStyle}>昵称</Text>
        </View>
        <ScrollView style={{ flex: 1, backgroundColor: Colors.neutral.grayF5 }}>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
export const Mine = connect(state => ({
  localeEnv: state[Models.home].localeEnv
}))(MinePage);
export default Mine;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.theme.primary,
  },
  avatarStyle: {
    height: Sizing.adaptionSpace(60),
    width: Sizing.adaptionSpace(60),
    borderRadius: Sizing.adaptionSpace(30),
    backgroundColor: Colors.neutral.white,
    marginHorizontal: Sizing.t14,
    marginVertical: Sizing.adaptionSpace(44),
  },
  headerStyle: {
    height: Sizing.adaptionSpace(300),
    backgroundColor: Colors.theme.primary,
    position: "absolute",
  },
  nicknameStyle: {
    color: Colors.neutral.white,
    fontSize: Sizing.t16,
  },
});
