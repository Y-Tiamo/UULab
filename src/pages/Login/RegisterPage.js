import React from "react";
import { Image, ImageBackground, StatusBar, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";
import Models from "../../models";
import {
  SOURCE_BG_LOGIN,
  SOURCE_CLEAR_INPUT,
  SOURCE_ROLE_CHOOSE,
  SOURCE_ROLE_MANAGER,
  SOURCE_ROLE_UN_CHOOSE,
  SOURCE_ROLE_USER,
} from "../../common/ImageSource";
import { Colors, Layout, Sizing } from "../../common/styles";
import DoubleClick from "../../common/components/DoubleClick";
import TextUtils from "../../common/TextUtils";
import NavigationService from "../../common/NavigationService";
import { AppLogo, AppPolicyView, InputAccountView, InputCodeView, LoginType, OpacityPrimaryButton } from "./LoginPage";

export const RegisterType = {
  USER: 0,
  MANAGER: 1,
};
const RegisterPage = (props) => {
  const { params } = props.navigation.state;
  const [registerType, setResisterType] = React.useState("");
  const [isComplete, setIsComplete] = React.useState(false);
  const [phone, setPhone] = React.useState("");
  const [code, setCode] = React.useState("");
  const [name, setName] = React.useState("");
  const [isAgree, setIsAgree] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);

  /*-------------------------生命周期----------------------------*/
  React.useEffect(() => {
    StatusBar.setHidden(true);
  });
  /*-------------------------API----------------------------*/

  /*-------------------------回调事件----------------------------*/
  function onChangeText(text, type) {
    let isComplete;
    if (type === 0) {
      setPhone(text);
      isComplete = !TextUtils.isEmptyStr(text) && !TextUtils.isEmptyStr(code) && !TextUtils.isEmptyStr(name);
    } else if (type === 1) {
      setCode(text);
      isComplete = !TextUtils.isEmptyStr(phone) && !TextUtils.isEmptyStr(text) && !TextUtils.isEmptyStr(name);
    } else {
      setName(text);
      isComplete = !TextUtils.isEmptyStr(phone) && !TextUtils.isEmptyStr(code) && !TextUtils.isEmptyStr(text);
    }
    setIsComplete(isComplete);
  }

  /*-------------------------事件----------------------------*/
  const onClickLog = () => {
    setHasError(!hasError);
  };

  const onClickPolicy = () => {
    setIsAgree(!isAgree);
  };


  /*-------------------------子视图----------------------------*/
  function renderRealName() {
    let marginTop = hasError ? Sizing.adaptionSpace(15) : Sizing.adaptionSpace(32);
    let isEmptyName = TextUtils.isEmptyStr(name);
    return (
      <View style={[styles.inputContainer, styles.inputPwdContainer, { marginTop }]}>
        <TextInput
          placeholder={"请输入您的真实姓名"}
          style={[styles.inputTextStyle, Layout.flex.full]}
          value={name}
          onChangeText={(text) => {
            onChangeText(text, 2);
          }}
        />
        {!isEmptyName &&
          <DoubleClick onPress={() => {
            onChangeText("", 2);
          }}>
            <Image source={SOURCE_CLEAR_INPUT} />
          </DoubleClick>
        }
      </View>
    );
  }

  function renderRoleChoose() {
    return (
      <View style={styles.roleContainer}>
        <DoubleClick
          onPress={() => {
            setResisterType(RegisterType.USER);
          }}
          style={[registerType === RegisterType.USER ? styles.selectBorderStyle : styles.unselectBorderStyle, { marginRight: Sizing.adaptionSpace(22) }]}>
          <Image source={SOURCE_ROLE_USER} />
          <Text
            style={registerType === RegisterType.USER ? styles.selectTextStyle : styles.unselectTextStyle}>普通用户</Text>
          <Image source={registerType === RegisterType.USER ? SOURCE_ROLE_CHOOSE : SOURCE_ROLE_UN_CHOOSE}
                 style={styles.roleChooseIconStyle} />
        </DoubleClick>
        <DoubleClick
          onPress={() => {
            setResisterType(RegisterType.MANAGER);
          }}
          style={registerType === RegisterType.MANAGER ? styles.selectBorderStyle : styles.unselectBorderStyle}>
          <Image source={SOURCE_ROLE_MANAGER} />
          <Text
            style={registerType === RegisterType.MANAGER ? styles.selectTextStyle : styles.unselectTextStyle}>管理员</Text>
          <Image source={registerType === RegisterType.MANAGER ? SOURCE_ROLE_CHOOSE : SOURCE_ROLE_UN_CHOOSE}
                 style={styles.roleChooseIconStyle} />
        </DoubleClick>
      </View>
    );
  }

  function renderLogBtn() {
    let opacity = isComplete ? 1 : 0.5;
    let marginTop = Sizing.adaptionSpace(40);
    return <OpacityPrimaryButton
      title={"注册"}
      style={{ marginTop }}
      opacity={opacity}
      callback={onClickLog} />;
  }

  function renderSwitchLogType() {
    return (
      <View style={styles.switchContainer}>
        <DoubleClick onPress={() => {
          params.callback && params.callback(LoginType.PWD_LOGIN);
          NavigationService.navigate("");
        }}>
          <Text style={styles.normalTextStyle}>密码登录</Text>
        </DoubleClick>
        <DoubleClick onPress={() => {
          params.callback && params.callback(LoginType.CODE_LOGIN);
          NavigationService.navigate("");
        }}>
          <Text style={styles.normalTextStyle}>验证码登录</Text>
        </DoubleClick>
      </View>
    );
  }

  /*-------------------------主视图----------------------------*/
  return (
    <ImageBackground source={SOURCE_BG_LOGIN} style={styles.bgStyle}>
      <SafeAreaView style={styles.container}>
        <View style={Layout.flex.full} />
        <View style={styles.infoContainer}>
          <AppLogo />
          <InputAccountView hasError={hasError} onChangeText={text => onChangeText(text, 0)} />
          <InputCodeView style={{ marginTop: Sizing.adaptionSpace(24) }}
                         hasError={hasError} onChangeText={text => onChangeText(text, 1)} />
          {renderRealName()}
          {renderRoleChoose()}
          {renderLogBtn()}
          {renderSwitchLogType()}
          <AppPolicyView isAgree={isAgree} callback={() => onClickPolicy()} />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};
export const Register = connect(state => ({
  localeEnv: state[Models.home].localeEnv,
}))(RegisterPage);
export default Register;

const styles = StyleSheet.create({
  bgStyle: {
    ...Layout.flex.full,
    backgroundColor: Colors.neutral.white,
  },
  container: {
    flex: 1,
  },
  infoContainer: {
    ...Layout.flex.column,
    marginHorizontal: Sizing.t20,
    borderTopLeftRadius: Sizing.adaptionSpace(30),
    borderTopRightRadius: Sizing.adaptionSpace(30),
    backgroundColor: Colors.neutral.white,
    height: Sizing.adaptionSpace(520),
    paddingHorizontal: Sizing.t20,
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderColor: Colors.neutral.gray99,
    paddingBottom: Sizing.t4,
  },
  inputTextStyle: {
    fontSize: Sizing.t16,
    color: Colors.neutral.gray99,
    lineHeight: Sizing.adaptionSpace(24),
    padding: 0,
  },
  normalTextStyle: {
    fontSize: Sizing.t12,
    color: Colors.neutral.gray99,
  },
  inputPwdContainer: {
    ...Layout.flex.row,
    marginTop: Sizing.adaptionSpace(24),
  },
  switchContainer: {
    ...Layout.flex.row,
    ...Layout.crossAxis.spaceBetween,
    marginTop: Sizing.t20,
  },
  roleContainer: {
    ...Layout.flex.row,
    ...Layout.crossAxis.spaceBetween,
    marginTop: Sizing.t20,
  },
  unselectBorderStyle: {
    ...Layout.flex.row,
    borderColor: Colors.neutral.gray66,
    borderWidth: 1,
    flex: 1,
    ...Layout.center,
    height: Sizing.adaptionSpace(40),
    borderRadius: Sizing.adaptionSpace(6),
  },
  selectBorderStyle: {
    ...Layout.flex.row,
    borderColor: Colors.theme.primary,
    borderWidth: 1,
    flex: 1,
    ...Layout.center,
    height: Sizing.adaptionSpace(40),
    borderRadius: Sizing.adaptionSpace(6),
  },
  roleChooseIconStyle: {
    position: "absolute",
    top: 2,
    right: 2,
  },
  selectTextStyle: {
    fontSize: Sizing.t16,
    color: Colors.theme.primary,
    marginLeft: Sizing.t8,
  },
  unselectTextStyle: {
    fontSize: Sizing.t16,
    color: Colors.neutral.gray66,
    marginLeft: Sizing.t8,
  },
});
