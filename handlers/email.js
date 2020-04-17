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
    * fn
    * our Request handler.
    * @param {obj} req
    *        the request object sent by the apiSails controller.
    * @param {fn} cb
    *        a node style callback(err, results) to send data when job is finished
    */
   fn: function handler(req, cb) {
      var err;

      var config = req.config();

      // if config not set, we have not be initialized properly.
      if (!config) {
         console.log("WARN: notification.email handler not setup properly.");
         err = new Error("notification.email: Missing config");
         err.code = "EMISSINGCONFIG";
         err.req = req;
         cb(err);
         return;
      }

      // check if we are enabled
      if (!config.enable) {
         // we shouldn't be getting notification.email messages
         console.log(
            "WARN: notification.email job received, but config.enable is false."
         );
         err = new Error("notification.email service is disabled.");
         err.code = "EDISABLED";
         cb(err);
         return;
      }

      // verify required parameters in job
      var email = req.param("email");
      if (!email) {
         err = new Error(
            ".email parameter required in notification.email service."
         );
         err.code = "EMISSINGPARAM";
         cb(err);
         return;
      }

      var transport = req.param("transport") || config.default;

      send(transport, email)
         .then((/* responseStatus */) => {
            req.log("send success.", email);
            cb(null, { status: "success" });
         })
         .catch((err) => {
            req.log("error sending email:", err);
            cb(err, { status: "error", error: err });
         });
   }
};
