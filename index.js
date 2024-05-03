const { prepareAudit } = require("./packages/shared");
const { lighthouse } = require("./packages/lighthouse");
const { pa11y } = require("./packages/pa11y");

module.exports = { prepareAudit, lighthouse, pa11y };
