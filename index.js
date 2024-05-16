const { prepareAudit } = require("./packages/shared");
const { lighthouse } = require("./packages/lighthouse");
const { pa11y } = require("./packages/pa11y");
exports.prepareAudit = prepareAudit;
exports.lighthouse = lighthouse;
exports.pa11y = pa11y;
