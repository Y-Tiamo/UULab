import { PixelRatio, Dimensions, Platform, Linking } from "react-native";
import TextUtils from "./TextUtils";

export let screenW = Dimensions.get("window").width;
export let screenH = Dimensions.get("window").height;
export let pixelRatio = PixelRatio.get();
//像素密度
export const DEFAULT_DENSITY = 2;
//px转换成dp
//以iphone6为基准,如果以其他尺寸为基准的话,请修改下面的750和1334为对应尺寸即可.
const w2 = 750 / DEFAULT_DENSITY;
//px转换成dp
const h2 = 1334 / DEFAULT_DENSITY;

// iPhoneX
const X_WIDTH = 375;
// const X_HEIGHT = 812;
export const CryptoJS = require("crypto-js");
let forge = require("node-forge"); //加密

//随机数生成 RondomPass(10);
export function RondomPass(len) {
  len = len || 32;
  let chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz123456789";
  let maxPos = chars.length;
  let pwd = "";
  for (let i = 0; i < len; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;

}

export function inputComplete(...args){
  let isComplete=true
  if (args.length===0){
    return isComplete
  }
  args.map(arg=>{
    if (TextUtils.isEmptyStr(arg)){
      isComplete=false
    }
  })
  return isComplete
}

/**
 * 手机号隐藏中间四位
 * @param tel:18808088080
 * @returns {188****8080}
 */
export function getTel(tel) {
  let reg = /^(\d{3})\d{4}(\d{4})$/;
  return tel.replace(reg, "$1****$2");
}


/**
 * 设置字体的size（单位px）
 * @param size 传入设计稿上的px
 * @returns {Number} 返回实际sp
 */
export function setSpText(size) {
  let scaleWidth = screenW / w2;
  let scaleHeight = screenH / h2;
  let scale = Math.min(scaleWidth, scaleHeight);
  size = Math.round(size * scale + 0.5);
  return size / DEFAULT_DENSITY;
}

/**
 * 屏幕适配,缩放size
 * @param size
 * @returns {Number}
 */
export function scale(size) {
  return Math.floor(size * (screenW / X_WIDTH));
}

/**a
 * 判断对象是否是空
 * @param e
 * @returns {boolean}
 */
export function isEmptyObject(e) {
  let t;
  for (t in e) return !1;
  return !0;
}

/**a
 * 判断属性是否是空
 * @param e
 * @returns {boolean}
 */
export function isEmpty(source) {
  return source === null || typeof source === undefined || source === "";
}

export function CallPhone(mobile) {
  if (mobile.length > 0) {
    let url = "tel: " + mobile;
    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          console.log("Can't handle url: " + url);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch(err => {
      });
  }
}

/**
 * 将 数字单位m 转换为字符单位m/km
 * @param distance
 * @returns {number | *}
 */
export function numberToMandKM(distance) {
  distance = parseInt(distance + "");
  if (distance < 1000) {
    distance = distance + "m";
  } else if (distance > 1000) {
    distance = (Math.round(distance / 100) / 10).toFixed(1) + "km";
  }
  return distance;
}

/**
 * 将 数字单位m 转换为字符单位m/km
 * @param distance
 * @returns {number | *}
 */
export function numberToMandKMNoTipStr(distance) {
  distance = parseInt(distance + "");
  if (distance < 1000) {
    distance = distance;
  } else if (distance > 1000) {
    distance = (Math.round(distance / 100) / 10).toFixed(1);
  }
  return distance;
}

/**
 * 将 数字单位m 转换为字符单位m/km
 * @param distance
 * @returns {number | *}
 */
export function numberToMandKMNoTipunitStr(distance) {
  distance = parseInt(distance + "");
  let result = "";
  if (distance < 1000) {
    result = "米";
  } else if (distance > 1000) {
    result = "公里";
  }
  return result;
}

//转换到MD5
export function toMD5(org) {
  let md = forge.md.md5.create();
  md.update(org);
  return md.digest().toHex();
}

//AES加密
export function enAES(someBytes) {
  // Encrypt
  let aes = CryptoJS.AES.encrypt(someBytes, "123");
  console.log(aes);
  return aes.toString();
}

//AES解密
export function deAES(encrypted) {
  // Decrypt
  let bytes = CryptoJS.AES.decrypt(encrypted, "123");
  let plaintext = bytes.toString(CryptoJS.enc.Utf8);
  console.log(plaintext);
  return plaintext;
}

//时间处理
Date.prototype.format = function(format) {
  let date = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    "S+": this.getMilliseconds(),
  };
  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (let k in date) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length),
      );
    }
  }
  return format;
};

