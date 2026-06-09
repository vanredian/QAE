interface ProgressCardProps {
  bugsSubmitted: number;
  bugsGoal: number;
  tasksCompleted: number;
  tasksGoal: number;
  userRankIndex?: number; // determines rank badge name
}

export default function ProgressCard({
  bugsSubmitted,
  bugsGoal,
  tasksCompleted,
  tasksGoal,
  userRankIndex = 0
}: ProgressCardProps) {
  const bugPercent = Math.min(100, Math.round((bugsSubmitted / bugsGoal) * 100));
  const taskPercent = Math.min(100, Math.round((tasksCompleted / tasksGoal) * 100));

  // Dynamic SDET badges mapping based on cumulative scoring
  const ranksList = [
    { name: "QA Master III", next: "Next Level: Lead Architect", icon: "military_tech", style: "text-primary bg-primary/25 border-primary/20", progressPercent: 88 },
    { name: "Automation Elite IV", next: "Next Level: Infrastructure Overlord", icon: "terminal", style: "text-[#47e266] bg-[#09bf49]/20 border-[#47e266]/20", progressPercent: 95 },
    { name: "Selenium Guru V", next: "Next Level: Quality Lead Architect", icon: "trophy", style: "text-[#ffb868] bg-tertiary-container/25 border-tertiary/20", progressPercent: 100 }
  ];

  const currentRank = ranksList[Math.min(userRankIndex, ranksList.length - 1)];

  return (
    <section className="md:col-span-4 glass p-6 rounded-[2rem] flex flex-col justify-between overflow-hidden relative transition-all duration-300 group/progress">
      <div className="relative z-10 w-full">
        <h2 className="font-headline-lg text-2xl font-semibold mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary active-glow" style={{ fontVariationSettings: "'FILL' 1" }}>trending_up</span>
          Progress
        </h2>

        <div className="space-y-6">
          {/* Bug reports submission progress */}
          <div className="group/bugbar cursor-help">
            <div className="flex justify-between mb-2">
              <span className="text-on-surface/70 text-xs font-mono font-medium tracking-wide">Bug Reports Submitted</span>
              <span className="text-secondary font-bold text-xs font-mono">
                {bugsSubmitted} <span className="text-on-surface/40">/</span> {bugsGoal}
              </span>
            </div>
            
            {/* ProgressBar */}
            <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden border border-white/5 relative">
              <div 
                className="h-full bg-secondary shadow-[0_0_8px_rgba(71,226,102,0.6)] rounded-full transition-all duration-700 ease-out" 
                style={{ width: `${bugPercent}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between mt-1 text-[10px] font-mono text-on-surface-variant/70 opacity-0 group-hover/bugbar:opacity-100 transition-opacity duration-300">
              <span>Goal milestone</span>
              <span>{bugPercent}% completed</span>
            </div>
          </div>

          {/* Core completed tasks progress */}
          <div className="group/taskbar cursor-help">
            <div className="flex justify-between mb-2">
              <span className="text-on-surface/70 text-xs font-mono font-medium tracking-wide">Tasks Completed</span>
              <span className="text-primary font-bold text-xs font-mono">
                {tasksCompleted} <span className="text-on-surface/40">/</span> {tasksGoal}
              </span>
            </div>
            
            {/* ProgressBar */}
            <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden border border-white/5 relative">
              <div 
                className="h-full bg-primary shadow-[0_0_8px_rgba(170,199,255,0.6)] rounded-full transition-all duration-700 ease-out" 
                style={{ width: `${taskPercent}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between mt-1 text-[10px] font-mono text-on-surface-variant/70 opacity-0 group-hover/taskbar:opacity-100 transition-opacity duration-300">
              <span>Backlog milestone</span>
              <span>{taskPercent}% completed</span>
            </div>
          </div>
        </div>
      </div>

      {/* SDET Rank Badge Container */}
      <div className="mt-8 relative z-10 w-full">
        <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4 flex items-center gap-4 hover:border-primary/30 hover:bg-primary/10 transition-all duration-300 cursor-pointer">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shrink-0 shadow-lg ${currentRank.style}`}>
            <span className="material-symbols-outlined text-3xl font-light select-none pointer-events-none" style={{ fontVariationSettings: "'FILL' 1" }}>
              {currentRank.icon}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-bold text-sm tracking-wide text-on-surface truncate">{currentRank.name}</div>
            <div className="text-on-surface-variant text-[11px] font-mono truncate">{currentRank.next}</div>
          </div>
          
          <span className="material-symbols-outlined text-on-surface/30 group-hover/progress:translate-x-1 transition-transform text-[16px] select-none shrink-0">
            arrow_forward_ios
          </span>
        </div>
      </div>
    </section>
  );
}
