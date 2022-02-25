require("dotenv").config();
const nodemailer = require("nodemailer");

module.exports = {
  async send(token, email) {

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'naorespondaemail320@gmail.com',
        pass: process.env.PASSWORD_EMAIL
      }
    });

    const mailConfigs = {
      text: "Para Confirmar seu email clique no link abaixo",
      subject: "Confirmação de Email",
      from: "PFF Verifica Email <naoresponder.fenapff@gmail.com>",
      to: [email],
      html: `<h2>Olá, Seja bem vindo a PFF!</h2>
                   <h3>Seu cadastro foi concluído, agora precisamos confirmar seu email.</h3>
                   <h4><p><a href="${process.env.API}/${token}">Clique aqui para confirmar seu email</a></p></h4>`,
    };

    return await transport.sendMail(mailConfigs)
    .then(data => {

      return true;
    }).catch((err) => {
      
      return false;
    })
  }
}