import { Course, NotificationItem, Song, KanbanTask, BugReport } from "./types";

export const initialCourses: Course[] = [
  {
    id: "course-1",
    title: "Manual Testing Basics",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAbKcfUZjb1jAVYOMBZQ0tjqgSIoN-FUTD24Gs05qmNpkH5qzd98sdam5bDbsPWawyM9O-WwUfsTzr6UUdlAwt4u3d4aWztLEDx2c-aQGXXp4l4OcFUrXrWrNt5jY_3R1rvNcgYNdRXhWv1obfoJnw_j4L0igZLQ8V5OMh7xiNDCGhBu4Z_Nnt13REALjZP_rm4FO2Qv9wqx7CNsfvz4VjjXOXr3bGZV9qIaZiBvwiecSX3HP6le8X53Uq8L63sBPu6GgV1hxWCYg",
    alt: "Futuristic manual testing basics workspace screen with neon nodes",
    lessonsCount: 5,
    completedLessons: 3,
    difficulty: "Beginner",
    description: "Learn the core methodologies of modern QA exploration, test case definitions, edge-case coverage maps, error classification systems, and system validation standards.",
    lessons: [
      {
        id: "l-1-1",
        title: "Introduction to Test Design",
        duration: "10 mins",
        completed: true,
        content: "Testing is not just searching for bugs; it's a structural exploration of a target system compared to specified behaviors. We explore equivalence partitioning and boundary value evaluation."
      },
      {
        id: "l-1-2",
        title: "Equivalence Partitioning & Boundary Values",
        duration: "15 mins",
        completed: true,
        content: "Equivalence partitioning minimizes redundant tests by grouping inputs into equivalents. Boundary Analysis targets the micro-threshold elements (e.g. n-1, n, n+1)."
      },
      {
        id: "l-1-3",
        title: "Heuristics for Exploratory Testing",
        duration: "12 mins",
        completed: true,
        content: "Professional explorers use tours (e.g. Garbage Collector Tour, Feature Tour) and standard mnemonic heuristics like SFDPOT (Structure, Function, Data, Platform, Operations, Time)."
      },
      {
        id: "l-1-4",
        title: "Creating Actionable Reproduce Steps",
        duration: "18 mins",
        completed: false,
        content: "Learn to write crystal-clear, minimal reproduce pathways. Highlight environment tags, expected vs actual behavior, and attach payload network traces to save engineering iteration cycles."
      },
      {
        id: "l-1-5",
        title: "Final Exploration Case Study",
        duration: "20 mins",
        completed: false,
        content: "Simulate a live validation of an asynchronous messaging hub. Identify race conditions, missing local store caching, and payload overflow limits with zero tools."
      }
    ],
    quizzes: [
      {
        id: "q-1-1",
        question: "Which test design technique divides input data into ranges that can be expected to behave similarly?",
        options: [
          "State Transition Matrix",
          "Equivalence Partitioning",
          "Boundary Value Analysis",
          "Decision Table Logic"
        ],
        correctIndex: 1,
        explanation: "Equivalence Partitioning divides input ranges so that any value inside the partition exerts the same path coverage, eliminating duplicate checks."
      },
      {
        id: "q-1-2",
        question: "What does the mnemonic 'SFDPOT' help SDETs evaluate during exploratory tasks?",
        options: [
          "Syntactic Failure Diagnosis and Port Overlord Testing",
          "State Machine, Framework, Driver, Program, Object, Trace",
          "Structure, Function, Data, Platform, Operations, Time",
          "Selenium Frontend Driver, Parallel Oracle, Threading"
        ],
        correctIndex: 2,
        explanation: "SFDPOT is standard James Bach context-driven exploratory tool shorthand representing Structure, Function, Data, Platform, Operations, and Time."
      }
    ]
  },
  {
    id: "course-2",
    title: "Automation with Python",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCetanoTn1VO2JM4MZwvxi3wZLw4fUABTv23PSTypz-9HWFk8gsTM-4i68AIEd68R3Z0UCXHh6A-wrcIOvtyl18iXhcDFsNQ--L3VSvT1wBUqAWCU088fgLEI981Q7oOSK-cvX31jq0G7Y2m_cvr1rQfb5-BcglUPfQYUVbwZzOFzJBGJx_WqrjhbcQ5JURh_mCONMu5c7kQn1PjMbATUpzvGEbe_ZsPvEImj0mUvu7QRRMFmgOQHYJr6khd3DUj0X8lTiRgKElmw",
    alt: "Python developer terminal with colorful code highlighters",
    lessonsCount: 8,
    completedLessons: 4,
    difficulty: "Intermediate",
    description: "Deep-dive into Pytest assertion fixtures, clean Page Object Models (POM), Playwright web interactions, concurrent performance grids, and API client wrappers.",
    lessons: [
      {
        id: "l-2-1",
        title: "Pytest Framework Fundamentals",
        duration: "18 mins",
        completed: true,
        content: "Discover how Pytest discovers test files automatically. Learn about assertions, dynamic console reporting, and setup/teardown mechanics."
      },
      {
        id: "l-2-2",
        title: "Designing Robust Reusable Fixtures",
        duration: "25 mins",
        completed: true,
        content: "Fixtures provide clean context dependencies. Master scoped items (function, class, module, session), yield cleanup patterns, and parametric injections."
      },
      {
        id: "l-2-3",
        title: "Designing Page Object Patterns",
        duration: "22 mins",
        completed: true,
        content: "Encapsulate GUI layouts in standalone classes. Prevent selector leaks into assertions to ensure long-term framework durability and low maintenance cost."
      },
      {
        id: "l-2-4",
        title: "Handling Flaky Wait Statements",
        duration: "20 mins",
        completed: true,
        content: "Never inject blind sleeps like time.sleep(5). Master modern implicit and explicit waits, polling hooks, and advanced DOM state assertions."
      },
      {
        id: "l-2-5",
        title: "Introduction to Browser Drivers (Playwright)",
        duration: "15 mins",
        completed: false,
        content: "Migrate from standard legacy Selenium drivers to high-speed web sockets using modern Playwright. Track trace-viewer snapshots with zero performance lag."
      },
      {
        id: "l-2-6",
        title: "Parametrization & Complex Test Matrice",
        duration: "25 mins",
        completed: false,
        content: "Learn how `@pytest.mark.parametrize` allows running the identical logical assertions against a matrix of 100+ complex browser configuration objects."
      }
    ],
    quizzes: [
      {
        id: "q-2-1",
        question: "How do you achieve setup and teardown cleanup inside a Pytest fixture?",
        options: [
          "By implementing traditional construct() and destruct() functions",
          "Using the 'yield' statement instead of 'return' to define boundary lines",
          "Calling system decorators like @cleanup and @setup respectively",
          "Adding try/except with a sys.exit() trap on failure"
        ],
        correctIndex: 1,
        explanation: "In Pytest, code before the 'yield' acts as Setup. The 'yield' distributes the client, and code after 'yield' executes teardown regardless of test results."
      },
      {
        id: "q-2-2",
        question: "Why should deep explicit waits be prioritized over hardcoded sleep delays (e.g. time.sleep)?",
        options: [
          "They compile to native byte Assembly, matching multi-threaded processor clocks",
          "Hardcoded sleep slows down overall builds; explicit waits proceed immediately as soon as components fulfill preconditions",
          "Sleep commands block local network ports, potentially breaking firewalls",
          "Pytest automatically throws runtime errors on any file that includes sleep calls"
        ],
        correctIndex: 1,
        explanation: "Explicit waits dynamically poll the page DOM, completing the wait threshold the split-second the criteria is fulfilled, conserving huge compile build time."
      }
    ]
  },
  {
    id: "course-3",
    title: "API Testing & Postman",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDAv6CD7ASigFN-nBELRbYVo4dK4YQkMD0_Qi4qdcEGAaQ3cGFmtp-v5DPDFFx1sQBRSM_s5wq7y8Bby6tLy7yBzeuRN-2l75bd4TiNf4x6DT_ugxddEmVM5Pk7z0iNb4AkDpQoLhtFSIT6K0L0C8W9qPAjD3nlOaO67WU9s7JnXqQwAHZcT4mYwrFdni73tWTdSLXugFyLwgKZ2UMrcGc75cfsnilCDWdGx_Ly0y8dHbC40Z06G3tvfNjbNtwQ19J6C49FR3L10g",
    alt: "Abstract network nodes flowing through translucent pathways",
    lessonsCount: 6,
    completedLessons: 1,
    difficulty: "Advanced",
    description: "Write structural contract checks in Postman, capture JWT auth payloads, simulate race conditions, assert json schemas, and trigger automation from CI CLI (Newman).",
    lessons: [
      {
        id: "l-3-1",
        title: "Anatomy of HTTP Inspections",
        duration: "15 mins",
        completed: true,
        content: "Master verb operations (GET, POST, PUT, DELETE, PATCH). Decode HTTP header parameters, content boundaries, and custom security envelopes."
      },
      {
        id: "l-3-2",
        title: "Scripting Pre-Request & Test Hooks",
        duration: "20 mins",
        completed: false,
        content: "Execute JavaScript before sending requests to compute active cryptographic signatures, load environmental nonces, or fetch cached OAuth tokens."
      },
      {
        id: "l-3-3",
        title: "Dynamic JSON-Schema Contract Validations",
        duration: "25 mins",
        completed: false,
        content: "Ensure payloads never change unexpected field structures. Implement strict Ajv schema draft-07 validations inside global test blocks."
      },
      {
        id: "l-3-4",
        title: "Chaining Requests & Environment State",
        duration: "18 mins",
        completed: false,
        content: "Extract variables like `pm.environment.set('token', pm.response.json().token)` and securely feed them to down-stream micro-route calls."
      }
    ],
    quizzes: [
      {
        id: "q-3-1",
        question: "Which global library is built-in inside Postman to perform fast RFC JSON-Schema contract verification?",
        options: [
          "Lodash utils",
          "Ajv Validator",
          "Supertest Node",
          "Postman Schema SDK"
        ],
        correctIndex: 1,
        explanation: "Postman includes the 'Ajv' (Another JSON Validator) library pre-packaged, letting you run fast schema structural validation lines directly."
      }
    ]
  }
];

