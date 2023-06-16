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
import I18n from "react-native-i18n";
import DoubleClick from "../../common/components/DoubleClick";
import { Colors, Layout, Sizing } from "../../common/styles";
import ActionService from "../../common/ActionService";
import { HomeHeader } from "../../components/navHeader.component";
import NavigationService from "../../common/NavigationService";
import Button from "teaset/components/Button/Button";
import { connect } from "react-redux";
import Models from "../../models";

const HomePage = () => {
  const [groupID, setGroupID] = React.useState("123456789");
  /*-------------------------生命周期----------------------------*/
  React.useEffect(() => {});
  /*-------------------------API----------------------------*/
  /*-------------------------回调事件----------------------------*/
  /*-------------------------事件----------------------------*/
  const onClickChangeLocalLanguage = (type) => {
    I18n.locale = type;
    ActionService.dispatch({
      type: "home/updateLocaleEnv",
      payload: { language: type },
    });
  };

  const onClickToAdd = () => {
    NavigationService.navigate("AddDevicesPage");
  };
  /*-------------------------子视图----------------------------*/
  /*-------------------------主视图----------------------------*/
  return (
    <>
      <HomeHeader title={groupID} num={"12"} />
      <View style={{ flexDirection: "row", paddingLeft: Sizing.t15, marginVertical: Sizing.t15 }}>
        <DoubleClick
          onPress={() => onClickChangeLocalLanguage("zh-CN")}
          style={styles.button}>
          <Text>简体中文</Text>
        </DoubleClick>
        <DoubleClick
          onPress={() => onClickChangeLocalLanguage("zh-TW")}
          style={styles.button}>
          <Text>繁體中文</Text>
        </DoubleClick>
        <DoubleClick
          onPress={() => onClickChangeLocalLanguage("en")}
          style={styles.button}>
          <Text>英文</Text>
        </DoubleClick>
      </View>
      <Button
        title={"添加设备"}
        onPress={onClickToAdd}>
      </Button>
    </>
  );
};
export const Home = connect(state => ({
  localeEnv: state[Models.home].localeEnv
}))(HomePage);
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  button: {
    ...Layout.center,
    backgroundColor: Colors.neutral.grayE1,
    flex: 1,
    marginRight: Sizing.t15,
    height: Sizing.adaptionSpace(40),
    borderRadius: Sizing.t20,
  },
});
