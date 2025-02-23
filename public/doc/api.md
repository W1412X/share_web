[toc]



# API：整合修订（1.4）

- 统一了命名规范，并划分了对应板块；
- 注册时，增加了校区、专业等选填项；
- 登陆成功时返回user_name,user_id,email；
- 增加了获取黑名单列表的api；
- 将私信与通知板块分开了；
- 出于规范考虑，将所有单id参数都加上了前缀；
- 添加了获取某用户对某课程评价的api；
- 创建完Article/Post/Reply之后会返回对应id，方便跳转；
- 给Post类也加一个收藏功能，毕竟提问的帖子也需要收藏一下
- 1.4.1修订：修正了**获取某个用户对某个课程的评价**中请求参数的错误；为**创建课程**新增了campus字段表示校区，college的备注更改为学院



Todo：

- 获取article时添加按tags筛选的功能
- 完善搜索功能
- 修复鉴权bug
- 文档里的类之后可能会修改，仅供参考
- 状态码待完善

## 1.账户板块（登录，登出，注册，注销）

### （0）用户的类

```python
# 继承AbstractUser, 自带id, username和password
class User(AbstractUser):
    email_code = models.IntegerField(null=True, blank=True)  # 邮箱验证码
    reputation = models.IntegerField(default=100)  # 信誉值
    all_likes = models.IntegerField(default=0)  # 收获的总点赞数
    all_views = models.IntegerField(default=0)  # 收获的总浏览量
    influence = models.IntegerField(default=0)  # 影响力因子
    master = models.BooleanField(default=False)  # 是否是管理员
    block = models.BooleanField(default=False)  # 是否被封禁
    block_end_time = models.DateTimeField(null=True, blank=True)  # 封禁结束时间
    blocklist = models.ManyToManyField('self', symmetrical=False, related_name='blocked_by', through='BlockList')  # 黑名单
    profile_url = models.CharField(max_length=255, null=True, blank=True)  # 头像的地址
    
    # 新增的字段：校区、学院、专业
    campus = models.CharField(max_length=255, null=True, blank=True)  # 校区（选填）
    college = models.CharField(max_length=255, null=True, blank=True)  # 学院（选填）
    major = models.CharField(max_length=255, null=True, blank=True)  # 专业（选填）

    def __str__(self):
        return self.username
```

---

### （1）注册

#### **url : `/index/register`**

**<1> POST `/register`**

**描述：**  
此接口用于注册，包括用户名、密码、电子邮件、邮箱验证码及其他用户信息（如校区、学院、专业，选填）的提交。

**请求参数：**

| 参数名       | 类型   | 必填 | 描述                                                        |
| ------------ | ------ | ---- | ----------------------------------------------------------- |
| `user_name`  | string | 是   | 用户名，需唯一。                                            |
| `pass_word`  | string | 是   | 用户密码。                                                  |
| `email`      | string | 是   | 用户邮箱，需唯一。                                          |
| `email_code` | string | 是   | 邮箱验证码，通过 `/register?send_code=1&email=email` 获取。 |
| `campus`     | string | 否   | 校区信息，例如：南区、北区等。                              |
| `college`    | string | 否   | 学院信息，例如：计算机学院、数学学院等。                   |
| `major`      | string | 否   | 专业信息，例如：计算机科学与技术、软件工程等。              |

**响应参数（注：之后的响应参数，如无特殊说明均使用status+message的形式）：**

| 参数名   | 类型 | 描述     |
| -------- | ---- | -------- |
| `status` | int  | 状态码。 |
| `message` | string  | 返回信息。 |

- **200 OK**: 注册成功；
- **400 Bad Request**: 注册请求的参数错误或缺失；
- **409 Conflict**: 注册冲突，例如用户名或邮箱已存在；
- **429 Too Many Requests**: 注册请求过多，例如短时间内多次尝试注册；
- **430 Invalid Email**: 邮箱格式有误，非山大邮箱；
- **431 Block Email**: 邮箱注销冷却中；
- **500 Internal Server Error**: 服务器内部错误；

**<2> GET `/register?send_code=1&email=email`**

**描述：**  
此接口用于向指定的邮箱发送验证码，用于验证用户邮箱。

**请求参数：**

| 参数名  | 类型   | 必填 | 描述           |
| ------- | ------ | ---- | -------------- |
| `email` | string | 是   | 目标邮箱地址。 |

**响应参数：**

| 参数名   | 类型 | 描述     |
| -------- | ---- | -------- |
| `status` | int  | 状态码。 |
| `message` | string  | 返回信息。 |

- **200 OK**: 验证码获取成功；
- **404 Not Found**: 验证码未找到或已过期；
- **429 Too Many Requests**: 验证码请求过多，例如短时间内多次请求验证码；
- **500 Internal Server Error**: 服务器内部错误；

---

### （2）用户名和密码登录

#### **url：`/index/login_passwd`**

**POST `/login_passwd`**

**描述：**  
用户登录接口。此接口用于登录，提交用户的用户名和密码。

**请求参数：**

| 参数名      | 类型   | 必填 | 描述             |
| ----------- | ------ | ---- | ---------------- |
| `user_name` | string | 是   | 用户名，需唯一。 |
| `pass_word` | string | 是   | 用户密码。       |

**响应参数：**

| 参数名       | 类型   | 描述               |
| ------------ | ------ | ------------------ |
| `status`     | int    | 状态码。           |
| `message`    | string | 返回信息。         |
| `user_id`    | string | 用户id。           |
| `user_name`  | string | 用户名。           |
| `email`      | string | 用户邮箱。         |

- **200 OK**: 登录成功，返回用户基本信息；
- **401 Unauthorized**: 用户名或密码错误；
- **423 Locked**: 账号被锁定，例如因多次登录失败；
- **429 Too Many Requests**: 登录请求过多，例如短时间内多次尝试登录；

---

### （3）邮箱和验证码登录

#### **url：`/index/login_email`**

**<1> POST `/login_email`**

**描述：**  
此接口用于登录，提交用户的邮箱和验证码。

**请求参数：**

| 参数名       | 类型   | 必填 | 描述                                                         |
| ------------ | ------ | ---- | ------------------------------------------------------------ |
| `email`      | string | 是   | 用户邮箱，需唯一。                                           |
| `email_code` | string | 是   | 邮箱验证码，通过 `/login_email?send_code=1&email=email` 获取。 |

**响应参数：**

| 参数名       | 类型   | 描述               |
| ------------ | ------ | ------------------ |
| `status`     | int    | 状态码。           |
| `message`    | string | 返回信息。         |
| `user_id`    | string | 用户id。           |
| `user_name`  | string | 用户名。           |
| `email`      | string | 用户邮箱。         |

- **200 OK**: 登录成功，返回用户基本信息；
- **401 Unauthorized**: 邮箱或验证码错误；
- **423 Locked**: 账号被锁定，例如因多次登录失败；
- **429 Too Many Requests**: 登录请求过多，例如短时间内多次尝试登录；

**<2> GET `/login_email?send_code=1&email=email`**

**描述：**  
此接口用于向指定的邮箱发送验证码，用于验证用户邮箱。

**请求参数：**

| 参数名  | 类型   | 必填 | 描述           |
| ------- | ------ | ---- | -------------- |
| `email` | string | 是   | 目标邮箱地址。 |

**响应参数：**

| 参数名   | 类型 | 描述     |
| -------- | ---- | -------- |
| `status` | int  | 状态码。 |
| `message` | string  | 返回信息。 |

- **200 OK**: 验证码获取成功；
- **404 Not Found**: 验证码未找到或已过期；
- **429 Too Many Requests**: 验证码请求过多，例如短时间内多次请求验证码；
- **500 Internal Server Error**: 服务器内部错误；

---


### （4）登出

#### **url：`/index/logout`**

**POST `/logout`**

**描述：** 
此接口用于退出登录。退出登录后自动关闭会话，无需请求参数。

**响应参数：**

- **200 OK**: 登出成功；
- **500 Internal Server Error**: 服务器内部错误；


### （5）注销账户

#### **url：`/index/delete_account`**

**<1> POST `/delete_account`**

**描述：** 
此接口用于注销账户，提交用户的用户名和邮箱。

