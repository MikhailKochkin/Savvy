// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
const Sentry = require("@sentry/node");

Sentry.init({
  dsn: "https://2e5f37d24c6c4138e7b0836f12c64a4f@o4508652768722944.ingest.de.sentry.io/4508659726614608",

  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
});
