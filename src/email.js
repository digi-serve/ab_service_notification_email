/**
 * handler
 * our Request handler.
 */
const async = require("async");
const fs = require("fs");
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
     *        .DB {DBConnection} an instance of a live DB connection.
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
        console.log("email:", req);
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
            var err = new Error("notification.email service is disabled.");
            err.code = "EDISABLED";
            cb(err);
            return;
        }

        // verify required parameters in job
        if (!req.param.email) {
            var err = new Error(
                ".email parameter required in notification.email service."
            );
            err.code = "EMISSINGPARAM";
            cb(err);
            return;
        }

        req.param.transport = req.param.transport || config.default;

        send(req.param.transport, req.param.email)
            .then(() => {
                cb(null, { status: "success" });
            })
            .catch((err) => {
                cb(err, { status: "error", error: err });
            });

        // cb(null, { uuid: "123456" });
    }
};
