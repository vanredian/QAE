import React, { useState } from "react";
import { KanbanTask } from "../types";

interface TasksBoardProps {
  tasks: KanbanTask[];
  onUpdateTaskStatus: (taskId: string, newStatus: KanbanTask["status"]) => void;
  onAddTask: (newTask: KanbanTask) => void;
}

export default function TasksBoard({
  tasks,
  onUpdateTaskStatus,
  onAddTask
}: TasksBoardProps) {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskModule, setTaskModule] = useState("Core API");
  const [taskPriority, setTaskPriority] = useState<"Low" | "Medium" | "High">("Medium");

  const statuses: { key: KanbanTask["status"]; label: string; bg: string; text: string }[] = [
    { key: "todo", label: "Backlog Tasks", bg: "bg-surface-container/60", text: "text-on-surface" },
    { key: "progress", label: "In Active Dev", bg: "bg-primary-container/10", text: "text-primary-[#aac7ff]" },
    { key: "review", label: "Code Review / CR", bg: "bg-tertiary-container/10", text: "text-tertiary" },
    { key: "passed", label: "Passed QA", bg: "bg-secondary-container/10", text: "text-secondary" }
  ];

  const handleAddNewTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    const newTask: KanbanTask = {
      id: `task-${Date.now()}`,
      title: taskTitle,
      module: taskModule,
      priority: taskPriority,
      status: "todo"
    };

    onAddTask(newTask);
    setTaskTitle("");
  };

  const getPriorityClasses = (priority: KanbanTask["priority"]) => {
    if (priority === "High") return "bg-error-container/30 text-error border-error/20";
    if (priority === "Medium") return "bg-primary-container/20 text-primary border-primary/20";
    return "bg-surface-container-highest/60 text-on-surface-variant border-white/5";
  };

  return (
    <div className="space-y-6 animate-fade-in" id="tasks-board-root">
      
      {/* Banner */}
      <div className="glass-raised p-6 rounded-[2rem] flex flex-col md:flex-row justify-between items-start md:items-center gap-4 inner-glow">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 0" }}>assignment_turned_in</span>
            SDET Backlog Board
          </h2>
          <p className="text-xs text-on-surface-variant/80 font-mono mt-1">
            Verify automated tests, coordinate suite updates, and pipeline changes to master branches.
          </p>
        </div>

        {/* Dynamic add form */}
        <form onSubmit={handleAddNewTask} className="w-full md:w-auto flex flex-wrap items-center gap-3 bg-black/20 p-2.5 rounded-2xl border border-white/5">
          <input
            type="text"
            placeholder="New task title..."
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            className="flex-1 md:w-48 bg-transparent text-xs border border-white/10 outline-none rounded-xl px-3 py-1.5 focus:border-primary placeholder:text-on-surface-variant text-on-surface"
          />

          <select
            value={taskModule}
            onChange={(e) => setTaskModule(e.target.value)}
            className="bg-[#1f1f21] text-xs outline-none border border-white/10 rounded-xl px-2.5 py-1.5 text-on-surface/90"
          >
            <option value="Auth Core">Auth Core</option>
            <option value="Billing Node">Billing Node</option>
            <option value="Selenium Grid">Selenium Grid</option>
            <option value="Checkout API">Checkout API</option>
            <option value="Performance">Performance</option>
          </select>

          <button
            type="submit"
            className="px-4 py-1.5 bg-primary text-on-primary font-bold text-xs rounded-xl hover:shadow-lg hover:shadow-primary/15 transition-all cursor-pointer active:scale-95"
          >
            Create Task
          </button>
        </form>
      </div>

      {/* Grid containing Columns */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {statuses.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col.key);

          return (
            <div
              key={col.key}
              className={`rounded-3xl p-4 flex flex-col space-y-4 min-h-[500px] border border-outline-variant/10 ${col.bg} transition-all duration-300 relative`}
            >
              {/* Column Header */}
              <div className="flex justify-between items-center pb-2 border-b border-outline-variant/10">
                <span className={`font-semibold text-xs font-sans tracking-wide ${col.text}`}>
                  {col.label}
                </span>
                <span className="font-mono text-[10px] bg-black/40 px-2 py-0.5 rounded-full font-bold text-on-surface/60">
                  {colTasks.length}
                </span>
              </div>

              {/* Task Cards Stack */}
              <div className="flex-1 space-y-3 overflow-y-auto pr-0.5 h-[400px]">
                {colTasks.length > 0 ? (
                  colTasks.map((task) => (
                    <div
                      key={task.id}
                      className="glass bg-surface-container-low/40 p-3.5 rounded-2xl border border-outline-variant/10 group hover:border-[#aac7ff]/30 transition-all duration-300 relative"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-semibold text-on-surface text-wrap break-all leading-tight">
                          {task.title}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5 mt-3">
                        <span className="text-[9px] font-mono uppercase tracking-wide bg-[#353437]/60 px-2 py-0.5 rounded border border-white/5 text-on-surface-variant font-semibold">
                          {task.module}
                        </span>
                        
                        <span className={`text-[9px] font-mono uppercase tracking-wide border px-2 py-0.5 rounded font-bold ${getPriorityClasses(task.priority)}`}>
                          {task.priority}
                        </span>
                      </div>

                      {/* Direction shifts */}
                      <div className="flex items-center justify-end gap-1 mt-3.5 pt-2 border-t border-white/5">
                        {col.key !== "todo" && (
                          <button
                            onClick={() => {
                              const prevIdx = statuses.findIndex(s => s.key === col.key) - 1;
                              onUpdateTaskStatus(task.id, statuses[prevIdx].key);
                            }}
                            className="p-1 hover:bg-white/5 text-on-surface/50 hover:text-on-surface rounded transition-colors active:scale-90 cursor-pointer"
                            title="Move Left"
                          >
                            <span className="material-symbols-outlined text-[15px]">arrow_back</span>
                          </button>
                        )}
                        
                        {col.key !== "passed" && (
                          <button
                            onClick={() => {
                              const nextIdx = statuses.findIndex(s => s.key === col.key) + 1;
                              onUpdateTaskStatus(task.id, statuses[nextIdx].key);
                            }}
                            className="p-1 bg-primary/10 hover:bg-primary/20 text-primary rounded transition-all active:scale-90 cursor-pointer flex items-center justify-center gap-0.5"
                            title="Move Right"
                          >
                            <span className="text-[10px] font-mono leading-none">Move</span>
                            <span className="material-symbols-outlined text-[15px] leading-none">arrow_forward</span>
                          </button>
                        )}

                        {col.key === "passed" && (
                          <span className="text-[10px] text-secondary font-mono flex items-center gap-0.5 select-none font-bold">
                            <span className="material-symbols-outlined text-[13px] fill-[1]">task_alt</span> Finished
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-30 select-none pb-8">
                    <span className="material-symbols-outlined text-3xl">playlist_add</span>
                    <p className="text-[10px] font-mono uppercase tracking-wider mt-1">Empty pipeline</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
