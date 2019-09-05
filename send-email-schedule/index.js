const nodeMailer = require('nodemailer');
const fs = require('fs');
const juice = require('juice');
const ejs = require('ejs');

const transporter = nodeMailer.createTransport({
    service: 'qq',
    port: 465, // smtp
    secureConnection:true,
    auth: {
        user: '1424254461@qq.com',
        pass: 'xwbqyldxszogjicd'
    }
});
const html = fs.readFileSync('./template/index.ejs','utf8');//读出index.ejs,为字符串
const template = ejs.compile(html);
const afterHtml = template({
    userName: 'userName'
})
const css = fs.readFileSync('./template/index.css','utf8');
const afterWithInCss = juice.inlineContent(afterHtml,css);//编译html

transporter.sendMail({
    to: '2695647975@qq.com',//接收方
    html: afterWithInCss,
    from: '1424254461@qq.com',//发送方
    subject: '大多哇'//标题
},(err, info) => {
    if (err) {
        console.log('邮件出错了',err)
    }
})