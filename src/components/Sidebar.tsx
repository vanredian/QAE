import { TabType } from "../types";

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  unreadCount?: number;
}

export default function Sidebar({ activeTab, setActiveTab, unreadCount = 0 }: SidebarProps) {
  const primaryAvatar = "https://lh3.googleusercontent.com/aida-public/AB6AXuCht2YON65dGIn1hkq2vvDMs3jv-GgZ2Pu0tevE2nMut_YkFrOX1SKuCj1gboVwnKurtd1lIYxvBreuMrFgCWB-n-iYU1OLVka0-ZA3f1FuCszK-fD6lK5RgekyfFBy-_BZbDBC9NYFsoTg-PJXJHCqts7SvLz3YoZy41xvBAuYfSGlpwAKyU2oqnvN50hoefyPH85k-NwWnl1alf8E6LP5jC9L5CtDNBq_LumYQgQ6ueZ8WvofMDt8A5gpe8LW-HIJjJ7Ik6D6zg";

  const navigationItems: { tab: TabType; icon: string; label: string }[] = [
    { tab: "home", icon: "dashboard", label: "Dashboard" },
    { tab: "learn", icon: "school", label: "Curriculum" },
    { tab: "tasks", icon: "assignment_turned_in", label: "Kanban Board" },
    { tab: "bugs", icon: "bug_report", label: "Bug Logger" },
    { tab: "teams", icon: "groups", label: "QA Guilds" },
  ];

  return (
    <nav className="fixed left-4 top-1/2 -translate-y-1/2 rounded-full w-16 py-8 glass-raised flex flex-col items-center justify-between hidden md:flex z-50 shadow-2xl transition-all duration-300">
      {/* Top action groups */}
      <div className="flex flex-col items-center gap-6" id="sidebar-top-group">
        {navigationItems.map((item) => {
          const isActive = activeTab === item.tab;
          return (
            <button
              key={item.tab}
              onClick={() => setActiveTab(item.tab)}
              className={`relative group p-3 rounded-full transition-all duration-300 cursor-pointer ${
                isActive
                  ? "text-primary active-glow scale-110 bg-[#353437]/40"
                  : "text-on-surface/60 hover:text-primary hover:bg-[#353437]/10"
              }`}
              id={`sidebar-link-${item.tab}`}
              title={item.label}
            >
              <span 
                className="material-symbols-outlined text-[24px] pointer-events-none select-none" 
                style={{ fontVariationSettings: isActive ? "'FILL' 1, 'wght' 500" : "'FILL' 0, 'wght' 400" }}
              >
                {item.icon}
              </span>
              
              {/* Tooltip popping to the right */}
              <div className="absolute left-16 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-surface-container border border-outline-variant/30 text-xs font-medium whitespace-nowrap opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 pointer-events-none transition-all duration-200 z-50">
                {item.label}
              </div>

              {/* Bug/Notification Badge on tab icon */}
              {item.tab === "bugs" && unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error ring-1 ring-[#1f1f21] animate-pulse"></span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Profile and Settings group */}
      <div className="mt-8 pt-8 border-t border-on-surface/10 flex flex-col items-center gap-5" id="sidebar-bottom-group">
        <button
          onClick={() => setActiveTab("settings")}
          className={`relative group p-3 rounded-full transition-all duration-300 cursor-pointer ${
            activeTab === "settings"
              ? "text-primary active-glow scale-110 bg-[#353437]/40"
              : "text-on-surface/60 hover:text-primary hover:bg-[#353437]/10"
          }`}
          id="sidebar-link-settings"
          title="Settings"
        >
          <span 
            className="material-symbols-outlined text-[24px] pointer-events-none select-none"
            style={{ fontVariationSettings: activeTab === "settings" ? "'FILL' 1" : "'FILL' 0" }}
          >
            settings
          </span>
          <div className="absolute left-16 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-surface-container border border-outline-variant/30 text-xs font-medium whitespace-nowrap opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 pointer-events-none transition-all duration-200 z-50">
            System Settings
          </div>
        </button>

        {/* User Profile Trigger */}
        <button
          onClick={() => setActiveTab("settings")}
          className="relative group w-9 h-9 rounded-full overflow-hidden border border-primary/20 hover:border-primary/80 transition-all duration-300 cursor-pointer active:scale-95 shadow-md"
          id="sidebar-profile"
          title="QA Engineer Profile"
        >
          <img
            alt="QA Engineer Profile"
            className="w-full h-full object-cover"
            src={primaryAvatar}
          />
          <div className="absolute left-16 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-surface-container border border-outline-variant/30 text-xs font-medium whitespace-nowrap opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 pointer-events-none transition-all duration-200 z-50">
            Senior SDET
          </div>
        </button>
      </div>
    </nav>
  );
}
