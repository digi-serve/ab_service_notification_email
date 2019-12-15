//
// notification_email
// A service to send emails.
//
// This service will take a defined email and send it using one of the system
// level defined transports.
//
// options {obj} the required information for sending the email:
//  options.transport {string} [optional] which defined transport to use when
//                    sending the email.  A transport is a defined connection
//                    specified in the config/local.js file.
//                    Default: if not provided then a config.default setting
//                    will be used.
//
//  options.email {obj} the email definition.  (see https://nodemailer.com/message/)
//    .to  {array}|{CSV list} of email addresses
//    .from {string} the From Email
//    .subject {string} The subject text of the email
//    .text {string|Buffer|Stream|attachment-like obj} plaintext version of the message
//    .html {string|Buffer|Stream|attachment-like obj} HTML version of the email.
//
const path = require("path");
const AB = require("ab-utils");

const config = AB.config("notification_email");

const cote = require("cote");
const emailService = new cote.Responder({ name: "Notification-Email" });

const emailHandler = require(path.join(__dirname, "src", "email.js"));
emailHandler.init({ config });

const ABService = AB.service;

//
// NotificationEmail Service
// Create an instance of ABService that defines the unique actions:
//  .startup()  : initialize data & communications
//  .shutdown() : shutdown communications & data
//  .run()      : perform your unique actions
class NotificationEmail extends ABService {
  // startup() {
  //   super.startup();
  // }

  shutdown() {
    emailService.off("notification.email", emailHandler.fn);
    super.shutdown();
  }

  run() {
    emailService.on("notification.email", emailHandler.fn);
    this.ready();
  }
}

// Make an instance of our Service (which starts the App)
var Service = new NotificationEmail({ name: "Notification Email" });
