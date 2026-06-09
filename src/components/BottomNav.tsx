import { TabType } from "../types";

interface BottomNavProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export default function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-full px-5 py-2.5 glass-raised backdrop-blur-[50px] flex items-center justify-between min-w-[325px] sm:min-w-[400px] gap-2 z-50 shadow-2xl">
      <button
        onClick={() => setActiveTab("home")}
        className={`px-5 py-2 rounded-full flex items-center justify-center gap-2 transition-all cursor-pointer ${
          activeTab === "home"
            ? "bg-primary-container text-on-primary-container shadow-md font-semibold font-sans transform scale-102"
            : "text-on-surface/60 hover:text-on-surface hover:bg-white/5"
        }`}
        id="btn-nav-home"
      >
        <span 
          className="material-symbols-outlined text-[20px] pointer-events-none select-none" 
          style={{ fontVariationSettings: activeTab === "home" ? "'FILL' 1" : "'FILL' 0" }}
        >
          home
        </span>
        <span className="text-xs uppercase tracking-wider font-semibold">Home</span>
      </button>

      <button
        onClick={() => setActiveTab("progress")}
        className={`px-5 py-2 rounded-full flex items-center justify-center gap-2 transition-all cursor-pointer ${
          activeTab === "progress"
            ? "bg-primary-container text-on-primary-container shadow-md font-semibold font-sans transform scale-102"
            : "text-on-surface/60 hover:text-on-surface hover:bg-white/5"
        }`}
        id="btn-nav-progress"
      >
        <span 
          className="material-symbols-outlined text-[20px] pointer-events-none select-none"
          style={{ fontVariationSettings: activeTab === "progress" ? "'FILL' 1" : "'FILL' 0" }}
        >
          trending_up
        </span>
        <span className="text-xs uppercase tracking-wider font-semibold">Progress</span>
      </button>

      <button
        onClick={() => setActiveTab("settings")}
        className={`px-5 py-2 rounded-full flex items-center justify-center gap-2 transition-all cursor-pointer ${
          activeTab === "settings"
            ? "bg-primary-container text-on-primary-container shadow-md font-semibold font-sans transform scale-102"
            : "text-on-surface/60 hover:text-on-surface hover:bg-white/5"
        }`}
        id="btn-nav-settings"
      >
        <span 
          className="material-symbols-outlined text-[20px] pointer-events-none select-none"
          style={{ fontVariationSettings: activeTab === "settings" ? "'FILL' 1" : "'FILL' 0" }}
        >
          settings
        </span>
        <span className="text-xs uppercase tracking-wider font-semibold">Settings</span>
      </button>
    </nav>
  );
}
