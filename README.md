# share_web
## 简介
### 组成
#### 用户管理  
- 用户的个人信息
- 用户的最近浏览历史
- 用户的收藏列表
- ... ...
#### 课程话题  
- 课程
  - 课程名称
  - 授课老师
  - 其他信息
- 课程评论列表
  - 或者直接列出需要标注的项(如是否有签到，是否有作业，期末考试形式)
- 课程相关资源(根据相关性推荐资源博客)  
#### 资源博客  
- 资源博客名称  
  - 资源博客信息
  - 资源博客标签
- 资源评论列表  

### 功能
#### 用户个人
- 修改个人信息
- 发布，修改，删除个人博客资源  
- 关注某个用户?
#### 搜索
- 可通过搜索直接搜索到**课程话题**或者**资源博客**  

### 登陆状态管理  
- 分别使用长期cookie和临时会话cookie做状态管理  

## 结构
### `./src/components/*`
- `Answer`问题回复组件
- `AnswerList`问题回复列表
- `ArticleList`文章列表
- `ArticleItem`文章展示组件
- `ArticleBottomBar`文章页底部栏
- `LoginItem`登陆窗口组件
- `QuestionAndAnswers`文章或课程问题+回复组件
- `QuestionList`**待完成**问题列表
- `QuestionWithImage`**待完成**问题组件类型1
- `QuestionWithOutImage`问题组件类型2
- `SelfCreate`个人创作界面
- `TagButton`标签
### `./src/pages/*`
- `ArticlePage`文章页
- `IndexPage`主页
- `LoginPage`登陆页
- `SelfPage`个人管理页
- `TestPage`... ...
### `./src/router`
- 路由设置
### `./src/utils/*`
- 自定义工具、函数  

### 各个页面接收参数
#### 文章编辑页面  
- 由组件ArticleEditorBar和ArticleEditor组成
- 根据传入的文章id以及用户的信息进行鉴权并获取信息，根据信息结果得到对应的文章信息



