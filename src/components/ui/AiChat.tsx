"use client";

import { useState, useRef, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export type ChatText = {
  chat_label: string;
  chat_header: string;
  chat_new_conversation: string;
  chat_intro: string;
  chat_start_button: string;
  chat_find_conversation: string;
  chat_email_placeholder: string;
  chat_find_button: string;
  chat_returning_banner: string;
  chat_continue: string;
  chat_restart: string;
  chat_inquiry_sent_title: string;
  chat_inquiry_sent_sub: string;
  chat_input_placeholder: string;
  chat_send_aria: string;
  chat_error_start: string;
  chat_error_continue: string;
  chat_email_validation: string;
  chat_email_not_found: string;
  chat_lookup_error: string;
};

const LOCAL_TOKEN_KEY = "sd_session_token";

function cleanDisplayText(text: string): string {
  return text.replace(/<INQUIRY_DATA>[\s\S]*?<\/INQUIRY_DATA>/g, "").trim();
}

function getStoredToken(): string | null {
  try { return localStorage.getItem(LOCAL_TOKEN_KEY); } catch { return null; }
}

function storeToken(token: string) {
  try { localStorage.setItem(LOCAL_TOKEN_KEY, token); } catch { /* ignore */ }
}

function clearStoredToken() {
  try { localStorage.removeItem(LOCAL_TOKEN_KEY); } catch { /* ignore */ }
}

export default function AiChat({
  hideLabel = false,
  autoStartMessage,
  text,
  locale = "cs",
}: {
  hideLabel?: boolean;
  autoStartMessage?: string;
  text: ChatText;
  locale?: "cs" | "en" | "de";
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);
  const [isReturning, setIsReturning] = useState(false);
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [knownName, setKnownName] = useState<string | null>(null);
  const [lookupEmail, setLookupEmail] = useState("");
  const [showEmailLookup, setShowEmailLookup] = useState(false);
  const [lookupError, setLookupError] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sessionChecked, setSessionChecked] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const chatTopRef = useRef<HTMLDivElement>(null);

  // On mount — check for saved session token in localStorage
  useEffect(() => {
    const token = getStoredToken();
    if (!token) { setSessionChecked(true); return; }

    void (async () => {
      try {
        const res = await fetch(`/api/chat/session?token=${token}`);
        const data = await res.json() as { conversation: { inquiry_sent: boolean; name: string | null } | null; messages: { role: "user" | "assistant"; content: string }[] };

        if (data.conversation && data.messages.length > 0) {
          setMessages(data.messages.map((m) => ({ role: m.role, content: m.content })));
          setInquirySent(data.conversation.inquiry_sent);
          setKnownName(data.conversation.name);
          setSessionToken(token);
          setIsStarted(true);
          const hasUserMessage = data.messages.some((m) => m.role === "user");
          setIsReturning(hasUserMessage);
        }
      } catch {
        // Silently ignore — start fresh
      } finally {
        setSessionChecked(true);
      }
    })();
  }, []);

  // Auto-start when no existing session and autoStartMessage is provided
  useEffect(() => {
    if (!sessionChecked || !autoStartMessage || isStarted) return;
    void (async () => {
      const token = await createSession();
      setIsStarted(true);
      setIsLoading(true);
      await streamMessage([], autoStartMessage, token);
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionChecked]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messages.length > 0) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [messages]);

  async function createSession(): Promise<string | null> {
    try {
      const res = await fetch("/api/chat/session", { method: "POST" });
      const data = await res.json() as { session_token: string };
      storeToken(data.session_token);
      setSessionToken(data.session_token);
      return data.session_token;
    } catch {
      return null;
    }
  }

  function scrollToChat() {
    setTimeout(() => {
      if (chatTopRef.current) {
        const top = chatTopRef.current.getBoundingClientRect().top + window.scrollY - 160;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 50);
  }

  async function startChat() {
    const token = await createSession();
    setIsStarted(true);
    setIsReturning(false);
    setIsLoading(true);
    setError(null);
    scrollToChat();

    try {
      await streamMessage([], "Ahoj", token);
    } catch {
      setError(text.chat_error_start);
      setIsLoading(false);
    }
  }

  async function continueChat() {
    setIsReturning(false);
    setIsLoading(true);
    setError(null);
    scrollToChat();

    const completedMessages = messages.filter((m) => m.content !== "");
    const nameHint = knownName ? ` Klient se jmenuje ${knownName}.` : "";
    try {
      await streamMessage(
        completedMessages,
        `__RETURNING_USER__ Klient se vrátil — přivítej ho osobně a vřele.${nameHint} Stručně připomeň co jste naposledy řešili a zeptej se jestli chce něco doplnit, upřesnit nebo pokračovat tam kde jste skončili.`,
        sessionToken
      );
    } catch {
      setError(text.chat_error_continue);
      setIsLoading(false);
    }
  }

  async function lookupByEmail() {
    setLookupError("");
    if (!lookupEmail.includes("@")) {
      setLookupError(text.chat_email_validation);
      return;
    }

    try {
      const res = await fetch(`/api/chat/session?email=${encodeURIComponent(lookupEmail)}`);
      const data = await res.json() as { conversation: { session_token: string; inquiry_sent: boolean; name: string | null } | null; messages: { role: "user" | "assistant"; content: string }[] };

      if (!data.conversation || data.messages.length === 0) {
        setLookupError(text.chat_email_not_found);
        return;
      }

      storeToken(data.conversation.session_token);
      setSessionToken(data.conversation.session_token);
      setMessages(data.messages.map((m) => ({ role: m.role, content: m.content })));
      setInquirySent(data.conversation.inquiry_sent);
      setKnownName(data.conversation.name);
      setIsStarted(true);
      setShowEmailLookup(false);
      setIsReturning(true);
    } catch {
      setLookupError(text.chat_lookup_error);
    }
  }

  async function streamMessage(history: Message[], userMessage: string, token: string | null) {
    const newMessages: Message[] = [
      ...history,
      { role: "user", content: userMessage },
    ];

    setMessages([...newMessages, { role: "assistant", content: "" }]);
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages,
          sessionToken: token ?? undefined,
          locale,
        }),
      });

      if (!res.ok) {
        const json = await res.json() as { error?: string };
        throw new Error(json.error ?? "Server error");
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error("Stream not available");

      const decoder = new TextDecoder();
      let assistantText = "";
      let inquirySignalReceived = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });

        if (chunk.includes("__INQUIRY_SENT__")) {
          inquirySignalReceived = true;
          assistantText += chunk.replace("__INQUIRY_SENT__", "").replace(/\n$/, "");
        } else {
          assistantText += chunk;
        }

        setMessages([
          ...newMessages,
          { role: "assistant", content: assistantText },
        ]);
      }

      if (inquirySignalReceived) {
        setInquirySent(true);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unexpected error.";
      setError(message);
      setMessages(history);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }

  async function handleSend() {
    const trimmed = input.trim();
    if (!trimmed || isLoading || inquirySent) return;

    const currentMessages = messages.filter((m) => m.content !== "");
    setInput("");
    await streamMessage(currentMessages, trimmed, sessionToken);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void handleSend();
    }
  }

  function handleInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  }

  function clearSession() {
    clearStoredToken();
    setMessages([]);
    setInquirySent(false);
    setIsStarted(false);
    setIsReturning(false);
    setSessionToken(null);
    setKnownName(null);
  }

  // Not yet started
  if (!isStarted) {
    return (
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-start gap-6 py-8"
      >
        {!hideLabel && (
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#C8D400] animate-pulse" />
            <span className="text-white/40 text-xs uppercase tracking-widest">{text.chat_label}</span>
          </div>
        )}
        <p className="text-white/70 text-base leading-relaxed max-w-md">
          {text.chat_intro}
        </p>

        <div className="flex flex-col gap-3 w-full">
          <button
            onClick={() => void startChat()}
            className="bg-[#C8D400] text-black font-semibold text-base px-8 py-4 rounded-sm btn-hover-lime self-start"
          >
            {text.chat_start_button}
          </button>

          {!showEmailLookup ? (
            <button
              onClick={() => setShowEmailLookup(true)}
              className="text-white/30 text-sm hover:text-white/60 transition-colors duration-200 self-start"
            >
              {text.chat_find_conversation}
            </button>
          ) : (
            <div className="flex flex-col gap-2 max-w-sm">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={lookupEmail}
                  onChange={(e) => setLookupEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && void lookupByEmail()}
                  placeholder={text.chat_email_placeholder}
                  className="flex-1 bg-white/5 border border-white/10 text-white placeholder:text-white/20 text-sm px-4 py-2.5 rounded-sm focus:outline-none focus:border-[#C8D400] transition-colors"
                />
                <button
                  onClick={() => void lookupByEmail()}
                  className="bg-[#C8D400] text-black text-sm font-semibold px-4 py-2.5 rounded-sm btn-hover-lime"
                >
                  {text.chat_find_button}
                </button>
              </div>
              {lookupError && <p className="text-red-400 text-xs">{lookupError}</p>}
            </div>
          )}
        </div>
      </m.div>
    );
  }

  return (
    <div ref={chatTopRef} className="flex flex-col border border-white/10 rounded-sm overflow-hidden">
      {/* Header */}
      {!hideLabel && (
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#C8D400] animate-pulse" />
            <span className="text-white/50 text-xs uppercase tracking-widest">{text.chat_header}</span>
          </div>
          <button
            onClick={clearSession}
            className="text-white/20 text-xs hover:text-white/50 transition-colors duration-200"
          >
            {text.chat_new_conversation}
          </button>
        </div>
      )}

      {/* Returning user banner */}
      <AnimatePresence>
        {isReturning && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-white/10 bg-[#C8D400]/5 px-5 py-4 flex items-center justify-between gap-4"
          >
            <p className="text-white/60 text-sm">{text.chat_returning_banner}</p>
            <div className="flex gap-3 flex-shrink-0">
              <button
                onClick={() => void continueChat()}
                className="bg-[#C8D400] text-black text-xs font-semibold px-4 py-2 rounded-sm btn-hover-lime"
              >
                {text.chat_continue}
              </button>
              <button
                onClick={clearSession}
                className="text-white/40 text-xs hover:text-white transition-colors duration-200"
              >
                {text.chat_restart}
              </button>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      {/* Messages */}
      <div className="h-[360px] overflow-y-auto px-5 py-5 flex flex-col gap-4">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => {
            if (msg.role === "user") {
              if (msg.content.startsWith("__RETURNING_USER__")) return null;
              if (msg.content.startsWith("__AUTO_OPEN__")) return null;
              return (
                <m.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex justify-end"
                >
                  <div className="bg-white/10 text-white text-sm leading-relaxed px-4 py-3 rounded-sm max-w-[80%]">
                    {msg.content}
                  </div>
                </m.div>
              );
            }

            const displayText = cleanDisplayText(msg.content);

            return (
              <m.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="flex gap-3 max-w-[90%]"
              >
                <div className="w-6 h-6 rounded-full bg-[#C8D400] flex-shrink-0 flex items-center justify-center mt-0.5">
                  <span className="text-black text-xs font-bold">S</span>
                </div>
                <div className="text-white/80 text-sm leading-relaxed whitespace-pre-wrap">
                  {displayText || (
                    <span className="inline-flex gap-1 items-center">
                      <span className="w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </span>
                  )}
                </div>
              </m.div>
            );
          })}
        </AnimatePresence>

        {inquirySent && (
          <m.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-2 flex items-start gap-3 border border-[#C8D400]/30 bg-[#C8D400]/5 rounded-sm px-4 py-4"
          >
            <svg className="w-5 h-5 text-[#C8D400] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="text-white text-sm font-medium">{text.chat_inquiry_sent_title}</p>
              <p className="text-white/50 text-xs mt-1">{text.chat_inquiry_sent_sub}</p>
            </div>
          </m.div>
        )}

        {error && (
          <div className="text-red-400 text-xs border border-red-400/20 bg-red-400/5 rounded-sm px-4 py-3">
            {error}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      {!inquirySent && !isReturning && (
        <div className="border-t border-white/10 px-4 py-3 flex items-end gap-3 bg-white/[0.02]">
          <textarea
            ref={inputRef}
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder={text.chat_input_placeholder}
            rows={1}
            disabled={isLoading}
            className="flex-1 bg-transparent text-white text-sm placeholder:text-white/20 resize-none focus:outline-none leading-relaxed py-1 max-h-[120px] disabled:opacity-40"
          />
          <button
            onClick={() => void handleSend()}
            disabled={!input.trim() || isLoading}
            aria-label={text.chat_send_aria}
            className="flex-shrink-0 w-9 h-9 rounded-sm bg-[#C8D400] text-black flex items-center justify-center hover:bg-[#d9e600] transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
