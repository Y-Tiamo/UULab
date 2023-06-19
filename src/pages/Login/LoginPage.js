import React from "react";
import { Image, ImageBackground, StatusBar, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";
import Models from "../../models";
import {
  SOURCE_BG_LOGIN,
  SOURCE_HIDE_SHOW,
  SOURCE_INPUT_SHOW,
  SOURCE_LOGO,
  SOURCE_POLICY_NOT_SELECT,
  SOURCE_POLICY_SELECT,
} from "../../common/ImageSource";
import { Colors, Layout, Sizing } from "../../common/styles";
import DoubleClick from "../../common/components/DoubleClick";
import TextUtils from "../../common/TextUtils";
import NavigationService from "../../common/NavigationService";
import PactDialog from "../../common/components/PactDialog";
import I18n from "react-native-i18n";

export const LoginType = {
  PWD_LOGIN: 0,
  CODE_LOGIN: 1,
};
const LoginPage = () => {
  const [loginType, setLoginType] = React.useState(LoginType.CODE_LOGIN);
  const [isComplete, setIsComplete] = React.useState(false);
  const [phone, setPhone] = React.useState("");
  const [code, setCode] = React.useState("");
  const [isAgree, setIsAgree] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);

  /*-------------------------生命周期----------------------------*/
  React.useEffect(() => {});
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

  const onClickChangeLog = () => {
    setHasError(false);
    setLoginType(loginType === LoginType.PWD_LOGIN ? LoginType.CODE_LOGIN : LoginType.PWD_LOGIN);
  };

  const onClickLog = () => {
    // setHasError(!hasError);
    NavigationService.reset("MainPage")
  };

  const onClickPolicy = () => {
    setIsAgree(!isAgree);
  };


  /*-------------------------子视图----------------------------*/
  function renderPassword() {
    return (
      <InputPasswordView
        hasError={hasError}
        showAction={true}
        tip={hasError ? I18n.t('log_tip_error_password') : ""}
        showTips={hasError}
        style={{ marginTop: Sizing.adaptionSpace(24) }}
        onChangeText={(text) => {
          onChangeText(text, 1);
        }} />
    );
  }

  function renderCode() {
    return (
      <InputCodeView
        hasError={hasError}
        style={{ marginTop: Sizing.adaptionSpace(24) }}
        onChangeText={text => onChangeText(text, 1)}
      />
    );
  }

  function renderLogBtn() {
    let opacity = isComplete ? 1 : 0.5;
    let marginTop = loginType===LoginType.PWD_LOGIN ? Sizing.adaptionSpace(40) : hasError?Sizing.adaptionSpace(40):Sizing.adaptionSpace(62);

    return <OpacityPrimaryButton
      title={I18n.t('log_on')}
      style={{ marginTop }}
      opacity={opacity}
      callback={onClickLog} />;
  }

  function renderSwitchLogType() {
    let loginText = loginType === LoginType.PWD_LOGIN ? I18n.t('log_on_with_code') : I18n.t('log_on_with_password');
    return (
      <View style={styles.switchContainer}>
        <DoubleClick
          onPress={() => {
            NavigationService.navigate("RegisterPage", {
              callback: (loginType) => {
                setLoginType(loginType);
              },
            });
          }}
        >
          <Text style={styles.normalTextStyle}>{I18n.t('register_now')}</Text>
        </DoubleClick>
        <DoubleClick onPress={onClickChangeLog}>
          <Text style={styles.normalTextStyle}>{loginText}</Text>
        </DoubleClick>
      </View>
    );
  }


  /*-------------------------主视图----------------------------*/
  return (
    <ImageBackground source={SOURCE_BG_LOGIN} style={styles.bgStyle}>
      <StatusBar hidden={false} barStyle={"light-content"} translucent={true} backgroundColor={Colors.neutral.clear} />
      <SafeAreaView style={styles.container}>
        <View style={Layout.flex.full} />
        <View style={styles.infoContainer}>
          <AppLogo />
          <InputAccountView
            onChangeText={text => {
              onChangeText(text, 0);
            }}
          />
          {loginType === LoginType.PWD_LOGIN ? renderPassword() : renderCode()}
          {renderLogBtn()}
          {renderSwitchLogType()}
          <AppPolicyView isAgree={isAgree} callback={() => {
            onClickPolicy();
          }} />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};
export const Login = connect(state => ({
  localeEnv: state[Models.home].localeEnv,
}))(LoginPage);
export default Login;

export const AppLogo = () => {
  return (
    <View style={styles.logoContainer}>
      <Image source={SOURCE_LOGO} />
    </View>
  );
};
export const AppPolicyView = (props) => {
  const { isAgree, callback } = props;

  function onClickPolicy() {
    PactDialog.showDialog(callBack => {
      switch (callBack.status) {
        case 1:
          callback && callback();
          break;
        case 2:
          NavigationService.navigate("SpecialArticlePage", {
            title: I18n.t("user_agreement"),
          });
          break;
        case 3:
          NavigationService.navigate("SpecialArticlePage", {
            title: I18n.t("privacy_policy"),
          });
          break;
        default:
          break;
      }
    });
  }

  return (
    <DoubleClick
      onPress={() => {
        callback && callback();
      }}
      style={{ position: "absolute", bottom: Sizing.adaptionSpace(46), left: Sizing.t20 }}
    >
      <View style={styles.appPolicyContainer}>
        <Image style={styles.selectIcon} source={isAgree ? SOURCE_POLICY_NOT_SELECT : SOURCE_POLICY_SELECT} />
        <Text testID={"AppPolicy.agreement"} style={styles.policyNormalText}>
          {I18n.t("read_and_agree")}UULabs
          <Text style={{ textDecorationLine: "underline" }} onPress={onClickPolicy}>
            <Text
              testID={"AppPolicy.UserPolicy"}
              style={styles.policyText}
            >
              {I18n.t('user_agreement')}
            </Text>
            &#8197;
            <Text
              testID={"AppPolicy.PrivacyPolicy"}
              style={styles.policyText}
            >
              {I18n.t('privacy_policy')}
            </Text>
          </Text>

        </Text>
      </View>
    </DoubleClick>
  );
};
export const OpacityPrimaryButton = (props) => {
  const { title, callback, opacity, style } = props;
  let backgroundColor = opacity === 1 ? "rgba(23, 209, 235, 1)" : "rgba(23, 209, 235, 0.5)";
  return (
    <DoubleClick
      style={{ ...styles.logBtnStyle, ...style, backgroundColor }}
      onPress={() => {
        callback && callback();
      }}>
      <Text style={styles.logTextStyle}>{title}</Text>
    </DoubleClick>
  );
};
export const InputAccountView = (props) => {
  const { onChangeText } = props;
  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder={I18n.t("log_phone_or_email")}
        style={styles.inputTextStyle}
        onChangeText={onChangeText}
      />
    </View>
  );
};
export const InputPasswordView = (props) => {
  const { onChangeText, hasError, style, tip, placeholder, showAction,showTips } = props;
  const [showPwd, setShowPwd] = React.useState(false);
  let tipColor = hasError ? Colors.neutral.red : Colors.neutral.gray99;
  return (
    <View style={Layout.flex.column}>
      <View style={[styles.inputContainer, styles.inputPwdContainer, style]}>
        <TextInput
          placeholder={placeholder || I18n.t('log_password')}
          style={[styles.inputTextStyle, Layout.flex.full]}
          secureTextEntry={showPwd}
          onChangeText={onChangeText}
        />
        <DoubleClick onPress={() => {
          setShowPwd(!showPwd);
        }}>
          <Image source={showPwd ? SOURCE_HIDE_SHOW : SOURCE_INPUT_SHOW} />
        </DoubleClick>
      </View>
      <View style={[Layout.flex.row, Layout.crossAxis.spaceBetween]}>
        {showTips ? <Text
            style={[styles.errorTipTextStyle, { marginTop: Sizing.t4, color: tipColor }]}>{tip || I18n.t('log_tip_error_password')}</Text> :
          <View />}
        {showAction &&
          <DoubleClick
            onPress={() => {
              NavigationService.navigate("VerifyPage");
            }
            }>
            <Text style={[styles.normalTextStyle, { marginTop: Sizing.t20 }]}>{I18n.t('forget_password')}</Text>
          </DoubleClick>
        }
      </View>
    </View>
  );
};
export const InputCodeView = (props) => {
  const { onChangeText, hasError, style } = props;
  const [send, setSend] = React.useState(false);
  const onClickSendCode = () => {
    if (!send) setSend(true);
  };
  return (
    <View style={Layout.flex.column}>
      <View style={[styles.inputContainer, styles.inputPwdContainer, style]}>
        <TextInput
          placeholder={I18n.t('log_code')}
          style={[styles.inputTextStyle, Layout.flex.full]}
          onChangeText={(text) => {
            onChangeText(text, 1);
          }}
        />
        <DoubleClick onPress={onClickSendCode}>
          <Text style={styles.sendCodeTextStyle}>{send ? I18n.t('log_on_re_send') : I18n.t('log_send_code')}</Text>
        </DoubleClick>
      </View>
      {hasError && <View style={[Layout.flex.row, Layout.crossAxis.spaceBetween]}>
        <Text style={[styles.errorTipTextStyle, { marginTop: Sizing.t4 }]}>{I18n.t('log_on_re_enter_code')}</Text>
        {/*<Text style={[styles.normalTextStyle, { marginTop: Sizing.t20 }]}>接收不到验证码</Text>*/}
      </View>}
    </View>
  );
};


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
  logoContainer: {
    ...Layout.mainAxis.center,
    marginTop: Sizing.adaptionSpace(32),
    marginBottom: Sizing.adaptionSpace(56),
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
  errorTipTextStyle: {
    fontSize: Sizing.t12,
    color: Colors.neutral.red,
  },
  sendCodeTextStyle: {
    fontSize: Sizing.t12,
    color: "#0D8FFF",
  },
  logTextStyle: {
    fontSize: Sizing.t16,
    color: Colors.neutral.white,
  },
  inputPwdContainer: {
    ...Layout.flex.row,
  },
  logBtnStyle: {
    ...Layout.center,
    height: Sizing.adaptionSpace(44),
    borderRadius: Sizing.adaptionSpace(22),
  },
  switchContainer: {
    ...Layout.flex.row,
    ...Layout.crossAxis.spaceBetween,
    marginTop: Sizing.t20,
  },
  appPolicyContainer: {
    ...Layout.flex.row,
    ...Layout.mainAxis.center,
    marginTop: Sizing.t12,
  },
  selectIcon: {
    width: Sizing.adaptionSpace(20),
    height: Sizing.adaptionSpace(20),
    marginRight: Sizing.adaptionSpace(4),
  },
  policyNormalText: {
    fontSize: Sizing.adaptionSpace(12),
    fontWeight: "500",
    color: Colors.neutral.gray66,
  },
  policyText: {
    fontSize: Sizing.adaptionSpace(12),
    fontWeight: "500",
    color: "#0D8FFF",
  },
});
