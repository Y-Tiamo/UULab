/**
 * Desc：
 * Author：yeyq
 * Date: 2023/6/27
 *
 * * * * * * * * * * * * * * * * * * *
 * Content Desc:绑定手机号
 *
 * * * * * * * * * * * * * * * * * * *
 */
import React from "react";
import {ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {Colors, Layout, Sizing} from "../../common/styles";
import {NavHeader} from "../../components/navHeader.component";
import {connect} from "react-redux";
import Models from "../../models";
import I18n from "react-native-i18n";
import {OpacityPrimaryButton} from "../Login/LoginPage";
import Toast from "teaset/components/Toast/Toast";
import TextUtils from "../../common/TextUtils";
import DoubleClick from "../../common/components/DoubleClick";

const BindPhonePage = () => {
    const [isComplete, setIsComplete] = React.useState(false);
    const [phone, setPhone] = React.useState("");
    const [code, setCode] = React.useState(false);
    const [step, setStep] = React.useState(0);//0输入旧手机号1输入新手机号
    const [hasError, setHasError] = React.useState(false);
    const [send, setSend] = React.useState(false);
    const [time, setTime] = React.useState(60);

    /*-------------------------生命周期-------------------------*/
    /*-------------------------API----------------------------*/

    /*-------------------------回调事件------------------------*/
    function onChangeText(text, type) {
        let isComplete;
        if (step === 0) {
            isComplete = !TextUtils.isEmptyStr(text)
        } else {
            if (type === 0) {
                setPhone(text);
                isComplete = !TextUtils.isEmptyStr(text) && !TextUtils.isEmptyStr(code);
            } else {
                setCode(text);
                isComplete = !TextUtils.isEmptyStr(phone) && !TextUtils.isEmptyStr(text);
            }
        }
        setIsComplete(isComplete)
    }

    /*-------------------------事件----------------------------*/
    const onClickConfirm = () => {
        if (step === 0) {
            setStep(1)
            return
        }
        Toast.success(I18n.t('success'))
    }

    const onPressSend = () => {
        setSend(true)
    }

    /*-------------------------子视图----------------------------*/
    function renderConfirmBtn() {
        let opacity = isComplete ? 1 : 0.5;
        let marginTop = step === 0 ? Sizing.adaptionSpace(262) : Sizing.adaptionSpace(192);
        let title = step === 0 ? I18n.t('next') : I18n.t('confirm')
        return <OpacityPrimaryButton
            title={title}
            style={{...styles.btnStyle, marginTop}}
            opacity={opacity}
            callback={onClickConfirm}/>;
    }

    function renderPhone() {
        let tips=step===1?I18n.t('mine_input_new_phone_tip'):I18n.t('current_current_phone_tip')
        let placeholder=step===1?I18n.t('input_new_phone_placeholder'):I18n.t('input_current_phone_placeholder')
        return <View style={styles.inputPhoneStyle}>
            <Text style={styles.tipTextStyle}>{tips}</Text>
            <View style={styles.inputContainerStyle}>
                <TextInput
                    style={styles.inputStyle}
                    placeholder={placeholder}
                    onChangeText={(text) => {
                        onChangeText(text, 0)
                    }}
                />
            </View>
        </View>
    }

    /*-------------------------主视图----------------------------*/
    return (
        <SafeAreaView style={styles.container}>
            <NavHeader title={I18n.t("bind_phone")}/>
            <ScrollView style={styles.scrollStyle}>
                {renderPhone()}
                {step === 1 && <InputVerifyCode/>}
                {renderConfirmBtn()}
            </ScrollView>
        </SafeAreaView>
    );
};
export const BindPhone = connect(state => ({
    localeEnv: state[Models.home].localeEnv,
}))(BindPhonePage);
export default BindPhone;

export const InputVerifyCode = () => {
    const [time,setTime]=React.useState(60)
    const [hasError,setHasError]=React.useState(false)
    const onChangeText = (text,type) => {}
    const onPressSend = () => {}
    let title = time<60 ? I18n.t('re_send') : I18n.t('send_code')
    return (<View>
        <View style={styles.inputCodeStyle}>
            <TextInput
                style={styles.inputStyle}
                placeholder={I18n.t('input_code')}
                onChangeText={(text) => {
                    onChangeText(text, 0)
                }}
            />
            <View style={styles.lineStyle}/>
            <DoubleClick
                onPress={onPressSend}
                style={styles.sendBtnStyle}>
                <Text>{title}{time<60&&<Text>{`(${time})`}</Text>}</Text>
            </DoubleClick>
        </View>
        {hasError && <Text style={[styles.errorTipTextStyle]}>{I18n.t('code_error')}</Text>}
    </View>)
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.neutral.white,
    },
    scrollStyle: {
        ...Layout.flex.column,
        backgroundColor: Colors.neutral.grayF8,
        paddingHorizontal:Sizing.t20
    },
    btnStyle: {
        width: Sizing.adaptionSpace(335),
        height: Sizing.adaptionSpace(44),
        alignSelf: 'center'
    },
    tipTextStyle: {
        fontSize: Sizing.t16,
        color: Colors.neutral.gray66
    },
    inputContainerStyle: {
        marginTop: Sizing.adaptionSpace(30),
        borderBottomColor: Colors.neutral.gray66,
        borderBottomWidth: 1
    },
    inputStyle: {
        padding: 0,
        color: Colors.neutral.gray33,
        flex: 1,
    },
    inputPhoneStyle: {
        marginTop: Sizing.adaptionSpace(60),
    },
    inputCodeStyle: {
        ...Layout.flex.row,
        marginTop: Sizing.adaptionSpace(30),
        borderBottomColor: Colors.neutral.gray66,
        borderBottomWidth: 1
    },
    errorTipTextStyle: {
        fontSize: Sizing.t12,
        color: Colors.neutral.red,
        marginTop: Sizing.t4
    },
    lineStyle: {
        height: Sizing.t18,
        width: 1,
        borderRadius: 1,
        backgroundColor: Colors.neutral.gray99,
        alignSelf: 'flex-end',
        marginBottom: 2
    },
    sendBtnStyle: {
        alignSelf: 'flex-end',
        marginBottom: 2,
        marginLeft: 6
    }
});
