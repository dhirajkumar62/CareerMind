import { useState, useRef, useEffect } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { sendMessageToAI } from "../../services/chatService";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FiSend } from "react-icons/fi";

export default function ChatMentor() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      role: "user",
      content: input,
      id: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await sendMessageToAI(input);

      const aiMessage = {
        role: "assistant",
        content: response.reply,
        id: Date.now() + 1,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("AI error", error);
      const errorMessage = {
        role: "assistant",
        content: "Sorry, I encountered an anomaly checking your query. Please try again.",
        id: Date.now() + 1,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.98, transition: { duration: 0.2 } }
  };

  const loadingDots = {
    animate: { transition: { staggerChildren: 0.2 } },
  };

  const loadingDot = {
    animate: {
      y: [0, -6, 0],
      transition: { duration: 1.2, repeat: Infinity },
    },
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto pt-2 pb-8 h-full">
        <motion.div
          className="flex flex-col h-[85vh] bg-white rounded-[1rem] p-6 sm:p-8 border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.04)]"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >

          <div className="mb-6 border-b border-slate-100 pb-4">
            <h2 className="text-[24px] font-bold text-slate-900 tracking-tight leading-none mb-1">
              AI Career Mentor
            </h2>
            <p className="text-[14px] text-slate-500">
              Get real-time, personalized guidance about your career path.
            </p>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto space-y-5 pr-2 mb-6 scrollbar-thin scrollbar-thumb-slate-200">
            <AnimatePresence>
              {messages.length === 0 && !loading && (
                <motion.div
                  className="flex flex-col items-center justify-center h-full text-center py-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl">💬</span>
                  </div>
                  <h3 className="text-[18px] font-bold text-slate-900 mb-1">
                    Start a conversation!
                  </h3>
                  <p className="text-[14px] text-slate-500 max-w-sm">
                    Ask about execution roadblocks, skill advice, or industry practices.
                  </p>
                </motion.div>
              )}

              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <motion.div
                    className={`max-w-[85%] sm:max-w-[75%] px-5 py-4 rounded-2xl text-[14px] leading-relaxed break-words ${msg.role === "user"
                        ? "bg-blue-600 text-white shadow-sm shadow-blue-500/10 rounded-br-sm"
                        : "bg-slate-50 text-slate-700 border border-slate-100 rounded-bl-sm"
                      }`}
                    layout
                  >
                    <div
                      className={`prose prose-sm max-w-none break-words ${msg.role === "user" ? "prose-invert" : "prose-slate"
                        }`}
                    >
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          pre: ({ children, ...props }) => (
                            <pre {...props} className="whitespace-pre-wrap break-words overflow-x-auto bg-slate-800 text-slate-50 rounded-lg p-3 my-2 text-[13px] font-mono">
                              {children}
                            </pre>
                          ),
                          code: ({ children, ...props }) => (
                            <code {...props} className="break-words font-mono bg-black/10 px-1 py-0.5 rounded text-[13px]">
                              {children}
                            </code>
                          ),
                          table: ({ children, ...props }) => (
                            <div className="overflow-x-auto my-3 border border-slate-200 rounded-xl">
                              <table {...props} className="w-full text-left border-collapse">{children}</table>
                            </div>
                          ),
                          th: ({ children }) => <th className="bg-slate-100 px-3 py-2 font-bold text-[12px]">{children}</th>,
                          td: ({ children }) => <td className="border-t border-slate-100 px-3 py-2 text-[13px]">{children}</td>,
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  </motion.div>
                </motion.div>
              ))}

              {loading && (
                <motion.div
                  className="flex justify-start"
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div className="bg-slate-50 text-slate-400 px-5 py-4 rounded-2xl rounded-bl-sm border border-slate-100 flex items-center gap-1.5 h-[52px]">
                    <motion.div className="flex gap-1.5" variants={loadingDots} animate="animate">
                      <motion.div className="w-2 h-2 rounded-full bg-slate-400" variants={loadingDot} />
                      <motion.div className="w-2 h-2 rounded-full bg-slate-400" variants={loadingDot} />
                      <motion.div className="w-2 h-2 rounded-full bg-slate-400" variants={loadingDot} />
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <motion.div
            className="pt-2 border-t border-slate-100 flex items-center gap-3 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <input
              type="text"
              placeholder="Query your mentor..."
              className="flex-1 w-full bg-[#fafafa] hover:bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 text-[14px] font-medium text-slate-900 tracking-wide focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400 pr-16"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !loading && handleSend()}
              disabled={loading}
            />

            <button
              onClick={handleSend}
              disabled={!input.trim() || loading}
              className="absolute right-2 top-1/2 -translate-y-1/2 mt-1 bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-lg transition-colors shadow-sm disabled:opacity-50 flex items-center justify-center disabled:hover:bg-blue-600"
            >
              <FiSend className="text-[15px]" />
            </button>
          </motion.div>

        </motion.div>
      </div>
    </DashboardLayout>
  );
}