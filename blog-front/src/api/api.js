import {get, post, uploadFile} from '@/utils/http.js'

//以api开头的url会被转发（在/config/index.js中配置）
const baseURL = {
  user: '/api/user',
  article: '/api/article',
  comment: '/api/comment',
  upload: '/api/upload',
  common: '/api/common',
}

const user = {
  login(params) {
    return post(`${baseURL.user}/login`, params);
  },
  addUser(params) {
    return post(`${baseURL.user}/addUser`, params);
  },
  updateUserInfo(params) {
    return post(`${baseURL.user}/updateUserInfo`, params);
  }
};

const article = {
  //文章内容可能会超出URL长度限制，因此无法使用get方法
  saveArticle(params) {
    return post(`${baseURL.article}/saveArticle`, params);
  },
  updateArticle(params) {
    return post(`${baseURL.article}/updateArticle`, params);
  },
  getArticleByAId(params) {
    return get(`${baseURL.article}/getArticleByAId`, params);
  },
  getArticleByTag(params) {
    return get(`${baseURL.article}/getArticleByTag`, params);
  },
  getArticleYearByTag(params) {
    return get(`${baseURL.article}/getArticleYearByTag`, params);
  }
};

const comment = {
  getCommentsByArticleId(params) {
    return get(`${baseURL.comment}/getCommentsByArticleId`, params);
  },
  saveComment(params) {
    return post(`${baseURL.comment}/saveComment`, params);
  }
}

const upload = {
  uploadFile(params) {
    return uploadFile(`${baseURL.upload}/uploadFile`, params);
  }
};

const common = {
  validate() {
    return get(`${baseURL.common}/validate`);
  }
}

//导出接口
export default {
  user, article, comment, upload, common
}
