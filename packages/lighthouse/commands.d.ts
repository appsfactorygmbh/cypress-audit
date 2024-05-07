/// <reference types="cypress" />
/// <reference types="lighthouse/types/internal/global.d.ts" />

declare namespace Cypress {
  interface LighthouseThresholds {
    performance?: number;
    accessibility?: number;
    "best-practices"?: number;
    seo?: number;
    pwa?: number;
    "first-contentful-paint"?: number;
    "largest-contentful-paint"?: number;
    "first-meaningful-paint"?: number;
    "load-fast-enough-for-pwa"?: number;
    "speed-index"?: number;
    "estimated-input-latency"?: number;
    "max-potential-fid"?: number;
    "server-response-time"?: number;
    "first-cpu-idle"?: number;
    interactive?: number;
    "mainthread-work-breakdown"?: number;
    "bootup-time"?: number;
    "network-rtt"?: number;
    "network-server-latency"?: number;
    metrics?: number;
    "uses-long-cache-ttl"?: number;
    "total-byte-weight"?: number;
    "dom-size"?: number;
  }

  interface Chainable<Subject> {
    /**
     * Runs a lighthouse audit
     * @example
     * cy.lighthouse(thresholds,opts,config)
     */
    lighthouse(
      thresholds?: LighthouseThresholds,
      flags?: LH.Flags,
      config?: LH.Config
    ): Chainable<Subject>;
  }
}
