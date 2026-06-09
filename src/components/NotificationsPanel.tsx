import { useState } from "react";
import { NotificationItem } from "../types";

interface NotificationsPanelProps {
  notifications: NotificationItem[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onAddSimulatedNotification: (newNotif: NotificationItem) => void;
}

export default function NotificationsPanel({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onAddSimulatedNotification
}: NotificationsPanelProps) {
  const [activeFilter, setActiveFilter] = useState<"Recent" | "All">("Recent");

  // Filter logic
  const filteredNotifications = activeFilter === "Recent" 
    ? notifications.filter(n => !n.read) 
    : notifications;

  // Simulate server/pipeline reports
  const triggerSimulation = () => {
    const payloads = [
      {
        title: "Selenium Regression Success",
        message: "All 18 Webdriver testing node containers finished validation checks with zero timeouts.",
        type: "available" as const,
      },
      {
        title: "Security Pipeline Alert",
        message: "Node dependency scanner audit alert: lodash v4.17.20 CVE warning detected.",
        type: "warning" as const,
      },
      {
        title: "Code Quality Check Complete",
        message: "SonarQube: Quality Gate PASSED. Code Coverage expanded to 91.24%. No new blockers.",
        type: "review" as const,
      },
      {
        title: "Infrastructure Scaling Event",
        message: "Playwright dynamic runner grid auto-scaled: 8 parallel worker pods deployed in europe-west1.",
        type: "available" as const,
      }
    ];

    const randomPayload = payloads[Math.floor(Math.random() * payloads.length)];
    const now = new Date();
    const timeFormatted = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;

    const newNotif: NotificationItem = {
      id: `sim-${Date.now()}`,
      title: randomPayload.title,
      message: randomPayload.message,
      time: timeFormatted,
      type: randomPayload.type,
      read: false
    };

    onAddSimulatedNotification(newNotif);
  };

  return (
    <section className="md:col-span-5 glass p-6 rounded-[2rem] inner-glow transition-all duration-300 relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-headline-lg text-2xl font-semibold flex items-center gap-2">
          <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 0" }}>notifications</span>
          Notifications
        </h2>
        
        {/* Toggle Pills block */}
        <div className="glass flex p-1 rounded-full text-[10px] font-mono">
          <button
            onClick={() => setActiveFilter("Recent")}
            className={`px-3 py-1 rounded-full cursor-pointer transition-all ${
              activeFilter === "Recent"
                ? "bg-on-surface text-background font-bold shadow"
                : "text-on-surface/60 hover:text-on-surface"
            }`}
          >
            Recent
          </button>
          
          <button
            onClick={() => setActiveFilter("All")}
            className={`px-3 py-1 rounded-full cursor-pointer transition-all ${
              activeFilter === "All"
                ? "bg-on-surface text-background font-bold shadow"
                : "text-on-surface/60 hover:text-on-surface"
            }`}
          >
            All
          </button>
        </div>
      </div>

      <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1" id="notifications-list-container">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((noti) => {
            let iconCode = "notifications_active";
            let colorClass = "bg-primary/10 text-primary";
            
            if (noti.type === "review") {
              iconCode = "rate_review";
              colorClass = "bg-primary/20 text-primary";
            } else if (noti.type === "available") {
              iconCode = "library_add";
              colorClass = "bg-secondary/20 text-[#47e266]";
            } else if (noti.type === "warning") {
              iconCode = "warning";
              colorClass = "bg-tertiary-container/20 text-tertiary";
            }

            return (
              <div
                key={noti.id}
                onClick={() => onMarkAsRead(noti.id)}
                className={`flex gap-4 p-4 rounded-2xl transition-all cursor-pointer group hover:bg-surface-variant/20 border ${
                  noti.read 
                    ? "opacity-55 border-transparent bg-transparent" 
                    : "border-outline-variant/10 bg-surface/20"
                }`}
                title="Click to resolve this alert"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform ${colorClass}`}>
                  <span className="material-symbols-outlined text-[20px]">{iconCode}</span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <p className={`font-bold text-xs truncate ${noti.read ? "text-[#8b91a0]" : "text-on-surface"}`}>
                      {noti.title}
                    </p>
                    <span className="text-[10px] text-on-surface/40 font-mono font-semibold shrink-0 ml-2">{noti.time}</span>
                  </div>
                  <p className="text-on-surface-variant text-xs truncate" title={noti.message}>
                    {noti.message}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 space-y-2">
            <span className="material-symbols-outlined text-4xl text-[#8b91a0]/30 select-none">notifications_off</span>
            <p className="text-xs text-on-surface-variant font-mono">No new active alerts remaining.</p>
          </div>
        )}
      </div>

      {/* Integration controls for simulating automated test updates */}
      <div className="mt-6 pt-4 border-t border-outline-variant/10 flex items-center justify-between gap-3">
        <button
          onClick={triggerSimulation}
          className="flex-1 px-4 py-2 bg-primary/10 hover:bg-primary/20 hover:text-primary text-on-surface border border-primary/20 text-xs font-mono font-semibold rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          id="simulate-notif-button"
        >
          <span className="material-symbols-outlined text-[15px] animate-spin">data_array</span>
          Simulate Test Event
        </button>

        {notifications.some(n => !n.read) && (
          <button
            onClick={onMarkAllAsRead}
            className="px-3.5 py-2 hover:bg-white/5 border border-outline-variant/10 text-[#8b91a0] hover:text-on-surface text-xs font-mono font-semibold rounded-xl transition-all cursor-pointer"
            id="mark-all-read-btn"
          >
            Resolve All
          </button>
        )}
      </div>
    </section>
  );
}
