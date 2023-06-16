class TextUtils {
  static isAllNull(arr = []) {
    if (arr.length === 0) {
      return true;
    }
    let isNotEmpty = true;
    for (const i in arr) {
      if (!this.isNull(i)) {
        isNotEmpty = false;
      }
    }
    return isNotEmpty;
  }

  static hasEmpty(arr = []) {
    if (arr.length === 0) {
      return false;
    }
    let hasEmpty = false;
    for (const i in arr) {
      if (this.isNull(arr[i])) {
        hasEmpty = true;
        break;
      }
    }
    return hasEmpty;
  }

  static isEmptyStr(str){
    return !/[^\s]/.test(str)
  }

  static isNull(obj) {
    try {
      if (obj === null) {
        return true;
      }
      if (obj === undefined) {
        return true;
      }
      if (obj === '') {
        return true;
      }
      if (obj.length === 0) {
        return true;
      }
      return false;
    } catch (e) {
      return true;
    }
  }
  //隐藏姓名
  static hiddenName(name){
    let newStr;
    if (name.length === 2) {
      newStr = name.substr(0, 1) + '*';
    } else if (name.length > 2) {
      let char = '';
      for (let i = 0, len = name.length - 2; i < len; i++) {
        char += '*';
      }
      newStr = name.substr(0, 1) + char + name.substr(-1, 1);
    } else {
      newStr = name;
    }
    return newStr;
  }
  // 隐藏电话
  static hiddenNumber(phone){
    let newPhone = phone+'';
    let regPhone = /^(\d{3})\d{4}(\d{4})$/;
    newPhone.trim().replace(regPhone, "$1****$2");
    return newPhone;
  }

  /**a
   * 判断对象是否是空
   * @param e
   * @returns {boolean}
   */
  static isEmptyObject(e) {
    let t;
    for (t in e) return !1;
    return !0;
  }
}

export default TextUtils;