//获取时间差 current:1497235409744 当前时间  start:1497235419744 开始时间
export function getRemainingime(current, start) {
  let time = start - current;
  if (time < 0) {
    return ["0", "0", "0", "0", "0", "0"];
  }
  let year = Math.floor(time / (365 * 30 * 24 * 3600 * 1000)); //年

  let month = Math.floor(time / (30 * 24 * 3600 * 1000)); //月

  let days = Math.floor(time / (24 * 3600 * 1000)); //日
  let temp1 = time % (24 * 3600 * 1000);
  let temp2 = temp1 % (3600 * 1000);
  let minutes = Math.floor(temp2 / (60 * 1000)); //分
  let hours = Math.floor(temp1 / (3600 * 1000)); //时
  let temp3 = temp2 % (60 * 1000);
  let seconds = Math.round(temp3 / 1000); //秒

  let strs = [year, toNormal(month), toNormal(days), toNormal(hours), toNormal(minutes), toNormal(seconds)];
  return strs; //["0", "0", "2", "7", "33", "30"]0年0月2日 7时33分30秒
}

//1497235419
export function getRemainingimeDistance(distance) {
  let time = distance * 1000;
  if (time < 0) {
    return ["0", "0", "0", "0", "0", "0"];
  }

  let year = Math.floor(time / (365 * 30 * 24 * 3600 * 1000)); //年

  let month = Math.floor(time / (30 * 24 * 3600 * 1000)); //月

  let days = Math.floor(time / (24 * 3600 * 1000)); //日
  let temp1 = time % (24 * 3600 * 1000);
  let hours = Math.floor(temp1 / (3600 * 1000)); //时
  let temp2 = temp1 % (3600 * 1000);
  let minutes = Math.floor(temp2 / (60 * 1000)); //分
  let temp3 = temp2 % (60 * 1000);
  let seconds = Math.round(temp3 / 1000); //秒

  let strs = [year, toNormal(month), toNormal(days), toNormal(hours), toNormal(minutes), toNormal(seconds)];
  // strs.splice(0, 1, String(Number(strs[0]) - 1970));//年
  // strs.splice(1, 1, String(Number(strs[1]) - 1));
  // strs.splice(2, 1, (Number(strs[2]) - 1) < 10 ? '0' + (Number(strs[2]) - 1) (Number(strs[2]) - 1));
  // strs.splice(3, 1, (Number(strs[3]) - 8) < 10 ? '0' + (Number(strs[3]) - 8) (Number(strs[3]) - 8));
  // strs.splice(4, 1, Number(strs[4]) < 10 ? '0' + Number(strs[4]) (Number(strs[4])));
  // strs.splice(5, 1, Number(strs[5]) < 10 ? '0' + Number(strs[5]) (Number(strs[5])));
  return strs; //["0", "0", "2", "7", "33", "30"]0年0月2日 7时33分30秒
}

export function toNormal(time) {
  return time >= 10 ? time : "0" + time;
}

//转换成日期
export function toDate(timestamp, format1 = "yyyy-MM-dd hh:mm:ss") {
  try {
    if (timestamp > 10000000) {
      let date = new Date();
      date.setTime(timestamp);
      return date.format(format1); //2014-07-10 10:21:12
    } else {
      return "";
    }
  } catch (erro) {
    return "";
  }
  return "";
}

//转换成时间搓
export function toTimestamp(date) {
  let timestamp = Date.parse(date);
  return timestamp / 1000; // 1497233827569/1000
}

