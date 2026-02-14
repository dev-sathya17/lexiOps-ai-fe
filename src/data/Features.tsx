import { Zap, BarChart3, Shield, CreditCard, CheckCircle } from "lucide-react";

export const features = [
  {
    icon: <Zap className="w-8 h-8 text-pink-400" />,
    title: "Instant AI Answers",
    desc: "Ask questions in natural language and get accurate answers grounded in your internal documents.",
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-blue-400" />,
    title: "Knowledge Visibility",
    desc: "Track document ingestion status, query history, and workspace activity with full transparency.",
  },
  {
    icon: <Shield className="w-8 h-8 text-emerald-400" />,
    title: "Tenant-Isolated Security",
    desc: "Workspace-level isolation, role-based access control, and scoped retrieval keep your data private.",
  },
  {
    icon: <CreditCard className="w-8 h-8 text-yellow-400" />,
    title: "Usage-Aware SaaS",
    desc: "Built with clear limits on documents and users, mirroring real SaaS plans without hidden complexity.",
  },
  {
    icon: <CheckCircle className="w-8 h-8 text-pink-300" />,
    title: "Grounded & Explainable",
    desc: "Every response is backed by source documents, reducing hallucinations and building trust.",
  },
  {
    icon: <Zap className="w-8 h-8 text-purple-400" />,
    title: "Production-Ready by Design",
    desc: "Asynchronous ingestion, scalable APIs, and clean architecture — built to grow with your team.",
  },
];
