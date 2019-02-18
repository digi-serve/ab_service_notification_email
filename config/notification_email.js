module.exports = {
  /*************************************************************************/
  /* enabled: {bool} is this service active?                               */
  /*************************************************************************/
  enabled: false,

  /*************************************************************************/
  /* default : specify which configuration to use by default.              */
  /*************************************************************************/
  default: "smtp",

  /*************************************************************************/
  /* smtp settings                                                         */
  /* (see https://nodemailer.com/smtp/  for all the possible settings)     */
  /*   .host {string}  the host url/IP address of where the smtp server is */
  /*   .port {integer} which port to use.                                  */
  /*   .secure {bool} do we use ssl encryption?                            */
  /*************************************************************************/
  smtp: {
    // type: "SMTP",

    // if you don't use a service, you need to specify host & port:
    host: "SMTP.HOST.ADDR", // should define in config/local.js
    port: 25,
    secure: false // true:  use SSL
  }
};
