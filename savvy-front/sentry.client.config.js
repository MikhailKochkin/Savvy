// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://7c727bf448a957850bdefe2eed062c5e@o4508652768722944.ingest.de.sentry.io/4508652770885712",

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
