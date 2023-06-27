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
import {Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import DoubleClick from "../../common/components/DoubleClick";
import {Colors, Layout, Sizing} from "../../common/styles";
import {NavHeader} from "../../components/navHeader.component";
import {
    SOURCE_ADD_DEVICE_ERROR, SOURCE_APP_LOGO,
    SOURCE_ARROW_DOWN_GRAY, SOURCE_ARROW_RIGHT_GRAY,
    SOURCE_BG_ADD_DEVICE,
    SOURCE_SCAN_GRAY,
} from "../../common/ImageSource";
import {PrimaryButtonWithBorder} from "../../components/primaryButton.component";
import {connect} from "react-redux";
import Models from "../../models";
import I18n from "react-native-i18n";
import NavigationService from "../../common/NavigationService";

const BindPhonePage = () => {
    /*-------------------------生命周期-------------------------*/
    /*-------------------------API----------------------------*/
    /*-------------------------回调事件------------------------*/
    /*-------------------------事件----------------------------*/
    /*-------------------------子视图----------------------------*/
    /*-------------------------主视图----------------------------*/
    return (
        <SafeAreaView style={styles.container}>
            <NavHeader title={I18n.t("mine_person_center")}/>
            <ScrollView contentContainerStyle={styles.scrollStyle}>

            </ScrollView>
        </SafeAreaView>
    );
};
export const BindPhone = connect(state => ({
    localeEnv: state[Models.home].localeEnv,
}))(BindPhonePage);
export default BindPhone;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.neutral.white,
    },
    scrollStyle: {
        flex: 1,
        backgroundColor: Colors.neutral.grayF8,
        ...Layout.mainAxis.center
    },
});
