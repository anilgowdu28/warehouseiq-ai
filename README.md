<<<<<<< HEAD
# WAREHOUSEIQ AI — Hackathon V3

This version makes AI the core of the product instead of a separate dashboard feature.

## What is included

- AI Command Center home screen
- AI Daily Brief
- AI Recommended Actions with confidence scores
- AI Decision Engine for stock conflicts
- AI Copilot drawer with natural-language questions
- Live OpenAI Responses API integration through a Node server
- Demo fallback mode when no API key is configured
- Inventory risk assessment
- Order priority workflow
- Picking / Packing / Quality Check / Dispatch workflow
- Exception resolution
- Analytics and AI insights
- Reports and Settings

## Run

From the project root:

```bash
npm install
npm run install-all
npm run dev
```

Then open http://localhost:5173

## Enable live OpenAI AI

1. Copy `server/.env.example` to `server/.env`
2. Put your API key in `OPENAI_API_KEY`
3. Keep the key in the server only — never put it in React client code.
4. Restart `npm run dev`.

The server uses the OpenAI Responses API. The default model is `gpt-5.6-luna`; change `OPENAI_MODEL` if needed.

Without an API key, the Copilot remains usable in demo mode with deterministic warehouse recommendations.

## Hackathon demo

Ask the Copilot:

- "What should I do first?"
- "Why is ORD-1006 urgent?"
- "Which products need reorder?"
- "Find bottlenecks"

Then open **Decision Engine** and apply the 7-unit allocation recommendation.

## Architecture

React/Vite UI -> Express server -> OpenAI Responses API

The API key is server-side only.
=======
# warehouseiq-ai
>>>>>>> 04ce32c94ee4cf9c72b88de489dda79b700d4c7a
