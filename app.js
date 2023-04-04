//
// notification_email
// A service to send emails.
//
const AB = require("@digiserve/ab-utils");

var controller = AB.controller("notification_email");
// controller.afterStartup((cb)=>{ return cb(/* err */) });
// controller.beforeShutdown((cb)=>{ return cb(/* err */) });
controller.init();
