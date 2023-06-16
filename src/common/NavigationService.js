import { NavigationActions ,StackActions} from 'react-navigation';
import ActionService from "./ActionService";

let _navigator;

function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef;
    ActionService.setTopLevelDispatch(navigatorRef);
}

function navigate(routeName, params) {
    if(routeName){
        _navigator.dispatch(
            NavigationActions.navigate({
                routeName,
                params,
            })
        );
        return;
    }
    _navigator.dispatch(
        NavigationActions.back({
            key:null
        })
    );
}

function replace(routeName, params) {
    if(routeName){
        _navigator.dispatch(
            StackActions.replace({
                routeName,
                params,
            })
        );
        return;
    }
    _navigator.dispatch(
        NavigationActions.back({
            key:null
        })
    );
}
function reset(routeName) {
    let resetAction = StackActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({
                routeName: routeName,
            }),
        ],
    });
    _navigator.dispatch(resetAction);
}

function navigateToTop() {
    _navigator.dispatch(
        StackActions.popToTop({
            key:null
        })
    );
}

function navigateBackPrePage() {
    let pageName = getPageNameWithIndex(2);
    navigate(pageName.routeName)
}

function navigateGetCurrentRoute() {
    return _navigator.state.nav;
}

// {key: "id-1602829215128-2",params:{},routeName: "ChatPage"}
function getPrePage() {
    return getPageNameWithIndex(1);
}

function getCurrentPage(){
    return getPageNameWithIndex(0);
}

function getPageNameWithIndex(needPage) {
    let nav = navigateGetCurrentRoute();
    const {index,routes} = nav;
    let pageIndex = index-needPage;
    pageIndex = pageIndex<0?0:pageIndex;
    if (routes.length>=(pageIndex+1)){
        return routes[pageIndex];
    }else {
        getPageNameWithIndex(needPage-1);
    }
}

// add other navigation functions that you need and export them

export default {
    navigate,replace,reset,
    navigateToTop,
    setTopLevelNavigator,
    getCurrentPage,
    getPrePage,
    navigateBackPrePage
};