**请求参数：**

| 参数名      | 类型   | 必填 | 描述             |
| ----------- | ------ | ---- | ---------------- |
| `user_name` | string | 是   | 用户名，需唯一。 |
| `email`     | string | 是   | 目标邮箱地址。   |
|  `email_code`| string   | 是 | 邮箱验证码，通过`/delete_account?send_code=1&email=email`获取 |

**响应参数：**

- **200 OK**: 注销成功。

- **404 Not Found**: 邮箱或验证码错误。

- **401 Unauthorized**: 用户不存在。

**<2> GET `/delete_account?send_code=1&email=email`**

**描述：**
此接口用于向指定的邮箱发送验证码，用于验证用户邮箱。

**请求参数：**

| 参数名  | 类型   | 必填 | 描述           |
| ------- | ------ | ---- | -------------- |
| `email` | string | 是   | 目标邮箱地址。 |

**响应参数：**

- **200 OK**: 验证码获取成功；

- **404 Not Found**: 验证码未找到或已过期。

- **429 Too Many Requests**:  验证码请求过多，例如短时间内多次请求验证码；

- **500 Internal Server Error**: 服务器内部错误；

### （5）重置密码

#### **url：`/index/reset_password`**

**<1>POST `/reset_password`**

**描述：** 
此接口用于重置密码，提交用户的用户名和邮箱。

**请求参数：**

| 参数名  | 类型   | 必填 | 描述           |
| ------- | ------ | ---- | -------------- |
| `email` | string | 是   | 目标邮箱地址。 |
| `pass_word` | string | 是 | 原密码。 |
| `new_pass_word` | string | 是 | 新密码。 |
| `email_code` | string | 是   | 重置密码的验证码，通过 `/reset_password?send_code=1&email=email` 获取。 |

**响应参数：**

- **200 OK**: 重置密码成功。

- **401 Unauthorized**: 邮箱或验证码错误。

- **423 Locked**: 短时间内频繁修改，已锁定。

 **<2>GET /reset_password?send_code=1&email=email**

 **描述：**
此接口用于向指定的邮箱发送验证码，用于验证用户邮箱。

**请求参数：**

| 参数名  | 类型   | 必填 | 描述           |
| ------- | ------ | ---- | -------------- |
| `email` | string | 是   | 目标邮箱地址。 |

**响应参数：**

- **200 OK**: 验证码获取成功；

- **404 Not Found**: 验证码未找到或已过期。

- **429 Too Many Requests**:  验证码请求过多，例如短时间内多次请求验证码；

- **500 Internal Server Error**: 服务器内部错误；

## 2.黑名单板块

### （0）黑名单类

```python
class BlockList(models.Model):
    from_user = models.ForeignKey(User, related_name='blocking', on_delete=models.CASCADE)
    to_user = models.ForeignKey(User, related_name='blocked', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('from_user', 'to_user')
```

### （1）拉黑用户

#### **url：`/index/block`**

**POST `/block`**

**描述：**
此接口用于拉黑其他用户。

**请求参数：**

| 参数名  | 类型   | 必填 | 描述           |
| ------- | ------ | ---- | ------------------ |
| `to_user_id` | int | 是   | 被拉黑者的id。 |

**响应参数：**

- **200 OK**: 拉黑用户成功。

- **409 Conflict**: 已经拉黑过该用户。

- **404 Not Found**: 用户未找到或已注销。

- **500 Internal Server Error**: 服务器内部错误；


### （2）解除拉黑

#### **url：`/index/unblock`**

**POST `/unblock`**

**描述：**
此接口用于解除对用户的拉黑。

**请求参数：**

| 参数名  | 类型   | 必填 | 描述           |
| ------- | ------ | ---- | ------------------ |
| `to_user_id` | int | 是   | 被拉黑者的id。 |

**响应参数：**

- **200 OK**: 解除拉黑成功。
- **401 Unauthorized**：尚未拉黑该用户，无需解除。
- **404 Not Found**: 用户未找到或已注销。
- **500 Internal Server Error**: 服务器内部错误；

---

### （3）获取黑名单列表

#### **url：`/index/blocklist`**

**GET `/blocklist`**

**描述：**  
此接口用于获取当前用户的黑名单列表。返回拉黑的用户信息，包括用户名、ID、头像等。

**请求参数：**
| 参数名  | 类型   | 必填 | 描述           |
| ------- | ------ | ---- | ------------------ |
| `user_id` | int  | 是   | 当前用户的ID，用于查询消息列表。 |

**响应参数：**

| 参数名      | 类型   | 描述                             |
| ----------- | ------ | -------------------------------- |
| `status`    | int    | 状态码。                         |
| `message`   | string | 返回信息。                       |
| `block_list`| array  | 黑名单列表，包含被拉黑用户的基本信息。 |

- **200 OK**: 获取黑名单列表成功；
- **401 Unauthorized**: 用户未登陆或无权限获取他人黑名单；
- **500 Internal Server Error**: 服务器内部错误；


**若获取成功，则 `block_list` 的内容如下：**

| 参数名        | 类型   | 描述                               |
| ------------- | ------ | ---------------------------------- |
| `to_user_id`  | int    | 被拉黑用户的ID。                   |
| `to_user_name`   | string | 被拉黑用户的用户名。               |
| `email`       | string | 被拉黑用户的邮箱。                 |
| `profile_url` | string | 被拉黑用户的头像地址。             |


---

## 3.Article板块

### （0）Article的类

```python
class Article(models.Model):
    # 文章类型选项
    ARTICLE_TYPE_CHOICES = [
        ('original', '原创'),
        ('repost', '转载'),
    ]

    id = models.AutoField(primary_key=True)
    article_title = models.CharField(max_length=255, verbose_name="文章标题")
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='articles', verbose_name="作者")
    content = models.TextField(verbose_name="内容")
    tags = models.CharField(max_length=255, verbose_name="标签")
    stars = models.IntegerField(default=0, verbose_name="收藏数")
    likes = GenericRelation(Like, verbose_name="点赞")
    views = models.IntegerField(default=0, verbose_name="浏览量")
    block = models.BooleanField(default=False, verbose_name="是否屏蔽")
    publish_time = models.DateTimeField(auto_now_add=True, verbose_name="发布时间")
    origin_link = models.CharField(max_length=255, verbose_name="原文链接")
    source_url = models.CharField(max_length=255, verbose_name="来源URL")
    article_type = models.CharField(
        max_length=10,
        choices=ARTICLE_TYPE_CHOICES,
        default='original',
        verbose_name="文章类型"
    )

    def __str__(self):
        return self.article_title

    class Meta:
        verbose_name = "文章"
        verbose_name_plural = "文章"
        ordering = ['-publish_time']  # 按发布时间倒序排列
```

### （1）创建article

#### **url：`/index/article/create`**

**POST `/article/create`**

**请求参数：**

| 参数名  | 类型   | 必填 | 描述           |
| ------- | ------ | ---- | -------------- |
| `article_title` | string | 是   | 文章标题。 |
| `content` | string | 是   | 文章内容。 |
| `tags` | string | 否   | 文章标签。以逗号分隔。 |
| `author_id` | int | 是   | 作者的ID。 |
| `article_type` | string | 否   | 文章类型：原创或转载。|
| `origin_link` | string | 否   | 转载时的原文链接。 |

**响应参数：**

| 参数名       | 类型   | 描述                                    |
| ------------ | ------ | --------------------------------------- |
| `status`     | int    | 状态码。                                |
| `message`    | string | 返回信息。                              |
| `article_id` | int    | 若创建成功则返回article的id，方便跳转。 |

- **200 OK**: 创建文章成功。

- **500 Internal Server Error**: 服务器内部错误；


---

### （2）编辑article

#### **url：`/index/article/edit`**

**POST `/article/edit`**

**请求参数：**

| 参数名  | 类型   | 必填 | 描述           |
| ------- | ------ | ---- | -------------- |
| `article_id` | int | 是   | 文章的id。 |
| `article_title` | string | 否   | 文章标题。 |
| `content` | string | 否   | 文章内容。 |
| `tags` | string | 否   | 文章标签。以#号分隔。 |
| `article_type` | string | 否   | 文章类型：原创或转载。 |
| `origin_link` | string | 否   | 转载时的原文链接。 |

