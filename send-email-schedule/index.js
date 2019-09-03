const nodeMailer = require('nodemailer');
const fs = require('fs');
const juice = require('juice');
const ejs = require('ejs');

const transporter = nodeMailer.createTransport({
    service: 'qq',
    port: 465, //smtp协议  邮件
    secureConnection: true,
    auth: {
        user: '1097720997@qq.com',
        pass: 'ainbxtpxfcudbafh'
    }
   
});
const html = fs.readFileSync('./template/index.ejs', 'utf8');
const template = ejs.compile(html);
const afterHtml = template({
    userName: 'userName'
})
const css = fs.readFileSync('./template/index.css', 'utf8')
// const afterWithInCss = juice(afterHtml);
const afterWithInCss = juice.inlineContent(afterHtml, css);//编译html
transporter.sendMail({
    to: '1097720997@qq.com',
    html: afterWithInCss,
    from: '1097720997@qq.com',
    subject: 'hello world'
},(err, info) => {
    if(err) {
        console.log('邮件出错了', err);
    }
})