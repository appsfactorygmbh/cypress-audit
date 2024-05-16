const VALID_BROWSERS = {
  Chrome: true,
  Chromium: true,
  Canary: true,
};
const formatIssue = (issue) => {
  return `
    Code: ${issue.code} |||
    Issue: ${issue.message} |||
    Context: ${issue.context}
    `;
};
const printIssues = (issues) => {
  issues.forEach((issue) => {
    Cypress.log({
      title: issue.code,
      message: formatIssue(issue),
      consoleProps: () => issue,
      $el: Cypress.$(issue.selector),
    });
  });
};
const pa11yCommandHandler = (opts) => {
  if (!VALID_BROWSERS[Cypress.browser.displayName]) {
    return cy.log(
      "cy.pa11y()",
      `${Cypress.browser.displayName} is not supported. Skipping...`
    );
  }
  return cy
    .url()
    .then((url) =>
      cy.task("pa11y", {
        url,
        opts,
      })
    )
    .then((issues) => {
      printIssues(issues);
      return cy.wrap(issues);
    })
    .then((issues) => {
      const threshold = opts?.threshold ?? 0;
      assert.isBelow(
        issues.length,
        threshold,
        `cy.pa11y - ${issues.length} accessibility violation(s) found. Threshold: ${threshold}. Issues: ${issues.length}`
      );

      // Log a message if no issues were found
      Cypress.log({
        title: "cy.pa11y",
        message: "Accessibility test passed",
      });
    });
};
exports.pa11yCommandHandler = pa11yCommandHandler;
