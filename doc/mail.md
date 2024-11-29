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