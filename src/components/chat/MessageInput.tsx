import { useState, useRef, useEffect } from "react";
import { Send, Plus, Image, FileText } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
}

export default function MessageInput({
  onSendMessage,
  isLoading = false,
}: MessageInputProps) {
  const [input, setInput] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [input]);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-zinc-950 relative">
      <div className="mx-auto relative flex items-end gap-2 bg-gray-100 dark:bg-zinc-800 p-2 rounded-xl border border-transparent focus-within:border-pink-500/50 focus-within:ring-2 focus-within:ring-pink-500/20 transition-all">
        {/* Attachment Menu Trigger */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="w-11 h-11 flex items-center justify-center rounded-lg hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-500 dark:text-gray-400 transition-colors"
            title="Add attachments"
          >
            <Plus
              size={20}
              className={`transition-transform duration-200 ${showMenu ? "rotate-45" : ""}`}
            />
          </button>

          {/* Attachment Menu Popup */}
          <AnimatePresence>
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute bottom-full left-0 mb-3 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/10 rounded-xl shadow-xl p-2 min-w-[180px] z-50"
              >
                <div className="text-xs font-medium text-gray-400 dark:text-gray-500 px-3 py-2 uppercase tracking-wider">
                  Add to chat
                </div>
                <button
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-700 dark:text-gray-200 text-sm transition-colors"
                  onClick={() => setShowMenu(false)}
                >
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <Image size={16} />
                  </div>
                  Upload Image
                </button>
                <button
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-700 dark:text-gray-200 text-sm transition-colors"
                  onClick={() => setShowMenu(false)}
                >
                  <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 flex items-center justify-center">
                    <FileText size={16} />
                  </div>
                  Upload File
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Text Input */}
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message Lexi AI..."
          className="flex-1 min-h-[44px] max-h-[150px] py-[8px] pl-[10px] bg-transparent border-none outline-none resize-none text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-zinc-600 leading-6"
          rows={1}
        />

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          className={`w-11 h-11 flex items-center justify-center rounded-lg transition-all duration-200 ${
            input.trim() && !isLoading
              ? "bg-pink-600 text-white shadow-md hover:bg-pink-700 active:scale-95"
              : "bg-gray-200 dark:bg-zinc-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
          }`}
        >
          <Send size={18} />
        </button>
      </div>

      <div className="text-center mt-2">
        <p className="text-xs text-gray-400 dark:text-gray-600">
          AI can make mistakes. Please double-check responses.
        </p>
      </div>
    </div>
  );
}
