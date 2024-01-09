import nodemailer,{Transport, Transporter} from "nodemailer";
import path from "path";
import ejs from "ejs";
require("dotenv").config()
interface EmailOptions{
    email:string;
    subject:string;
    template:string;
    data:{[key:string]:any};
}
const sendMail = async (options:EmailOptions):Promise<void> => {
    const transporter:Transporter = nodemailer.createTransport({
        host:process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        service: process.env.SMTP_SERVICE,
        secure: true,
        auth:{
            user:process.env.SMTP_MAIL,
            pass:process.env.SMTP_PASSWORD
        }
        
    })
    console.log('hello')
    const {email,subject,template,data} = options;
    const templatePath = path.join(__dirname,"../mailTemplates",template);
    const html:string = await ejs.renderFile(templatePath,data);
    const mailOptions = {
        from: process.env.SMTP_HOST,
        to:email,
        subject,
        html
    }
    console.log('here')
    try {
        await transporter.sendMail(mailOptions)
    } catch (error) {
        console.log(error)
    }
    
    console.log('hereee')
}
export default sendMail;