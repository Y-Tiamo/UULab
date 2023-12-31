import React from "react";
import {BackHandler, Platform, StatusBar, ToastAndroid} from "react-native";
import {NavigationActions} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import SplashPage from "./pages/SplashPage";
import MainPage from "./pages/MainPage";
import {
    createNavigationReducer,
    createReactNavigationReduxMiddleware,
    createReduxContainer,
} from "react-navigation-redux-helpers";
import {Provider} from "mobx-react/native";
import {connect} from "react-redux";
import AddDevicesPage from "./pages/Home/AddDevicePage";
import {isAndroid} from "./common/Base";
import LoginPage from "./pages/Login/LoginPage";
import SpecialArticlePage from "./pages/Common/SpecialArticlePage";
import RegisterPage from "./pages/Login/RegisterPage";
import VerifyPage from "./pages/Login/VerifyPage";
import DeviceInfoPage from "./pages/Home/DeviceInfoPage";
import ScanPage from "./pages/Common/ScanPage";
import MessageListPage from "./pages/Messages/MessageListPage";
import AccountSafePage from "./pages/Mine/AccountSafePage";
import LanguagePage from "./pages/Mine/LanguagePage";
import PermissionManagerPage from "./pages/Mine/PermissionManagerPage";
import PrivacyManagePage from "./pages/Mine/PrivacyManagePage";
import AboutAppPage from "./pages/Mine/AboutAppPage";
import UpdateLogcatPage from "./pages/Mine/UpdateLogcatPage";
import UserInfoPage from "./pages/Mine/UserInfoPage";
import ServiceCenterPage from "./pages/Mine/ServiceCenterPage";
import BindPhonePage from "./pages/Mine/BindPhonePage";
import SetPasswordPage from "./pages/Mine/SetPasswordPage";

const AppNavigator = createStackNavigator({
        SplashPage,
        MainPage,
        LoginPage,
        RegisterPage,
        VerifyPage,
        AddDevicesPage,
        DeviceInfoPage,
        SpecialArticlePage,

        ScanPage,
        MessageListPage,
        AccountSafePage,
        LanguagePage,
        PermissionManagerPage,
        PrivacyManagePage,
        AboutAppPage,
        UpdateLogcatPage,
        UserInfoPage,
        ServiceCenterPage,
        BindPhonePage,
        SetPasswordPage,
    },
    {
        defaultNavigationOptions: {
            headerShown: false,
            animationEnabled: !isAndroid(), //禁用Android的界面切换动画先解决目前界面切换会抖动问题，后期优化
            headerStyle: {
                ...Platform.OS === 'android' && {
                    height: StatusBar.currentHeight + 44,
                    paddingTop: StatusBar.currentHeight
                }
            }
        }
    });

let lastBackPressed = false;
const defaultGetStateForAction = AppNavigator.router.getStateForAction;
AppNavigator.router.getStateForAction = (action, state) => {
    if (state && action.type === NavigationActions.BACK) {
        if (Platform.OS === "android") {
            if (state.routes[state.index].routeName === "MainPage") {
                if (lastBackPressed + 2000 < Date.now()) {
                    ToastAndroid.show("再按一次退出", ToastAndroid.SHORT);
                    lastBackPressed = Date.now();
                    const routes = [...state.routes];
                    return {
                        ...state,
                        ...state.routes,
                        index: routes.length - 1,
                    };
                }
                BackHandler.exitApp();
            }
        }
    }
    return defaultGetStateForAction(action, state);
};

export const routerReducer = createNavigationReducer(AppNavigator);
export const routerMiddleware = createReactNavigationReduxMiddleware(state => state.router);
const App = createReduxContainer(AppNavigator);
@connect(({router}) => ({router}))
export default class Router extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {dispatch, router} = this.props;
        return (
            <Provider>
                <App dispatch={dispatch} state={router}/>
            </Provider>
        );
    }
}

