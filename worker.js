// workers.dev 舊網址 301 轉到正式網域 otshih.com；www 也一併轉到根網域；http 一律轉 https
const CANONICAL_HOST = 'otshih.com';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname !== CANONICAL_HOST || url.protocol !== 'https:') {
      url.hostname = CANONICAL_HOST;
      url.protocol = 'https:';
      return Response.redirect(url.toString(), 301);
    }
    return env.ASSETS.fetch(request);
  },
};
