const { Forbidden, InternalServerError, Unauthorized } = require("http-errors");
const sendMail = require('@sendgrid/mail');
const sendgridAPI = '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';
sendMail.setApiKey(sendgridAPI);


class sendEmail {

  /**** SEND ACCOUNT VERIFICATION EMAIL ****/
  async sendAccountVerificationEmail(payload){
    const date = new Date();
    const sentTime = date.toLocaleTimeString();
    const email = `      
      <div class="main">
        <div style="margin: 0 0 0 3rem; padding: 0 1rem;">
          <div style="padding: 0.5rem; background-color: #518751; text-align: center; width: 60%;">
            <label style="color: white; font-size: 22px;"><b>Projetts</b></label><br>
            <label style="color:antiquewhite">Academic Excellence</label>
          </div>
          
          <div style="margin-top: 1.5rem;">
            <label style="font-size: 16px;">
              Hi ${payload.firstname}, <br> Thanks for signing up with projetts
            </label>
          </div>

          <div style="margin: 5px 0; margin-top: 1.5rem;">
            To complete your account registration: <br> verify your email address to gain full access, keep your account secured <br> and also provide a way to recover your password when the need arises.
          </div>

          <div style="margin-top: 2rem; display: flex; justify-content: center;">
            <a style="padding: 0.8rem; color: white; text-align: center; background-color: #044079; text-decoration: none; border-radius: 4px;" href="${payload.verification_link}">VERIFY YOUR ACCOUNT </a>
          </div><br>

          <div style="margin-top: 1rem;">
            <b style="color: gray;">
              Courtesy: 
            </b> The Projetts team
          </div>
        </div>
      </div>

    `;

  const mailOptions = {
    subject : 'Verify your account with projetts',
    from    : 'projetts <gabriel@woca.ng>',
    to      : payload.email,
    html    : email,
  }

  sendMail.send(mailOptions, (err) => {
      if(err) {
        throw Forbidden('Email could not be delivered, try again.')
      };
      
    });
  }

  /**** WELCOME EMAIL AFTER ACCOUNT VERIFICATION ****/
  async sendWelcomeEmail(payload){
    const date = new Date();
    const sentTime = date.toLocaleTimeString();
    const email = `      
      <div class="main">
        <div style="margin: 0 0 0 3rem; padding: 0 1rem;">
          <div style="padding: 0.5rem; background-color: #518751; text-align: center; width: 60%;">
            <label style="color: white; font-size: 22px;"><b>Projetts</b></label><br>
            <label style="color:antiquewhite">Academic Excellence</label>
          </div>
          
          <div style="margin-top: 1.5rem;">
            <label style="font-size: 16px;">
              Hi ${payload.firstname}, <br> Welcome to projetts Academic Excellence
            </label>
          </div>

          <div style="margin: 5px 0; margin-top: 1.5rem;">
            email body
          </div>

          <div style="margin-top: 2rem; display: flex; justify-content: center;">
            Brief Resource listing
          </div><br>

          <div style="margin-top: 1rem;">
            <b style="color: gray;">
              Courtesy: 
            </b> The Projetts team
          </div>
        </div>
      </div>
    `;

    const mailOptions = {
      subject : 'Welcome to projetts Academic Excellence',
      from    : 'projetts <gabriel@woca.ng>',
      to      : payload.email,
      html    : email,
    }

    sendMail.send(mailOptions, (err) => {
      if(err) {
        console.log(err);
        throw Forbidden('Email could not be delivered, try again.')
      };
      
    });
  }



  /**** SEND PASSWORD RESET EMAIL ****/
  async sendPasswordResetEmail(payload){
    const date = new Date();
    const sentTime = date.toLocaleTimeString();
    console.log(payload)
    const email = `      
      <div class="main">
        <div style="margin: 0 0 0 3rem; padding: 0 1rem;">
          <div style="padding: 0.5rem; background-color: #518751; text-align: center; width: 60%;">
            <label style="color: white; font-size: 22px;"><b>Projetts</b></label><br>
            <label style="color:antiquewhite">Academic Excellence</label>
          </div>
          
          <div style="margin-top: 1.5rem;">
            <label style="font-size: 16px;">
              Hi ${payload.firstname}, <br>
            </label>
          </div>

          <div style="margin: 5px 0; margin-top: 1.5rem;">
            We just received a password reset request from your account.<br><br>
            Kindly use the link below to change your account password.
          </div>

          <div style="margin-top: 2rem; display: flex; justify-content: center;">
            <a style="padding: 0.8rem; color: white; text-align: center; background-color: #044079; text-decoration: none; border-radius: 4px;" href="${payload.reset_link}">CHANGE YOUR PASSWORD </a>
          </div><br>

          <div style="margin: 5px 0; margin-top: 1.5rem;">
            <b>NOTE:</b> If you didn't issue this request, kindly ignore this email.
          </div>

          <div style="margin-top: 1rem;">
            <b style="color: gray;">
              Courtesy: 
            </b> The Projetts team
          </div>
        </div>
      </div>

    `;

  const mailOptions = {
    subject : 'Password reset request instructions',
    from    : 'projetts <gabriel@woca.ng>',
    to      : payload.email,
    html    : email,
  }

  sendMail.send(mailOptions, (err) => {
      if(err) {
        throw Forbidden('Email could not be delivered, try again.')
      };
      
    });
  };



  /**** SEND PASSWORD RESET EMAIL ****/
  async sendPasswordChangeEmail(payload){
    const date = new Date();
    const sentTime = date.toLocaleTimeString();
    const email = `      
      <div class="main">
        <div style="margin: 0 0 0 3rem; padding: 0 1rem;">
          <div style="padding: 0.5rem; background-color: #518751; text-align: center; width: 60%;">
            <label style="color: white; font-size: 22px;"><b>Projetts</b></label><br>
            <label style="color:antiquewhite">Academic Excellence</label>
          </div>
          
          <div style="margin-top: 1.5rem;">
            <label style="font-size: 16px;">
              Hi ${payload.firstname}, <br>
            </label>
          </div>

          <div style="margin: 5px 0; margin-top: 1.5rem;">
            Your projetts account password was changed successfully
          </div>

          <div style="margin: 5px 0; margin-top: 1.5rem;">
            <b>NOTE:</b> If you didn't perform this action and you are sure. Kindly contact 
            <a href="${'https://www.projetts.com'}">The Support Team </a>
          </div>

          <div style="margin-top: 1rem;">
            <b style="color: gray;">
              Courtesy: 
            </b> The Projetts team
          </div>
        </div>
      </div>
    `;

  const mailOptions = {
    subject : 'Account password change notification',
    from    : 'projetts <gabriel@woca.ng>',
    to      : payload.email,
    html    : email,
  }


  sendMail.send(mailOptions, (err) => {
      if(err) {
        throw Forbidden('Email could not be delivered, try again.')
      };      
    });
  };

}

module.exports = new sendEmail();
