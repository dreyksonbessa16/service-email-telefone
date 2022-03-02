require("dotenv").config();
const nodemailer = require("nodemailer");
const logger = require("../../logger");

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
      text: "NÃO RESPONDER ESTE EMAIL",
      subject: "Para Confirmar seu email clique no link abaixo",
      from: "Confirmação de Email FENAPFF <naoresponder.fenapff@gmail.com>",
      to: [email],
      html: `<!DOCTYPE html>
      <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <meta name="x-apple-disable-message-reformatting">
        <title></title>
        <!--[if mso]>
        <noscript>
          <xml>
            <o:OfficeDocumentSettings>
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
          </xml>
        </noscript>
        <![endif]-->
        <style>
          table, td, div, h1, p {font-family: Arial, sans-serif;}
        </style>
      </head>
      <body style="margin:0;padding:0;">
        <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;">
          <tr>
            <td align="center" style="padding:0;">
              <table role="presentation" style="width:602px;border-collapse:collapse;border:1px solid #cccccc;border-spacing:0;text-align:left;">
                <tr>
                  <td align="center" style="padding:40px 0 30px 0;background:#70bbd9;">
                    <img src="https://img.freepik.com/free-vector/people-sending-receiving-messages_74855-5914.jpg?w=826" alt="" width="300" style="height:auto;display:block;" />
                  </td>
                </tr>
                <tr>
                  <td style="padding:36px 30px 42px 30px;">
                    <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;">
                      <tr>
                        <td style="padding:0 0 36px 0;color:#153643;">
                          <h1 style="font-size:24px;margin:0 0 20px 0;font-family:Arial,sans-serif;">BEM VINDO A FENAPFF!</h1>
                          <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">
                            Este email, é um email automático configurado para enviar o código do verificação do Associado. Abaixo terá um link para confirmar seu email, basta clicar no link, e você será redirecionado para uma página onde será confirmado este email
                          </p>
                          <p style="margin:0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;"><a href="${process.env.API}/${token}" style="color:#ee4c50;text-decoration:underline;">CLIQUE AQUI PARA CONFIRMAR SEU EMAIL!</a></p>
                        </td>
                      </tr>
                      <!-- <tr>
                        <td style="padding:0;">
                          <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;">
                            <tr>
                              <td style="width:260px;padding:0;vertical-align:top;color:#153643;">
                                <p style="margin:0 0 25px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;"><img src="https://assets.codepen.io/210284/left.gif" alt="" width="260" style="height:auto;display:block;" /></p>
                                <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempus adipiscing felis, sit amet blandit ipsum volutpat sed. Morbi porttitor, eget accumsan dictum, est nisi libero ultricies ipsum, in posuere mauris neque at erat.</p>
                                <p style="margin:0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;"><a href="http://www.example.com" style="color:#ee4c50;text-decoration:underline;">Blandit ipsum volutpat sed</a></p>
                              </td>
                              <td style="width:20px;padding:0;font-size:0;line-height:0;">&nbsp;</td>
                              <td style="width:260px;padding:0;vertical-align:top;color:#153643;">
                                <p style="margin:0 0 25px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;"><img src="https://assets.codepen.io/210284/right.gif" alt="" width="260" style="height:auto;display:block;" /></p>
                                <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">Morbi porttitor, eget est accumsan dictum, nisi libero ultricies ipsum, in posuere mauris neque at erat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempus adipiscing felis, sit amet blandit ipsum volutpat sed.</p>
                                <p style="margin:0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;"><a href="http://www.example.com" style="color:#ee4c50;text-decoration:underline;">In tempus felis blandit</a></p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr> -->
                    </table>
                  </td>
                </tr>
                <!-- <tr>
                  <td style="padding:30px;background:#ee4c50;">
                    <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;font-size:9px;font-family:Arial,sans-serif;">
                      <tr>
                        <td style="padding:0;width:50%;" align="left">
                          <p style="margin:0;font-size:14px;line-height:16px;font-family:Arial,sans-serif;color:#ffffff;">
                            &reg; CONTATO SUPORTE
                            <br/>
                            <a href="http://www.example.com" style="color:#ffffff;text-decoration:underline;">(62) 99552-69327</a>
                            <a href="http://www.example.com" style="color:#ffffff;text-decoration:underline;">dreyksonbessa16@hotmail.com</a>
                          </p>
                        </td>
                        <td style="padding:0;width:50%;" align="right">
                          <table role="presentation" style="border-collapse:collapse;border:0;border-spacing:0;">
                            <tr>
                              <td style="padding:0 0 0 10px;width:38px;">
                                <a href="http://www.twitter.com/" style="color:#ffffff;"><img src="https://assets.codepen.io/210284/tw_1.png" alt="Twitter" width="38" style="height:auto;display:block;border:0;" /></a>
                              </td>
                              <td style="padding:0 0 0 10px;width:38px;">
                                <a href="http://www.facebook.com/" style="color:#ffffff;"><img src="https://assets.codepen.io/210284/fb_1.png" alt="Facebook" width="38" style="height:auto;display:block;border:0;" /></a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr> -->
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>`,
    };

    return await transport.sendMail(mailConfigs)
    .then(data => {

      logger.info(`EmailService: EMAIL ENVIADO COM SUCESSO - { email: ${email}, token: ${token}}`);
      return true;
    }).catch((err) => {
      
      logger.error(`EmailService: ERRO AO ENVIAR EMAIL - ${err}`);
      return false;
    })
  }
}