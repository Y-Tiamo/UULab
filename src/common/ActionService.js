/**
 * desc：DVA action service
 * author：cuichangyun
 * date: 2021/12/16
 *
 * * * * * * * * * * * * * * * * * * *
 * Function:
 *
 *
 *
 *
 *
 * * * * * * * * * * * * * * * * * * *
 */


let _dvaRouterDispatch;


function setTopLevelDispatch(dispatch) {
  _dvaRouterDispatch = dispatch;
}

function dispatch(action={type:'',payload:{}}){
  if (action && action.type){
    action.payload = action.payload || {};
    _dvaRouterDispatch.dispatch(action);
  }else {
    console.warn('action 不能为空');
  }
}
function getStore(){
  return _dvaRouterDispatch;
}
export default {
  dispatch,
  setTopLevelDispatch,
  getStore
}
