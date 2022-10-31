/**
 * handler
 * our Request handler.
 */
// const async = require("async");
// const fs = require("fs");
const path = require("path");

const send = require(path.join(__dirname, "..", "src", "send.js")).send;

module.exports = {
   /**
    * Key: the cote message key we respond to.
    */
   key: "notification_email.email",

   /**
    * inputValidation
    * define the expected inputs to this service handler:
    * Format:
    * "parameterName" : {
    *    {joi.fn}   : {bool},  // performs: joi.{fn}();
    *    {joi.fn}   : {
    *       {joi.fn1} : true,   // performs: joi.{fn}().{fn1}();
    *       {joi.fn2} : { options } // performs: joi.{fn}().{fn2}({options})
    *    }
    *    // examples:
    *    "required" : {bool},  // default = false
    *
    *    // custom:
    *        "validation" : {fn} a function(value, {allValues hash}) that
    *                       returns { error:{null || {new Error("Error Message")} }, value: {normalize(value)}}
    * }
    */
   inputValidation: {
      email: { object: true, required: true },
      transport: { string: true, optional: true },
   },

   /**
    * fn
    * our Request handler.
    * @param {obj} req
    *        the request object sent by the apiSails controller.
    * @param {fn} cb
    *        a node style callback(err, results) to send data when job is finished
    */
   fn: function handler(req, cb) {
      var err;

      req.log("NotificationEmail.email: request received.");

      var config = req.config();

      var email = req.param("email");
      // email.from : {string} the email address of the sender
      // email.to :
      // email.cc :
      // email.bcc:  {string} comma separated list of recipient email addresses
      //              or {array} recipient email addresses
      // email.subject: {string} the subject of the email
      // email.text : {string} plaintext version of the message
      // email.html : {string} HTML version of the message
      // email.attachments: {array} attachment objects

      var transport = req.param("transport") || config.default;

      send(transport, email)
         .then((/* responseStatus */) => {
            req.log("send success.", email);
            cb(null, { status: "success" });
         })
         .catch((err) => {
            // req.log("error sending email:", err);
            req.notify.developer(err, {
               context: "error sending email",
               email,
               config,
            });
            err.transport = config[transport];
            cb(err, { status: "error", error: err });
         });
   },
};
