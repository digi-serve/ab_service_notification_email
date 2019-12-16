/**
 * handler
 * our email Request handler.
 */
const path = require("path");
const send = require(path.join(__dirname, "send.js")).send;

var config;

module.exports = {
  /**
   * init
   * setup our configuration & connections
   * @param {obj} options
   *        An object hash of important configuration data:
   *        .config  {obj} the config settings for this service.
   *        ...
   */
  init: function(options) {
    options = options || {};
    config = options.config || null;
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

    // check if we are enabled
    if (!config.enabled) {
      // we shouldn't be getting notification.email messages
      console.log(
        "WARN: notification.email job received, but config.enabled is false."
      );
      err = new Error("notification.email service is disabled.");
      err.code = "EDISABLED";
      cb(err);
      return;
    }

    // verify required parameters in job
    if (!req.email) {
      err = new Error(
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
};
