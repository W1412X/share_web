# share_web  

## 项目结构
### `./src/components/*`
- 所有组件  
### `./src/pages/*`
- 所有页面
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
> 之前考虑过对于列表的组件，根据id列表分发到每个具体的组件根据id进行加载，但是频繁连接服务器也许对服务器的性能要求比较高，而且也比较浪费流量(但是也许效果比较好)  
> 所以还是请求内容列表分发内容  

## 管理系统  
> 还不算很完善其实，等等再写吧。
- 处理举报  
- 处理建议  
- 处理BUG报告  
- 处理文章/问题/课程/问题回答/课程评价  
- 处理用户  
- 发布公告  


## 分支说明  
- `main`为主要分支，主要版本  
- `optimize1`其实是优化了部分代码，但是没有合并
- `optimize2`主要是在优化1的基础上，对文章评论部分由 发布帖子转为发布评论  
- `before-standard-component`为早期代码，没有合并  


## Docker部署  
- 克隆此项目后直接将你的SSL证书文件放在根目录的certs文件夹中，然后构建项目即可  

> 感觉网页前端开发比APP原生开发简单很多，但是APP原生开发的类什么的逻辑比较清晰  
