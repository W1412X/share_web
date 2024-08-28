# API
## 登陆  
### 密码登陆
#### 请求地址  `/login/passwd`
#### 请求方式  POST
#### 参数
| 字段 | 必选 | 类型 | 备注 |  
|---|---|---|---| 
| userName | true | string | 用户名称 |
| 密码 | true | string | 用户密码 |
#### 返回
| 字段 | 类型 | 备注 |
|-|-|-|
| code | int | 状态码 |
| token | string | 认证令牌，独立于cookie，可以访问用户资源，跨域，无状态，第三方 |
### 邮箱登陆
#### 请求地址 `/login/email`
- 发送验证码部分
  - 获取验证码 
    | 字段 | 类型 | 备注 |
    |-|-|-|
    | 邮箱 | String | 邮箱地址 |
  - 返回
    | 字段 | 类型 | 备注 |
    |-|-|-|
    | code | int | 状态码 |
- 验证部分  
  - 请求
    | 字段 | 类型 | 备注 |
    |-|-|-|
    | 邮箱 | String | 邮箱地址 |
  - 返回
    | 字段 | 类型 | 备注 |
    |-|-|-|
    | token | string | 认证令牌，独立于cookie，可以通过访问用户资源 |
    | code | int | 状态码 |
### token登陆(可选，无需)
>
#### 请求地址 `/login/token`
#### 请求方式  POST
#### 参数
| 字段 | 类型 | 备注 |
| --- | --- | --- |
| token | string | token |

#### 返回
| 字段 | 类型 | 备注 |
| --- | --- | --- |
| code | int | 状态码 |

#### 请求地址
## 主页  
### 文章列表 
#### 请求地址 `/index/article_list`
#### 请求方式 GET 
#### 参数  

| 字段 | 必选 | 类型 | 备注 |  
|---|---|---|---|  
| keyword | false | string | 关键字字段，无此字段获取默认列表 |
| page | false | int | 页数，无此字段默认首页 |
| pageNum | false | int | 每页项目数，无此字段默认20 |


#### 返回 

| 字段 | 类型 | 备注 |
|-|-|-|
| list | array | 文章对象列表 |
| code | int | 状态码 |

#### 返回 list 子项

| 字段 | 类型 | 备注 |
|---|---|---|
| aid | int | 文章id |
| title | string | 文章标题 |
| imgUrl | String | 文章封面图片地址 |
| description | String | 文章简介 |
| tag | Array | 标签组 |
| publishTime | String | 上一次编辑时间的字符串 |
| authorName | String | 作者名称 |
| profileUrl | String | 作者头像地址 |
| viewCount | int | 浏览量 |

#### list子项的tag子项
| 字段 | 类型 | 备注 |
|---|---|---| 
| / | String | 均为单个字符串 |
### 课程列表  
#### 请求地址 `/index/course_list` 
#### 请求方式 `GET`
#### 参数
| 字段 | 必选 | 类型 | 备注 |  
|---|---|---|---|  
| keyword | false | string | 关键字字段，无此字段获取默认列表 |
| page | false | int | 页数，无此字段默认首页 |
| pageNum | false | int | 每页项目数，无此字段默认20 |

#### 返回 

| 字段 | 类型 | 备注 |
|-|-|-|
| list | array | 课程对象列表 |
| code | int | 状态码 |


#### 返回list子项  
| 字段 | 类型 | 备注 |
|-|-|-|
| id | int | 课程id |
| name | string | 课程名称 |
| teacher | string | 授课教师 |
| teachMethod | string | 授课方式 |
| examineMethod | String | 考核方式 |
| teachTime | String | 上课学期 |
| publishTime | String | 编辑时间 |
## 状态码
| 状态码 | 状态信息 |
|---|---|
| 0  | 请求成功 |
| 101 | 请求失败 |

## 个人页面 
### 收藏文章列表 
#### 请求地址 `/user/star_article_list`
#### 请求方式 GET 
#### 参数  
| 字段 | 必选 | 类型 | 备注 |  
| --- | --- | --- | --- |
| page | false | int | 页数，默认首页 |
| pageNum | false | int | 每页的项目数，默认20页 |
#### 返回  
- 同list+
