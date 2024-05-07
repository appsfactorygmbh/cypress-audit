import { lighthouseCommandHandler } from "./src/command-handler";

Cypress.Commands.add("lighthouse", lighthouseCommandHandler);