**响应参数：**

- **200 OK**: 编辑文章成功。

- **500 Internal Server Error**: 服务器内部错误；


---

### （3）删除article

#### **url：`/index/article/delete`**

**POST `/article/delete`**

**描述：**
此接口用于删除article。

**请求参数：**

| 参数名  | 类型   | 必填 | 描述           |
| ------- | ------ | ---- | -------------- |
| `article_id` | int | 是   | 文章的id。 |

**响应参数：**

- **200 OK**: 删除文章成功。

- **500 Internal Server Error**: 服务器内部错误；

---

### （4）通过id获取Article的详细信息

#### **url：`/index/article/detail`**

**GET `/article/detail?article_id=article_id`**

**请求参数：**

| 参数名  | 类型   | 必填 | 描述           |
| ------- | ------ | ---- | ------------|
| `article_id` | int | 是   | 文章的id。 |

**响应参数：**
| 参数名   | 类型 | 描述     |
| -------- | ---- | -------- |
| `status` | int  | 状态码。 |
| `message` | string  | 返回信息。 |
| `article_detail` | list | 文章详情。 |

- **200 OK**: 获取文章详情成功。

- **500 Internal Server Error**: 服务器内部错误；

若获取成功，则`article_detail`的内容如下：

| 参数名   | 类型 | 描述     |
| -------- | ---- | -------- |
| `article_id` | int  | 文章id。 |
| `article_title` | string  | 文章题目。 |
| `article_content` | string | 文章内容。 |
| `article_type` | string | 转载/原创。 |
| `origin_link` | string | 若为转载，则标注原帖。 |
| `article_tags` | array  | 文章的标签。 |
| `author_name` | string  | 作者的名字。 |
| `author_profile_url` | string  | 作者头像的url。 |
| `like_count` | int  | 总点赞数。 |
| `star_count` | int  | 总收藏数。 |
| `view_count` | int  | 总浏览量。 |
| `reply_count` | int | 总回复量（包括文章评论及回复）。 |
| `source_url` | string | 资源链接。 |
| `publish_time` | time  | 文章发布时间。 |
| `if_like` | bool  | 是否已经点赞过。 |
| `if_star` | bool  | 是否已经收藏过。 |

---

### *（5）根据id分页获取Article下的Post列表：需要更新tags筛选

#### **url：`/index/article/post_list`**

**GET `/article/post_list?post_id=post_id&page_index=page_index&page_size=page_size`**

**描述：**
此接口用于获取指定文章（通过文章ID）下，按分页要求返回的Post列表。

**请求参数：**

| 参数名      | 类型   | 必填 | 描述           |
| ----------- | ------ | ---- | -------------- |
| `post_id`| int    | 是   | 文章ID。       |
| `page_index`| int    | 否   | 第几页，默认为第一页。 |
| `page_size` | int    | 否   | 每页显示的Post数量，默认为20。 |

**响应参数：**

| 参数名   | 类型   | 描述     |
| -------- | ------ | -------- |
| `status` | int    | 状态码。 |
| `message`| string | 返回信息。 |
| `post_list` | array | Post列表。 |

- **200 OK**: 获取Post列表成功。
- **500 Internal Server Error**: 服务器内部错误。

若获取成功，则`post_list`中的每个Post对象的内容如下：

| 参数名               | 类型   | 描述                           |
| -------------------- | ------ | -----------------------------|
| `post_id`            | int    | 帖子ID。                      |
| `post_title`         | string | 帖子标题。                     |
| `post_content`       | string | 帖子内容。                     |
| `poster_name`        | string | 发帖人名称。                   |
| `poster_profile_url` | string | 发帖人头像URL。                |
| `view_count`         | int    | 帖子的浏览量。                 |
| `like_count`         | int    | 帖子的点赞数。                 |
| `reply_count`        | int    | 帖子的回复数。                 |
| `tags`               | array  | 帖子的标签。                   |
| `publish_time`       | time   | 帖子的发布时间。               |
| `if_like`            | bool   | 是否已经点赞过。               |

---

### （6）分页获取article列表

#### **url：`/index/article/list`**

**GET `/article/list?page_index=page_index&page_size=page_size`**

**描述：**
此接口用于提交分页要求，并获取article列表的对应页。

**请求参数：**

| 参数名      | 类型   | 必填 | 描述           |
| ----------- | ------ | ---- | -------------- |
| `page_index`| int    | 否   | 第几页，默认为第一页。 |
| `page_size` | int    | 否   | 每页显示的文章数量，默认为20。 |

**响应参数：**

| 参数名      | 类型   | 描述     |
| ----------- | ------ | -------- |
| `status`    | int    | 状态码。 |
| `message`   | string | 返回信息。 |
| `article_list` | array | 文章列表。 |

- **200 OK**: 获取文章列表成功。
- **500 Internal Server Error**: 服务器内部错误。

若获取成功，则`article_list`中的每个文章对象的内容如下：

| 参数名            | 类型   | 描述                             |
| ----------------- | ------ | -------------------------------- |
| `article_id`      | int    | 文章ID。                         |
| `article_title`   | string | 文章标题。                       |
| `author_name`     | string | 作者名称。                       |
| `author_profile_url` | string | 作者头像的URL。                  |
| `star_count`      | int    | 文章的收藏数。                   |
| `view_count`      | int    | 文章的浏览量。                   |
| `like_count`      | int    | 文章的点赞数。                   |
| `tags`            | array  | 文章标签。                       |
| `publish_time`    | time   | 文章发布时间。                   |

---


## 4.Post与Reply板块

### （0）Post与Reply类

**Post类如下：**

```python
class Post(models.Model):
    id = models.AutoField(primary_key=True)
    post_title = models.CharField(max_length=255)
    poster = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    content = models.TextField()
    tags = models.CharField(max_length=255)
    views = models.IntegerField(default=0)
    likes = GenericRelation(Like)
    block = models.BooleanField(default=False)
    top = models.BooleanField(default=False)
    publish_time = models.DateTimeField(auto_now_add=True)
    article = models.ForeignKey(Article, on_delete=models.CASCADE, related_name='posts', null=True, blank=True)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='posts', null=True, blank=True)

    def send_notification(self, mentioned_user):
        Notification.objects.create(
            user=mentioned_user,
            message=f"Your article have a new post, title:{self.post_title[:50]}, content:{self.content[:50]}"  # 通知消息可以包含帖子内容的前50个字符
        )

    def __str__(self):
        return self.post_title
```
**Reply类如下：**
```python
class Reply(models.Model):
    id = models.AutoField(primary_key=True)
    reply_content = models.TextField()
    reply_time = models.DateTimeField(auto_now_add=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='replies')
    replier = models.ForeignKey(User, on_delete=models.CASCADE, related_name='replies')
    likes = GenericRelation(Like)

    def send_notification(self, mentioned_user):
        Notification.objects.create(
            user=mentioned_user,
            message=f"You were mentioned in a reply: {self.reply_content[:50]}"  # 通知消息可以包含回复内容的前50个字符
        )

    def __str__(self):
        return f'Reply to {self.post.post_title} by {self.replier.username}'
```

### （1）在Article下发帖

#### **url：`/index/post/article_post`**

**POST `/post/article_post`**

**描述：**
此接口用于在文章下创建post。

**请求参数：**

| 参数名  | 类型   | 必填 | 描述           |
| ------- | ------ | ---- | -------------- |
| `post_title` | string | 否   | 帖子标题。 |
| `post_content` | string | 是   | 帖子内容。 |

**响应参数：**

| 参数名    | 类型   | 描述                 |
| --------- | ------ | -------------------- |
| `status`  | int    | 状态码。             |
| `message` | string | 返回信息。           |
| `post_id` | int    | 若创建成功则返回post的id，方便跳转。 |

- **201 Created**: 帖子创建成功。
- **400 Bad Request**: 请求参数不完整或格式错误。

---

### （2）在Course下发帖

此处发帖实际上表示的是提问，不涉及评分，故不支持修改

#### **url：`/index/post/course_post`**

