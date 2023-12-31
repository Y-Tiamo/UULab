/**
 * @format
 */
import React from "react";
import {AppRegistry, LogBox, Text, TextInput} from "react-native";
import {name as appName} from "./app.json";
import Router, {routerMiddleware, routerReducer} from "./src/Router";
import I18n from "react-native-i18n";
import {modelsArray} from "./src/models";
import Dva from "./src/Dva";
import NavigationService from "./src/common/NavigationService";
import zhCN from "./src/common/fonts/zh-CN";
import zhTW from "./src/common/fonts/zh-TW";
import English from "./src/common/fonts/en";

const app = Dva({
    initialState: {},
    models: modelsArray,
    extraReducers: {router: routerReducer},
    onAction: [routerMiddleware],
    onError(e) {
        //常规报错提示
    },
});

I18n.defaultLocale = "zh-CN";
I18n.fallbacks = true;
I18n.translations = {
    "zh-CN": zhCN,
    "zh-TW": zhTW,
    "en":English,
};
// 防止系统字体变大导致显示异常
TextInput.defaultProps = {...TextInput.defaultProps, allowFontScaling: false};
Text.defaultProps = {...Text.defaultProps, allowFontScaling: false};

// Ignore log notification by message:
LogBox.ignoreLogs(['Warning: ...']);

// Ignore all log notifications:
LogBox.ignoreAllLogs();
const App = app.startApp(<Router/>);
const store = app.getStore();
NavigationService.setTopLevelNavigator(store);
AppRegistry.registerComponent(appName, () => App);
