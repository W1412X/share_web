## 登陆  
- 考虑注册的时候在用户信息添加 校区，学院，专业信息(选填)  
- 考虑登陆的时候返回字段包括用户的基本信息 name,id,email  
## 文章  
- 创作，编辑部分没有封面图片和文件资源的键(可以留着先，实现先把基本的写完测试后慢慢再做)  
- 获取文章列表的类型 ，用户收藏，用户创作，搜索，首页  
  - 用户创作和搜索(目前场景感觉可以直接mysql分词+mysql索引(对标题和标签)?)  
- 考虑创作成功后除了状态码，还有返回一个创作文章的id，方便跳转？
## POST和COURSE  
- 和文章一样获取列表的类型这里也应该有收藏，搜索，首页，用户创作
- 考虑对于课程可以用户创作但是由管理员管理(即发布后不可修改)？
- 考虑对于问题创作后不可修改？(因为问题绑定在评论，可能修改会导致驴唇不对马嘴？)  
- 考虑创作成功后除了状态码，还有返回一个创作POST/COURSE的id，方便跳转？  
## 用户头像上传  
- 可以考虑直接用学号管理头像？  
- 是否需要在前端压缩图片？  