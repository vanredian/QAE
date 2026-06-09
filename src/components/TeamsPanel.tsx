import React, { useState } from "react";

export default function TeamsPanel() {
  const [messages, setMessages] = useState([
    { author: "Mentor Alex", role: "QA Principal Architect", time: "11:20", text: "Senior engineers: please verify that the main checkout POM refactoring wraps all actions in dynamic implicit waiters." },
    { author: "QA Junior Lisa", role: "Junior SDET", time: "11:28", text: "Understood! I'll double check the playwright-wait assertions on the payment checkbox." },
    { author: "Senior SDET Michael", role: "Team Captain", time: "11:40", text: "Nice work on resolving the Banking Sandbox loop. The regression looks fixed in standard suites." }
  ]);
  const [chatInput, setChatInput] = useState("");

  const teamMates = [
    { name: "Mentor Alex", role: "QA Principal", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100", coverage: "94.5%", speed: "1.2h", labs: "52/52" },
    { name: "Senior Michael", role: "Lead SDET", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100", coverage: "91.8%", speed: "2.4h", labs: "48/52" },
    { name: "QA Junior Lisa", role: "Syllabus Intern", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100", coverage: "86.2%", speed: "3.2h", labs: "24/52" }
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const now = new Date();
    const timeFormatted = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;

    setMessages(prev => [
      ...prev,
      {
        author: "Senior SDET Red (You)",
        role: "Senior SDET",
        time: timeFormatted,
        text: chatInput
      }
    ]);
    setChatInput("");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in" id="teams-panel-root">
      
      {/* Group Members Board */}
      <div className="lg:col-span-5 glass p-6 rounded-[2rem] inner-glow flex flex-col justify-between space-y-6">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>groups</span>
            QA Guild Members
          </h2>
          <p className="text-xs text-on-surface-variant font-mono mt-1">
            Track standard branch coverages and average ticket solution resolution speeds for active SDET blocks.
          </p>
        </div>

        <div className="space-y-4">
          {teamMates.map((mate, idx) => (
            <div key={idx} className="bg-[#353437]/20 border border-white/5 p-4 rounded-2xl flex items-center gap-4 transition-all hover:border-primary/20">
              <img
                src={mate.avatar}
                alt={mate.name}
                className="w-11 h-11 rounded-full object-cover border border-[#aac7ff]/20 shrink-0 select-none"
                referrerPolicy="no-referrer"
              />
              <div className="min-w-0 flex-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-xs text-on-surface truncate">{mate.name}</span>
                  <span className="text-[10px] bg-primary/10 text-primary border border-primary/25 px-2 py-0.5 rounded-full font-mono scale-95 font-semibold shrink-0">
                    {mate.labs} Labs
                  </span>
                </div>
                <div className="text-on-surface-variant text-[11px] font-mono mt-0.5 truncate">{mate.role}</div>

                <div className="flex items-center gap-4 mt-2.5 pt-2 border-t border-white/5 text-[10px] font-mono text-on-surface/60">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px] text-secondary">verified</span>
                    <span>Coverage: <b className="text-on-surface">{mate.coverage}</b></span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px] text-primary">bolt</span>
                    <span>MTTR: <b className="text-on-surface">{mate.speed}</b></span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slack-style Chat Review box */}
      <div className="lg:col-span-7 glass p-6 rounded-[2rem] flex flex-col justify-between inner-glow h-[450px]">
        
        {/* Chat Feed Header */}
        <div className="pb-3 border-b border-outline-variant/10">
          <h3 className="font-bold text-xs uppercase font-mono text-on-surface flex items-center gap-1.5 leading-none">
            <span className="w-2 h-2 rounded-full bg-[#47e266] animate-pulse"></span>
            # peer-review-channel
          </h3>
          <p className="text-[10px] text-on-surface-variant font-mono mt-1">
            Discuss code guidelines, refactor PR suggestions, and coordinate Selenium Grid clusters.
          </p>
        </div>

        {/* Message Feed list */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1" id="chat-scroller">
          {messages.map((msg, idx) => {
            const isUser = msg.author.includes("You");

            return (
              <div key={idx} className={`text-xs space-y-1 animate-slide-up ${isUser ? "pl-8" : "pr-8"}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-mono">
                    <span className={`font-bold ${isUser ? "text-secondary font-sans" : "text-[#aac7ff]"}`}>
                      {msg.author}
                    </span>
                    <span className="text-[9px] opacity-40">&bull; {msg.role}</span>
                  </div>
                  <span className="text-[9px] font-mono text-on-surface-variant/70">{msg.time}</span>
                </div>
                
                <div className={`p-3 rounded-2xl leading-relaxed font-sans border ${
                  isUser 
                    ? "bg-secondary-container/10 border-secondary/20 text-[#e4e2e4] rounded-tr-none" 
                    : "bg-surface-container-low/40 border-outline-variant/10 text-on-surface/90 rounded-tl-none"
                }`}>
                  {msg.text}
                </div>
              </div>
            );
          })}
        </div>

        {/* Send panel */}
        <form onSubmit={handleSendMessage} className="pt-3 border-t border-outline-variant/10 flex items-center gap-2">
          <input
            type="text"
            placeholder="Type reviews or pipeline coordinates..."
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            className="flex-1 bg-surface-container-low text-xs border border-outline-variant/10 outline-none rounded-xl px-3.5 py-3 focus:border-primary text-on-surface placeholder:text-on-surface-variant"
          />
          <button
            type="submit"
            className="w-11 h-11 bg-primary text-on-primary rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-lg"
          >
            <span className="material-symbols-outlined text-[19px]">send</span>
          </button>
        </form>
      </div>
    </div>
  );
}
