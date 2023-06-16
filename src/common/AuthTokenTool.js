import DeviceStorage from "./DeviceStorage";
import NavigationService from "./NavigationService";

/**
 * desc：AuthTokenTool
 * author：admin
 * date: 2022/2/24
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

const AuthTokenKey = 'AuthTokenKey';
const UserIdKey = 'UserId';
class AuthTokenTool {
  constructor() {}

  /**
   * 存储用户Token、userId
   * @param token
   */
  saveLoginToken(token,userId) {
    global.AuthToken = token;
    global.UserId = userId;
    DeviceStorage.saveString(AuthTokenKey, token).done();
    DeviceStorage.saveString(UserIdKey, userId).done();
  }

  /**
   * 移除用户Token
   */
  removeLoginToken(){
    DeviceStorage.remove(AuthTokenKey).done();
    DeviceStorage.remove(UserIdKey).done();
  }

  /**
   * 处理session失效
   */
  handleSessionFailure(){
    this.removeLoginToken();
    if (global.AuthToken !== ''){
      NavigationService.reset('login');
    }
    global.AuthToken = '';
  }

  /**
   * 检查是否缓存过登录AuthToken
   * @returns {Promise<unknown>}
   */
 async checkIsStorageAuthToken(){
   let result = {isLogin:true};
   try {
     let AuthToken = await DeviceStorage.getString(AuthTokenKey,'');
     let UserId = await DeviceStorage.getString(UserIdKey,'');
     global.AuthToken = AuthToken;
     global.UserId = UserId;
     if (AuthToken === '' || UserId === ''){
       result.isLogin = false;
     }
   }catch (e){
     result.isLogin = false;
   }
   return result;
  }
}
const AuthToken = new AuthTokenTool();
export default AuthToken;
