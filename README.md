# LexiOps AI – Frontend

LexiOps AI is a **multi-tenant AI knowledge copilot** that enables engineering teams to securely query their internal documents using Retrieval-Augmented Generation (RAG).  
This repository contains the **frontend application**, built as a modern, scalable SaaS interface.

---

## ✨ Overview

The LexiOps frontend provides a clean, ChatGPT-style user experience where authenticated users can:

- Interact with an AI assistant grounded in their organization’s knowledge base
- View chat history scoped to their workspace
- Track document ingestion status
- Manage workspace and profile settings (role-based)

The frontend is designed to be **stateless**, fast, and deployment-ready on free-tier platforms.

---

## 🧠 Core Concepts Reflected in the UI

- **Multi-Tenancy** – Every UI interaction is scoped to a workspace (tenant)
- **Role-Based Access Control (RBAC)** – Admin-only actions (uploads, invites) are gated
- **Async Ingestion Awareness** – Users see real-time status for document processing
- **Explainable AI UX** – Responses are designed to surface citations and confidence
- **Production-Grade UX** – No demo shortcuts, no hardcoded assumptions

---

## 🖥️ Tech Stack

- **Framework:** React.js
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Context / React Redux / Hooks
- **Auth Integration:** JWT-based auth (via backend)

---

## 📁 Project Structure

```
client/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # App pages (Dashboard, Profile, Auth, etc.)
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Helpers & constants
│   ├── services/       # API service functions
│   └── App.jsx         # App entry point
└── public/             # Static assets
```

The structure is organized to support **feature-based scaling** as the product grows.

---

## 🔐 Authentication & Tenant Flow

1. User signs up or logs in
2. System checks tenant membership
3. If no tenant exists → onboarding flow
4. Once associated with a tenant → dashboard access granted

All API calls include tenant context implicitly via authentication tokens.

---

## 💬 Chat Experience

- Central chat panel for AI interaction
- Sidebar with conversation history
- Disabled querying while ingestion is in progress
- Graceful error and empty states

The UI intentionally mirrors familiar AI tooling to reduce cognitive load.

---

## 🚀 Getting Started (Local Development)

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

The app will be available at:

```
http://localhost:5173
```

Ensure the backend API is running and environment variables are configured.

## 🧪 Status

This frontend is actively developed as part of a full-stack GenAI SaaS system.  
It is designed to be **production-ready**, not a prototype or demo UI.

---

## 📌 Philosophy

LexiOps AI focuses on:

- Trust over novelty
- Architecture over hacks
- Explainability over black-box AI

This frontend reflects those values in both UX and structure.

---

## 📄 License

MIT License
