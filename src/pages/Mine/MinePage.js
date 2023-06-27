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
import {Image, ImageBackground, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View} from "react-native";
import {Colors, Layout, Sizing} from "../../common/styles";
import {connect} from "react-redux";
import Models from "../../models";
import {
    SOURCE_ARROW_RIGHT_GRAY,
    SOURCE_BG_PERSON,
    SOURCE_DEFAULT_AVATAR,
    SOURCE_MENU_ABOUT,
    SOURCE_MENU_ACCOUNT_SAFE,
    SOURCE_MENU_LANGUAGE,
    SOURCE_MENU_PERMISSION,
    SOURCE_MENU_PRIVACY,
    SOURCE_MENU_PRIVACY_SIMPLE,
    SOURCE_TO_PERSON_CENTER,
    SOURCE_TO_SERVICE_CENTER,
} from "../../common/ImageSource";
import I18n from "react-native-i18n";
import DoubleClick from "../../common/components/DoubleClick";
import NavigationService from "../../common/NavigationService";
import AccountSafePage from "./AccountSafePage";
import LanguagePage from "./LanguagePage";
import PermissionManagerPage from "./PermissionManagerPage";
import PrivacyManagePage from "./PrivacyManagePage";
import AboutAppPage from "./AboutAppPage";

const MENU = [
    {title: I18n.t('mine_menu_account_safe'), icon: SOURCE_MENU_ACCOUNT_SAFE, rootName: 'AccountSafePage'},
    {title: I18n.t('mine_menu_language'), icon: SOURCE_MENU_LANGUAGE, rootName: 'LanguagePage'},
    {
        title: I18n.t('mine_menu_system_permission_manager'),
        icon: SOURCE_MENU_PERMISSION,
        rootName: 'PermissionManagerPage'
    },
    {title: I18n.t('mine_menu_user_agreement_manager'), icon: SOURCE_MENU_PRIVACY, rootName: 'PrivacyManagePage'},
    {
        title: I18n.t('mine_menu_user_agreement_simple'),
        icon: SOURCE_MENU_PRIVACY_SIMPLE,
        rootName: 'SpecialArticlePage'
    },
    {title: I18n.t('mine_menu_about_app'), icon: SOURCE_MENU_ABOUT, rootName: 'AboutAppPage'},
]
const MinePage = () => {
    /*-------------------------生命周期----------------------------*/
    /*-------------------------API----------------------------*/
    /*-------------------------回调事件----------------------------*/
    /*-------------------------事件----------------------------*/

    /*-------------------------子视图----------------------------*/
    function renderHeader() {
        return (
            <ImageBackground source={SOURCE_BG_PERSON} style={styles.headerStyle}>
                <View style={{flex: 1, alignSelf: 'flex-start', flexDirection: "row", alignItems: "center"}}>
                    <Image source={SOURCE_DEFAULT_AVATAR} style={styles.avatarStyle}/>
                    <Text style={styles.nicknameStyle}>昵称</Text>
                </View>
                <DoubleClick
                    style={styles.personBtnStyle}
                    onPress={() => {
                        NavigationService.navigate('UserInfoPage')
                    }}>
                    <Image source={SOURCE_TO_PERSON_CENTER}/>
                </DoubleClick>
                <DoubleClick
                    onPress={() => {
                        NavigationService.navigate('ServiceCenterPage')
                    }}
                >
                    <Image source={SOURCE_TO_SERVICE_CENTER} style={styles.serviceBtnStyle}/>
                </DoubleClick>
            </ImageBackground>
        );
    }

    function renderMenus() {
        return (
            <View style={styles.menuContainerStyle}>
                {MENU.map((item, index) => {
                    return (
                        <DoubleClick
                            onPress={() => {
                                if (item.rootName === 'SpecialArticlePage') {
                                    NavigationService.navigate(item.rootName, {
                                        title: I18n.t("mine_menu_user_agreement_simple"),
                                    });
                                } else {
                                    NavigationService.navigate(item.rootName)
                                }
                            }}
                            key={String(item) + index} style={styles.menuItemStyle}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Image source={item.icon} style={{marginRight: Sizing.t12}}/>
                                <Text style={styles.menuTitleStyle}>{item.title}</Text>
                            </View>
                            <Image source={SOURCE_ARROW_RIGHT_GRAY}/>
                        </DoubleClick>
                    )
                })}
            </View>
        )
    }

    /*-------------------------主视图----------------------------*/
    return (
        <>
            <StatusBar barStyle={"light-content"} translucent={true} backgroundColor={Colors.neutral.clear}/>
            <SafeAreaView style={styles.container}>
                {renderHeader()}
                <ScrollView contentContainerStyle={{flex: 1, backgroundColor: Colors.neutral.white}}>
                    {renderMenus()}
                </ScrollView>
            </SafeAreaView>
        </>
    );
};
export const Mine = connect(state => ({
    localeEnv: state[Models.home].localeEnv
}))(MinePage);
export default Mine;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.theme.primary,
    },
    avatarStyle: {
        height: Sizing.adaptionSpace(76),
        width: Sizing.adaptionSpace(76),
        borderRadius: Sizing.adaptionSpace(38),
        backgroundColor: Colors.neutral.white,
        marginHorizontal: Sizing.t14,
        marginVertical: Sizing.adaptionSpace(74),
    },
    headerStyle: {
        ...Layout.flex.column,
        ...Layout.crossAxis.spaceBetween,
        ...Layout.mainAxis.center,
        height: Sizing.adaptionSpace(305),
        width: Sizing.screen.width,
        backgroundColor: Colors.theme.primary,
    },
    nicknameStyle: {
        color: Colors.neutral.white,
        fontSize: Sizing.t16,
    },
    menuContainerStyle: {
        ...Layout.flex.full,
        backgroundColor: Colors.neutral.white,
        paddingTop: Sizing.t10
    },
    personBtnStyle: {
        position: 'absolute',
        top: Sizing.adaptionSpace(134),
        right: 0
    },
    serviceBtnStyle: {
        // position:'absolute',
        // bottom:0,
        // left: Sizing.adaptionSpace(20)
    },
    menuItemStyle: {
        ...Layout.flex.row,
        ...Layout.crossAxis.spaceBetween,
        ...Layout.mainAxis.center,
        paddingVertical: Sizing.t20,
        borderBottomWidth: 1,
        marginHorizontal: Sizing.t20,
        borderBottomColor: '#EBEDF0',
    },
    menuTitleStyle: {
        color: Colors.neutral.gray33,
        fontSize: Sizing.t16,
    },
});