export const initialNotifications: NotificationItem[] = [
  {
    id: "notif-1",
    title: "Project Report Reviewed",
    message: 'Mentor Alex: "The edge cases are handled brilliantly..."',
    time: "12:49",
    type: "review",
    read: false
  },
  {
    id: "notif-2",
    title: "New module available",
    message: "Selenium Grid orchestration is now live in Advanced Track.",
    time: "12:49",
    type: "available",
    read: false
  },
  {
    id: "notif-3",
    title: "Bug Tracked: Security",
    message: "Regression detected in auth flows for the Banking Sandbox.",
    time: "10:15",
    type: "warning",
    read: false
  },
  {
    id: "notif-4",
    title: "System Run Completed",
    message: "CI Pipeline passed with 100% test coverage across 14 modules.",
    time: "08:30",
    type: "available",
    read: true
  }
];

export const songsPlaylist: Song[] = [
  {
    id: "s-1",
    title: "Focus: Deep Work",
    artist: "Ambient SDET Vibes",
    cover: "https://lh3.googleusercontent.com/aida-public/AB6AXuB79dWfBGFF7iOnBPO68oJTyzCpIgZ8q-a0lOY3F0XsiKmMFkjWw5exPQxOZQfJepv_ePqtBDk2Fjwe9eTBX3SYrtgmxqAIu9yXbTbHBbns3a4GKH9pOrMxbalawjS594XH6XZMfJaWl-zGSi69-Vp99p5I4yzfPMk81NBpNKYLnyrsTVU2IVnMRenAWX6HRegcQxjSI4goml5GBUpl6G8ZmEMGCVQHHrG3V9vwIrrZncvnXONuKocTTbd12E_e7VofsXwMo_NmIw",
    durationSec: 270, // 4:30
    equalizerColor: "bg-primary"
  },
  {
    id: "s-2",
    title: "Automation Beats",
    artist: "Selenium Chill Mix",
    cover: "https://lh3.googleusercontent.com/aida-public/AB6AXuAbKcfUZjb1jAVYOMBZQ0tjqgSIoN-FUTD24Gs05qmNpkH5qzd98sdam5bDbsPWawyM9O-WwUfsTzr6UUdlAwt4u3d4aWztLEDx2c-aQGXXp4l4OcFUrXrWrNt5jY_3R1rvNcgYNdRXhWv1obfoJnw_j4L0igZLQ8V5OMh7xiNDCGhBu4Z_Nnt13REALjZP_rm4FO2Qv9wqx7CNsfvz4VjjXOXr3bGZV9qIaZiBvwiecSX3HP6le8X53Uq8L63sBPu6GgV1hxWCYg",
    durationSec: 184, // 3:04
    equalizerColor: "bg-secondary"
  },
  {
    id: "s-3",
    title: "Syntax Flow State",
    artist: "Python Lo-Fi Grid",
    cover: "https://lh3.googleusercontent.com/aida-public/AB6AXuCetanoTn1VO2JM4MZwvxi3wZLw4fUABTv23PSTypz-9HWFk8gsTM-4i68AIEd68R3Z0UCXHh6A-wrcIOvtyl18iXhcDFsNQ--L3VSvT1wBUqAWCU088fgLEI981Q7oOSK-cvX31jq0G7Y2m_cvr1rQfb5-BcglUPfQYUVbwZzOFzJBGJx_WqrjhbcQ5JURh_mCONMu5c7kQn1PjMbATUpzvGEbe_ZsPvEImj0mUvu7QRRMFmgOQHYJr6khd3DUj0X8lTiRgKElmw",
    durationSec: 312, // 5:12
    equalizerColor: "bg-tertiary"
  }
];

