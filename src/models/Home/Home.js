export default {
  namespace: 'home',
  state: {
    localeEnv: "zh-CN", //默认语言环境
  },
  effects: {
    *updateLocaleEnv(action, { put }) {
      const { payload } = action;
      yield put({
        type: 'upState',
        payload: { localeEnv: payload.language },
      });
    }
  },
  reducers: {
    upState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
