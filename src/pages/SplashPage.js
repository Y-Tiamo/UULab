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
import { Image, StyleSheet, Text, View } from "react-native";
import SplashScreen from "react-native-splash-screen";
import NavigationService from "../common/NavigationService";
import MainPage from "./MainPage";
import { LAUNCH_SCREEN } from "../common/ImageSource";

const SplashPage = () => {
  /*-------------------------生命周期----------------------------*/
  React.useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
      NavigationService.reset("LoginPage");
    }, 2000);
  });
  /*-------------------------API----------------------------*/
  /*-------------------------回调事件----------------------------*/
  /*-------------------------事件----------------------------*/
  /*-------------------------子视图----------------------------*/
  /*-------------------------主视图----------------------------*/
  return (
    <Image source={LAUNCH_SCREEN} style={styles.container}/>
  );
};
export default SplashPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
});
