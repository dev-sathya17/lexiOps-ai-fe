export const STEPS = {
  HERO: [
    "Initializing workspace",
    "Loading product features",
    "Preparing your experience",
    "Almost ready",
  ],

  AUTH: [
    "Verifying credentials",
    "Securing your session",
    "Setting up your workspace",
    "Redirecting you",
  ],

  ONBOARDING: [
    "Creating your workspace",
    "Configuring settings",
    "Finalizing setup",
    "Welcome to LexiOps",
  ],

  DOCUMENT_UPLOAD: [
    "Receiving documents",
    "Extracting content",
    "Indexing knowledge",
    "Documents ready to query",
  ],

  CHAT: [
    "Analyzing your question",
    "Retrieving relevant context",
    "Generating grounded answer",
    "Finalizing response",
  ],

  DASHBOARD: [
    "Fetching workspace data",
    "Syncing documents",
    "Loading conversations",
    "Dashboard ready",
  ],

  PRICING: [
    "Loading plans",
    "Fetching usage limits",
    "Preparing billing details",
    "Plans ready",
  ],

  SETTINGS: [
    "Loading preferences",
    "Syncing workspace settings",
    "Applying configuration",
    "Settings ready",
  ],
} as const;
