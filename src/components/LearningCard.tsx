import { useState } from "react";
import { Course, Lesson } from "../types";

interface LearningCardProps {
  courses: Course[];
  onCompleteLesson: (courseId: string, lessonId: string) => void;
  onCompleteQuiz: (courseId: string, scoreGained: number) => void;
  onNavigateToLearnTab: () => void;
}

export default function LearningCard({
  courses,
  onCompleteLesson,
  onCompleteQuiz,
  onNavigateToLearnTab
}: LearningCardProps) {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [isAnswersubmitted, setIsAnswerSubmitted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  // Open Classroom Modal details
  const handleOpenCourse = (course: Course) => {
    setSelectedCourse(course);
    setActiveLessonId(course.lessons[0]?.id || null);
    setIsQuizMode(false);
    setActiveQuestionIndex(0);
    setSelectedAnswerIndex(null);
    setQuizScore(0);
    setIsAnswerSubmitted(false);
    setQuizFinished(false);
  };

  const handleCloseClassroom = () => {
    setSelectedCourse(null);
  };

  const currentLesson = selectedCourse?.lessons.find(l => l.id === activeLessonId);

  // Handle Quiz Submissions
  const handleAnswerClick = (index: number) => {
    if (isAnswersubmitted) return;
    setSelectedAnswerIndex(index);
  };

  const handleCheckAnswer = () => {
    if (selectedAnswerIndex === null || !selectedCourse) return;
    setIsAnswerSubmitted(true);
    const question = selectedCourse.quizzes[activeQuestionIndex];
    if (selectedAnswerIndex === question.correctIndex) {
      setQuizScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (!selectedCourse) return;
    setSelectedAnswerIndex(null);
    setIsAnswerSubmitted(false);

    if (activeQuestionIndex + 1 < selectedCourse.quizzes.length) {
      setActiveQuestionIndex(prev => prev + 1);
    } else {
      setQuizFinished(true);
      // gained points based on correct answers
      const gainedPoints = quizScore;
      onCompleteQuiz(selectedCourse.id, gainedPoints);
    }
  };

  return (
    <>
      <section className="md:col-span-8 glass p-6 rounded-[2rem] inner-glow flex flex-col justify-between transition-all duration-300 relative group/bento">
        {/* Absolute header row */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-headline-lg text-2xl font-semibold flex items-center gap-2">
              <span className="material-symbols-outlined text-primary scale-110" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
              Learning
            </h2>
            <button 
              onClick={onNavigateToLearnTab}
              className="text-primary font-label-sm flex items-center gap-1 hover:underline transition-all cursor-pointer group"
              id="view-curriculum-button"
            >
              View Curriculum{" "}
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform" data-icon="arrow_forward">
                arrow_forward
              </span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {courses.map((course) => {
              const completionPercent = course.lessonsCount > 0 
                ? Math.round((course.completedLessons / course.lessonsCount) * 100) 
                : 0;

              return (
                <div
                  key={course.id}
                  onClick={() => handleOpenCourse(course)}
                  className="group cursor-pointer bg-surface/30 hover:bg-surface-container-high/30 rounded-2xl p-3 border border-outline-variant/10 hover:border-primary/30 transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
                  id={`course-card-${course.id}`}
                >
                  <div className="relative rounded-xl overflow-hidden aspect-[4/3] mb-3">
                    <img
                      alt={course.alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      src={course.image}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/25 to-transparent"></div>
                    
                    {/* Floating difficulty pill */}
                    <span className={`absolute top-2 right-2 text-[10px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold z-10 ${
                      course.difficulty === "Advanced" 
                        ? "bg-error-container/80 text-[#ffb4ab] border border-error/20" 
                        : course.difficulty === "Intermediate"
                        ? "bg-primary-container/80 text-primary border border-primary/20"
                        : "bg-secondary-container/30 text-[#6cff82] border border-secondary/20"
                    }`}>
                      {course.difficulty}
                    </span>

                    {/* Progress bottom indicator */}
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] bg-background/80 backdrop-blur-md py-1 px-2.5 rounded-lg border border-outline-variant/10">
                      <span className="font-mono text-on-surface/70">
                        {course.completedLessons}/{course.lessonsCount} Labs
                      </span>
                      <span className="font-mono text-primary font-semibold">{completionPercent}%</span>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-on-surface group-hover:text-primary transition-colors text-sm truncate">
                    {course.title}
                  </h3>
                  <p className="text-xs text-on-surface-variant/80 mt-1 line-clamp-2">
                    {course.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Classroom Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-xl animate-fade-in">
          <div className="w-full max-w-5xl h-[85vh] rounded-[2rem] glass-raised inner-glow overflow-hidden flex flex-col shadow-2xl border border-outline-variant/20">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-outline-variant/20 flex items-center justify-between bg-surface-container/30">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
                <div>
                  <h2 className="text-xl font-bold font-sans text-on-surface">{selectedCourse.title}</h2>
                  <p className="text-xs text-on-surface-variant font-mono">SDET Classroom Sandbox &bull; {selectedCourse.difficulty} Track</p>
                </div>
              </div>
              <button
                onClick={handleCloseClassroom}
                className="w-10 h-10 rounded-full glass hover:bg-error-container/20 hover:text-error flex items-center justify-center transition-all cursor-pointer active:scale-90"
                id="close-classroom-modal"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Modal core layout */}
            <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
              
              {/* Classroom Left Navigation Side */}
              <div className="w-full md:w-72 border-r border-outline-variant/20 bg-surface-container-lowest/40 overflow-y-auto p-4 space-y-6">
                <div>
                  <h4 className="text-[11px] font-mono text-on-surface-variant uppercase tracking-wider mb-2 font-semibold">Course Syllabus</h4>
                  <div className="space-y-1">
                    {selectedCourse.lessons.map((lesson, idx) => {
                      const isActive = activeLessonId === lesson.id && !isQuizMode;
                      return (
                        <button
                          key={lesson.id}
                          onClick={() => {
                            setActiveLessonId(lesson.id);
                            setIsQuizMode(false);
                          }}
                          className={`w-full text-left px-3 py-2.5 rounded-xl text-xs transition-all flex items-center justify-between cursor-pointer ${
                            isActive
                              ? "bg-primary text-on-primary font-semibold shadow-md translate-x-1"
                              : "text-on-surface/70 hover:bg-surface-container-high/40 hover:text-on-surface"
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <span className="font-mono opacity-60">0{idx + 1}</span>
                            <span className="truncate">{lesson.title}</span>
                          </div>
                          {lesson.completed ? (
                            <span className="material-symbols-outlined text-[16px] text-secondary shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
                              check_circle
                            </span>
                          ) : (
                            <span className="text-[10px] font-mono text-on-surface-variant uppercase bg-surface-container px-2 py-0.5 rounded shrink-0">
                              {lesson.duration}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4 border-t border-outline-variant/15">
                  <h4 className="text-[11px] font-mono text-on-surface-variant uppercase tracking-wider mb-2 font-semibold">Knowledge Validations</h4>
                  <button
                    onClick={() => setIsQuizMode(true)}
                    className={`w-full text-left px-3 py-3 rounded-xl text-xs transition-all flex items-center justify-between cursor-pointer ${
                      isQuizMode
                        ? "bg-secondary text-on-secondary font-bold shadow-md translate-x-1 animate-pulse"
                        : "bg-secondary/10 text-[#6cff82] border border-secondary/20 hover:bg-secondary/20"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px] fill-[1]">quiz</span>
                      <span>Topic Certification Quiz</span>
                    </div>
                    <span className="font-mono text-[9px] bg-black/30 px-1.5 py-0.5 rounded font-bold uppercase tracking-wide">
                      {selectedCourse.quizzes.length} Qs
                    </span>
                  </button>
                </div>
              </div>

              {/* Classroom Main content panel */}
              <div className="flex-1 overflow-y-auto p-6 bg-surface/10 flex flex-col justify-between">
                
                {!isQuizMode ? (
                  // Lesson view
                  <div className="space-y-6">
                    {currentLesson ? (
                      <>
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-xs font-mono text-primary uppercase font-bold tracking-wider">Active Module</span>
                            <h3 className="text-2xl font-bold font-sans text-on-surface mt-1">{currentLesson.title}</h3>
                          </div>
                          <span className="text-xs font-mono text-[#8b91a0] bg-surface-container px-3 py-1.5 rounded-full border border-outline-variant/15">
                            Duration: {currentLesson.duration}
                          </span>
                        </div>

                        {/* Interactive terminal code sandbox for lesson explanation */}
                        <div className="font-mono text-xs p-5 bg-surface-container-lowest border border-outline-variant/30 rounded-2xl shadow-inner text-[#c0c6d6] space-y-4 leading-relaxed relative">
                          <div className="absolute top-3 right-4 flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-error"></span>
                            <span className="w-2.5 h-2.5 rounded-full bg-tertiary"></span>
                            <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                          </div>

                          <div className="text-on-surface-variant text-[11px] pb-2 border-b border-outline-variant/10">
                            sdet-session-terminal@qa-forge:~$ execution-log --module "{selectedCourse.id}"
                          </div>

                          <p className="font-sans text-sm text-on-surface">
                            {currentLesson.content}
                          </p>

                          <div className="bg-black/40 p-4 rounded-xl border border-white/5 space-y-2 mt-4 text-[#47e266]">
                            <div># Code Blueprint Snippet File: main_verify.py</div>
                            {selectedCourse.id === "course-2" ? (
                              <pre className="text-[11px] overflow-x-auto text-[#aac7ff]">
{`import pytest

@pytest.fixture(scope="module")
def browser_context():
    # Setup step
    print("\\n[Setup] Spawning Chromium headless driver nodes")
    driver = spawn_chromium_grid()
    yield driver
    # Teardown step
    print("[Teardown] Purging active tab memory buckets")
    driver.close()

def test_authorization_matrix(browser_context):
    assert browser_context.verify_route("/dashboard") == 200`}
                              </pre>
                            ) : selectedCourse.id === "course-3" ? (
                              <pre className="text-[11px] overflow-x-auto text-[#aac7ff]">
{`// Contract Assert System v3
pm.test("Status response is 200 Success", function () {
    pm.response.to.have.status(200);
});

pm.test("Validate Contract JSON Schema", function () {
    var schema = {
        "type": "object",
        "required": ["status", "userId"],
        "properties": {
            "status": {"type": "string"},
            "userId": {"type": "integer"}
        }
    };
    pm.response.to.have.jsonSchema(schema);
});`}
                              </pre>
                            ) : (
                              <pre className="text-[11px] overflow-x-auto text-[#aac7ff]">
{`# Exploratory Session Coverage Log
System: Asynchronous Broadcast Socket Route
Mnemonic Tour Code: SFDPOT (Focus: Platform & Time)

- Tested boundary threshold inputs for web sockets
- Verified memory release parameters
- Assert status: SUCCESS (0 errors caught)`}
                              </pre>
                            )}
                          </div>
                        </div>

                        {/* Complete lesson trigger */}
                        <div className="pt-4 flex justify-end">
                          {!currentLesson.completed ? (
                            <button
                              onClick={() => onCompleteLesson(selectedCourse.id, currentLesson.id)}
                              className="px-6 py-3 bg-primary text-on-primary font-bold rounded-xl text-xs hover:shadow-lg hover:shadow-primary/20 transform hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2 cursor-pointer"
                            >
                              <span className="material-symbols-outlined text-[16px]">task_alt</span>
                              Mark Lab Complete &amp; Sync State
                            </button>
                          ) : (
                            <button
                              disabled
                              className="px-6 py-3 bg-secondary/15 text-[#6cff82] border border-secondary/30 font-bold rounded-xl text-xs flex items-center gap-2"
                            >
                              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                              Module Chapter Completed
                            </button>
                          )}
                        </div>
                      </>
                    ) : (
                      <p className="text-on-surface-variant text-center font-mono py-12">Select any course syllabus node to start.</p>
                    )}
                  </div>
                ) : (
                  // Quiz view
                  <div className="space-y-6">
                    <div className="flex justify-between items-center border-b border-outline-variant/10 pb-4">
                      <div>
                        <span className="text-xs font-mono text-[#ffb868] uppercase font-bold tracking-wider">Certification Quiz</span>
                        <h3 className="text-xl font-bold font-sans text-on-surface mt-1">Syllabus Evaluation Task</h3>
                      </div>
                      
                      {!quizFinished && (
                        <div className="font-mono text-xs bg-surface-container px-3 py-1.5 rounded-lg border border-outline-variant/15">
                          Problem <span className="text-primary font-bold">{activeQuestionIndex + 1}</span> of {selectedCourse.quizzes.length}
                        </div>
                      )}
                    </div>

                    {!quizFinished ? (
                      // Quiz body
                      <div className="space-y-6">
                        <div className="text-sm font-semibold font-sans text-on-surface bg-[#353437]/20 p-4 rounded-xl border border-outline-variant/10">
                          {selectedCourse.quizzes[activeQuestionIndex].question}
                        </div>

                        <div className="space-y-3">
                          {selectedCourse.quizzes[activeQuestionIndex].options.map((option, idx) => {
                            const isSelected = selectedAnswerIndex === idx;
                            const isCorrectAnswer = idx === selectedCourse.quizzes[activeQuestionIndex].correctIndex;
                            
                            let selectClass = "bg-surface-container/40 border-outline-variant/10 text-on-surface hover:bg-surface-container-high/40";
                            if (isSelected) {
                              selectClass = "bg-primary-container/40 border-primary text-primary font-semibold shadow-inner";
                            }
                            if (isAnswersubmitted) {
                              if (isCorrectAnswer) {
                                selectClass = "bg-[#09bf49]/20 border-[#47e266] text-[#47e266] font-semibold";
                              } else if (isSelected) {
                                selectClass = "bg-error-container/20 border-error text-error";
                              } else {
                                selectClass = "opacity-40 bg-surface-container/10 border-transparent text-on-surface/50";
                              }
                            }

                            return (
                              <button
                                key={idx}
                                disabled={isAnswersubmitted}
                                onClick={() => handleAnswerClick(idx)}
                                className={`w-full text-left p-4 rounded-xl text-xs border transition-all flex items-center justify-between cursor-pointer ${selectClass}`}
                              >
                                <div className="flex items-center gap-3">
                                  <span className="w-6 h-6 rounded-lg bg-[#353437]/40 flex items-center justify-center font-mono font-bold text-[11px] text-on-surface/60 shrink-0">
                                    {String.fromCharCode(65 + idx)}
                                  </span>
                                  <span>{option}</span>
                                </div>
                                {isAnswersubmitted && isCorrectAnswer && (
                                  <span className="material-symbols-outlined text-[16px] text-secondary shrink-0">check_circle</span>
                                )}
                                {isAnswersubmitted && isSelected && !isCorrectAnswer && (
                                  <span className="material-symbols-outlined text-[16px] text-error shrink-0">cancel</span>
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {/* Interactive Quiz Explanation Block */}
                        {isAnswersubmitted && (
                          <div className="p-4 bg-surface-container-lowest/70 border border-outline-variant/10 rounded-xl text-xs space-y-1.5 animate-slide-up">
                            <div className="font-bold flex items-center gap-1.5">
                              {selectedAnswerIndex === selectedCourse.quizzes[activeQuestionIndex].correctIndex ? (
                                <span className="text-secondary font-sans flex items-center gap-1">
                                  <span className="material-symbols-outlined text-[14px]">check_circle</span> Verified: Correct Assessment!
                                </span>
                              ) : (
                                <span className="text-error font-sans flex items-center gap-1">
                                  <span className="material-symbols-outlined text-[14px]">error</span> Validation Failed: Incorrect
                                </span>
                              )}
                            </div>
                            <p className="text-on-surface-variant font-sans leading-relaxed">
                              {selectedCourse.quizzes[activeQuestionIndex].explanation}
                            </p>
                          </div>
                        )}

                        {/* Quiz actions bottom drawer */}
                        <div className="pt-4 flex justify-end">
                          {!isAnswersubmitted ? (
                            <button
                              disabled={selectedAnswerIndex === null}
                              onClick={handleCheckAnswer}
                              className={`px-6 py-3 font-bold rounded-xl text-xs transition-all flex items-center gap-2 cursor-pointer ${
                                selectedAnswerIndex !== null
                                  ? "bg-primary text-on-primary hover:shadow-lg hover:shadow-primary/20 scale-102"
                                  : "bg-surface-container-highest/55 text-on-surface/40 border border-outline-variant/10 cursor-not-allowed"
                              }`}
                            >
                              Verify Test Selection
                              <span className="material-symbols-outlined text-[16px]">verified_user</span>
                            </button>
                          ) : (
                            <button
                              onClick={handleNextQuestion}
                              className="px-6 py-3 bg-secondary text-on-secondary font-bold rounded-xl text-xs hover:shadow-lg hover:shadow-secondary/20 scale-102 transform hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2 cursor-pointer"
                            >
                              {activeQuestionIndex + 1 < selectedCourse.quizzes.length ? "Proceed Next Question" : "Certify & Record Score"}
                              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                            </button>
                          )}
                        </div>
                      </div>
                    ) : (
                      // Quiz final score view
                      <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-6">
                        <div className="relative">
                          <div className="w-24 h-24 rounded-full bg-secondary/10 flex items-center justify-center text-secondary border border-secondary/30 relative">
                            <span className="material-symbols-outlined text-5xl animate-bounce" style={{ fontVariationSettings: "'FILL' 1" }}>military_tech</span>
                          </div>
                          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-on-primary ring-2 ring-[#0e0e10]">
                            +10
                          </span>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-2xl font-bold font-sans text-on-surface">Certification Passed!</h4>
                          <p className="text-xs font-mono text-on-surface-variant">
                            Result Score: <span className="text-secondary font-bold font-sans text-[14px]">{quizScore} / {selectedCourse.quizzes.length}</span> correct answers logged.
                          </p>
                          <p className="text-xs text-on-surface-variant/80 max-w-sm">
                            Your credentials have been indexed. Active SDET rank stats updated.
                          </p>
                        </div>

                        <button
                          onClick={handleCloseClassroom}
                          className="px-6 py-3 bg-[#353437]/60 text-on-surface border border-outline-variant/20 hover:border-primary/40 font-bold rounded-xl text-xs transition-all cursor-pointer"
                        >
                          Unlock Next Module &amp; Exit Classroom
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
