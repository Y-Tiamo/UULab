import React from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

class DeviceStorage {
  /**
   * 获取
   * @param key
   * @returns {Promise<T>|*|Promise.<TResult>}
   */
  static get(key) {
    return AsyncStorage.getItem(key).then(value => {
      const jsonValue = JSON.parse(value);
      return jsonValue;
    });
  }

  /**
   * 保存
   * @param key
   * @param value
   * @returns {*}
   */
  static save(key, value) {
    return AsyncStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * 更新
   * @param key
   * @param value
   * @returns {Promise<T>|Promise.<TResult>}
   */
  static update(key, value) {
    return DeviceStorage.get(key).then(item => {
      value = typeof value === 'string' ? value : { ...item, ...value };
      return AsyncStorage.setItem(key, JSON.stringify(value));
    });
  }

  static clear() {
    AsyncStorage.clear();
  }

  /**
   * 删除
   * @param key
   * @returns {*}
   */
  static delete(key) {
    return AsyncStorage.removeItem(key);
  }

  /**
   * 保存一个Json对象
   * @param key
   * @param value
   * @param callback
   */
  static async saveJsonObject(key, value) {
    return await this.saveString(key, JSON.stringify(value));
  }

  /**
   * 获取一个Json对象
   * @param key
   * @param defaultObject
   */
  static async getJsonObject(key, defaultObject) {
    let result = null;
    try {
      result = await this.getString(key, null);
      result = await JSON.parse(result);
    } catch (err) {
      if (defaultObject) {
        return Promise.resolve(defaultObject);
      }
      return Promise.reject(err);
    }
    return result;
  }

  /**
   * 保存一个值
   * @param key
   * @param value
   */
  static async saveString(key, value) {
    if (key != null && value != null) {
      // Key 与Value 都不为空
      try {
        await AsyncStorage.setItem(key, value);
      } catch (err) {
        return Promise.reject(err);
      }
      return Promise.resolve(true);
    }
    return Promise.reject({ msg: 'Key and value can not be null' });
  }

  /**
   * 获取一个值
   * @param key
   * @param defaultValue
   */
  static async getString(key, defaultValue) {
    let result = null;
    const noDataError = { msg: 'No value found !' };
    if (key != null) {
      result = await AsyncStorage.getItem(key);
      return result || (defaultValue != null ? defaultValue : Promise.reject(noDataError));
    }
    if (defaultValue) {
      return Promise.resolve(defaultValue);
    }
    return Promise.reject(noDataError);
  }

  /**
   * 移除一个值
   * @param key
   */
  static async remove(key) {
    let result = true;
    try {
      result = await AsyncStorage.removeItem(key);
    } catch (err) {
      return Promise.reject(err);
    }
    return result;
  }

  /**
   * 获取所有已存储
   */
  static async getAllKeys() {
    let result = true;
    try {
      result = await AsyncStorage.getAllKeys();
    } catch (err) {
      return Promise.reject(err);
    }
    return result;
  }
}

export default DeviceStorage;
