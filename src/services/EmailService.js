require("dotenv").config();
const nodemailer = require("nodemailer");
const oauth2client = require("../configs/googleapi");

module.exports = {
  async send(token, email) {

    try {
      const ACCESSTOKEN = await oauth2client.getAccessToken();
      const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: 'naoresponder.fenapff@gmail.com',
          clientId: process.env.CLIENT_ID_EMAIL,
          clientSecret: process.env.CLIENT_SECRET_EMAIL,
          refreshToken: process.env.REFRESH_TOKEN_EMAIL,
          accessToken: ACCESSTOKEN
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

      await transport.sendMail(mailConfigs)
        .then(res => {
          return res;
        }, (error) => {
          return error;
        })

    } catch (error) {

      console.log(error);
    }

  }

}