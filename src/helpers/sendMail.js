require("dotenv").config()
const { Forbidden, InternalServerError, Unauthorized } = require("http-errors");
const sendMail = require('@sendgrid/mail');
sendMail.setApiKey(process.env.SENDGRID_API_KEY);

const emailMe = require('mailgun.js');


class sendEmail {

  /**** SEND ORDER RECEIPT EMAIL ****/
  async sendOrderReceipt(payload){
    const date = new Date();
    const sentTime = date.toLocaleTimeString();
    const email = `      
      <div class="main">
        <div style="margin: 0 0 0 3rem; padding: 0 1rem;">
          
        </div>
      </div>
    `;

  const mailOptions = {
    subject : 'Your order information',
    from    : 'Bnkle Pizza <gabriel@woca.ng>',
    to      : payload.email,
    html    : email,
  }

  sendMail.send(mailOptions, (err) => {
      if(err) {
        throw Forbidden('Email could not be delivered, try again.')
      };
      
    });
  }

}

module.exports = new sendEmail();
