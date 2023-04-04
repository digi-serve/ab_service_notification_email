//
// send
// Send the email via nodemailer
const AB = require("@digiserve/ab-utils");

const config = AB.config("notification_email");
const nodeMailer = require("nodemailer");
var transports = {};

module.exports = {
   /**
    * send()
    * send an email using a predefined SMTP transport.
    * @param {string} transportKey the obj.key in the
    *        config/notification_email.js settings for the SMTP server.
    * @param {obj} email
    *        The email definition to send.
    * @return {Promise}
    */
   send: function(transportKey, email) {
      // format 1:  send('smtp', { to:'', from:'', ... });
      // format 2:  send({to:'', from:'', ... });
      return new Promise((resolve, reject) => {
         // verify params properly set
         if (typeof transportKey == "object") {
            email = transportKey;
            transportKey = config.default;
         }

         // make sure transport is defined
         if (!config[transportKey]) {
            var msg = " Error: unknown mailer transport[" + transportKey + "]";
            var err = new Error(msg);
            console.log(err);
            reject(err);
         } else {
            // make sure an instance of transport is created
            if (!transports[transportKey]) {
               var opts = config[transportKey];
               transports[transportKey] = nodeMailer.createTransport(opts);
            }
         }

         // use the specified transport
         var transport = transports[transportKey];

         // send the mail using the requested transport
         transport.sendMail(email, function(err, responseStatus) {
            if (err) {
               console.log("send():err:", err);
               if (responseStatus) {
                  console.log("send():responseStatus:", responseStatus);
               }
               reject(err);
            } else {
               // console.log("send():success:", responseStatus);
               resolve(responseStatus);
            }
         });
      });
   }
};
