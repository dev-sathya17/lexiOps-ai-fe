import { useState } from "react";
import MessageList, { type Message } from "./MessageList";
import MessageInput from "./MessageInput";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function ChatArea() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `I received your message: "${content}". This is a dummy response demonstrating the chat interface.`,
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-white dark:bg-zinc-950 relative">
      <div className="flex-1 relative overflow-hidden flex flex-col">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none"></div>

        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <AnimatePresence mode="wait">
            {messages.length === 0 ? (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="h-full flex flex-col items-center justify-center px-6 text-center"
              >
                <div className="w-20 h-20 rounded-3xl bg-linear-to-tr from-pink-500 to-violet-500 p-[1px] mb-8 shadow-2xl shadow-pink-500/20">
                  <div className="w-full h-full rounded-[23px] bg-white dark:bg-zinc-950 flex items-center justify-center overflow-hidden">
                    <Sparkles size={32} className="text-pink-500" />
                  </div>
                </div>
                <h1 className="text-5xl md:text-6xl font-black tracking-tight text-gray-900 dark:text-white mb-6">
                  Hello,{" "}
                  <span className="bg-linear-to-r from-pink-500 via-violet-500 to-indigo-500 bg-clip-text text-transparent">
                    Demo User
                  </span>
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-xl max-w-lg leading-relaxed font-medium">
                  What can I help you discover today? Start a conversation using
                  the prompts below.
                </p>
              </motion.div>
            ) : (
              <MessageList messages={messages} />
            )}
          </AnimatePresence>
        </div>

        <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
}