export const initialTasks: KanbanTask[] = [
  {
    id: "task-1",
    title: "Configure Playwright Paralell Grid on Jenkins",
    module: "Selenium Grid",
    priority: "High",
    status: "progress"
  },
  {
    id: "task-2",
    title: "Refactor flaky wait selectors in Billing module POM",
    module: "Billing",
    priority: "Medium",
    status: "todo"
  },
  {
    id: "task-3",
    title: "JSON Schema validations for checkout endpoint v3",
    module: "Checkout API",
    priority: "High",
    status: "review"
  },
  {
    id: "task-4",
    title: "Verify OAuth token refresh token expiration boundaries",
    module: "Auth Core",
    priority: "High",
    status: "passed"
  },
  {
    id: "task-5",
    title: "Mock payment sandbox requests to trigger 504 Gateway errors",
    module: "Payment",
    priority: "Low",
    status: "todo"
  },
  {
    id: "task-6",
    title: "Stress test notification websocket hub with k6",
    module: "Messaging",
    priority: "High",
    status: "progress"
  }
];

export const initialBugReports: BugReport[] = [
  {
    id: "bug-101",
    title: "Auth flow loops indefinitely on expired session cookies",
    severity: "Critical",
    status: "Open",
    module: "Auth Core",
    description: "When the access token fails validation with a HTTP 401 response and the refresh cookie is expired, the login interrupter middleware triggers a recursive routing loop that freezes the browser rendering context.",
    steps: "1. Force access token token to expire.\n2. Purge or invalidate refresh token cookie.\n3. Navigate to /checkout/review.\n4. Observe CPU usage spike to 100% as redirection cycles loop.",
    reporter: "Senior SDET Michael",
    createdAt: "2026-06-09 09:12"
  },
  {
    id: "bug-102",
    title: "Asynchronous pricing webhooks missing validation signatures",
    severity: "Major",
    status: "In Investigation",
    module: "Billing Node",
    description: "Webhook payloads broadcasted by Stripe sandbox during subscription state transitions fail schema checksum validation because headers do not carry the correct HMAC digest parameter.",
    steps: "1. Trigger recurring trial-lapse events on stripe panel.\n2. Log incoming payload envelope headers.\n3. Verify presence of X-Signature-Hash headers.",
    reporter: "QA Junior Lisa",
    createdAt: "2026-06-08 14:45"
  },
  {
    id: "bug-103",
    title: "Memory leak during concurrent grid testing over virtual sockets",
    severity: "Major",
    status: "Review",
    module: "Selenium Grid",
    description: "Launching more than 16 concurrent Chromium driver contexts via WebSocket tunnels results in memory leak, allocating 2.2GB without clearing cache after session closes.",
    steps: "1. Provision Playwright grid.\n2. Feed concurrent 20 suite assertions.\n3. Monitor host system RAM garbage collection graphs.",
    reporter: "Alex Lead",
    createdAt: "2026-06-08 11:20"
  },
  {
    id: "bug-104",
    title: "Checkbox alignment clipping on ultra-wide screens",
    severity: "Minor",
    status: "Fixed",
    module: "Theme Dashboard",
    description: "The CSS grid class overrides standard grid columns on resolutions past 2560px, clipping checkout action buttons.",
    steps: "1. Open developer tools inside 4k monitor workspace.\n2. Scroll to bottom checkout element.\n3. Check flex alignments.",
    reporter: "System Auditor",
    createdAt: "2026-06-07 10:00"
  }
];