**POST `/post/course_post`**

**描述：**
此接口用于在课程下创建post。

**请求参数：**

| 参数名  | 类型   | 必填 | 描述           |
| ------- | ------ | ---- | -------------- |
| `post_title` | string | 否   | 帖子标题。 |
| `post_content` | string | 是   | 帖子内容。 |

**响应参数：**

| 参数名    | 类型   | 描述                 |
| --------- | ------ | -------------------- |
| `status`  | int    | 状态码。             |
| `message` | string | 返回信息。           |
| `post_id` | int    | 若创建成功则返回post的id，方便跳转。 |

- **201 Created**: 帖子创建成功。
- **400 Bad Request**: 请求参数不完整或格式错误。

---

### （3）通过id获取Post的详细信息

#### **url：`/index/post/detail`**

**GET `/post/detail?post_id=post_id`**

**描述：**
此接口用于获取指定Post的详细信息。

**请求参数：**

| 参数名  | 类型   | 必填 | 描述           |
| ------- | ------ | ---- | ----------|
| `post_id` | int | 是   | 帖子的id。 |

**响应参数：**

| 参数名   | 类型 | 描述     |
| -------- | ---- | -------- |
| `status` | int  | 状态码。 |
| `message` | string  | 返回信息。 |
| `post_detail` | array  | 帖子详情。 |

- **200 OK**: 获取Post详情成功，返回详细信息。
- **404 Not Found**: 未找到指定的帖子。
- **400 Bad Request**: 请求参数不合法。

若获取成功，则`post_detail`的参数如下：

| 参数名   | 类型 | 描述     |
| -------- | ---- | -------- |
| `post_id` | int  | 帖子id。 |
| `post_title` | string  | 帖子标题。 |
| `post_content` | string  | 帖子内容。 |
| `poster_name` | string  | 发帖人的名字。 |
| `poster_profile_url` | string  | 发帖人头像的url。 |
| `view_count` | int  | 帖子的浏览量。 | 
| `like_count` | int  | 帖子的点赞数。 |
| `reply_count` | int  | 帖子的回复数。 |
| `tags` | array  | 帖子的标签。 |
| `publish_time` | time  | 帖子的发布时间。 |

---

### （4）根据id分页获取Post下的Reply列表

#### **url：`/index/post/reply_list`**

**GET `/post/reply_list?post_id=post_id&page_index=page_index&page_size=page_size`**

**描述：**
此接口用于根据Post的id分页获取Reply列表。

**请求参数：**

| 参数名      | 类型   | 必填 | 描述           |
| ----------- | ------ | ---- | -------------- |
| `post_id` | int    | 是   | post对应id。   |
| `page_index`| int    | 否   | 第几页，默认为第一页。 |
| `page_size` | int    | 否   | 每页显示的回复数量，默认为20。 |

**响应参数：**

| 参数名      | 类型   | 描述     |
| ----------- | ------ | -------- |
| `status`    | int    | 状态码。 |
| `message`   | string | 返回信息。 |
| `reply_list` | array | 回复列表。 |

- **200 OK**: 获取Reply列表成功。
- **404 Not Found**: 未找到指定的帖子或回复。
- **400 Bad Request**: 请求参数不合法。

若获取成功，则`reply_list`中的每个对象内容如下：

| 参数名               | 类型   | 描述                             |
| -------------------- | ------ | -------------------------------- |
| `reply_id`           | int    | 回复ID。                         |
| `reply_content`      | string | 回复内容。                       |
| `replier_name`       | string | 回复者名字。                     |
| `replier_profile_url` | string | 回复者头像的URL。                |
| `like_count`         | int    | 回复的点赞数。                   |
| `publish_time`       | time   | 回复的发布时间。                 |

---

### （5）删除Post

#### **url：`/index/post/delete`**

**POST `/post/delete`**

**描述：**
此接口用于删除指定的Post。

**请求参数：**

| 参数名  | 类型   | 必填 | 描述           |
| ------- | ------ | ---- | -------------- |
| `post_id` | int | 是   | 帖子的id。 |

**响应参数：**

- **200 OK**: 帖子删除成功。
- **404 Not Found**: 未找到指定的帖子。

---

### （6）在Post下发表Reply

#### **url：`/index/reply/create`**

**POST `/reply/create`**

**描述：**
此接口用于在指定Post下发表回复。

**请求参数：**

| 参数名  | 类型   | 必填 | 描述           |
| ------- | ------ | ---- | -------------- |
| `post_id` | int | 是   | 帖子的id。 |
| `reply_content` | string | 是   | 回复内容。 |

**响应参数：**

| 参数名     | 类型   | 描述                                  |
| ---------- | ------ | ------------------------------------- |
| `status`   | int    | 状态码。                              |
| `message`  | string | 返回信息。                            |
| `reply_id` | int    | 若创建成功则返回reply的id，方便跳转。 |

- **201 Created**: 回复成功。
- **400 Bad Request**: 请求参数不完整或格式错误。

---

### （7）删除Reply

#### **url：`/index/reply/delete`**

**POST `/reply/delete`**

**描述：**
此接口用于删除指定的Reply。

**请求参数：**

| 参数名  | 类型   | 必填 | 描述           |
| ------- | ------ | ---- | -------------- |
| `reply_id` | int | 是   | 回复的id。 |

**响应参数：**

- **200 OK**: 回复删除成功。
- **404 Not Found**: 未找到指定的回复。

---

### （8）获取reply详情

#### **url：`/index/reply/detail`**

**GET `/reply/detail?reply_id=reply_id`**

**描述：**
此接口用于获取指定reply的详细信息。

**请求参数：**

| 参数名  | 类型   | 必填 | 描述           |
| ------- | ------ | ---- | ----------|
| `reply_id` | int | 是   | 回复的id。 |

**响应参数：**

| 参数名   | 类型 | 描述     |
| -------- | ---- | -------- |
| `status` | int  | 状态码。 |
| `message` | string  | 返回信息。 |
| `reply_detail` | list  | 回复详情。 |

- **200 OK**: 获取reply详情成功，返回详细信息。
- **404 Not Found**: 未找到指定的回复。
- **400 Bad Request**: 请求参数不合法。

若获取成功，则`reply_detail`的参数如下：

| 参数名   | 类型   | 描述     |
| -------- | ------ | -------- |
| `reply_id` | int  | 回复id。 |
| `reply_content` | string  | 回复内容。 |
| `replier_name` | string  | 回复者名字。 |
| `replier_profile_url` | string  | 回复者头像的url。 |
| `like_count` | int  | 回复的点赞数。 |
| `publish_time` | time  | 回复的发布时间。 |

---

## 5.课程板块

### （0）Course类与Score类

**Course类如下：**

```python
class Course(models.Model):
    COURSE_TYPE_CHOICES = [
        ('compulsory', 'Compulsory'),        # 必修课
        ('elective', 'Elective'),            # 选修课
        ('restricted_elective', 'Restricted Elective'),  # 限选课
    ]

    COURSE_METHOD_CHOICES = [
        ('online', 'Online'), # 线上
        ('offline', 'Offline'), # 线下
        ('hybrid', 'Hybrid'), # 混合
    ]

    id = models.AutoField(primary_key=True)  # 自增id, 自动设为主键
    course_name = models.CharField(max_length=255) # 课程名
    course_type = models.CharField(max_length=50, choices=COURSE_TYPE_CHOICES) # 课程类型
    college = models.CharField(max_length=255) # 开设大学
    credits = models.DecimalField(max_digits=4, decimal_places=2) # 学分
    course_teacher = models.CharField(max_length=255) # 课程老师
    course_method = models.CharField(max_length=50, choices=COURSE_METHOD_CHOICES) # 教学方式
    assessment_method = models.CharField(max_length=255) # 考核方式
    likes = GenericRelation(Like)
    score = models.DecimalField(max_digits=3, decimal_places=2, default=0.00) # 评分
    all_score = models.DecimalField(max_digits=3, decimal_places=2, default=0.00) # 总评分
    all_people = models.IntegerField(default=0) # 总评分人数
    relative_articles = models.ManyToManyField(Article, related_name='courses')
    publish_time = models.DateTimeField(auto_now_add=True)
```