//CST时间=>转换成日期yyyy-MM-dd hh:mm:ss
export function getTaskTime(strDate) {
  if (null == strDate || "" == strDate) {
    return "";
  }
  let dateStr = strDate.trim().split(" ");
  let strGMT = dateStr[0] + " " + dateStr[1] + " " + dateStr[2] + " " + dateStr[5] + " " + dateStr[3] + " GMT+0800";
  let date = new Date(Date.parse(strGMT));
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  m = m < 10 ? "0" + m : m;
  let d = date.getDate();
  d = d < 10 ? "0" + d : d;
  let h = date.getHours();
  let minute = date.getMinutes();
  minute = minute < 10 ? "0" + minute : minute;
  let second = date.getSeconds();
  second = second < 10 ? "0" + second : second;

  return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
}

//1497235419
export function getRemainingimeDistance2(distance) {
  let time = distance;
  let days = Math.floor(time / (24 * 3600 * 1000));
  let temp1 = time % (24 * 3600 * 1000);
  let hours = Math.floor(temp1 / (3600 * 1000));
  let temp2 = temp1 % (3600 * 1000);
  let minutes = Math.floor(temp2 / (60 * 1000));
  if (time <= 60 * 1000) {
    minutes = 1;
  }
  let temp3 = temp2 % (60 * 1000);
  let seconds = Math.round(temp3 / 1000);
  return [hours, minutes]; //["0", "0", "2", "7", "33", "30"]0年0月2日 7时33分30秒
}

/**
 * 判断是否为数字
 * @returns {boolean}
 */
export function ValidNumber(value) {
  let reg = new RegExp("((^[1-9]\\d*)|^0)(\\.\\d{0,2}){0,1}$");
  return reg.test(value);
}

/**
 * 判断是否为iphone
 * @returns {boolean}
 */
export function isIOS() {
  return Platform.OS === "ios";
}

/**
 * 判断是否为Android
 * @returns {boolean}
 */
export function isAndroid() {
  return Platform.OS === "android";
}

export default class ScreenUtil {
  static screenW = screenW;
  static screenH = screenH;
  static pixelRatio = pixelRatio;
  static DEFAULT_DENSITY = DEFAULT_DENSITY;

  static getMsg(code = "", message = "", callBack) {
    return getMsg(code, message, callBack);
  }

  static setSpText(size) {
    return setSpText(size);
  }

  static getRemainingimeDistance(distance) {
    return getRemainingimeDistance(distance);
  }

  static toDate(timestamp, format1 = "yyyy-MM-dd hh:mm:ss") {
    return toDate(timestamp, format1);
  }

  static toTimestamp(date) {
    return toTimestamp(date);
  }

  static getTaskTime(strDate) {
    return getTaskTime(strDate);
  }

  static getRemainingimeDistance2(distance) {
    return getRemainingimeDistance2(distance);
  }
}

// word类型的十进制数组转成十六进制字符串
export function wordArrayToHexStr(array) {
  let hexStr = "";
  for (let i = 0; i < array.length; i++) {
    let num = array[i];
    if (num < 0) {
      num = array[i] + 0x100000000;
    }
    let str = num.toString(16).toUpperCase();
    let fullStr = str;
    if (str.length < 8) {
      for (let j = 0; j < 8 - str.length; j++) {
        fullStr = "0" + fullStr;
      }
    }
    hexStr = hexStr + fullStr;
  }
  let ret = "";
  for (let i = 0; i < hexStr.length; i += 2) {
    ret = ret + hexStr.substr(i, 2) + "";
  }
  return ret.substr(0, ret.length - 1);
}

export const Base64 = {
  // private property
  _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

  // public method for encoding
  encode: function(input) {
    let output = "";
    let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    let i = 0;

    input = Base64._utf8_encode(input);

    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);

      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;

      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }

      output =
        output +
        this._keyStr.charAt(enc1) +
        this._keyStr.charAt(enc2) +
        this._keyStr.charAt(enc3) +
        this._keyStr.charAt(enc4);
    }

    return output;
  },
  _utf8_encode: function(string) {
    string = string.replace(/\r\n/g, "\n");
    let utftext = "";

    for (let n = 0; n < string.length; n++) {
      let c = string.charCodeAt(n);

      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if (c > 127 && c < 2048) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }

    return utftext;
  },

};
