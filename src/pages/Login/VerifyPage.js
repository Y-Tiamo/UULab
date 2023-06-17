import React from "react";
import { ImageBackground, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";
import Models from "../../models";
import { SOURCE_BG_LOGIN } from "../../common/ImageSource";
import { Colors, Layout, Sizing } from "../../common/styles";
import TextUtils from "../../common/TextUtils";
import { InputAccountView, InputCodeView, InputPasswordView, OpacityPrimaryButton } from "./LoginPage";

const VerifyPage = () => {
  const [isComplete, setIsComplete] = React.useState(false);
  const [phone, setPhone] = React.useState("");
  const [code, setCode] = React.useState("");
  const [hasError, setHasError] = React.useState(false);
  const [step,setStep]=React.useState(1)//1验证手机号2设置密码

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
      isComplete = !TextUtils.isEmptyStr(text) && !TextUtils.isEmptyStr(code);
    } else {
      setCode(text);
      isComplete = !TextUtils.isEmptyStr(phone) && !TextUtils.isEmptyStr(text);
    }
    setIsComplete(isComplete);
  }

  /*-------------------------事件----------------------------*/
  const onClickNext = () => {
    if (step===1){
      setStep(2)
    }else {
      setStep(1)
    }
  };


  /*-------------------------子视图----------------------------*/
  function renderNextBtn() {
    let opacity = isComplete ? 1 : 0.5;
    let marginTop = Sizing.adaptionSpace(184);
    return <OpacityPrimaryButton
      title={"下一步"}
      style={{ marginTop }}
      opacity={opacity}
      callback={onClickNext} />;
  }

  function renderVerifyView() {
    return(
      <View style={Layout.flex.column}>
        <InputAccountView
          onChangeText={text => {
            onChangeText(text, 0);
          }}
        />
        <InputCodeView
          hasError={hasError}
          style={{marginTop: Sizing.adaptionSpace(24)}}
          onChangeText={(text) => {
            onChangeText(text, 1);
          }} />
      </View>
    )
  }

  function renderSetView() {
    return(
      <View style={Layout.flex.column}>
        <View style={{marginBottom: Sizing.adaptionSpace(24)}}>
          <Text style={styles.titleTextStyle}>请重设您账号密码</Text>
        </View>
        <InputPasswordView
          hasError={false}
          showAction={false}
          showTips={false}
          placeholder={'请输入密码'}
          onChangeText={(text) => {
            onChangeText(text, 1);
          }} />
        <InputPasswordView
          hasError={false}
          placeholder={'请输入确认密码'}
          showAction={false}
          showTips={true}
          tip={'密码长度8～16位'}
          style={{marginTop: Sizing.adaptionSpace(53)}}
          onChangeText={(text) => {
            onChangeText(text, 1);
          }} />
        <Text style={[styles.errorTipTextStyle, { marginTop: Sizing.t20 }]}>两次密码不一致</Text>
      </View>
    )
  }


  /*-------------------------主视图----------------------------*/
  return (
    <ImageBackground source={SOURCE_BG_LOGIN} style={styles.bgStyle}>
      <SafeAreaView style={styles.container}>
        <View style={Layout.flex.full} />
        <View style={styles.infoContainer}>
          <View style={styles.logoContainer}>
            <Text style={styles.titleTextStyle}>重置密码</Text>
          </View>
          {step===1?renderVerifyView():renderSetView()}
          {renderNextBtn()}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};
export const Verify = connect(state => ({
  localeEnv: state[Models.home].localeEnv,
}))(VerifyPage);
export default Verify;

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
  titleTextStyle: {
    fontSize: Sizing.adaptionSpace(16),
    color: Colors.neutral.gray33,
  },
  logoContainer: {
    ...Layout.mainAxis.center,
    marginTop: Sizing.adaptionSpace(32),
    marginBottom: Sizing.adaptionSpace(60),
  },
  errorTipTextStyle: {
    fontSize: Sizing.t12,
    color: Colors.neutral.red,
    marginTop: Sizing.t20
  },
});
