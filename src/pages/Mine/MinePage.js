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
import { ScrollView, SafeAreaView, StatusBar, StyleSheet, View, Text, Image, ImageBackground } from "react-native";
import { Colors, Layout, Sizing } from "../../common/styles";
import { connect } from "react-redux";
import Models from "../../models";
import {
  SOURCE_BG_PERSON,
  SOURCE_DEFAULT_AVATAR,
  SOURCE_TO_PERSON_CENTER,
  SOURCE_TO_SERVICE_CENTER,
} from "../../common/ImageSource";

const MinePage = () => {
  /*-------------------------生命周期----------------------------*/
  /*-------------------------API----------------------------*/
  /*-------------------------回调事件----------------------------*/
  /*-------------------------事件----------------------------*/
  /*-------------------------子视图----------------------------*/
  function renderHeader() {
    return (
      <ImageBackground source={SOURCE_BG_PERSON} style={styles.headerStyle} >
        <View style={{flex:1, alignSelf:'flex-start',flexDirection: "row", alignItems: "center"}}>
          <Image source={SOURCE_DEFAULT_AVATAR} style={styles.avatarStyle} />
          <Text style={styles.nicknameStyle}>昵称</Text>
        </View>
        <Image source={SOURCE_TO_PERSON_CENTER} style={styles.personBtnStyle}/>
        <Image source={SOURCE_TO_SERVICE_CENTER} style={styles.serviceBtnStyle}/>
      </ImageBackground>
    );
  }

  /*-------------------------主视图----------------------------*/
  return (
    <>
      <StatusBar barStyle={"light-content"} translucent={true} backgroundColor={Colors.neutral.clear} />
      <SafeAreaView style={styles.container}>
        {renderHeader()}
        <ScrollView style={{flex:1,backgroundColor:Colors.neutral.grayF8}}>
          <View style={styles.menuContainerStyle}>

          </View>
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
    height: Sizing.adaptionSpace(76),
    width: Sizing.adaptionSpace(76),
    borderRadius: Sizing.adaptionSpace(38),
    backgroundColor: Colors.neutral.white,
    marginHorizontal: Sizing.t14,
    marginVertical: Sizing.adaptionSpace(74),
  },
  headerStyle: {
    ...Layout.flex.column,
    ...Layout.crossAxis.spaceBetween,
    ...Layout.mainAxis.center,
    height: Sizing.adaptionSpace(305),
    width: Sizing.screen.width,
    backgroundColor: Colors.theme.primary,
  },
  nicknameStyle: {
    color: Colors.neutral.white,
    fontSize: Sizing.t16,
  },
  menuContainerStyle:{
    ...Layout.flex.full,
    backgroundColor:Colors.neutral.grayF8
  },
  personBtnStyle:{
    position:'absolute',
    top:Sizing.adaptionSpace(134),
    right:0
  },
  serviceBtnStyle:{
    // position:'absolute',
    // bottom:0,
    // left: Sizing.adaptionSpace(20)
  }

});
