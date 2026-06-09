import React, { useState } from "react";
import { BugReport } from "../types";

interface BugTrackerProps {
  bugs: BugReport[];
  onAddBug: (newBug: BugReport) => void;
}

export default function BugTracker({ bugs, onAddBug }: BugTrackerProps) {
  const [title, setTitle] = useState("");
  const [severity, setSeverity] = useState<BugReport["severity"]>("Major");
  const [module, setModule] = useState("Auth Core");
  const [description, setDescription] = useState("");
  const [steps, setSteps] = useState("");
  const [reporter, setReporter] = useState("Senior SDET Red");
  
  const [selectedBugId, setSelectedBugId] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState(false);

  const handleCreateBug = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const newBug: BugReport = {
      id: `bug-${100 + bugs.length + 1}`,
      title,
      severity,
      status: "Open",
      module,
      description,
      steps: steps || "No customized reproduce steps registered.",
      reporter: reporter || "Senior SDET Red",
      createdAt: new Date().toISOString().replace("T", " ").substring(0, 16)
    };

    onAddBug(newBug);
    
    // Clear inputs
    setTitle("");
    setDescription("");
    setSteps("");
    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
    }, 4000);
  };

  const getSeverityStyle = (sev: BugReport["severity"]) => {
    if (sev === "Critical") return "bg-error-container/20 text-error border-error/20";
    if (sev === "Major") return "bg-tertiary-container/20 text-[#ffb868] border-tertiary/20";
    return "bg-surface-container-highest/60 text-on-surface-variant border-white/5";
  };

  const getStatusStyle = (status: BugReport["status"]) => {
    if (status === "Fixed") return "bg-secondary-container/20 text-secondary border-secondary/20";
    if (status === "Review") return "bg-primary-container/20 text-primary border-primary/20";
    if (status === "In Investigation") return "bg-tertiary-container/10 text-tertiary border-tertiary/10";
    return "bg-surface-container text-[#8b91a0]";
  };

  const activeBugDetail = bugs.find(b => b.id === selectedBugId);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in" id="bug-tracker-root">
      
      {/* Left panel: File Bug Form */}
      <div className="lg:col-span-4 glass p-6 rounded-[2rem] flex flex-col justify-between inner-glow h-fit space-y-6">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-error" style={{ fontVariationSettings: "'FILL' 1" }}>bug_report</span>
            Report Defect
          </h2>
          <p className="text-xs text-on-surface-variant font-mono mt-1">
            Instantiate an official QA validation failure ticket. This alerts the active Dev leads.
          </p>
        </div>

        {successMsg && (
          <div className="p-3.5 bg-secondary-container/10 border border-secondary/35 text-secondary text-xs rounded-xl flex items-center gap-2 animate-bounce">
            <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            Bug submitted successfully! State synced.
          </div>
        )}

        <form onSubmit={handleCreateBug} className="space-y-4 text-xs font-mono">
          <div className="space-y-1">
            <label className="text-on-surface/70 font-semibold">Defect Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Session loop failure on Auth Refresh"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-surface-container border border-outline-variant/10 rounded-xl px-3.5 py-2.5 outline-none focus:border-primary text-on-surface"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-on-surface/70 font-semibold">Severity Tier</label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value as BugReport["severity"])}
                className="w-full bg-surface-container border border-outline-variant/10 rounded-xl px-2.5 py-2.5 outline-none focus:border-primary text-on-surface"
              >
                <option value="Minor">Minor</option>
                <option value="Major">Major</option>
                <option value="Critical">Critical</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-on-surface/70 font-semibold">Component</label>
              <select
                value={module}
                onChange={(e) => setModule(e.target.value)}
                className="w-full bg-surface-container border border-outline-variant/10 rounded-xl px-2.5 py-2.5 outline-none focus:border-primary text-on-surface font-sans text-[11px]"
              >
                <option value="Auth Core">Auth Core</option>
                <option value="Billing Node">Billing Node</option>
                <option value="Selenium Grid">Selenium Grid</option>
                <option value="Checkout API">Checkout API</option>
                <option value="Theme Dashboard">Theme Dashboard</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-on-surface/70 font-semibold">Defect Description</label>
            <textarea
              required
              rows={3}
              placeholder="What specifically failed? Identify the core console log message or exception."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-surface-container border border-outline-variant/10 rounded-xl px-3.5 py-2 outline-none focus:border-primary text-on-surface"
            />
          </div>

          <div className="space-y-1">
            <label className="text-on-surface/70 font-semibold">Steps to Reproduce</label>
            <textarea
              rows={3}
              placeholder="1. Go to path...&#10;2. Input payload...&#10;3. Click Check"
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
              className="w-full bg-surface-container border border-outline-variant/10 rounded-xl px-3.5 py-2 outline-none focus:border-primary text-on-surface"
            />
          </div>

          <div className="space-y-1">
            <label className="text-on-surface/70 font-semibold">Reporter Signature</label>
            <input
              type="text"
              placeholder="Senior SDET"
              value={reporter}
              onChange={(e) => setReporter(e.target.value)}
              className="w-full bg-surface-container border border-outline-variant/10 rounded-xl px-3.5 py-2.5 outline-none focus:border-primary text-on-surface"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-3 bg-error text-white font-bold font-sans rounded-xl text-xs hover:shadow-lg hover:shadow-error/15 transform hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
          >
            Log Official Bug Report
          </button>
        </form>
      </div>

      {/* Right panel: Bug feed list & expansion drawer */}
      <div className="lg:col-span-8 space-y-4">
        <div className="glass p-6 rounded-[2rem] inner-glow">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#8b91a0]">view_list</span>
            Logged Bug Database
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-outline-variant/20 font-mono text-on-surface-variant font-medium">
                  <th className="py-2.5 px-3">Ticket</th>
                  <th className="py-2.5 px-3">Summary</th>
                  <th className="py-2.5 px-3 uppercase text-[10px]">Component</th>
                  <th className="py-2.5 px-3 uppercase text-[10px]">Severity</th>
                  <th className="py-2.5 px-3 uppercase text-[10px]">State</th>
                  <th className="py-2.5 px-3">Reported</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10" id="bugs-table-body">
                {bugs.map((bug) => (
                  <tr
                    key={bug.id}
                    onClick={() => setSelectedBugId(bug.id)}
                    className={`hover:bg-surface-variant/20 cursor-pointer transition-all ${
                      selectedBugId === bug.id ? "bg-[#353437]/20" : ""
                    }`}
                  >
                    <td className="py-3 px-3 font-mono text-primary font-bold">{bug.id}</td>
                    <td className="py-3 px-3">
                      <div className="font-semibold text-on-surface line-clamp-1">{bug.title}</div>
                      <div className="text-[10px] text-on-surface-variant/60 line-clamp-1 mt-0.5 font-mono">{bug.description}</div>
                    </td>
                    <td className="py-3 px-3 font-mono">{bug.module}</td>
                    <td className="py-3 px-3 font-mono">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] border font-bold ${getSeverityStyle(bug.severity)}`}>
                        {bug.severity}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono">
                      <span className={`px-2 py-0.5 rounded text-[9px] border font-semibold ${getStatusStyle(bug.status)}`}>
                        {bug.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono text-[10px] text-on-surface-variant/70">{bug.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected bug expansion detailing reproduction pathways */}
        {activeBugDetail ? (
          <div className="glass p-6 rounded-[2rem] inner-glow border border-[#ffb4ab]/15 animate-slide-up space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-mono font-bold text-error uppercase tracking-wide">Detailed Trace Log &bull; {activeBugDetail.id}</span>
                <h4 className="text-lg font-bold text-on-surface mt-1">{activeBugDetail.title}</h4>
              </div>
              <button
                onClick={() => setSelectedBugId(null)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-on-surface flex items-center justify-center transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[15px]">close</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="space-y-1.5 p-4 bg-surface-container-low/40 rounded-xl border border-white/5">
                <div className="text-on-surface-variant font-bold">Ticket Summary:</div>
                <div className="font-sans leading-relaxed text-on-surface/90">{activeBugDetail.description}</div>
              </div>

              <div className="space-y-1.5 p-4 bg-surface-container-low/40 rounded-xl border border-white/5">
                <div className="text-on-surface-variant font-bold">Reproduction Blueprint Path:</div>
                <pre className="overflow-x-auto font-mono text-[11px] leading-relaxed text-primary-fixed">{activeBugDetail.steps}</pre>
              </div>
            </div>

            <div className="flex justify-between items-center text-[11px] font-mono border-t border-outline-variant/10 pt-3 text-on-surface-variant/80">
              <div>Filer: <span className="text-[#aac7ff] font-sans font-bold">{activeBugDetail.reporter}</span></div>
              <div>Database Indexed on: {activeBugDetail.createdAt}</div>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center text-xs font-mono text-on-surface-variant/60 glass rounded-[2rem] inner-glow select-none">
            Click any bug ledger entry to inspect memory dumps, exception pointers, and direct replication scripts.
          </div>
        )}
      </div>
    </div>
  );
}
