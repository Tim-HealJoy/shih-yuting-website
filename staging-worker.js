// 測試版 worker：直接服務靜態檔案，不做網域轉址（正式版 worker.js 才有 301）
export default {
  async fetch(request, env) {
    return env.ASSETS.fetch(request);
  },
};
