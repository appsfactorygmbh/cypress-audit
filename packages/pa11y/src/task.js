const pa11yLib = require("pa11y");
const { connect } = require("puppeteer");
const pa11y =
  (callback) =>
  async ({ url, opts }) => {
    const browser = await connect({
      browserURL: `http://localhost:${global.cypress_audit_port}`,
    });
    const results = await pa11yLib(url, {
      browser,
      runners: ["axe"],
      ...opts,
    });
    if (callback) {
      callback(results);
    }
    return results.issues || [];
  };
exports.pa11y = pa11y;
