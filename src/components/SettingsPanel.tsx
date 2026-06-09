import React, { useState } from "react";

interface SettingsPanelProps {
  userName: string;
  userRole: string;
  onUpdateProfile: (name: string, role: string) => void;
  selectedTheme: string;
  onThemeSelect: (theme: string) => void;
}

export default function SettingsPanel({
  userName,
  userRole,
  onUpdateProfile,
  selectedTheme,
  onThemeSelect
}: SettingsPanelProps) {
  const [profileName, setProfileName] = useState(userName);
  const [profileRole, setProfileRole] = useState(userRole);
  const [isSaved, setIsSaved] = useState(false);

  const [simulationSpeed, setSimulationSpeed] = useState("Normal");
  const [soundsEnabled, setSoundsEnabled] = useState(true);

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileName.trim() || !profileRole.trim()) return;

    onUpdateProfile(profileName, profileRole);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 4000);
  };

  const themes = [
    { id: "cosmic", label: "Midnight Cosmic", accent: "border-primary text-primary" },
    { id: "emerald", label: "Emerald Matrix", accent: "border-secondary text-secondary" },
    { id: "amber", label: "Vulkan Volcano", accent: "border-tertiary text-tertiary" }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in" id="settings-panel-root">
      
      {/* Left Settings: Profiles */}
      <div className="lg:col-span-6 glass p-6 rounded-[2rem] flex flex-col justify-between inner-glow space-y-6">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 0" }}>settings_accessibility</span>
            SDET Officer Portal
          </h2>
          <p className="text-xs text-on-surface-variant font-mono mt-1">
            Reconfigure your active terminal signature metadata. This changes global headers in the system.
          </p>
        </div>

        {isSaved && (
          <div className="p-3.5 bg-secondary-container/10 border border-secondary/35 text-secondary text-xs rounded-xl flex items-center gap-2 animate-bounce">
            <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            Officer Profile Synced Successfully!
          </div>
        )}

        <form onSubmit={handleProfileSubmit} className="space-y-4 text-xs font-mono">
          <div className="space-y-1">
            <label className="text-on-surface/70 font-semibold">User Username</label>
            <input
              type="text"
              required
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              className="w-full bg-surface-container border border-outline-variant/10 rounded-xl px-3.5 py-2.5 outline-none focus:border-primary text-on-surface"
            />
          </div>

          <div className="space-y-1">
            <label className="text-on-surface/70 font-semibold">Technical Specialty Signature</label>
            <input
              type="text"
              required
              value={profileRole}
              onChange={(e) => setProfileRole(e.target.value)}
              className="w-full bg-surface-container border border-outline-variant/10 rounded-xl px-3.5 py-2.5 outline-none focus:border-primary text-on-surface"
            />
          </div>

          <div className="space-y-2">
            <label className="text-on-surface/70 font-semibold">UI Preset Color Theme</label>
            <div className="grid grid-cols-3 gap-2">
              {themes.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => onThemeSelect(t.id)}
                  className={`p-3 rounded-xl border text-xs text-center transition-all cursor-pointer font-sans ${
                    selectedTheme === t.id
                      ? `${t.accent} bg-white/5 font-bold scale-102`
                      : "border-outline-variant/10 text-on-surface/60 hover:text-on-surface hover:bg-[#353437]/10"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-3 bg-primary text-on-primary font-bold font-sans rounded-xl text-xs hover:shadow-lg hover:shadow-primary/10 transition-all cursor-pointer active:scale-95"
          >
            Apply Profile Signature
          </button>
        </form>
      </div>

      {/* Right Settings: Simulated systems */}
      <div className="lg:col-span-6 glass p-6 rounded-[2rem] flex flex-col justify-between inner-glow space-y-6">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>tune</span>
            Simulation Configurations
          </h2>
          <p className="text-xs text-on-surface-variant font-mono mt-1">
            Tweak local automation processing frequencies, auditory feedback channels, and cloud system triggers.
          </p>
        </div>

        <div className="space-y-5 text-xs font-mono">
          {/* Sounds */}
          <div className="flex items-center justify-between p-4 bg-surface-container-low/40 rounded-xl border border-white/5">
            <div>
              <div className="font-bold text-on-surface text-sm font-sans">Auditory Click FX</div>
              <div className="text-on-surface-variant text-[11px] mt-0.5 font-mono">Simulate server node sounds on button interactions.</div>
            </div>
            <button
              onClick={() => setSoundsEnabled(!soundsEnabled)}
              className={`w-11 h-6 rounded-full p-0.5 transition-all outline-none border focus:ring-0 cursor-pointer ${
                soundsEnabled ? "bg-[#09bf49]/20 border-[#47e266]" : "bg-surface-container-highest border-transparent"
              }`}
            >
              <div className={`w-4 h-4 rounded-full transition-transform ${
                soundsEnabled ? "translate-x-5 bg-secondary" : "translate-x-0 bg-[#8b91a0]"
              }`}></div>
            </button>
          </div>

          {/* Clock Speed */}
          <div className="flex items-center justify-between p-4 bg-surface-container-low/40 rounded-xl border border-white/5">
            <div>
              <div className="font-bold text-on-surface text-sm font-sans">Runner Speed Frequency</div>
              <div className="text-on-surface-variant text-[11px] mt-0.5 font-mono">Frequency interval of dynamic pipeline tick simulation runs.</div>
            </div>
            
            <div className="flex items-center gap-1 bg-[#1f1f21] p-1 rounded-lg border border-white/5">
              {["Eco", "Normal", "Overclock"].map((speed) => (
                <button
                  key={speed}
                  onClick={() => setSimulationSpeed(speed)}
                  className={`px-3 py-1.5 rounded-md text-[10px] uppercase font-bold transition-all cursor-pointer ${
                    simulationSpeed === speed
                      ? "bg-primary text-on-primary"
                      : "text-on-surface/60 hover:text-on-surface"
                  }`}
                >
                  {speed}
                </button>
              ))}
            </div>
          </div>

          {/* Secure Environment Secret Key reminder banner */}
          <div className="p-4 rounded-2xl bg-surface-container-lowest/70 border border-white/5 space-y-2">
            <span className="text-[10px] font-mono text-on-surface-variant uppercase tracking-wider font-bold">Secure Environment variables info</span>
            <div className="text-xs text-on-surface font-sans leading-relaxed">
              API connections use the following secure keys injected from system secrets:
            </div>
            <div className="bg-black/35 p-3 rounded-lg border border-white/5 space-y-1 scrollbar-thin text-[11px]">
              <div><span className="text-primary font-bold">GEMINI_API_KEY:</span> <span className="text-secondary font-mono">Injected via UI Secrets Panel</span></div>
              <div><span className="text-primary font-bold">APP_URL:</span> <span className="text-secondary font-mono">https://ais-dev-lat2rg6qty...</span></div>
            </div>
          </div>
        </div>

        <div className="pt-2 text-center text-[10px] font-mono text-on-surface-variant/50 select-none">
          QA Forge Dashboard Host Platform. Built version 1.4.0 Alpha.
        </div>
      </div>
    </div>
  );
}
