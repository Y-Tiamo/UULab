/**
 * Desc：
 * Author：YYQ
 * Date: 2023/6/27
 *
 * * * * * * * * * * * * * * * * * * *
 * Content Desc:
 *
 * * * * * * * * * * * * * * * * * * *
 */
import React from "react";
import {Clipboard, Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import DoubleClick from "../../common/components/DoubleClick";
import {Colors, Layout, Sizing} from "../../common/styles";
import {NavHeader} from "../../components/navHeader.component";
import {
    SOURCE_ADD_DEVICE_ERROR,
    SOURCE_ARROW_DOWN_GRAY, SOURCE_ARROW_RIGHT_GRAY,
    SOURCE_BG_ADD_DEVICE,
    SOURCE_SCAN_GRAY,
} from "../../common/ImageSource";
import {PrimaryButtonWithBorder} from "../../components/primaryButton.component";
import {connect} from "react-redux";
import Models from "../../models";
import I18n from "react-native-i18n";
import NavigationService from "../../common/NavigationService";
import {getTel} from "../../common/Base";
import AlertOverlay from "../../container/alert.Overlay";
import Toast from "teaset/components/Toast/Toast";

const AccountSafePage = () => {
    const MENU = [
        {title: I18n.t('mine_account_safe_bind_phone'), content: getTel('19999999999'), rootName: 'BindPhonePage'},
        {title: I18n.t('mine_account_safe_log_password'), content: '', rootName: 'SetPasswordPage'},
        {title: I18n.t('mine_account_safe_delete_account'), content: '', rootName: ''},
    ]
    /*-------------------------生命周期-------------------------*/
    /*-------------------------API----------------------------*/
    /*-------------------------回调事件------------------------*/
    /*-------------------------事件----------------------------*/
    const onPressMenu = (index) => {
        if (index === 2) {
            AlertOverlay.ConfirmBottom.show(
                I18n.t('mine_delete_account_tip'),
                Colors.theme.red,
                () => {
                    Toast.success(I18n.t('mine_delete_account_success_tip'))
                }, I18n.t('confirm'))
            return
        }
        NavigationService.navigate(MENU[index].rootName)
    }
    /*-------------------------子视图----------------------------*/
    /*-------------------------主视图----------------------------*/
    return (
        <SafeAreaView style={styles.container}>
            <NavHeader title={I18n.t("mine_menu_account_safe")}/>
            <ScrollView contentContainerStyle={styles.scrollStyle}>
                {MENU.map((item, index) => {
                    return (<DoubleClick
                        onPress={() => {
                            onPressMenu(index)
                        }}
                        key={String(item) + index} style={styles.itemStyle}>
                        <Text style={styles.enuTitleStyle}>{item.title}</Text>
                        <View style={[Layout.mainAxis.center, Layout.flex.row]}>
                            <Text style={styles.contentStyle}>{item.content}</Text>
                            <Image source={SOURCE_ARROW_RIGHT_GRAY}/>
                        </View>
                    </DoubleClick>)
                })}
            </ScrollView>
        </SafeAreaView>
    );
};
export const AccountSafe = connect(state => ({
    localeEnv: state[Models.home].localeEnv,
}))(AccountSafePage);
export default AccountSafe;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.neutral.white,
    },
    scrollStyle: {
        flex: 1,
        backgroundColor: Colors.neutral.grayF8,
    },
    itemStyle: {
        backgroundColor: Colors.neutral.white,
        paddingVertical: Sizing.t16,
        ...Layout.flex.row,
        ...Layout.crossAxis.spaceBetween,
        marginTop: Sizing.t12,
        ...Layout.mainAxis.center,
        paddingHorizontal: Sizing.t20
    },
    enuTitleStyle: {
        color: Colors.neutral.gray33,
        fontSize: Sizing.t14,
    },
    contentStyle: {
        color: Colors.neutral.gray66,
        fontSize: Sizing.t12,
        marginRight: Sizing.t10
    },
});
