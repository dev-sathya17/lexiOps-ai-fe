type DocItem = {
  title: string;
  content: string;
};

type DocCategory = {
  name: string;
  items: DocItem[];
};

export const docCategories: DocCategory[] = [
  {
    name: "Getting Started",
    items: [
      {
        title: "Creating a Workspace",
        content:
          "Sign up using your email or supported OAuth providers. During onboarding, you’ll create a workspace that represents your organization. Each workspace is fully isolated and acts as your private AI environment.",
      },
      {
        title: "Dashboard Overview",
        content:
          "After onboarding, you’ll land on the main dashboard. Here you can view document ingestion status, access the AI chat interface, review past conversations, and manage workspace settings.",
      },
      {
        title: "Navigating the Interface",
        content:
          "Use the sidebar (or mobile menu) to switch between chat, documents, and settings. Workspace-level context is always preserved, ensuring all interactions remain scoped and secure.",
      },
    ],
  },
  {
    name: "Docs & Knowledge Base",
    items: [
      {
        title: "Uploading Documents",
        content:
          "Admins can upload supported documents such as PDFs and text files to build the workspace knowledge base. Uploaded files are processed asynchronously and become searchable once ingestion is complete.",
      },
      {
        title: "Ingestion & Indexing",
        content:
          "Documents go through text extraction, chunking, and semantic indexing in the background. You’ll see clear status indicators so you know when documents are ready for querying.",
      },
      {
        title: "Document Limits",
        content:
          "Each plan enforces limits on the number of documents and total storage per workspace. Basic plans limit the number of documents you can upload to 5 and total storage to 50MB, while Pro plans allow up to 25 documents and 250MB of storage. Enterprise plans can be customized based on your needs.",
      },
    ],
  },
  {
    name: "AI Querying",
    items: [
      {
        title: "Asking Questions",
        content:
          "Use the chat interface to ask questions in natural language. LexiOps AI retrieves relevant context from your documents before generating an answer.",
      },
      {
        title: "Grounded Answers & Citations",
        content:
          "All responses are grounded strictly in your workspace documents and include references to the source content used, helping reduce hallucinations and build trust.",
      },
      {
        title: "Conversation History",
        content:
          "Your past conversations are saved and scoped to your workspace. This allows teams to revisit answers and maintain continuity across sessions.",
      },
    ],
  },
  {
    name: "Workspace & Access",
    items: [
      {
        title: "Inviting Team Members",
        content:
          "Workspace admins can invite team members via email. Invited users join the existing workspace and inherit permissions based on their assigned role.",
      },
      {
        title: "Roles & Permissions",
        content:
          "LexiOps AI supports role-based access control. Admins manage documents and members, while regular members can query the knowledge base.",
      },
      {
        title: "Preferences & Theme",
        content:
          "Customize your experience by switching between light and dark modes and managing notification preferences directly from your profile.",
      },
    ],
  },
];

export const faqCategory = {
  name: "FAQ",
  items: [
    {
      title: "How many team members are allowed per plan?",
      content:
        "The Starter plan supports a limited number of 5 members per workspace, suitable for small teams. The Pro plan allows 25 members to collaborate within the same workspace.",
    },
    {
      title: "Who can upload documents?",
      content:
        "Only workspace admins can upload and manage documents. This ensures that the knowledge base remains curated and trustworthy.",
    },
    {
      title: "Can I query documents while ingestion is in progress?",
      content:
        "Querying is disabled until ingestion completes to ensure accurate and complete answers. You’ll be notified once documents are fully indexed.",
    },
    {
      title: "Is my data shared across workspaces?",
      content:
        "No. Each workspace is fully isolated. Documents, conversations, and embeddings are never shared across tenants.",
    },
    {
      title: "Can I delete documents or conversations?",
      content:
        "Yes. Admins can remove documents from the workspace, and users can manage their conversation history based on workspace permissions.",
    },
    {
      title: "Do you offer a free plan?",
      content:
        "Yes. The Starter plan is free and includes limited document uploads and team members. You can upgrade to higher plans as your usage grows.",
    },
    {
      title: "How do I contact support?",
      content:
        "You can reach out via the contact form available in the dashboard. Support requests are reviewed promptly.",
    },
  ],
};
