import zmail
class ZMail():
    def __init__(self):
        # 邮箱账号
        self.username = 'sharesdu@163.com'
        # 邮箱授权码
        self.authorization_code = 'ASNXIWPMNAHHGTDQ'
        # 构建一个邮箱服务对象
        self.server = zmail.server(self.username, self.authorization_code)
    def send(self,mail_to,mail_body):
        self.server.send_mail(mail_to,mail_body)
mail_body = {
        'subject': '测试报告',
        'content_text': '这是一个测试报告',  # 纯文本或者HTML内容
        'attachments': ['/home/wangxv/Files/vue/share_web/README.pdf'],
}
if __name__ == '__main__':
    ZMail().send(mail_to='tor108@outlook.com',mail_body=mail_body)