**Score类如下：**

```python
class Score(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='scores')  # 使用 'scores' 作为反向查询名称
    score = models.DecimalField(max_digits=3, decimal_places=2)

    class Meta:
        unique_together = ('user', 'course')
```



---

### （1）创建Course

#### **url：`/index/course/create`**

**POST `/course/create`**

**描述：**
此接口用于创建新的课程。

**请求参数：**

| 参数名  | 类型   | 必填 | 描述           |
| ------- | ------ | ---- | -------------- |
| `course_name` | string | 是   | 课程名。 |
| `course_type` | string | 是   | 课程类型（必修、选修、限选）。 |
| `college` | string | 是   | 开设该课程的学院。 |
| `campus` | string | 是   | 开设该课程的校区。 |
| `credits` | decimal | 是   | 课程学分。 |
| `course_teacher` | string | 是   | 课程教师。 |
| `course_method` | string | 是   | 教学方式（线上、线下、混合）。 |
| `assessment_method` | string | 是   | 考核方式。 |

**响应参数：**

- **200 OK**: 课程创建成功。
- **400 Bad Request**: 请求参数不完整或格式错误。

---

### （2）编辑Course

#### **url：`/index/course/edit`**

**POST `/course/edit`**

**描述：**
此接口用于编辑已存在的课程。

**请求参数：**

| 参数名  | 类型   | 必填 | 描述           |
| ------- | ------ | ---- | -------------- |
| `id` | int | 是   | 课程ID。 |
| `course_name` | string | 否   | 课程名。 |
| `course_type` | string | 否   | 课程类型（必修、选修、限选）。 |
| `college` | string | 否   | 开设大学。 |
| `credits` | decimal | 否   | 课程学分。 |
| `course_teacher` | string | 否   | 课程教师。 |
| `course_method` | string | 否   | 教学方式（线上、线下、混合）。 |
| `assessment_method` | string | 否   | 考核方式。 |

**响应参数：**

- **200 OK**: 课程编辑成功。
- **404 Not Found**: 未找到指定的课程。
- **400 Bad Request**: 请求参数不合法。

---

### （3）删除Course

#### **url：`/index/course/delete`**

**POST `/course/delete`**

**描述：**
此接口用于删除指定的课程。

**请求参数：**

| 参数名  | 类型   | 必填 | 描述           |
| ------- | ------ | ---- | -------------- |
| `course_id` | int | 是   | 课程ID。 |

**响应参数：**

- **200 OK**: 课程删除成功。
- **404 Not Found**: 未找到指定的课程。

---

###  （4）对课程评分并评价

// 也许可以考虑直接合并到“Course下发帖”，打分同时发表post
// 但“Course下发帖”发帖实际上承担的功能是提问吧，还是不合并了，正好和评分分开

#### **url：`/index/course/rate`**

**POST `/course/rate`**

**描述：**
此接口用于为课程打分并进行评价。

**请求参数：**

| 参数名  | 类型   | 必填 | 描述           |
| ------- | ------ | ---- | -------------- |
| `course_id` | int | 是   | 课程ID。 |
| `score` | decimal | 是   | 评分（0.00 到 5.00）。 |
| `comment` | string | 否   | 评价内容。 |

**响应参数：**

- **201 Created**: 评分和评价提交成功。
- **400 Bad Request**: 请求参数不完整或格式错误。
- **500  Internal Server Error**: 服务器内部错误。

---

### （5）修改课程评分或评价

#### **url：`/index/course/edit_rating`**

**POST `/course/edit_rating`**

**描述：**
此接口用于修改已提交的课程评分与评价。

**请求参数：**

| 参数名  | 类型   | 必填 | 描述           |
| ------- | ------ | ---- | -------------- |
| `course_id` | int | 是   | 课程ID。 |
| `score` | decimal | 否   | 修改后的评分（0.00 到 5.00）。 |
| `comment` | string | 否   | 修改后的评价内容。 |

**响应参数：**

- **200 OK**: 评分和评价修改成功。
- **404 Not Found**: 未找到指定的课程或尚未评分。
- **400 Bad Request**: 请求参数不合法。

---

### （6）获取某个用户对某个课程的评价

#### **url：`/index/course/user_evaluation`**

**POST `/course/user_evaluation`**

**描述：**
此接口用于获取用户已提交的课程评分与评价。

**请求参数：**

| 参数名  | 类型   | 必填 | 描述           |
| ------- | ------ | ---- | -------------- |
| `user_id` | int | 是   | 用户ID。 |
| `course_id` | int | 是   | 课程ID。 |
**响应参数：**

| 参数名   | 类型 | 描述     |
| -------- | ---- | -------- |
| `status` | int  | 状态码。 |
| `message` | string  | 返回信息。 |
| `score` | decimal | 用户评分（0.00 到 5.00）。 |
| `comment` | string | 用户的评价内容。 |

- **200 OK**: 评分和评价修改成功。
- **401 Unauthorized**: 用户未登陆或无权获得他人评价；
- **404 Not Found**: 未找到指定的课程评分或评价。
- **400 Bad Request**: 请求参数不合法。

### （7）通过id获取Course的详细信息

#### **url：`/index/course/detail`**

**GET `/course/detail?course_id=course_id`**

**请求参数：**

| 参数名  | 类型   | 必填 | 描述           |
| ------- | ------ | ---- | ------------- |
| `course_id` | int | 是   | 课程的id。 |

**响应参数：**

| 参数名   | 类型 | 描述     |
| -------- | ---- | -------- |
| `status` | int  | 状态码。 |
| `message` | string  | 返回信息。 |
| `course_detail` | list  |课程详情。 |

- **200 OK**: 获取课程详情成功，返回详细信息。
- **404 Not Found**: 未找到指定的课程。
- **400 Bad Request**: 请求参数不合法。

若获取成功，则`course_detail`内容如下：

| 参数名   | 类型 | 描述     |
| -------- | ---- | -------- |
| `course_id` | int  | 课程id。 |
| `course_name` | string  | 课程名。 |
| `course_type` | string  | 课程类型（必修、选修、限选）。 |
| `college` | string  | 开设大学。 |
| `credits` | decimal  | 学分。 |
| `course_teacher` | string  | 教师名称。 |
| `course_method` | string  | 教学方式（线上、线下、混合）。 |
| `assessment_method` | string  | 考核方式。 |
| `score` | decimal  | 评分（0.00 到 5.00）。 |
| `all_score` | decimal  | 总评分。 |
| `all_people` | int  | 总评分人数。 |
| `relative_articles` | array  | 相关的文章列表。 |
| `publish_time` | time  | 课程发布的时间。 |

---

### （8）根据id分页获取Course下的Post列表

#### **url：`/index/course/post_list`**

**GET `/course/post_list?id=id&page_index=page_index&page_size=page_size`**

**描述：**
此接口用于获取指定课程（通过课程ID）下，按分页要求返回的Post列表。

**请求参数：**

| 参数名      | 类型   | 必填 | 描述           |
| ----------- | ------ | ---- | -------------- |
| `course_id`        | int    | 是   | 课程ID。       |
| `page_index`| int    | 否   | 第几页，默认为第一页。 |
| `page_size` | int    | 否   | 每页显示的Post数量，默认为20。 |

**响应参数：**

| 参数名   | 类型   | 描述     |
| -------- | ------ | -------- |
| `status` | int    | 状态码。 |
| `message`| string | 返回信息。 |
| `post_list` | array | Post列表。 |

- **200 OK**: 获取Post列表成功。
- **500 Internal Server Error**: 服务器内部错误。

若获取成功，则`post_list`中的每个Post对象的内容如下：

| 参数名               | 类型   | 描述                           |
| -------------------- | ------ | ------------------------------ |
| `post_id`            | int    | 帖子ID。                       |
| `post_title`         | string | 帖子标题。                     |
| `post_content`       | string | 帖子内容。                     |
| `poster_name`        | string | 发帖人名称。                   |
| `poster_profile_url` | string | 发帖人头像URL。                |
| `view_count`         | int    | 帖子的浏览量。                 |
| `like_count`         | int    | 帖子的点赞数。                 |
| `reply_count`        | int    | 帖子的回复数。                 |
| `tags`               | array  | 帖子的标签。                   |
| `publish_time`       | time   | 帖子的发布时间。               |

