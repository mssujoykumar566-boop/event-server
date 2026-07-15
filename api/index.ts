import app from "../src/app.js";

// Vercel detects files in `api/` and deploys this default export as a
// serverless function. The rewrite in vercel.json sends every API path here.
export default app;
