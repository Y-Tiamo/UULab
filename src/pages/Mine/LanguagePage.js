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
import {Image, ScrollView, StyleSheet, Text} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {Colors, Layout, Sizing} from "../../common/styles";
import {NavHeader} from "../../components/navHeader.component";
import {SOURCE_LANGUAGE_SELECT,} from "../../common/ImageSource";
import {connect} from "react-redux";
import Models from "../../models";
import I18n from "react-native-i18n";
import DoubleClick from "../../common/components/DoubleClick";
import ActionService from "../../common/ActionService";

const LanguagePage = () => {
    const MENU = [
        {title: '简体中文', language: 'zh-Hans-CN', env: 'zh-CN'},
        {title: '繁体中文', language: 'zh-Hant-TW', env: 'zh-TW'},
        {title: 'English', language: 'en-US', env: 'en'},
    ]
    const [language, setLanguage] = React.useState(I18n.locale)
    React.useEffect(() => {
        console.log(language)
    }, [])
    /*-------------------------生命周期-------------------------*/
    /*-------------------------API----------------------------*/

    /*-------------------------回调事件------------------------*/
    function onClick(index) {
        setLanguage(MENU[index].language)
        let type = MENU[index].env
        I18n.locale = type;
        ActionService.dispatch({
            type: "home/updateLocaleEnv",
            payload: {language: type},
        });
    }

    /*-------------------------事件----------------------------*/
    /*-------------------------子视图----------------------------*/
    /*-------------------------主视图----------------------------*/
    return (
        <SafeAreaView style={styles.container}>
            <NavHeader title={I18n.t("language")}/>
            <ScrollView contentContainerStyle={styles.scrollStyle}>
                {MENU.map((item, index) => {
                    let isSelect = language === item.language || language === item.env
                    return (<DoubleClick
                        onPress={() => {
                            onClick(index)
                        }}
                        key={String(item) + index} style={styles.itemStyle}>
                        <Text style={isSelect ? styles.enuSelectTitleStyle : styles.enuTitleStyle}>{item.title}</Text>
                        {isSelect && <Image source={SOURCE_LANGUAGE_SELECT}/>}
                    </DoubleClick>)
                })}
            </ScrollView>
        </SafeAreaView>
    );
};
export const Language = connect(state => ({
    localeEnv: state[Models.home].localeEnv,
}))(LanguagePage);
export default Language;


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
    enuSelectTitleStyle: {
        color: Colors.theme.primary,
        fontSize: Sizing.t14,
    },
    contentStyle: {
        color: Colors.neutral.gray66,
        fontSize: Sizing.t12,
        marginRight: Sizing.t10
    },
});