---

### （9）分页获取course列表

#### **url：`/index/course/list`**

**GET `/course/list?page_index=page_index&page_size=page_size`**

**描述：**
此接口用于提交分页要求，并获取course列表的对应页。

**请求参数：**
| 参数名  | 类型   | 必填 | 描述           |
| ------- | ------ | ---- | -------------- |
| `page_index` | int | 否   | 第几页，无此字段默认⾸⻚ |
| `page_size` | int | 否   | 每⻚项⽬数，⽆此字段默认20 |

**响应参数：**

| 参数名   | 类型 | 描述     |
| -------- | ---- | -------- |
| `status` | int  | 状态码。 |
| `message` | string  | 返回信息。 |
| `course_list` | array  | post列表。 |

- **200 OK**: 获取课程列表成功。

- **500 Internal Server Error**: 服务器内部错误；

若获取成功，则`course_list`中的每个list对象的内容如下：

| 参数名   | 类型 | 描述     |
| -------- | ---- | -------- |
| `course_id` | int  | 课程id。 |
| `course_name` | string  | 课程名。 |
| `course_type` | string  | 课程类型（必修、选修、限选）。 |
| `college` | string  | 开设大学。 |
| `credits` | decimal  | 学分。 |
| `course_teacher` | string  | 教师名称。 |
| `course_method` | string  | 教学方式（线上、线下、混合）。 |
| `assessment_method` | string  | 考核方式。 |
| `score` | decimal  | 评分（0.00 到 5.00）。 |
| `all_score` | decimal  | 总评分。 |
| `all_people` | int  | 总评分人数。 |
| `relative_articles` | array  | 相关的文章列表。 |
| `publish_time` | time  | 课程发布的时间。 |

---

## 7.私信板块

### （0）私信类

```python
class Message(models.Model):
    sender = models.ForeignKey(User, related_name='sent_messages', on_delete=models.CASCADE)  # 发送者
    receiver = models.ForeignKey(User, related_name='received_messages', on_delete=models.CASCADE)  # 接收者
    content = models.TextField()  # 消息内容
    sent_at = models.DateTimeField(auto_now_add=True)  # 发送时间
    read = models.BooleanField(default=False)  # 消息是否已读
    is_deleted_by_sender = models.BooleanField(default=False)  # 发送者是否已删除
    is_deleted_by_receiver = models.BooleanField(default=False)  # 接收者是否已删除

    class Meta:
        ordering = ['-sent_at']  # 按时间倒序排列

    def __str__(self):
        return f"From {self.sender.username} to {self.receiver.username}: {self.content[:20]}"

```

### （1）发送私信

#### **url：`/index/messages/send`**

**POST `/message/send`**

**描述：**
 此接口用于发送一条私信。

**请求参数：**

| 参数名        | 类型   | 必填 | 描述             |
| ------------- | ------ | ---- | ---------------- |
| `receiver_id` | int    | 是   | 接收者的用户ID。 |
| `content`     | string | 是   | 私信内容。       |

**响应参数：**

- **200 OK**: 私信发送成功；
- **404 Not Found**: 接收者用户未找到；
- **400 Bad Request**: 请求参数错误；
- **500 Internal Server Error**: 服务器内部错误；

#### （2）获取私信列表

#### **url：`index/messages/list`**

**GET `/list`**

**描述：**
 此接口用于获取当前用户的私信列表，包括发件人、内容、发送时间等信息。

**请求参数：**

| 参数名    | 类型 | 必填 | 描述                             |
| --------- | ---- | ---- | -------------------------------- |
| `user_id` | int  | 是   | 当前用户的ID，用于查询消息列表。 |
| `page_size`   | int  | 否   | 每页返回的消息数量，默认10条。   |
| `page_index`  | int  | 否   | 第几页，默认第一页。        |

**响应参数：**

| 参数名         | 类型   | 描述                               |
| -------------- | ------ | ------------------------------ |
| `status`       | int    | 状态码。                           |
| `message`      | string | 返回信息。                         |
| `message_list` | array  | 消息列表，包含每条消息的详细信息。 |


- **200 OK**: 获取消息列表成功；

- **404 Not Found**: 用户未找到或没有任何消息；

- **500 Internal Server Error**: 服务器内部错误；

**若获取成功，则 `message_list` 的内容如下：**

| 参数名        | 类型   | 描述           |
| ------------- | ------ | -------------- |
| `sender_id`   | int    | 发送者用户ID。 |
| `receiver_id` | int    | 接收者用户ID。 |
| `content`     | string | 消息内容。     |
| `sent_at`     | time   | 发送时间。     |
| `read`        | bool   | 消息是否已读。 |


#### （3）标记消息为已读

#### **url：`index/messages/read`**

**POST `/message/read`**

**描述：**
 此接口用于标记一条消息为已读。

**请求参数：**

| 参数名       | 类型 | 必填 | 描述       |
| ------------ | ---- | ---- | ---------- |
| `message_id` | int  | 是   | 消息的ID。 |

**响应参数：**

- **200 OK**: 消息标记为已读成功；
- **404 Not Found**: 消息未找到；
- **500 Internal Server Error**: 服务器内部错误；

#### （4）撤回私信

#### **url：`index/messages/delete`**

**POST `/message/delete`**

**描述：**
 此接口用于发送者撤回私信，有时间限制。

**请求参数：**

| 参数名       | 类型 | 必填 | 描述                    |
| ------------ | ---- | ---- | -------------------- |
| `message_id` | int  | 是   | 消息的ID。             |

**响应参数：**

- **200 OK**: 删除成功；
- **403 Forbidden**: 当前用户无权删除此消息；
- **404 Not Found**: 消息未找到；
- **500 Internal Server Error**: 服务器内部错误；


## 8.通知板块

###  （0）通知类

```python
class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)

    def __str__(self):
        return f"Notification for {self.user.username} - {self.message[:20]}"

    class Meta:
        ordering = ['-created_at']
```

### （1）发送通知

#### **url：`index/notifications/send`**

**POST /`notifications/send`**

**描述：**  
此接口用于发送通知给用户，通知内容由系统或管理员定义。

**请求参数：**

| 参数名     | 类型   | 必填 | 描述                             |
| ---------- | ------ | ---- | -------------------------------- |
| `user_id`  | int    | 是   | 接收通知的用户ID。               |
| `message`  | string | 是   | 通知内容。                       |

**响应参数：**

| 参数名    | 类型   | 描述                |
| --------- | ------ | ------------------- |
| `status`  | int    | 状态码。             |
| `message` | string | 返回信息。           |

**状态码说明：**

- **200 OK**: 通知发送成功；
- **404 Not Found**: 用户未找到；
- **500 Internal Server Error**: 服务器内部错误；

### （2）获取通知列表

#### **url：`index/notifications/list`**

**GET /`notifications/list`**

**描述：**  
此接口用于获取当前用户的通知列表。

**请求参数：**

| 参数名       | 类型 | 必填 | 描述                             |
| ------------ | ---- | ---- | ----------------------------- |
| `user_id`    | int  | 是   | 当前用户的ID，用于查询通知列表。 |
| `page_size`  | int  | 否   | 每页返回的通知数量，默认10条。   |
| `page_index` | int  | 否   | 第几页，默认第一页。            |

**响应参数：**

| 参数名         | 类型   | 描述                           |
| -------------- | ------ | ------------------------------ |
| `status`       | int    | 状态码。                        |
| `message`      | string | 返回信息。                      |
| `notification_list` | array  | 通知列表，包含每条通知的详细信息。 |

- **200 OK**: 获取通知列表成功；
- **401 Unauthorized**: 用户未登陆或无权获得他人通知列表；
- **404 Not Found**: 用户未找到或没有任何通知；
- **500 Internal Server Error**: 服务器内部错误；

**若获取成功，则 `notification_list` 的内容如下：**

| 参数名      | 类型   | 描述                     |
| ----------- | ------ | ------------------------ |
| `notification_id` | int    | 通知ID。            |
| `message`   | string | 通知内容。                |
| `created_at` | time | 通知创建时间。              |
| `read`      | boolean | 通知是否已读。            |


