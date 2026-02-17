import { useRef, useEffect } from "react";
import { User, Bot } from "lucide-react";
import { motion } from "framer-motion";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface MessageListProps {
  messages: Message[];
}

export default function MessageList({ messages }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-zinc-700">
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 dark:text-gray-500">
          <div className="bg-white dark:bg-zinc-800 p-4 rounded-full mb-4 shadow-sm">
            <Bot size={48} className="text-pink-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-200">
            How can I help you today?
          </h3>
          <p className="max-w-md">
            Start a conversation by typing a message below.
          </p>
        </div>
      )}

      {messages.map((message) => (
        <motion.div
          key={message.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex gap-4 ${
            message.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          {message.role === "assistant" && (
            <div className="w-8 h-8 rounded-full bg-linear-to-tr from-pink-500 to-violet-500 flex items-center justify-center text-white shrink-0 shadow-sm mt-1">
              <Bot size={16} />
            </div>
          )}

          <div
            className={`max-w-[80%] md:max-w-[70%] rounded-2xl px-5 py-3 shadow-sm ${
              message.role === "user"
                ? "bg-linear-to-r from-pink-500 to-violet-600 text-white rounded-tr-none"
                : "bg-white dark:bg-zinc-800 text-gray-800 dark:text-gray-100 border border-gray-100 dark:border-white/5 rounded-tl-none"
            }`}
          >
            <p className="whitespace-pre-wrap leading-relaxed text-sm md:text-base">
              {message.content}
            </p>
          </div>

          {message.role === "user" && (
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-zinc-700 flex items-center justify-center text-gray-500 dark:text-gray-300 shrink-0 shadow-sm mt-1">
              <User size={16} />
            </div>
          )}
        </motion.div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
