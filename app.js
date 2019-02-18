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
const send = require(path.join(__dirname, "src", "send.js")).send;

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
    emailService.off("notification.email", handler);
    super.shutdown();
  }

  run() {
    emailService.on("notification.email", handler);
  }
}

// Make an instance of our Service (which starts the App)
var Service = new NotificationEmail({ name: "Notification Email" });

/**
 * handler
 * our email Request handler.
 */
function handler(req, cb) {
  // check if we are enabled
  if (!config.enabled) {
    // we shouldn't be getting notification.email messages
    console.log(
      "WARN: notification.email job received, but config.enabled is false."
    );
    var err = new Error("notification.email service is disabled.");
    err.code = "EDISABLED";
    cb(err);
    return;
  }

  // verify required parameters in job
  if (!req.email) {
    var err = new Error(
      ".email parameter required in notification.email service."
    );
    err.code = "EMISSINGPARAM";
    cb(err);
    return;
  }

  req.transport = req.transport || config.default;

  send(req.transport, req.email)
    .then(() => {
      cb(null, { status: "success" });
    })
    .catch(err => {
      cb(err, { status: "error", error: err });
    });
}
