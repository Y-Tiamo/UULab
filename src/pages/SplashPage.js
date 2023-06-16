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
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SplashScreen from "react-native-splash-screen";
import NavigationService from "../common/NavigationService";
import MainPage from "./MainPage";

const SplashPage = () => {
  /*-------------------------生命周期----------------------------*/
  React.useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
      NavigationService.reset("MainPage");
    }, 2000);
  });
  /*-------------------------API----------------------------*/
  /*-------------------------回调事件----------------------------*/
  /*-------------------------事件----------------------------*/
  /*-------------------------子视图----------------------------*/
  /*-------------------------主视图----------------------------*/
  return (
    <View style={styles.container}/>
  );
};
export default SplashPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
});
