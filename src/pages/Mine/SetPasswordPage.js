/**
 * Desc：
 * Author：yeyq
 * Date: 2023/6/27
 *
 * * * * * * * * * * * * * * * * * * *
 * Content Desc:
 *
 * * * * * * * * * * * * * * * * * * *
 */
import React from "react";
import {Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import DoubleClick from "../../common/components/DoubleClick";
import {Colors, Layout, Sizing} from "../../common/styles";
import {NavHeader} from "../../components/navHeader.component";
import {
    SOURCE_ADD_DEVICE_ERROR, SOURCE_APP_LOGO,
    SOURCE_ARROW_DOWN_GRAY, SOURCE_ARROW_RIGHT_GRAY,
    SOURCE_BG_ADD_DEVICE, SOURCE_HIDE_SHOW, SOURCE_INPUT_SHOW,
    SOURCE_SCAN_GRAY,
} from "../../common/ImageSource";
import {PrimaryButtonWithBorder} from "../../components/primaryButton.component";
import {connect} from "react-redux";
import Models from "../../models";
import I18n from "react-native-i18n";
import NavigationService from "../../common/NavigationService";
import {InputPasswordView, OpacityPrimaryButton} from "../Login/LoginPage";
import Toast from "teaset/components/Toast/Toast";
import {getTel, inputComplete} from "../../common/Base";
import TextUtils from "../../common/TextUtils";
import {InputVerifyCode} from "./BindPhonePage";

const SetPasswordPage = () => {
    const [isComplete, setIsComplete] = React.useState(true);
    const [phone, setPhone] = React.useState("");
    const [code, setCode] = React.useState(false);
    const [step, setStep] = React.useState(0);//0验证1发短信2输密码
    const [hasError, setHasError] = React.useState(false);
    const [send, setSend] = React.useState(false);
    const [time, setTime] = React.useState(60);
    /*-------------------------生命周期-------------------------*/
    /*-------------------------API----------------------------*/
    /*-------------------------回调事件------------------------*/
    const onClickConfirm = () => {
        if (step === 0) {
            setStep(1)
            setIsComplete(false)
            return
        }
        if (step===1){
            setStep(2)
            return;
        }
        Toast.success(I18n.t('success'))
    }
    function onChangeText(text, type) {
        inputComplete('1','2')
        let isComplete;
        if (step === 0) {
            isComplete = inputComplete(text)
        } else {
            if (type === 0) {
                inputComplete(text,code)
                setPhone(text);
            } else {
                setCode(text);
                inputComplete(phone,text)            }
        }
        setIsComplete(isComplete)
    }
    /*-------------------------事件----------------------------*/
    /*-------------------------子视图----------------------------*/
    function renderTips() {
        let step2Tips=I18n.t('mine_account_safe_code_send_success_tip')+getTel('19999999999')
        let tips=step===0?I18n.t('mine_account_safe_verify_tip'):step===1?step2Tips:I18n.t('mine_account_safe_set_password_tip')
        return<View style={{marginTop:Sizing.adaptionSpace(60)}}>
            <Text style={[styles.tipTextStyle,step===0&&{alignSelf:'center'}]}>{tips}</Text>
        </View>
    }

    function renderSetView() {
        return(
            <View style={Layout.flex.column}>
                <InputPasswordView
                    hasError={false}
                    showAction={false}
                    showTips={false}
                    placeholder={I18n.t('enter_password')}
                    style={{marginTop: Sizing.adaptionSpace(30)}}
                    onChangeText={(text) => {
                        onChangeText(text, 1);
                    }} />
                <InputPasswordView
                    hasError={hasError}
                    placeholder={I18n.t('enter_password_again')}
                    showAction={false}
                    showTips={hasError}
                    style={{marginTop: Sizing.adaptionSpace(30)}}
                    onChangeText={(text) => {
                        onChangeText(text, 1);
                    }} />
            </View>
        )
    }

    function renderConfirmBtn() {
        let opacity = isComplete ? 1 : 0.5;
        let marginTop = step === 0 ? Sizing.adaptionSpace(262) : Sizing.adaptionSpace(192);
        let title = step === 0 ? I18n.t('verify'):step===1?I18n.t('next') : I18n.t('confirm')
        return <OpacityPrimaryButton
            title={title}
            style={{...styles.btnStyle, marginTop}}
            opacity={opacity}
            callback={onClickConfirm}/>;
    }
    /*-------------------------主视图----------------------------*/
    return (
        <SafeAreaView style={styles.container}>
            <NavHeader title={I18n.t("mine_account_safe_set_password")}/>
            <ScrollView style={styles.scrollStyle}>
                {renderTips()}
                {step===1&&<InputVerifyCode/>}
                {step===2&&renderSetView()}
                {renderConfirmBtn()}
            </ScrollView>
        </SafeAreaView>
    );
};
export const SetPassword = connect(state => ({
    localeEnv: state[Models.home].localeEnv,
}))(SetPasswordPage);
export default SetPassword;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.neutral.white,
    },
    scrollStyle: {
        flex: 1,
        backgroundColor: Colors.neutral.grayF8,
        paddingHorizontal:Sizing.t20
    },
    btnStyle: {
        width: Sizing.adaptionSpace(335),
        height: Sizing.adaptionSpace(44),
        alignSelf: 'center'
    },
    tipTextStyle: {
        fontSize: Sizing.t14,
        color: Colors.neutral.gray66,
    },
});