### （3）标记通知为已读

#### **url：`/notifications/read`**

**POST `/read`**

**描述：**  
此接口用于标记一条通知为已读。

**请求参数：**

| 参数名         | 类型   | 必填 | 描述                             |
| -------------- | ------ | ---- | -------------------------------- |
| `notification_id` | int    | 是   | 通知的ID，用于标记已读。         |

**响应参数：**

- **200 OK**: 通知标记为已读成功；
- **404 Not Found**: 通知未找到；
- **500 Internal Server Error**: 服务器内部错误；

好的，基于你的要求，以下是修改后的API文档：

------

## 9. 收藏夹板块

### （0）Star类

```python
class Star(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='stars')  # 收藏的用户
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)  # 收藏内容的类型（文章、课程、帖子等）
    object_id = models.PositiveIntegerField()  # 收藏内容的ID
    content_object = GenericForeignKey('content_type', 'object_id')  # 泛型关联字段

    created_at = models.DateTimeField(auto_now_add=True)  # 收藏时间
    folder = models.ForeignKey('StarFolder', on_delete=models.CASCADE, null=True, blank=True)  # 选择的收藏夹，若为空则为默认收藏夹

    class Meta:
        unique_together = ('user', 'content_type', 'object_id')  # 确保同一个用户只能对同一内容收藏一次

    def __str__(self):
        return f"{self.user.username} stars {self.content_object}"

```

### （1）收藏Course/Article/Post

#### **url：`/index/star`**

**POST `/star`**

**描述：**
 此接口用于用户收藏课程、文章或帖子，并选择收藏夹。若未选择收藏夹，则默认为默认收藏夹。

**请求参数：**

| 参数名         | 类型   | 必填 | 描述                                     |
| -------------- | ------ | ---- | ----------------------------------- |
| `user_id`      | int    | 是   | 用户ID                               |
| `content_type` | string | 是   | 收藏内容的类型：课程、文章或帖子         |
| `content_id`   | int    | 是   | 收藏内容的ID，课程ID、文章ID或帖子ID     |
| `folder_id`    | int    | 否   | 选择的收藏夹ID，若为空则收藏至默认收藏夹 |

**响应参数：**

- **200 OK**: 收藏成功
- **409 Conflict**: 已经收藏过该内容
- **404 Not Found**: 未找到指定内容
- **500 Internal Server Error**: 服务器内部错误

------

### （2）创建收藏夹

#### **url：`/index/starred/create`**

**POST `/starred/create`**

**描述：**
 此接口用于用户创建一个新的收藏夹。

**请求参数：**

| 参数名        | 类型   | 必填 | 描述                 |
| ------------- | ------ | ---- | -------------------- |
| `user_id`     | int    | 是   | 用户ID               |
| `folder_name` | string | 是   | 收藏夹名称           |
| `description` | string | 否   | 收藏夹的描述（可选） |

**响应参数：**

| 参数名    | 类型   | 描述     |
| --------- | ------ | -------- |
| `status`  | int    | 状态码   |
| `message` | string | 返回信息 |
| `folder_id` | int | 若创建成功则返回 |

- **200 OK**: 创建收藏夹成功
- **400 Bad Request**: 请求参数错误或缺失
- **500 Internal Server Error**: 服务器内部错误

------

### （3）获取收藏列表

#### **url：`/index/starred/list`**

**GET `/starred/list`**

**描述：**
 此接口用于获取当前用户的所有收藏内容，支持选择获取某个特定收藏夹下的内容。若未选择收藏夹，则返回所有收藏内容。

**请求参数：**

| 参数名      | 类型 | 必填 | 描述                                   |
| ----------- | ---- | ---- | ------------------------------------ |
| `user_id`   | int  | 是   | 用户ID                                 |
| `folder_id` | int  | 否   | 收藏夹ID，若为空则返回所有收藏夹的内容 |

**响应参数：**

| 参数名      | 类型   | 描述           |
| ----------- | ------ | ------------ |
| `status`    | int    | 状态码         |
| `message`   | string | 返回信息       |
| `star_list` | array  | 收藏的内容列表 |

- **200 OK**: 获取收藏列表成功
- **404 Not Found**: 用户未收藏任何内容
- **500 Internal Server Error**: 服务器内部错误

**若获取成功，则 `star_list` 的内容如下：**

| 参数名         | 类型   | 描述                               |
| -------------- | ------ | ---------------------------------- |
| `content_type` | string | 收藏内容的类型：课程、文章或帖子   |
| `content_id`   | int    | 收藏内容的ID                       |
| `content_name` | string | 内容的名称（如课程名、文章标题等） |
| `created_at`   | time   | 收藏时间                           |

------

### （4）取消收藏

#### **url：`/index/unstar`**

**POST `/unstar`**

**描述：**
 此接口用于用户取消收藏课程、文章或帖子。

**请求参数：**

| 参数名         | 类型   | 必填 | 描述                                 |
| -------------- | ------ | ---- | ------------------------------------ |
| `user_id`      | int    | 是   | 用户ID                               |
| `content_type` | string | 是   | 收藏内容的类型：课程、文章或帖子     |
| `content_id`   | int    | 是   | 收藏内容的ID，课程ID、文章ID或帖子ID |

**响应参数：**

- **200 OK**: 取消收藏成功
- **404 Not Found**: 未找到收藏内容
- **500 Internal Server Error**: 服务器内部错误

### （5）获取收藏夹信息

#### **url：`/index/starred/folder`**

**GET `/starred/folder`**

**描述：**  
此接口用于获取当前用户的所有收藏夹信息，返回每个收藏夹的基本信息以及其中的收藏内容。

**请求参数：**

| 参数名     | 类型   | 必填 | 描述                   |
| ---------- | ------ | ---- | ---------------------- |
| `user_id`  | int    | 是   | 用户ID                 |

**响应参数：**

| 参数名        | 类型   | 描述                   |
| ------------- | ------ | ---------------------- |
| `status`      | int    | 状态码                 |
| `message`     | string | 返回信息               |
| `folders`     | list   | 收藏夹列表             |

- **200 OK**: 获取收藏夹信息成功
- **404 Not Found**: 用户未创建任何收藏夹
- **500 Internal Server Error**: 服务器内部错误

若获取成功，则 `folders` 的内容如下：

| 参数名         | 类型   | 描述                          |
| -------------- | ------ | ----------------------------- |
| `folder_id`    | int    | 收藏夹ID                       |
| `folder_name`  | string | 收藏夹名称                     |
| `description`  | string | 收藏夹描述（可选）             |
| `star_count`   | int    | 收藏夹内的内容数量             |
| `created_at`   | datetime | 收藏夹创建时间               |

---

## 10.点赞板块

### （0）Like类

```python
class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='likes')  # 点赞用户
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)  # 点赞内容的类型（文章、帖子或回复）
    object_id = models.PositiveIntegerField()  # 点赞内容的ID
    content_object = GenericForeignKey('content_type', 'object_id')  # 泛型关联字段

    created_at = models.DateTimeField(auto_now_add=True)  # 点赞时间

    class Meta:
        unique_together = ('user', 'content_type', 'object_id')  # 确保同一个用户只能对同一内容点赞一次
```

### （1）为article/post/reply点赞

#### **url：`index/like`**

**POST `/like`**

**描述：**
 此接口用于给文章、帖子或回复点赞。

**请求参数：**

| 参数名         | 类型   | 必填 | 描述                                          |
| -------------- | ------ | ---- | ----------------------------------- |
| `user_id`      | int    | 是   | 点赞的用户ID。                                |
| `content_type` | string | 是   | 内容类型，值为 `article`、`post` 或 `reply`。 |
| `content_id`   | int    | 是   | 文章、帖子或回复的ID。                        |

**响应参数：**

| 参数名    | 类型   | 描述     |
| --------- | ------ | -------- |
| `status`  | int    | 状态码   |
| `message` | string | 返回信息 |

**状态码说明：**

