/*
 * notification_email
 */
const AB = require("@digiserve/ab-utils");
const env = AB.defaults.env;

module.exports = {
   notification_email: {
      /*************************************************************************/
      /* enable: {bool} is this service active?                                */
      /*************************************************************************/
      enable: env("NOTIFICATION_EMAIL_ENABLE", true),

      /*************************************************************************/
      /* default : specify which configuration to use by default.              */
      /*************************************************************************/
      default: env("NOTIFICATION_EMAIL_DEFAULT", "smtp"),

      /*************************************************************************/
      /* smtp settings                                                         */
      /* (see https://nodemailer.com/smtp/  for all the possible settings)     */
      /*   .host {string}  the host url/IP address of where the smtp server is */
      /*   .port {integer} which port to use.                                  */
      /*   .secure {bool} do we use ssl encryption?                            */
      /*************************************************************************/
      smtp: {
         // pool: false,
         // {bool}
         // setup pooled connections on this setting?
         // if {false} then a new connection is established each time.

         host: env("SMTP_HOST", "SMTP.HOST.ADDR"),
         // {string}
         // the host address to connect to.
         // can be an ipaddress [174.23.34.23] or domain [emailcompany.com]

         port: env("SMTP_PORT", 465),
         // {int}
         // the port number to connect to.

         secure: env("SMTP_SECURE", true),
         // {bool}
         // use SSL to connect?
         // if using port 465, set this to {true}
         // otherwise use {false}

         auth: env("SMTP_AUTH", {
            type: "login",
            user: env("SMTP_USER", "some.user@url.com"),
            pass: env("SMTP_PASSWORD", "ThereIsN0Sp00n"),
         }),

         /*
        auth: {
        // {obj}
        // if Authentication is required, add this .auth{} param
        
            user: 'username',
            // {string}
            // the email account / username of the account to login as

            pass: 'password'
            // {string}
            // the password to login with
        }
        */
      },
   },

   /**
    * datastores:
    * Sails style DB connection settings
    */
   datastores: AB.defaults.datastores(),
};
