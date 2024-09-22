# share_web
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

## 进一步优化方向    
- 所有组件改为动态导入  
- 代码风格转换为Vue3的组合式API
- 弹窗(`v-dialog`)实现逻辑    
- ... ...
## 安全性  
- [前端敏感词检测](https://github.com/W1412X/JS-Sentsitive-Detect)  
  - 下载 
    ```bash  
    npm install wx-sensitive-detect
    ```  
- [图片违规检测](https://github.com/W1412X/SensitiveImgDetect)  
  - 下载  
    ```bash
    pip install SensitiveImgDetect
    ```