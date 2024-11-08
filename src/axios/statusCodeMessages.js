/*
 * 本文件提供所有构建由网络请求产生的站内消息的函数
 * 具体来说，构建每个页面内的AlertSet变量
 * alertSet:{
 *        state:false/true,
 *        color:'success/error/info/warning',
 *        title:'',
 *        content:''
 * },
 */

const statusCodeMessages = {
  // 通用状态码
  common: {
    200: {
      color: 'success',
      title: '成功',
      state: true,
      content: '请求成功'
    },
    400: {
      color: 'error',
      title: '请求错误',
      state: true,
      content: '请求参数错误或缺失。'
    },
    401: {
      color: 'error',
      title: '未授权',
      state: true,
      content: '未授权，用户未登录或登录信息无效。'
    },
    403: {
      color: 'error',
      title: '权限不足',
      state: true,
      content: '权限不足，用户无权进行该操作。'
    },
    404: {
      color: 'error',
      title: '未找到',
      state: true,
      content: '资源不存在，用户或验证码未找到。'
    },
    500: {
      color: 'error',
      title: '服务器错误',
      state: true,
      content: '服务器内部错误。'
    }
  },
  // 登录相关状态码
  login: {
    200: {
      color: 'success',
      title: '登录成功',
      state: true,
      content: '登录成功。'
    },
    401: {
      color: 'error',
      title: '用户名或密码错误',
      state: true,
      content: '用户名或密码错误。'
    },
    423: {
      color: 'warning',
      title: '账号被锁定',
      state: true,
      content: '账号被锁定，例如因多次登录失败。'
    },
    429: {
      color: 'warning',
      title: '请求过多',
      state: true,
      content: '登录请求过多，例如短时间内多次尝试登录。'
    }
  },
  // 注册相关状态码
  register: {
    201: {
      color: 'success',
      title: '注册成功',
      state: true,
      content: '注册成功，用户已创建。'
    },
    400: {
      color: 'error',
      title: '注册信息有误',
      state: true,
      content: '注册信息有误，例如用户名或邮箱格式不正确。'
    },
    409: {
      color: 'error',
      title: '注册冲突',
      state: true,
      content: '注册冲突，例如用户名或邮箱已存在。'
    },
    429: {
      color: 'warning',
      title: '请求过多',
      state: true,
      content: '注册请求过多，例如短时间内多次尝试注册。'
    }
  },
  // 验证码相关状态码
  captcha: {
    200: {
      color: 'success',
      title: '验证码成功',
      state: true,
      content: '验证码发送成功或验证成功。'
    },
    400: {
      color: 'error',
      title: '验证码格式错误',
      state: true,
      content: '验证码格式错误或验证请求参数错误。'
    },
    404: {
      color: 'error',
      title: '验证码未找到',
      state: true,
      content: '验证码未找到或已过期。'
    },
    429: {
      color: 'warning',
      title: '请求过多',
      state: true,
      content: '验证码请求过多，例如短时间内多次请求验证码。'
    },
    410: {
      color: 'warning',
      title: '验证码已过期',
      state: true,
      content: '验证码已过期，需重新请求。'
    }
  },
  // 点赞和收藏相关的状态码
  like: {
    200: {
      color: 'success',
      title: '操作成功',
      state: true,
      content: '点赞/收藏成功。'
    },
    201: {
      color: 'success',
      title: '操作成功',
      state: true,
      content: '取消点赞/收藏成功。'
    },
    400: {
      color: 'error',
      title: '操作失败',
      state: true,
      content: '点赞/收藏失败，可能参数有误或网络断开。'
    },
    401: {
      color: 'error',
      title: '操作失败',
      state: true,
      content: '取消点赞/收藏失败，可能参数有误或网络断开。'
    }
  },
  // 拉黑与解除拉黑的相关状态码
  block: {
    200: {
      color: 'success',
      title: '拉黑成功',
      state: true,
      content: '拉黑用户成功。'
    },
    201: {
      color: 'success',
      title: '解除拉黑成功',
      state: true,
      content: '解除拉黑成功。'
    },
    400: {
      color: 'error',
      title: '操作失败',
      state: true,
      content: '拉黑用户/解除拉黑失败，可能参数有误或网络断开。'
    },
    401: {
      color: 'error',
      title: '不能拉黑自己',
      state: true,
      content: '不能拉黑自己。'
    },
    402: {
      color: 'error',
      title: '用户已拉黑',
      state: true,
      content: '该用户已经被拉黑，不能重复拉黑。'
    },
    403: {
      color: 'error',
      title: '用户未拉黑',
      state: true,
      content: '该用户还未被拉黑，不能解除拉黑。'
    }
  },
  // 课程评分与修改评分操作相关的状态码
  rating: {
    200: {
      color: 'success',
      title: '评分成功',
      state: true,
      content: '提交评分成功。'
    },
    201: {
      color: 'success',
      title: '评分修改成功',
      state: true,
      content: '修改评分成功。'
    },
    400: {
      color: 'error',
      title: '操作失败',
      state: true,
      content: '提交/修改评分失败，可能参数有误或网络断开。'
    },
    401: {
      color: 'error',
      title: '操作无效',
      state: true,
      content: '还没有进行评分，不能进行修改操作。'
    },
    402: {
      color: 'error',
      title: '评分格式错误',
      state: true,
      content: '评分格式错误（分数大于5或小于1），不能提交/修改评分。'
    },
    403: {
      color: 'error',
      title: '操作失败',
      state: true,
      content: '用户已被封禁，无法提交/修改评分。'
    }
  }
};
const unknowError={
  color:'error',
  title:'网络错误',
  state:true,
  content:'网络错误，检查网络后若仍无法工作，请联系管理员'
}
export function getStatusMessage(operationType, statusCode) {
  console.log(statusCode)
  if(statusCode==-1){//对-1的特殊处理
    return { ...unknowError };
  }
  const messages = statusCodeMessages[operationType] || statusCodeMessages.common;
  return { ...messages[statusCode] || {
    color: 'error',
    title: '未知错误',
    state: true,
    content: '未定义的状态码。'
  }};
}