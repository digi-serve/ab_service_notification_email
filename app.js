//
// notification_email
// A service to send emails.
//
const AB = require("@digiserve/ab-utils");
const { version } = require("./package");
// Use sentry by default, but can override with env.TELEMETRY_PROVIDER
if (AB.defaults.env("TELEMETRY_PROVIDER", "sentry") == "sentry") {
   AB.telemetry.init("sentry", {
      dsn: AB.defaults.env(
         "SENTRY_DSN",
         "https://a965e0a0124aacb664daa5bf00ada70f@o144358.ingest.sentry.io/4506143835750401"
      ),
      release: version,
   });
}

var controller = AB.controller("notification_email");
// controller.afterStartup((cb)=>{ return cb(/* err */) });
// controller.beforeShutdown((cb)=>{ return cb(/* err */) });
controller.init();
