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
import { Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DoubleClick from "../../common/components/DoubleClick";
import { Colors, Layout, Sizing } from "../../common/styles";
import { NavHeader } from "../../components/navHeader.component";
import {
  SOURCE_ADD_DEVICE_ERROR,
  SOURCE_ARROW_DOWN_GRAY,
  SOURCE_BG_ADD_DEVICE,
  SOURCE_SCAN_GRAY,
} from "../../common/ImageSource";
import { PrimaryButtonWithBorder } from "../../components/primaryButton.component";
import { connect } from "react-redux";
import Models from "../../models";
import I18n from "react-native-i18n";
import NavigationService from "../../common/NavigationService";

const AddDevicesPage = () => {
  const [rooms, setRooms] = React.useState([
    { name: "实验室1", id: 1 },
    { name: "实验室2", id: 2 },
    { name: "实验室3", id: 3 },
    { name: "实验室4", id: 4 },
    { name: "实验室5", id: 5 },
    { name: "实验室6", id: 6 },
    { name: "实验室7", id: 7 },
    { name: "实验室8", id: 8 },
  ]);
  const [pn, setPN] = React.useState("");
  const [key, setKey] = React.useState("");
  const [name, setName] = React.useState("");
  const [isExpend, setIsExpend] = React.useState(false);//是否显示可是选择弹窗
  const [isError, setIsError] = React.useState(false);//是否添加出错
  /*-------------------------生命周期-------------------------*/
  // React.useEffect(()=>{
  //   getRooms()
  // },[])
  /*-------------------------API----------------------------*/
  /*-------------------------回调事件------------------------*/
  /*-------------------------事件----------------------------*/
  const onChangePN = (text) => {
    setPN(text);
  };
  const onChangeKey = (text) => {
    setKey(text);
  };
  const onChangeName = (text) => {
    setName(text);
  };
  const onClickArrow = () => {
    setIsExpend(!isExpend);
  };

  const onClickConfirm = () => {
    setIsError(true);
  };

  const onClickRetry = () => {
    NavigationService.navigate("");
  };

  /*-------------------------子视图----------------------------*/
  /**
   * 扫描图标
   * @returns {JSX.Element}
   */
  function renderScanIcon() {
    return (
      <DoubleClick
        style={[Layout.mainAxis.center, { marginLeft: Sizing.adaptionSpace(23), marginTop: Sizing.t16 }]}>
        <Image source={SOURCE_SCAN_GRAY} style={{ marginBottom: Sizing.t4 }} />
        <Text style={{ fontSize: Sizing.t10, color: Colors.neutral.gray33 }}>扫一扫</Text>
      </DoubleClick>
    );
  }

  /**
   * 选择科室
   * @returns {JSX.Element}
   */
  function renderRooms() {
    return (
      <ImageBackground
        source={SOURCE_BG_ADD_DEVICE}
        style={{ height: Sizing.adaptionSpace(125), width: Sizing.adaptionSpace(335) }}>
        <ScrollView style={{ paddingHorizontal: Sizing.t20, paddingBottom: Sizing.t20, marginTop: Sizing.t12 }}>
          {rooms && rooms.map((item, index) => {
            return (
              <DoubleClick
                onPress={() => {
                  setName(item.name);
                  setIsExpend(false);
                }}
                style={{ marginTop: index === 0 ? Sizing.adaptionSpace(20) : Sizing.t20 }}
                key={String(item) + index}>
                <Text style={{ fontSize: Sizing.t14, color: Colors.neutral.gray66 }}>{item.name}</Text>
              </DoubleClick>
            );
          })}
        </ScrollView>
      </ImageBackground>
    );
  }

  function renderInputView() {
    return (
      <View style={styles.scrollStyle}>
        <ScrollView style={styles.scrollStyle}>
          <View style={[Layout.flex.row, Layout.mainAxis.center]}>
            <View style={[Layout.flex.full]}>
              <InputDeviceInfo
                placeholder={I18n.t("input_device_pn")}
                value={pn}
                onChangeText={onChangePN}
              />
              <InputDeviceInfo
                placeholder={I18n.t("input_device_link_key")}
                value={key}
                onChangeText={onChangeKey}
              />
            </View>
            {renderScanIcon()}
          </View>
          <InputDeviceInfo
            placeholder={I18n.t("input_or_select_device_room")}
            value={name}
            onChangeText={onChangeName}
            showIcon={true}
            onClickArrow={onClickArrow}
          />
          {isExpend && renderRooms()}
        </ScrollView>
        <PrimaryButtonWithBorder
          title={I18n.t("confirm")}
          callback={onClickConfirm}
          style={{ marginHorizontal: Sizing.t20, marginBottom: Sizing.adaptionSpace(36) }} />
      </View>
    );
  }


  function renderErrorView() {
    return (
      <View style={styles.scrollStyle}>
      <View style={[styles.scrollStyle, Layout.flex.column, Layout.mainAxis.center]}>
        <Image source={SOURCE_ADD_DEVICE_ERROR}
               style={{ marginTop: Sizing.adaptionSpace(156), marginBottom: Sizing.adaptionSpace(66) }} />
        <View style={[Layout.mainAxis.center,{marginBottom:Sizing.adaptionSpace(247)}]}>
          <Text style={{fontSize:Sizing.adaptionSpace(24),color:Colors.neutral.gray33,fontWeight:'500'}}>{I18n.t("connect_failed")}</Text>
          <Text style={{fontSize:Sizing.adaptionSpace(14),color:Colors.neutral.gray99,marginTop: Sizing.t10}}>{I18n.t("pn_not_match_key")}</Text>
        </View>
      </View>
        <PrimaryButtonWithBorder
          style={{ marginHorizontal: Sizing.t20, marginBottom: Sizing.adaptionSpace(36) }}
        title={I18n.t("retry")} callback={onClickRetry} />
      </View>
    );
  }


  /*-------------------------主视图----------------------------*/
  return (
    <SafeAreaView style={styles.container}>
      <NavHeader title={I18n.t("add_device")} />
      {isError ? renderErrorView() : renderInputView()}
    </SafeAreaView>
  );
};
export const AddDevices = connect(state => ({
  localeEnv: state[Models.home].localeEnv,
}))(AddDevicesPage);
export default AddDevices;

export const InputDeviceInfo = (props) => {
  const { placeholder, onChangeText, value, showIcon, onClickArrow } = props;
  const [isFocus, setFocus] = React.useState(false);
  return (
    <View style={[styles.deviceInfoContainer, { borderWidth: isFocus ? 1 : 0 }]}>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={{
          padding: 0,
          flex: 1,
        }}
        placeholderTextColor={Colors.neutral.gray99}
        onFocus={() => {
          setFocus(true);
        }}
        onBlur={() => {
          setFocus(false);
        }}
      />
      {showIcon &&
        <DoubleClick onPress={() => {
          onClickArrow && onClickArrow();
        }}>
          <Image source={SOURCE_ARROW_DOWN_GRAY} />
        </DoubleClick>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.white,
  },
  button: {
    ...Layout.center,
    backgroundColor: Colors.neutral.grayE1,
    flex: 1,
    marginRight: Sizing.t15,
    height: Sizing.adaptionSpace(40),
    borderRadius: Sizing.t20,
  },
  scrollStyle: {
    flex: 1,
    backgroundColor: Colors.neutral.grayF8,
    paddingHorizontal: Sizing.t20,
  },
  deviceInfoContainer: {
    ...Layout.flex.row,
    ...Layout.mainAxis.center,
    marginTop: Sizing.t16,
    backgroundColor: "#ECECEC",
    paddingVertical: Sizing.t10,
    paddingHorizontal: Sizing.t12,
    borderRadius: Sizing.adaptionSpace(3),
    borderColor: Colors.theme.primary,
  },
});
