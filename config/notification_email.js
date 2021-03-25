module.exports = {
   /*************************************************************************/
   /* enable: {bool} is this service active?                                */
   /*************************************************************************/
   enable: false,

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
      // pool: false,
      // {bool}
      // setup pooled connections on this setting?
      // if {false} then a new connection is established each time.

      host: "SMTP.HOST.ADDR",
      // {string}
      // the host address to connect to.
      // can be an ipaddress [174.23.34.23] or domain [emailcompany.com]
      // NOTE: should be defined in config/local.js

      port: 25,
      // {int}
      // the port number to connect to.

      secure: false,
      // {bool}
      // use SSL to connect?
      // if using port 465, set this to {true}
      // otherwise use {false}

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
};
