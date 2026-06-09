export interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  content: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Course {
  id: string;
  title: string;
  image: string;
  alt: string;
  lessonsCount: number;
  completedLessons: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  lessons: Lesson[];
  quizzes: QuizQuestion[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "review" | "available" | "warning";
  read: boolean;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  cover: string;
  durationSec: number;
  equalizerColor: string;
}

export interface KanbanTask {
  id: string;
  title: string;
  module: string;
  priority: "Low" | "Medium" | "High";
  status: "todo" | "progress" | "review" | "passed";
}

export interface BugReport {
  id: string;
  title: string;
  severity: "Minor" | "Major" | "Critical";
  status: "Open" | "In Investigation" | "Review" | "Fixed";
  module: string;
  description: string;
  steps: string;
  reporter: string;
  createdAt: string;
}

export type TabType = "home" | "progress" | "settings" | "learn" | "tasks" | "bugs" | "teams";
