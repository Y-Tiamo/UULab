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
import {Image, StyleSheet} from "react-native";
import {Home} from "./Home/HomePage";
import {Message} from "./Messages/MessagePage";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Invite} from "./Invite/InvitePage";
import {Mine} from "./Mine/MinePage";
import {
    SOURCE_TAB_HOME,
    SOURCE_TAB_HOME_SELECT,
    SOURCE_TAB_Invite,
    SOURCE_TAB_Invite_SELECT,
    SOURCE_TAB_Message,
    SOURCE_TAB_Message_SELECT,
    SOURCE_TAB_MINE,
    SOURCE_TAB_MINE_SELECT,
} from "../common/ImageSource";
import I18n from "react-native-i18n";
import {connect} from "react-redux";
import Models from "../models";
import {getBottomSpace} from "react-native-iphone-x-helper";
import {Sizing} from "../common/styles";

const Tab = createBottomTabNavigator();

const MainPage = () => {

  /*-------------------------生命周期----------------------------*/
  /*-------------------------API----------------------------*/
  /*-------------------------回调事件----------------------------*/
  /*-------------------------事件----------------------------*/
  /*-------------------------子视图----------------------------*/
  function renderBottomTabs() {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        barStyle={styles.tabBarStyle}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? SOURCE_TAB_HOME_SELECT : SOURCE_TAB_HOME;
            } else if (route.name === 'Message') {
              iconName = focused ? SOURCE_TAB_Message_SELECT : SOURCE_TAB_Message;
            }else if (route.name === 'Invite') {
              iconName = focused ? SOURCE_TAB_Invite_SELECT : SOURCE_TAB_Invite;
            }else if (route.name === 'Mine') {
              iconName = focused ? SOURCE_TAB_MINE_SELECT : SOURCE_TAB_MINE;
            }
            return <Image source={iconName}/>;
          },
          headerShown:false,
          tabBarActiveTintColor:"#2F2F2F",
          tabBarStyle:{
            borderTopLeftRadius:Sizing.adaptionSpace(24),
            borderTopRightRadius:Sizing.adaptionSpace(24),
          }
        })}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: I18n.t('tab_home'),
          }}
        />
        <Tab.Screen
          name="Message"
          component={Message}
          options={{
            tabBarLabel: I18n.t('tab_message'),
          }}
        />
        <Tab.Screen
          name="Invite"
          component={Invite}
          options={{
            tabBarLabel: I18n.t('tab_invite'),
          }}
        />
        <Tab.Screen
          name="Mine"
          component={Mine}
          options={{
            tabBarLabel: I18n.t('tab_mine'),
          }}
        />
      </Tab.Navigator>
    );
  }
  /*-------------------------主视图----------------------------*/
  return (
      <NavigationContainer>
        {renderBottomTabs()}
      </NavigationContainer>
  );
};
export const Main = connect(state => ({
  localeEnv: state[Models.home].localeEnv
}))(MainPage);
export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  barIconStyles: {
    width: 25,
    height: 25,
  },
  tabBarShadowStyle: {
    height: 0.5,
    backgroundColor: '#000',
  },
  tabBarStyle: {
    backgroundColor: '#FFFFFF',
    height: 49 + getBottomSpace(),
    paddingBottom: getBottomSpace(),
  },
});
