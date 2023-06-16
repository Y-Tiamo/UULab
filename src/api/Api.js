import { APIManager, ReqType } from "./APIManager";

/**----------------------------------------------------------------*/

/**----------------------------------------------------------------*/
class Api {
  /**
   * 用户登录-手机号、验证码
   * @param params {mobile,code}
   * @returns {Promise<*>}
   */
  user_loginWithMobileCode(params = {}) {
    const api_name = 'user/v1/loginWithMobileCode';
    return new APIManager().netFetch(api_name, params, ReqType.Post);
  }
}

const api = new Api();

export default api;
