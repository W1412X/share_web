# share_web  
> optimizer2 此分支对应的文章只有文章评论部分，没有 帖子->回答类似部分  
> 其他的一些优化忘了，好久没写  
## optimize2  
- 文章评论部分去除了问题，直接采用评论的形式
## 代码规范
### 每个原子组件的属性均由id+初始表单构成，初始表单的名称命名为init+名称，如果需要在原初始表单上修改则在data()中添加新的表单。组件的属性单独传入。
## 结构
### `./src/components/*`
> 所有组件  
- `Answer`问题回复组件
- `AnswerList`问题回复列表
- `ArticleBottomBar`文章页底部栏，承载显示用户信息，查看评论，收藏以及举报的接口
- `ArticleDisplay` 文章展示(不可编辑)
- `ArticleEditor` 文章编辑器主要组件
- `ArticleItem` 文章项  
- `ArticleList` 由`ArticleItem`组成的列表
- `BlackUserBar` 黑名单项
- `CourseAnswer` 课程评论
- `CourseEditor` 课程编辑器  
- `CourseItem` 课程项  
- `EmailExmineCard` 邮箱验证码卡片
- `LikeButton` 点赞按钮  
- `LoginItem` 登陆页核心组件  
- `MessageBar` 消息条，封装点击查看 
- `QuestionAndAnswers` 问题回答项，用于文章页面  
- `QuestionEditor` 问题编辑器  
- `RatingCourseCard` 课程页面核心组件，包含课程信息以及评分信息
- `RelativeBar` 关联网址组件
- `ReportCard` 举报卡组件  
- `SelfCreate` 个人页面的创作部分组件  
- `SelfStar` 个人页面的收藏部分组件
- `SetProfileCard` 设置头像的卡片
- `SettingCard` 个人页面的设置组件  
- `SimplyItem` 简化组件(**未使用**)
- `SingleQuestion` 问题项
- `SensitiveTextArea` 文本输入框，实现中英文双语实时检测
- `SensitiveTextField` 文本输入框，实现中英文双语实时检测
- `SourceBae` 资源条，点击下载资源  
- `StarButton` 收藏按钮
- `SuggestionCard` 建议卡片
- `TagButton` 标签按钮
- `UserMessageEditor` 用户信息编辑组件
- `UserMessageReader` 用户信息展示组件
### `./src/pages/*`
> 所有页面
- `ArticlePage`文章页
- `AuthorPage` 作者页
- `CoursePage` 课程页  
- `ErrorPage` 错误导航页
- `IndexPage`主页
- `LoginPage`登陆页
- `QuestionPage` 问题页
- `SelfPage`个人管理页
- `TestPage2` 组件测试页  
### `./src/router`
- 路由设置
### `./src/utils/*`
- 自定义工具、函数  
### `./src/store/*` 
- 废弃... ...
### `./src/axios/*`
> 所有的网络请求方法
- `identify.js` 有关身份认证
- ... ...  

## 安全性  
- [前端敏感词检测](https://github.com/W1412X/JS-Sentsitive-Detect)  
  - 下载 
    ```bash  
    npm install wx-sensitive-detect
    ```  
> 前端敏感词检测的敏感词的 对于 AB ABC两个敏感词同时存在的情况，只屏蔽AB的BUG已经修复
> 还有一个BUG就是对于 AB BC 仅屏蔽AB，没有屏蔽C的BUG还没修  
- [图片违规检测](https://github.com/W1412X/SensitiveImgDetect)  
  - 下载  
    ```bash
    pip install SensitiveImgDetect
    ```

## 待改进
### 进一步优化方向    
- 所有组件改为动态导入  
- 代码风格转换为Vue3的组合式API
- 弹窗(`v-dialog`)实现逻辑优化  
- 敏感词检测的嵌套情况解决
- 整合所有内联样式到一个CSS文件中  
- ... ...  

## 管理系统  
- 处理举报  
- 处理建议  
- 处理BUG报告  
- 处理文章/问题/课程/问题回答/课程评价  
- 处理用户  
- 发布公告  

## 邮箱配置 
> 目前可以发送的邮箱有 @126.com, @163.com, @mail.sdu.edu.cn.com ，其他的邮箱比如qq邮箱，也许有更严密的限制？不管了，能发校园邮件就可    
- ~~本来是想搞这个的，但是发现最后发现，貌似是什么某一个证书错误什么的(应该是颁发证书机构的问题？)，去阿里云买SSL证书就不值了，最后决定直接用邮件推送~~  
- 利用Postfix+Doecot实现  
### 遇到的一些BUG
#### 1
  - 虽然配置了TLS加密，但是发送邮件还是默认发送到25端口，要在/etc/postfix文件夹下建立transport文件指定强制端口，然后生成transport.db文件，只测试了126.com和山大云邮。是可以的。其他邮件服务器的地址可以直接去官网或者查看/var/log/mail.log的日志获取，就比如126.com原来日志的输出是
```txt
Sep 25 16:27:08 XXXXXXXXXXXXXXXXXXX postfix/smtp[103314]: connect to 126mx03.mxmail.netease.com[111.124.203.44]:25: Connection timed out
```  
  - 在transport中添加 126.com relay:126mx03.mxmail.netease.com:465  
  - 生成 .db  sudo postmap /etc/postfix/transport  
#### 2
  - 貌似还有一个TLS库的警告
  ```txt
Sep 25 16:50:16 XXXXXXXXXXXXXXXXXXXXXXX postfix/smtps/smtpd[104768]: warning: TLS library problem: error:14191044:SSL routines:tls1_enc:internal error:../ssl/record/ssl3_record.c:1065:
  ```
  - 但是能跑  

## Docker部署  
- 克隆此项目后直接将你的SSL证书文件放在根目录的certs文件夹中，然后构建项目即可  