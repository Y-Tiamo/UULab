import React from "react";
import { Base64, isIOS, RondomPass } from "../common/Base";
import AuthToken from "../common/AuthTokenTool";
import TextUtils from "../common/TextUtils";
import { md5 } from "../common/md5";

// 线上地址
export const BaseUrl = 'https://app.baidu.com';
export const BaseUrlTest = 'https://app.baidu.com';
const APPID = 'appid';
const APP_Key = '';

// 接口调用反馈code
export const NetCode = {
  NET_FAILURE: -900,
  NET_SUCCESS: 200,
  SERVICE_FAILURE: 500,
  NET_TIME_OUT: 408,
  SECTION_FAILURE: 401,
};

export const ReqType = {
  Post: 'POST',
  Get: 'GET',
};

/**----------------------------------------------------------------*/

export class APIManager {
  /**
   * 获取接口访问地址
   * @returns {string}
   * @constructor
   */
  GetUrl() {
    let url = BaseUrl;
    if (__DEV__) {
      url = BaseUrlTest;
    }
    return url;
  }

  /**
   * 按照key字母顺序排序
   * @param jsonData
   * @returns {APIManager.JsonSort.props|{}}
   * @constructor
   */
  JsonSort(jsonData) {
    try {
      let tempJsonObj = {};
      let sdic = Object.keys(jsonData).sort();
      sdic.map((item, index) => {
        tempJsonObj[item] = jsonData[sdic[index]];
      });
      return tempJsonObj;
    } catch (e) {
      return jsonData;
    }
  }
  /**
   * 拼接params 参数
   * @param params
   * @returns {string}
   */
  parseParams(params) {
    let pm = '';
    let index = 0;
    if (params) {
      for (const key in params) {
        let value = params[key] + '';
        pm = `${pm + (index === 0 ? '' : '&') + key}=${value.trim()}`;
        index++;
      }
    }
    return pm;
  }

  /**
   * 拼接头部
   * @param param
   * @param ReqType
   * @returns {{method: string, mode: string, headers: {"Content-Type": string}, body: string}}
   * @constructor
   */
  ReqContent(param = {}, ReqType) {
    let params = Object.assign(
      {
        timestamp: (new Date().getTime() / 1000).toFixed(0),
        mock: '0',
        appid: APPID,
        nonce: RondomPass(10),
      },
      param,
    );
    const platform = isIOS() ? 'iOS' : 'Android';
    // 加密签名sign
    let access_token = !TextUtils.isNull(global.AuthToken);
    let member_id = !TextUtils.isNull(global.UserId);
    // authentication
    let authentication = '';
    if (access_token && member_id) {
      authentication = 'USERID ' + Base64.encode(`${APPID}-${global.AuthToken}-${global.UserId}`);
    }
    let sort = `${this.parseParams(this.JsonSort(params))}&app_secret=${APPID}`;
    let sign = md5(sort);
    params.sign = sign;
    param = this.parseParams(params);
    return {
      method: ReqType,
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'app-type': platform,
        authentication: authentication || '',
      },
      dataType: 'json',
      body: param,
    };
  }
  /**
   * 真正的网络请求入口
   * @param apiName
   * @param params
   * @param ReqType
   * @returns {Promise<*>}
   */
  async netFetch(apiName, params, ReqType) {
    let reqContent = await this.ReqContent(params, ReqType);
    let fetchUrl = `${this.GetUrl()}/${apiName}`;
    // 有网络
    return new Promise((resolve, reject) => {
      // 超时管理
      const timeoutId = setTimeout(() => {
        reject(
          {
            status: NetCode.NET_TIME_OUT,
            message: 'Connection timeout',
          },
          clearTimeout(timeoutId),
        );
      }, 15000);
      return fetch(fetchUrl, reqContent)
        .then(r => {
          clearTimeout(timeoutId);
          return r.json();
        })
        .then(data => {
          console.log(
            '---------------API_LOG_BEGIN----------------\n',
            'url:',
            fetchUrl,
            '\n',
            'head:',
            reqContent,
            '\n',
            'params:',
            params,
            '\n',
            'result:',
            data,
            '\n---------------API_LOG_END----------------\n',
          );
          if (parseInt(data.code) === NetCode.NET_SUCCESS) {
            resolve({ status: NetCode.NET_SUCCESS, data: data.data });
          } else {
            if (parseInt(data.code) === NetCode.SECTION_FAILURE) {
              AuthToken.handleSessionFailure();
            }
            reject({ status: NetCode.SERVICE_FAILURE, message: data.message });
          }
        })
        .catch(err => {
          timeoutId && clearTimeout(timeoutId);
          console.log(
            '---------------API_FAIL_LOG_BEGIN----------------\n',
            'url:',
            fetchUrl,
            '\n',
            'params:',
            params,
            '\n',
            'req:',
            reqContent,
            '\n',
            'err',
            err,
            '\n',
            '\n---------------API_FAIL_LOG_END----------------\n',
          );
          reject({ status: NetCode.NET_FAILURE, message: 'Network request failed' });
        })
        .done();
    });
  }
}
