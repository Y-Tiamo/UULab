export default {
  namespace: 'home',
  state: {
    localeEnv: "zh-CN", //默认语言环境
    badgeInfo:{
      all:10,
      running: 7,
      waiting:1,
      offline:1,
      error:1
    }
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