- **200 OK**: 点赞成功。
- **400 Bad Request**: 参数错误。
- **404 Not Found**: 找不到对应的内容。
- **409 Conflict**: 用户已经点赞过该内容。
- **500 Internal Server Error**: 服务器内部错误。

### （2）取消点赞

#### **url：`index/unlike`**

**POST `/unlike`**

**描述：**
 此接口用于取消点赞。

**请求参数：**

| 参数名         | 类型   | 必填 | 描述                                          |
| -------------- | ------ | ---- | --------------------------------------------- |
| `user_id`      | int    | 是   | 取消点赞的用户ID。                            |
| `content_type` | string | 是   | 内容类型，值为 `article`、`post` 或 `reply`。 |
| `content_id`   | int    | 是   | 文章、帖子或回复的ID。                  |

**响应参数：**

| 参数名    | 类型   | 描述     |
| --------- | ------ | -------- |
| `status`  | int    | 状态码   |
| `message` | string | 返回信息 |

**状态码说明：**

- **200 OK**: 取消点赞成功。
- **400 Bad Request**: 参数错误。
- **404 Not Found**: 找不到对应的内容。
- **500 Internal Server Error**: 服务器内部错误。

#### （3）获取内容的点赞数

#### **url：`index/like/count`**

**GET `/like/count`**

**描述：**
 此接口用于获取文章、帖子或回复的点赞数。

**请求参数：**

| 参数名         | 类型   | 必填 | 描述                                          |
| -------------- | ------ | ---- | --------------------------------------------- |
| `content_type` | string | 是   | 内容类型，值为 `article`、`post` 或 `reply`。 |
| `content_id`   | int    | 是   | 文章、帖子或回复的ID。                        |

**响应参数：**

| 参数名       | 类型   | 描述     |
| ------------ | ------ | -------- |
| `like_count` | int    | 点赞数   |
| `status`     | int    | 状态码   |
| `message`    | string | 返回信息 |

**状态码说明：**

- **200 OK**: 获取点赞数成功。
- **404 Not Found**: 找不到对应的内容。
- **500 Internal Server Error**: 服务器内部错误。

### （4）获取用户点赞的内容列表

#### **url：`index/like/user`**

**GET `/like/user`**

**描述：**
 此接口用于获取某个用户点赞过的所有内容列表。

**请求参数：**

| 参数名    | 类型 | 必填 | 描述                           |
| --------- | ---- | ---- | ------------------------------ |
| `user_id` | int  | 是   | 用户ID。                       |
| `limit`   | int  | 否   | 每页返回的内容数量，默认为10。 |
| `offset`  | int  | 否   | 分页偏移量，默认为0。          |

**响应参数：**

| 参数名         | 类型   | 描述                               |
| -------------- | ------ | ---------------------------------- |
| `status`       | int    | 状态码                             |
| `message`      | string | 返回信息                           |
| `content_list` | array  | 点赞内容的列表，包含内容类型和ID。 |

- **200 OK**: 获取用户点赞内容列表成功。
- **404 Not Found**: 用户未点赞任何内容。
- **500 Internal Server Error**: 服务器内部错误。

**若获取成功，则 `content_list` 的内容如下：**

| 参数名         | 类型   | 描述                                       |
| -------------- | ------ | ------------------------------------------ |
| `content_type` | string | 内容类型（`article`、`post` 或 `reply`）。 |
| `content_id`   | int    | 内容的ID。                                 |

------



## 11.图片API板块

//确实需要前端压缩一下

### （0）Image类

```python
class Image(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='images')  # 上传图片的用户
    image = models.ImageField(upload_to='user_images/')  # 图片文件
    created_at = models.DateTimeField(auto_now_add=True)  # 上传时间

    def __str__(self):
        return f"Image by {self.user.username} at {self.created_at}"
```

### （1）上传头像

#### **url：`/index/image/profile`**

**POST `/image/profile`**

**描述：**
 此接口用于上传用户头像，上传成功后将返回一个图片的URL。

**请求参数：**

| 参数名  | 类型 | 必填 | 描述               |
| ------- | ---- | ---- | ------------------ |
| `image` | file | 是   | 用户头像图片文件。 |

**响应参数：**

| 参数名    | 类型   | 描述                      |
| --------- | ------ | ------------------------- |
| `status`  | int    | 状态码                    |
| `message` | string | 返回信息                  |
| `profile_url`| string | 返回挂载头像图片的URL地址（形如`GET /image/profile?user_name=user_name`）|

**状态码说明：**

- **200 OK**: 上传头像成功，返回头像URL。
- **400 Bad Request**: 上传的文件格式不支持或文件过大。
- **500 Internal Server Error**: 服务器错误，上传失败。

------

### （2）获取用户头像

#### **url：`/index/image/profile/`**

**GET `/image/profile?user_name=user_name`**

**描述：**
 此接口用于获取指定用户的头像，若用户没有头像，则返回默认头像。

**请求参数：**

| 参数名     | 类型   | 必填 | 描述   |
| ---------- | ------ | ---- | ------ |
| `user_name` | string | 是   | 用户名 |

**响应参数：**

| 参数名    | 类型   | 描述                   |
| --------- | ------ | ---------------------|
| `status`  | int    | 状态码                |
| `message` | string | 返回信息              |
| `image` | image | 返回图片                 |

**状态码说明：**

- **200 OK**: 成功获取头像，返回头像URL。
- **404 Not Found**: 用户头像未找到，可能用户尚未上传头像。
- **500 Internal Server Error**: 服务器错误，获取头像失败。

------

### （3）在文章中上传图片

#### **url：`/index/image/article`**

**POST `/image/article`**

**描述：**
 此接口用于在文章中上传图片，上传成功后将返回一个图片的URL，用户可将该URL嵌入文章内容中。

**请求参数：**

| 参数名  | 类型 | 必填 | 描述           |
| ------- | ---- | ---- | -------------- |
| `image` | file | 是   | 文章图片文件。 |

**响应参数：**

| 参数名    | 类型   | 描述                  |
| --------- | ------ | --------------------- |
| `status`  | int    | 状态码                |
| `message` | string | 返回信息              |
| `image_url`| string | 返回图片的访问URL地址 |

**状态码说明：**

- **200 OK**: 图片上传成功，返回图片URL。
- **400 Bad Request**: 上传的文件格式不支持或文件过大。
- **500 Internal Server Error**: 服务器内部错误。

------

以下是补全后的 **12. 资源API板块** 文档：

---

## 12. 资源API板块

### （1）上传资源

#### **url: `/index/resource/upload/`**

**POST `/resource/upload`**

**描述：**
 此接口用于上传资源文件，上传成功后返回一个下载用的 `source_url`，该 URL 将保存在 `Article` 对象的 `source_url` 字段中。

**请求参数：**

| 参数名  | 类型 | 必填 | 描述           |
| ------- | ---- | ---- | -------------- |
| `file`  | file | 是   | 资源文件。     |
| `article_id` | int | 是 | 关联的文章 ID。 |

**响应参数：**

| 参数名      | 类型   | 描述                  |
| ----------- | ------ | --------------------- |
| `status`    | int    | 状态码                |
| `message`   | string | 返回信息              |
| `source_url`| string | 返回资源的下载 URL。  |

**状态码说明：**

- **200 OK**: 资源上传成功，返回下载 URL。
- **400 Bad Request**: 文件格式不支持或文件过大。
- **404 Not Found**: 关联的文章 ID 不存在。
- **500 Internal Server Error**: 服务器内部错误。

---

### （2）资源下载

#### **url: `source_url`**

**GET `source_url`**

**描述：**
 此接口用于下载资源文件。通过 `source_url` 获取资源文件并返回给客户端。

**请求参数：**

无，但`login_required`

**响应参数：**

| 参数名    | 类型   | 描述                   |
| --------- | ------ | ---------------------- |
| `status`  | int    | 状态码                 |
| `message` | string | 返回信息               |
| `file`    | file   | 返回资源文件。         |

**状态码说明：**

- **200 OK**: 成功返回资源文件。
- **404 Not Found**: 资源文件未找到。
- **500 Internal Server Error**: 服务器内部错误。

---



## 13.封禁与屏蔽板块
还没开始写



## 14.搜索功能

前面的写完了再优化
