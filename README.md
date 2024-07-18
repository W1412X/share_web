# share_web

## share_web
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

### 数据库创建
- 用户表
```mysql
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(30) NOT NULL,
    password VARCHAR(25) NOT NULL,
    email VARCHAR(50),
    cookie VARCHAR(255),
    collected_articles JSON,
    published_articles JSON,
    UNIQUE (username)
);
```
- 