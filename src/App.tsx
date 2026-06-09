import { useState, useEffect } from "react";
import { TabType, Course, NotificationItem, Song, KanbanTask, BugReport } from "./types";
import {
  initialCourses,
  initialNotifications,
  songsPlaylist,
  initialTasks,
  initialBugReports
} from "./data";

// Sub-components imports
import Sidebar from "./components/Sidebar";
import BottomNav from "./components/BottomNav";
import LearningCard from "./components/LearningCard";
import ProgressCard from "./components/ProgressCard";
import FocusPlayer from "./components/FocusPlayer";
import NotificationsPanel from "./components/NotificationsPanel";
import TasksBoard from "./components/TasksBoard";
import BugTracker from "./components/BugTracker";
import TeamsPanel from "./components/TeamsPanel";
import SettingsPanel from "./components/SettingsPanel";

export default function App() {
  // Global dashboard states
  const [activeTab, setActiveTab] = useState<TabType>("home");
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [tasks, setTasks] = useState<KanbanTask[]>(initialTasks);
  const [bugs, setBugs] = useState<BugReport[]>(initialBugReports);

  // Profile customization models
  const [userName, setUserName] = useState("QA Forge");
  const [userRole, setUserRole] = useState("Senior SDET Dashboard");
  const [selectedTheme, setSelectedTheme] = useState("cosmic");

  // Cumulative score elements to dynamically calculate rank badges
  const [userRankIndex, setUserRankIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  // Search filter query items across titles
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  // Sync rank index based on points (completed lessons + solved tasks + bug reports filed)
  const completedLabsCount = courses.reduce((acc, c) => acc + c.completedLessons, 0);
  const completedTasksCount = tasks.filter(t => t.status === "passed").length;
  const bugsSubmittedCount = bugs.length;

  useEffect(() => {
    const totalPoints = completedLabsCount + completedTasksCount * 2 + bugsSubmittedCount;
    if (totalPoints > 28) {
      setUserRankIndex(2); // Selenium Guru V
    } else if (totalPoints > 15) {
      setUserRankIndex(1); // Automation Elite IV
    } else {
      setUserRankIndex(0); // QA Master III
    }
  }, [completedLabsCount, completedTasksCount, bugsSubmittedCount]);

  // Handler: Lesson finished
  const handleCompleteLesson = (courseId: string, lessonId: string) => {
    setCourses((prevCourses) =>
      prevCourses.map((c) => {
        if (c.id !== courseId) return c;

        const updatedLessons = c.lessons.map((l) =>
          l.id === lessonId ? { ...l, completed: true } : l
        );
        const completedCount = updatedLessons.filter((l) => l.completed).length;

        return {
          ...c,
          lessons: updatedLessons,
          completedLessons: completedCount
        };
      })
    );

    // Append dynamic alert item
    const targetCourse = courses.find((c) => c.id === courseId);
    const targetLesson = targetCourse?.lessons.find((l) => l.id === lessonId);
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;

    const newNotif: NotificationItem = {
      id: `l-done-${Date.now()}`,
      title: "Lab Module Certified",
      message: `Completed: "${targetLesson?.title || "Syllabus chapter"}" inside ${targetCourse?.title}.`,
      time: timeStr,
      type: "available",
      read: false
    };

    setNotifications((prev) => [newNotif, ...prev]);
  };

  // Handler: Quiz certification passed
  const handleCompleteQuiz = (courseId: string, scoreGained: number) => {
    // Append notification log
    const targetCourse = courses.find((c) => c.id === courseId);
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;

    const newNotif: NotificationItem = {
      id: `q-done-${Date.now()}`,
      title: "Module Quiz Completed",
      message: `Scored ${scoreGained} points in "${targetCourse?.title || "Evaluation"}" certification quiz.`,
      time: timeStr,
      type: "review",
      read: false
    };

    setNotifications((prev) => [newNotif, ...prev]);
  };

  // Handler: Kanban status update
  const handleUpdateTaskStatus = (id: string, nextStatus: KanbanTask["status"]) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: nextStatus } : t))
    );

    if (nextStatus === "passed") {
      const targetTask = tasks.find(t => t.id === id);
      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;

      const newNotif: NotificationItem = {
        id: `t-done-${Date.now()}`,
        title: "QA Backlog Item Resolved",
        message: `Task passed verification pipelines: "${targetTask?.title || "Integration tests"}".`,
        time: timeStr,
        type: "available",
        read: false
      };

      setNotifications((prev) => [newNotif, ...prev]);
    }
  };

  const handleAddTask = (newTask: KanbanTask) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  // Handler: New bug logging
  const handleAddBug = (newBug: BugReport) => {
    setBugs((prev) => [newBug, ...prev]);

    // Push automatic notification alerting dev leads
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;

    const newNotif: NotificationItem = {
      id: `bug-notif-${Date.now()}`,
      title: "Critical Defect Escalation",
      message: `System Failure logged: "${newBug.title}" in module [${newBug.module}].`,
      time: timeStr,
      type: "warning",
      read: false
    };

    setNotifications((prev) => [newNotif, ...prev]);
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleAddSimulatedNotification = (newNotif: NotificationItem) => {
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // Search filtration lookup lists
  const filteredCoursesSearchResult = courses.filter(c =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTasksSearchResult = tasks.filter(t =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.module.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const unreadAlertsCount = notifications.filter((n) => !n.read).length;

  // Active theme accent color variables mapping
  const getThemeBlurBgs = () => {
    if (selectedTheme === "emerald") {
      return {
        topBlob: "bg-secondary/10",
        bottomBlob: "bg-secondary/5",
        accentText: "text-secondary",
        loaderLine: "bg-secondary"
      };
    }
    if (selectedTheme === "amber") {
      return {
        topBlob: "bg-tertiary-container/20",
        bottomBlob: "bg-tertiary/10",
        accentText: "text-tertiary",
        loaderLine: "bg-tertiary"
      };
    }
    // Deep Cosmic
    return {
      topBlob: "bg-primary/5",
      bottomBlob: "bg-secondary/5",
      accentText: "text-primary",
      loaderLine: "bg-primary"
    };
  };

  const themeMeta = getThemeBlurBgs();

  return (
    <div className={`min-h-screen bg-[#0e0e10] text-[#e4e2e4] flex flex-col relative overflow-hidden transition-all duration-300 pb-36 md:pb-12`}>
      
      {/* HUD Ambient Radial blur lighting layers */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#131315] via-[#1b1b1d] to-[#0e0e10]"></div>
        <div className={`absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[120px] transition-colors duration-700 ${themeMeta.topBlob}`}></div>
        <div className={`absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] transition-colors duration-700 ${themeMeta.bottomBlob}`}></div>
        
        {/* Futuristic abstract layout matrix overlay dot lattice */}
        <div 
          className="absolute inset-0 opacity-[0.06] pointer-events-none" 
          style={{ 
            backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)", 
            backgroundSize: "32px 32px" 
          }}
        ></div>
      </div>

      {/* Main Container Content */}
      <div className="relative z-10 flex min-h-screen max-w-[1440px] w-full mx-auto px-4 md:px-0">
        
        {/* Floating Sidebar (Fixed Side Dock) */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} unreadCount={unreadAlertsCount} />

        {/* Dynamic content canvas */}
        <main className="flex-1 md:pl-24 md:pr-12 py-8 md:py-12 flex flex-col justify-between w-full">
          
          <div className="space-y-10 w-full">
            {/* Header / Top level elements */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-6">
              <div>
                <h1 
                  className="text-3xl font-extrabold tracking-tight font-sans text-on-surface cursor-pointer select-none"
                  onClick={() => setActiveTab("home")}
                >
                  {userName}
                </h1>
                <p className="text-on-surface-variant text-[11px] font-mono tracking-wider font-semibold uppercase mt-1">
                  {userRole}
                </p>
              </div>

              {/* Console search bar & Alerts block */}
              <div className="flex items-center gap-4 w-full md:w-auto relative">
                <div className="relative glass rounded-full px-5 py-2.5 flex items-center gap-3 w-full md:w-80 group">
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors select-none pointer-events-none text-[20px]">
                    search
                  </span>
                  
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowSearchDropdown(e.target.value.length > 0);
                    }}
                    onFocus={() => {
                      if (searchQuery.length > 0) setShowSearchDropdown(true);
                    }}
                    onBlur={() => {
                      // small timeout to allow clicking dropdown items
                      setTimeout(() => setShowSearchDropdown(false), 200);
                    }}
                    placeholder="Search curriculum, modules, tickets..."
                    className="bg-transparent border-none focus:outline-none focus:ring-0 text-on-surface placeholder:text-on-surface-variant/75 w-full text-xs font-mono"
                    id="search-console-input"
                  />

                  {/* Dynamic absolute search filtrations results box */}
                  {showSearchDropdown && (
                    <div className="absolute top-12 left-0 right-0 max-h-[300px] overflow-y-auto glass-raised rounded-2xl p-4 shadow-2xl z-50 border border-outline-variant/35 text-xs font-mono space-y-4">
                      {filteredCoursesSearchResult.length === 0 && filteredTasksSearchResult.length === 0 ? (
                        <div className="text-[#8b91a0] text-center py-2">No matching curriculum or tickets located.</div>
                      ) : (
                        <>
                          {filteredCoursesSearchResult.length > 0 && (
                            <div>
                              <div className="font-bold text-primary mb-1 uppercase tracking-wider text-[10px]">Matching Academic Tracks</div>
                              {filteredCoursesSearchResult.map(c => (
                                <button
                                  key={c.id}
                                  onClick={() => {
                                    setActiveTab("learn");
                                    setSearchQuery("");
                                  }}
                                  className="w-full text-left py-1 text-on-surface hover:text-[#aac7ff] truncate block"
                                >
                                  &bull; {c.title}
                                </button>
                              ))}
                            </div>
                          )}

                          {filteredTasksSearchResult.length > 0 && (
                            <div>
                              <div className="font-bold text-secondary mb-1 uppercase tracking-wider text-[10px]">Matching Backlog Items</div>
                              {filteredTasksSearchResult.map(t => (
                                <button
                                  key={t.id}
                                  onClick={() => {
                                    setActiveTab("tasks");
                                    setSearchQuery("");
                                  }}
                                  className="w-full text-left py-1 text-on-surface hover:text-[#6cff82] truncate block"
                                >
                                  &bull; {t.title} [{t.module}]
                                </button>
                              ))}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Alarm Bell Button */}
                <button
                  onClick={() => {
                    setActiveTab("home");
                    // Quick scroll attention to notification module
                    setTimeout(() => {
                      document.getElementById("notifications-list-container")?.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                  }}
                  className="glass w-11 h-11 rounded-full flex items-center justify-center hover:bg-[#353437]/25 transition-all cursor-pointer relative shrink-0 active:scale-95 border border-white/10"
                  id="notifications-indicator-bell"
                  title={`${unreadAlertsCount} unread system notifications`}
                >
                  <span className="material-symbols-outlined text-on-surface">notifications</span>
                  {unreadAlertsCount > 0 && (
                    <span className="absolute top-1 right-1 bg-error text-white font-mono font-black text-[9px] w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-[#0e0e10] animate-pulse">
                      {unreadAlertsCount}
                    </span>
                  )}
                </button>
              </div>
            </header>

            {/* Core Tab Switched Canvas Sections */}
            <div className="w-full">
              {activeTab === "home" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 auto-rows-auto" id="dashboard-bento-grid">
                  
                  {/* Learning Section (Featured Courses) */}
                  <LearningCard
                    courses={courses}
                    onCompleteLesson={handleCompleteLesson}
                    onCompleteQuiz={handleCompleteQuiz}
                    onNavigateToLearnTab={() => setActiveTab("learn")}
                  />

                  {/* Progress Section */}
                  <ProgressCard
                    bugsSubmitted={bugsSubmittedCount}
                    bugsGoal={15}
                    tasksCompleted={completedTasksCount}
                    tasksGoal={60}
                    userRankIndex={userRankIndex}
                  />

                  {/* Music Player Section */}
                  <FocusPlayer />

                  {/* Notifications Alert Board */}
                  <NotificationsPanel
                    notifications={notifications}
                    onMarkAsRead={handleMarkAsRead}
                    onMarkAllAsRead={handleMarkAllAsRead}
                    onAddSimulatedNotification={handleAddSimulatedNotification}
                  />
                </div>
              )}

              {activeTab === "learn" && (
                <div className="space-y-6">
                  {/* Re-use learning dashboard components inside specialized academic tab */}
                  <div className="glass-raised p-6 rounded-[2rem] flex items-center justify-between gap-4 inner-glow">
                    <div>
                      <h2 className="text-2xl font-bold flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 0" }}>school</span>
                        SDET Course Curriculum
                      </h2>
                      <p className="text-xs text-on-surface-variant/80 font-mono mt-1">
                        Enroll in labs, perform mock API schema assertion testing, and complete modular certification checkpoints.
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-6">
                    <LearningCard
                      courses={courses}
                      onCompleteLesson={handleCompleteLesson}
                      onCompleteQuiz={handleCompleteQuiz}
                      onNavigateToLearnTab={() => {}}
                    />
                  </div>
                </div>
              )}

              {activeTab === "tasks" && (
                <TasksBoard
                  tasks={tasks}
                  onUpdateTaskStatus={handleUpdateTaskStatus}
                  onAddTask={handleAddTask}
                />
              )}

              {activeTab === "bugs" && (
                <BugTracker
                  bugs={bugs}
                  onAddBug={handleAddBug}
                />
              )}

              {activeTab === "teams" && (
                <TeamsPanel />
              )}

              {activeTab === "settings" && (
                <SettingsPanel
                  userName={userName}
                  userRole={userRole}
                  onUpdateProfile={(name, role) => {
                    setUserName(name);
                    setUserRole(role);
                  }}
                  selectedTheme={selectedTheme}
                  onThemeSelect={setSelectedTheme}
                />
              )}
            </div>
          </div>

          {/* Micro-Interaction Footer */}
          <footer className="text-center text-[11px] font-mono text-on-surface-variant/45 mt-12 select-none">
            &copy; 2026 QA Forge Hub &bull; Senior SDET Immersive HUD Platform Workspace.
          </footer>
        </main>
      </div>

      {/* Dynamic Mobile Float Navigation pill menu */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
