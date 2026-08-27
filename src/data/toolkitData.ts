import { ToolkitSection, StudentSurveyStat } from '../types';

export const augustanaSurveyData: StudentSurveyStat = {
  totalParticipants: 108,
  femalePct: 57,
  malePct: 42,
  nonBinaryPct: 1,
  yearsInSchool: 'All years of study',
  teamsRepresented: 5,
  keyTakeaways: [
    {
      title: 'Occupational Balance is Challenging',
      desc: 'The biggest challenge across all teams and years. Finding enough time and energy for academics, training, work, and personal life is a daily struggle.'
    },
    {
      title: 'Stress is High',
      desc: 'Many athletes feel overwhelmed trying to meet competing academic deadlines and varsity expectations.'
    },
    {
      title: 'Sleep is Suffering',
      desc: 'Early morning practices, late classes, travel, and academic deadlines directly impact sleep quality and recovery.'
    },
    {
      title: 'Nutrition is a Struggle',
      desc: 'Busy schedules, limited time, and budget constraints make it hard to eat consistently and fuel properly.'
    },
    {
      title: 'Academic Balance Takes Work',
      desc: 'Workload, exams, and travel schedules are key stressors—especially in second year.'
    }
  ],
  teamTrends: [
    { sport: 'Soccer', trend: 'Higher stress & sleep disruption' },
    { sport: 'Hockey', trend: 'Greater lifestyle imbalance & travel fatigue' },
    { sport: 'Basketball', trend: 'Recovery & fatigue concerns' },
    { sport: 'Track / XC', trend: 'Strong self-management but high workload strain' },
    { sport: 'Curling', trend: 'Lower overall strain, high sports precision focus' }
  ]
};

export const toolkitSectionsData: ToolkitSection[] = [
  {
    id: 'time-management',
    title: 'Time Management',
    subtitle: 'Optimize study blocks, prioritize competing demands, and prevent burnout.',
    icon: 'Clock',
    badgeCount: 6,
    color: '#C8102E',
    heroBgClass: 'from-red-950/80 via-neutral-900 to-black',
    whyThisMatters:
      'As a student-athlete, your attention is constantly pulled in different directions—from classes and assignments to practices, competitions, work, and recovery. Sitting down to study can feel overwhelming, especially when you are mentally or physically tired. The tools below help break large tasks into short, focused work sessions and prioritize what actually drives your success.',
    evidenceHighlight:
      'Structured study intervals help prevent cognitive fatigue, maintain focus, and make large academic tasks more manageable.',
    strategies: [
      {
        id: 'tm-strat-1',
        title: 'The Pomodoro Interval Protocol',
        summary: 'Work in 25-minute uninterrupted intervals followed by 5-minute active recovery breaks.',
        keyPoints: [
          'Choose 1 specific task before starting the timer.',
          'Eliminate phone and tab distractions during the 25 minutes.',
          'After 4 Pomodoros (100 min total work), take a longer 15-30 minute break.',
          'Treat each 25-minute sprint like a training set—100% focus during the rep, full recharge on break.'
        ],
        athleteTip: 'Match your breaks to physical recovery: stretch, hydrate, or step into natural sunlight instead of scrolling social media.'
      },
      {
        id: 'tm-strat-2',
        title: 'The Eisenhower Priority Matrix',
        summary: 'Categorize all commitments by Urgency and Importance to stop reacting and start executing.',
        keyPoints: [
          'Do First (Urgent & Important): Today’s assignment, tomorrow’s exam, today’s practice.',
          'Schedule (Not Urgent & Important): Starting a paper early, strength training, meal prep, recovery time.',
          'Delegate / Simplify (Urgent & Not Important): Group chat coordination, non-essential errands.',
          'Eliminate (Not Urgent & Not Important): Endless phone scrolling when you planned to study.'
        ],
        athleteTip: 'Schedule your "Important + Not Urgent" tasks FIRST each week before your calendar gets filled by reactive urgencies.'
      },
      {
        id: 'tm-strat-3',
        title: 'Weekly 168-Hour Time Audit',
        summary: 'Complete a 168-hour audit of your week to understand where your time is actually spent and identify opportunities to create realistic schedules with protected buffer time.',
        keyPoints: [
          'Account for all 168 hours each week, including sleep, classes, studying, athletics, work, commuting, meals, and personal time.',
          'Identify areas where time is being lost or underestimated.',
          'Protect flexible buffer hours each week to absorb unexpected delays, travel, recovery needs, and changing academic demands.'
        ],
        athleteTip: 'Schedule your priorities first, then intentionally leave buffer time. A realistic schedule is more sustainable than one that plans every minute.'
      }
    ],
    worksheets: [
      {
        id: 'ws-pomodoro',
        name: 'Interactive Pomodoro Timer & Focus Log',
        description: 'Built-in student-athlete interval timer with customizable work/break sets, sound chimes, and goal tracking.',
        category: 'Interactive Tool',
        isInteractive: true,
        interactiveToolId: 'pomodoro-timer',
        estimatedMinutes: 25,
        tags: ['Focus', 'Intervals', 'In-App Tool']
      },
      {
        id: 'ws-eisenhower',
        name: 'Eisenhower Priority Matrix Worksheet',
        description: 'Classify your academic, athletic, and personal tasks into 4 actionable quadrants with custom Vikings examples.',
        category: 'Planning Worksheet',
        isInteractive: true,
        interactiveToolId: 'eisenhower-matrix',
        estimatedMinutes: 10,
        pdfUrl: '#download-eisenhower-pdf',
        tags: ['Prioritizing', 'Decision Making', 'Printable PDF']
      },
      {
        id: 'ws-time-audit',
        name: 'Weekly 168-Hour Time Audit',
        description: 'Map your weekly academic, athletic, work, recovery, and personal commitments to see where your time is going and whether your current schedule is realistic.',
        category: 'Audit Worksheet',
        isInteractive: true,
        interactiveToolId: 'time-audit-tool',
        estimatedMinutes: 15,
        tags: ['Scheduling', 'Time Audit', 'Interactive Tool']
      }
    ],
    appsAndResources: [
      {
        id: 'app-pomofocus',
        name: 'Pomofocus',
        type: 'website',
        description: 'Free, customizable web Pomodoro timer with task tracking and subtle sound alerts.',
        url: 'https://pomofocus.io',
        isFree: true,
        platform: 'Web & Mobile Browser',
        badge: 'Recommended Timer'
      },
      {
        id: 'app-tomato-timer',
        name: 'Tomato Timer',
        type: 'website',
        description: 'Minimalist audio-assisted Pomodoro timer designed for quick browser tabs.',
        url: 'https://tomato-timer.com',
        isFree: true,
        platform: 'Web Browser'
      }
    ],
    supportResources: [
      {
        name: 'Augustana Student Academic Services',
        role: 'Academic Advising and Student Support',
        description: 'Get support with course planning, degree requirements, academic concerns, registration questions, career exploration, and connecting to additional campus services.',
        email: 'augsas@ualberta.ca',
        phone: '780-679-1132',
        location: 'Forum L1-080',
        link: 'https://www.ualberta.ca/en/augustana/student-life/academic/index.html',
        buttonText: 'Visit Student Academic Services',
        isAugustanaSpecific: true
      },
      {
        name: 'Vikings Student-Athlete Academic Mentors',
        role: 'Peer Study & Time Management Coaching',
        description: 'Upper-year student-athletes who understand the exact demands of varsity schedules.',
        location: 'Augustana Student Center',
        isAugustanaSpecific: true
      }
    ]
  },
  {
    id: 'academic-balance',
    title: 'Academic Balance',
    subtitle: 'Plan your semester, manage travel games, and balance coursework with varsity competition.',
    icon: 'GraduationCap',
    badgeCount: 6,
    color: '#C8102E',
    heroBgClass: 'from-red-950/80 via-zinc-900 to-black',
    whyThisMatters:
      'Balancing coursework with practices, competitions, work, and recovery requires intentional planning rather than relying on memory. Mapping deadlines, travel dates, and exam schedules early allows you to anticipate peak stress weeks, notify professors ahead of game travel, and maintain steady academic momentum.',
    evidenceHighlight:
      'Mapping out competition travel and exam dates early helps reduce exam-week stress and prevents missed assignment deadlines.',
    strategies: [
      {
        id: 'ab-strat-1',
        title: 'Semester Game Plan Worksheet',
        summary: 'Plan your entire four-month semester before classes become busy to anticipate peak stress weeks and varsity travel conflicts early.',
        keyPoints: [
          'Plan the entire semester before it becomes busy by mapping courses, assignments, midterms, and final exams.',
          'Enter important assignment, exam, and varsity travel dates into one unified schedule.',
          'Identify workload conflict weeks early where away games overlap with major deadlines.',
          'Provide official Vikings Athletics travel letters to professors in advance during week 1 or 2.',
          'Work backward from major deadlines to establish realistic start dates instead of cramming.'
        ],
        athleteTip: 'Providing your travel schedule to professors in the first two weeks builds professional trust and ensures proactive academic accommodations.'
      },
      {
        id: 'ab-strat-2',
        title: 'Assignment Micro-Breakdown Worksheet',
        summary: 'Deconstruct complex term papers and major projects into manageable, bite-sized micro-tasks spread across multiple days.',
        keyPoints: [
          'Break overwhelming assignments into small, manageable steps (e.g., topic selection, research, drafting, editing).',
          'Create realistic action items that fit into 30-to-45-minute study windows between practices and classes.',
          'Schedule work across multiple days to build steady progress without fatigue.',
          'Avoid last-minute cramming and night-before stress by setting intermediate completion dates.'
        ],
        athleteTip: 'Micro-tasks fit into short breaks between classes, lifting sessions, or team video meetings.'
      },
      {
        id: 'ab-strat-3',
        title: 'Weekly Energy Allocation Worksheet',
        summary: 'Distribute your 10 weekly energy tokens across core occupations to reflect true student-athlete capacity and balance.',
        keyPoints: [
          'Understand that energy is a limited resource, not an unlimited one.',
          'Start each week with a fixed allocation of 10 energy tokens representing available time, attention, and mental energy.',
          'Recognize that allocating more energy to one life area (e.g., sport or academics) means allocating less somewhere else.',
          'Intentionally distribute energy across Academics, Varsity Sport, Sleep & Recovery, Nutrition, Mental Health, Social & Team, Family/Work, and Personal Growth.',
          'Reflect on whether your current energy allocation matches your personal priorities and make small weekly adjustments.'
        ],
        athleteTip: 'Occupational balance is about awareness, not perfection. You cannot give 100% to everything at once—protect what matters most each week.'
      },
      {
        id: 'ab-strat-4',
        title: 'Weekly Game Plan Worksheet',
        summary: 'Turn semester goals into an actionable 7-day plan featuring top priorities, time blocking, and protected recovery.',
        keyPoints: [
          'Turn semester goals and syllabus deadlines into a clear, realistic weekly game plan.',
          'Identify your week\'s top 3 academic, athletic, and personal priorities before scheduling minor tasks.',
          'Time block study sessions, classes, team practices, workouts, and travel hours directly on your grid.',
          'Protect sleep and recovery windows as non-negotiable appointments in your weekly schedule.',
          'Adjust your weekly plan flexibly when unexpected travel delays or academic demands arise.'
        ],
        athleteTip: 'A weekly game plan is a living tool. When unexpected team schedule changes occur, re-block remaining open windows without stress.'
      }
    ],
    worksheets: [
      {
        id: 'ws-semester-plan',
        name: 'Semester Game Plan Worksheet',
        description: 'Master 4-month semester planning tool. Map your entire four-month semester before classes become busy, enter course assignments, midterms, finals, ACAC travel, and identify workload conflict weeks.',
        category: 'Interactive & Printable',
        isInteractive: true,
        interactiveToolId: 'semester-game-plan',
        estimatedMinutes: 15,
        pdfUrl: '#download-semester-plan-pdf',
        tags: ['4-Month Overview', 'Workload Conflicts', 'Travel Planning']
      },
      {
        id: 'ws-assignment-breakdown',
        name: 'Assignment Micro-Breakdown Worksheet',
        description: 'Deconstruct major papers and term projects into bite-sized 30-minute action items across multiple days to prevent last-minute cramming.',
        category: 'Interactive & Printable',
        isInteractive: true,
        interactiveToolId: 'assignment-micro-breakdown',
        estimatedMinutes: 10,
        pdfUrl: '#download-assignment-breakdown-pdf',
        tags: ['Micro-Tasks', 'Project Planning', 'Anti-Cramming']
      },
      {
        id: 'ws-balance-wheel',
        name: 'Weekly Energy Allocation Worksheet',
        description: 'Interactive 10-token weekly energy allocation tool. Distribute finite time, attention, and mental energy across 8 student-athlete occupations.',
        category: 'Self-Assessment',
        isInteractive: true,
        interactiveToolId: 'weekly-energy-allocation',
        estimatedMinutes: 5,
        tags: ['10 Energy Tokens', 'Finite Resources', 'Occupational Balance']
      },
      {
        id: 'ws-weekly-game-plan',
        name: 'Weekly Game Plan Worksheet',
        description: 'Turn semester goals into a realistic 7-day plan. Features top 3 priorities, time blocking around practices and classes, and protected recovery.',
        category: 'Interactive & Printable',
        isInteractive: true,
        interactiveToolId: 'weekly-game-plan',
        estimatedMinutes: 10,
        pdfUrl: '#download-weekly-game-plan-pdf',
        tags: ['Official Vikings Template', 'Weekly Planner', 'Time Blocking']
      }
    ],
    appsAndResources: [
      {
        id: 'res-writing-centre',
        name: 'Augustana Writing Centre',
        type: 'u-of-a-resource',
        description: 'The Augustana Writing Centre provides writing consultations and workshops for Augustana students.',
        url: 'https://www.ualberta.ca/en/augustana/student-life/writing-centre/index.html',
        badge: 'Writing Support'
      }
    ],
    supportResources: [
      {
        name: 'Augustana Student Academic Services',
        role: 'Course Planning, Registration, and Academic Advising',
        description: 'Get support with course selection, degree requirements, academic concerns, registration, exam deferrals, career exploration, and connecting with other campus services.',
        location: 'Forum L1-080',
        email: 'augsas@ualberta.ca',
        phone: '780-679-1132',
        link: 'https://www.ualberta.ca/en/augustana/student-life/academic/index.html',
        buttonText: 'Visit Student Academic Services',
        isAugustanaSpecific: true
      },
      {
        name: 'Augustana Proctoring, Accessibility + Student Success',
        role: 'Academic Accommodations and Learning Support',
        description: 'Support for students with temporary or permanent medical conditions, disabilities, injuries, and barriers affecting university participation. Services include academic accommodations, exam supports, learning-strategy guidance, and student-success coaching.',
        location: 'Forum L1-085',
        phone: '780-679-1132',
        link: 'https://www.ualberta.ca/en/augustana/student-life/proctoring-accessibility-student-success/index.html',
        buttonText: 'Visit Accessibility + Student Success',
        isAugustanaSpecific: true
      }
    ]
  },
  {
    id: 'stress-management',
    title: 'Stress Management',
    subtitle: 'Evidence-informed coping strategies, CBT tools, and mental health resources.',
    icon: 'HeartPulse',
    badgeCount: 7,
    color: '#C8102E',
    heroBgClass: 'from-red-950/80 via-neutral-900 to-black',
    whyThisMatters:
      'Balancing academics, athletics, work, and personal life can be stressful. Stress is a normal part of the student-athlete experience, but having the right tools can make it easier to manage. The resources below are free, evidence-informed, and designed to help you build coping skills, manage stress in the moment, and support your long-term mental well-being.',
    evidenceHighlight:
      'Controlled box breathing helps calm the autonomic nervous system, lowering acute stress before high-stakes athletic or academic events.',
    strategies: [
      {
        id: 'sm-strat-1',
        title: 'Cognitive Reframing (CBT 3-Step)',
        summary: 'Catch, challenge, and replace unhelpful high-stress thought patterns before competition or exams.',
        keyPoints: [
          '1. Catch: Identify catastrophic thoughts ("If I miss this shot or fail this quiz, my semester is ruined").',
          '2. Challenge: Ask for objective evidence ("Is this 100% true? What is a more realistic outcome?").',
          '3. Reframe: Replace with performance-oriented, controllable thoughts ("I am well-prepared, and I can execute one play/question at a time").'
        ],
        athleteTip: 'Separate your self-worth from performance outcomes. You are an athlete, but you are also a complete person.'
      },
      {
        id: 'sm-strat-2',
        title: 'The 4-4-4-4 Box Breathing Reset',
        summary: 'A fast, neuro-mechanically proven breathing technique used by elite athletes and military personnel.',
        keyPoints: [
          'Inhale deeply through nose: 4 seconds',
          'Hold breath at top: 4 seconds',
          'Exhale fully through mouth: 4 seconds',
          'Hold empty at bottom: 4 seconds',
          'Repeat 4 cycles before games, presentations, or going to sleep.'
        ],
        athleteTip: 'Use Box Breathing on the team bus, locker room bench, or right before taking a test.'
      },
      {
        id: 'sm-strat-3',
        title: 'Student-Athlete Stress & Coping Reflection',
        summary: 'Use structured reflection to recognize stress before it becomes overwhelming. Identifying situations, thoughts, emotions, and coping responses can improve self-awareness and help student-athletes respond more intentionally during demanding academic and athletic periods.',
        keyPoints: [
          'Complete a brief reflection after stressful practices, competitions, exams, travel days, or other challenging experiences.',
          'Identify the situation, automatic thoughts, emotional intensity, stressors, and coping strategies used.',
          'Notice recurring patterns and identify small, realistic adjustments for next time.',
          'Finish each reflection with one specific action that supports recovery, well-being, or future performance.'
        ],
        athleteTip: 'Reflection is not about judging yourself—it is about noticing patterns. Even a five-minute check-in after a difficult day can make future stressful situations feel more manageable.'
      },
      {
        id: 'sm-strat-4',
        title: 'Pre-Performance Reset Routine',
        summary: 'Use a short, repeatable routine before a game, race, exam, presentation, tryout, or other high-pressure situation. A consistent reset routine can help reduce mental clutter, direct attention toward controllable actions, and support readiness under pressure.',
        keyPoints: [
          'Begin with one brief breathing or grounding technique.',
          'Choose a short cue phrase or confidence statement.',
          'Visualize the first successful action you want to complete.',
          'Identify one controllable behaviour to focus on when the event begins.',
          'Keep the routine short enough to use consistently in real situations.'
        ],
        athleteTip: 'The goal is not to eliminate nerves. The goal is to create a familiar routine that helps you direct your attention toward what you can control.'
      }
    ],
    worksheets: [
      {
        id: 'ws-cbt-reframe',
        name: 'Practice Cognitive Reframing (CBT 3-Step) Worksheet',
        description: 'Interactive CBT exercise to catch, challenge, and reframe high-pressure thoughts into controllable action steps.',
        category: 'Interactive Tool',
        isInteractive: true,
        interactiveToolId: 'cbt-reframe',
        estimatedMinutes: 5,
        pdfUrl: '#download-cbt-reframe-pdf',
        tags: ['CBT Reframe', 'Thought Reframing', 'Printable PDF']
      },
      {
        id: 'ws-box-breathing',
        name: 'Interactive Box Breathing & Guided Reset',
        description: 'Visual animated rhythm coach for 4-4-4-4 box breathing with customizable pace and soothing background ambiance.',
        category: 'Interactive Tool',
        isInteractive: true,
        interactiveToolId: 'box-breathing',
        estimatedMinutes: 3,
        tags: ['In-App Reset', 'Box Breathing', 'Instant Calming']
      },
      {
        id: 'ws-stress-log',
        name: 'Student-Athlete Stress & Coping Reflection Log',
        description: 'Evidence-based cognitive worksheet to track stressors, identify triggers, and write actionable coping plans.',
        category: 'Interactive Tool',
        isInteractive: true,
        interactiveToolId: 'stress-reflection',
        estimatedMinutes: 10,
        pdfUrl: '#download-stress-log-pdf',
        tags: ['CBT Journal', 'Self-Check', 'Printable PDF']
      },
      {
        id: 'ws-pre-performance-reset',
        name: 'Pre-Performance Reset Builder',
        description: 'Build a personalized 2–5 minute routine for games, exams, presentations, tryouts, and other high-pressure situations.',
        category: 'Interactive Tool',
        isInteractive: true,
        interactiveToolId: 'pre-performance-reset',
        estimatedMinutes: 5,
        pdfUrl: '#download-pre-performance-reset-pdf',
        tags: ['Performance Reset', 'Routine Builder', 'Printable PDF']
      }
    ],
    appsAndResources: [
      {
        id: 'app-mindshift',
        name: 'MindShift CBT App',
        type: 'app',
        description: 'Free app using evidence-based CBT techniques, thought journals, chill zone relaxation, and coping cards designed for youth & adults.',
        url: 'https://mindshiftcbt.com/',
        isFree: true,
        platform: 'iOS & Android',
        badge: 'Top Mental Health App'
      },
      {
        id: 'res-cci-workbooks',
        name: 'Centre for Clinical Interventions (CCI) Self-Help Workbooks',
        type: 'website',
        description: 'Free downloadable modules for managing worry, perfectionism, procrastination, and sleep difficulties.',
        url: 'https://www.cci.health.wa.gov.au/Resources/Looking-After-Yourself',
        isFree: true,
        badge: 'Clinical Evidence'
      },
      {
        id: 'res-cimhs',
        name: 'Centre for Interactive Mental Health Solutions (CIMHS)',
        type: 'website',
        description: 'Free structured online CBT program "Bliss" for depression, stress, and anxiety management.',
        url: 'https://www.cimhs.com/',
        isFree: true
      },
      {
        id: 'app-healthy-minds',
        name: 'Healthy Minds Program App',
        type: 'app',
        description: 'Free neuroscience-based mindfulness and meditation podcast-style training app from the Center for Healthy Minds.',
        url: 'https://www.humin.org/wellbeing-tools/app',
        isFree: true,
        platform: 'iOS & Android'
      },
      {
        id: 'res-cmha',
        name: 'Canadian Mental Health Association (CMHA)',
        type: 'website',
        description: 'Mental health education, bounceback programs, and community wellness resources.',
        url: 'https://cmha.ca/',
        isFree: true
      }
    ],
    supportResources: [
      {
        name: 'Augustana Counselling Services',
        role: 'Free Confidential Student Counselling',
        description: 'Free, confidential mental health counselling for all registered Augustana students.',
        contact: 'augcounselling@ualberta.ca',
        location: 'Founders Hall 2nd Floor',
        link: 'https://22474.waitwell.ca/book/3403',
        isAugustanaSpecific: true
      },
      {
        name: '211 Alberta Mental Health Helpline',
        role: '24/7 Community & Crisis Support',
        description: 'Free, confidential helpline for community, social, and health resources in Alberta.',
        contact: 'Call or Text 211',
        link: 'https://ab.211.ca/'
      }
    ]
  },
  {
    id: 'sleep-recovery',
    title: 'Sleep & Recovery',
    subtitle: 'Optimize sleep hygiene, athletic recovery, and cognitive performance.',
    icon: 'Moon',
    badgeCount: 6,
    color: '#C8102E',
    heroBgClass: 'from-red-950/80 via-zinc-900 to-black',
    whyThisMatters:
      'Sleep is the foundation of high-performance recovery and should be prioritized above all other recovery methods. Getting enough high-quality sleep improves physical performance, reaction time, accuracy, endurance, decision-making, mood, and skill acquisition. Inadequate sleep increases fatigue, injury risk, illness, and burnout.',
    evidenceHighlight:
      'Consistent quality sleep supports physical recovery, reaction time, decision-making, and long-term athletic performance.',
    strategies: [
      {
        id: 'sr-strat-1',
        title: 'Build Your Sleep Window',
        summary: 'Establish a consistent sleep window tailored to your training, class schedule, and recovery needs.',
        keyPoints: [
          'Determine your required wake-up time based on morning practice or class commitments.',
          'Count backward 8–9 hours to identify your target lights-out bedtime.',
          'Maintain consistent sleep and wake times to stabilize your circadian rhythm.',
          'Ensure your sleep space is dark, quiet, and cool (18°C / 65°F).'
        ],
        athleteTip: 'Keep your bedroom cool, dark, and quiet to maximize deep slow-wave sleep and natural growth hormone release.'
      },
      {
        id: 'sr-strat-2',
        title: 'Build a Wind-Down Routine',
        summary: 'Create a 30-minute transition routine to signal your brain and body to prepare for restorative sleep.',
        keyPoints: [
          'Power down laptops, academic assignments, and heavy study materials 30 minutes before bed.',
          'Dim room lights and enable warm screen display modes.',
          'Prep your backpack and gear for the next morning to reduce morning rush anxiety.',
          'Practice 3–5 minutes of slow diaphragmatic breathing or light muscle stretching.'
        ],
        athleteTip: 'A structured wind-down routine helps lower heart rate and cortisol levels after intense evening study or training.'
      },
      {
        id: 'sr-strat-3',
        title: 'Travel Sleep & Recovery Planning',
        summary: 'Practical, flexible strategies to protect sleep quality and recovery when away games disrupt your normal environment.',
        keyPoints: [
          'Pack a travel sleep kit with an eye mask, earplugs or noise-canceling headphones, and a familiar pillow.',
          'Identify realistic opportunities for quiet rest during bus travel, hotel downtimes, or between events.',
          'Hydrate consistently and manage post-game nutrition to support natural evening wind-down.',
          'Focus on controlling your immediate sleep environment rather than stressing over schedule changes.'
        ],
        athleteTip: 'Control what you can during team travel—use eye masks and noise isolation to turn bus seats or hotel rooms into rest zones.'
      },
      {
        id: 'sr-strat-4',
        title: 'Recovery Check-In',
        summary: 'Track key physical and mental recovery indicators to make proactive adjustments to training and sleep habits.',
        keyPoints: [
          'Monitor daily sleep duration, sleep quality ratings, fatigue, and muscle soreness.',
          'Recognize early warning signs of accumulated fatigue before overtraining or burnout occurs.',
          'Adjust evening wind-down habits on heavy training or high-stress academic days.',
          'Share persistent fatigue concerns with your athletic training staff or coach.'
        ],
        athleteTip: 'Daily check-ins help you spot recovery trends early so you can prioritize extra sleep before fatigue turns into injury.'
      }
    ],
    worksheets: [
      {
        id: 'ws-sleep-planner',
        name: 'Student-Athlete Bedtime & Wake-Time Planner',
        description: 'Calculate your target lights-out bedtime based on morning practice or class schedules and plan your sleep window.',
        category: 'Interactive Tool',
        isInteractive: true,
        interactiveToolId: 'sleep-planner',
        estimatedMinutes: 5,
        pdfUrl: '#download-sleep-planner-pdf',
        tags: ['Sleep Window', 'Bedtime Planner', 'Printable PDF']
      },
      {
        id: 'ws-wind-down-builder',
        name: '30-Minute Wind-Down Builder',
        description: 'Build a personalized 30-minute pre-sleep wind-down protocol to transition mind and body into rest mode.',
        category: 'Interactive Tool',
        isInteractive: true,
        interactiveToolId: 'wind-down-builder',
        estimatedMinutes: 5,
        pdfUrl: '#download-wind-down-builder-pdf',
        tags: ['Wind-Down Routine', 'Pre-Bed Checklist', 'Printable PDF']
      },
      {
        id: 'ws-away-game-planner',
        name: 'Away-Game Sleep & Recovery Planner',
        description: 'Plan practical rest windows, travel sleep kits, and hotel stay recovery strategies for road trips and away games.',
        category: 'Interactive Tool',
        isInteractive: true,
        interactiveToolId: 'away-game-planner',
        estimatedMinutes: 5,
        pdfUrl: '#download-away-game-planner-pdf',
        tags: ['Away Game Sleep', 'Travel Recovery', 'Printable PDF']
      },
      {
        id: 'ws-sleep-recovery-checkin',
        name: 'Student-Athlete Sleep & Recovery Check-In',
        description: 'Self-assess sleep quality, physical fatigue, and muscle soreness to receive tailored recovery readiness guidance.',
        category: 'Interactive Tool',
        isInteractive: true,
        interactiveToolId: 'sleep-recovery-checkin',
        estimatedMinutes: 5,
        pdfUrl: '#download-sleep-recovery-checkin-pdf',
        tags: ['Recovery Check-In', 'Sleep Readiness', 'Printable PDF']
      }
    ],
    appsAndResources: [
      {
        id: 'app-sleep-cycle',
        name: 'Sleep Cycle',
        type: 'app',
        description: 'Data-driven sleep tracking app using sound analysis to wake you during light sleep stages so you feel refreshed.',
        url: 'https://www.sleepcycle.com/',
        isFree: true,
        platform: 'iOS & Android',
        badge: 'Smart Alarm'
      },
      {
        id: 'app-bettersleep',
        name: 'BetterSleep',
        type: 'app',
        description: 'Sleep and wellness platform offering guided meditations, white noise, bedtime stories, and breathing exercises.',
        url: 'https://www.bettersleep.com/',
        isFree: true,
        platform: 'iOS & Android'
      }
    ],
    supportResources: [
      {
        name: 'Augustana Health + Wellness Supports',
        role: 'Personal Support & Wellness Resources',
        description:
          'Having trouble with sleep can sometimes be connected to stress, workload, changes in routine, or other challenges. Augustana students can connect with campus health and wellness supports, including personal counselling and other wellness resources.',
        link: 'https://www.ualberta.ca/en/current-students/wellness-supports/index.html',
        buttonText: 'EXPLORE HEALTH + WELLNESS SUPPORTS',
        isAugustanaSpecific: true,
      },
    ]
  },
  {
    id: 'nutrition',
    title: 'Nutrition',
    subtitle: 'Fueling for performance, budget meal prep, road trip guides, and sports nutrition.',
    icon: 'Apple',
    badgeCount: 8,
    color: '#C8102E',
    heroBgClass: 'from-red-950/80 via-neutral-900 to-black',
    whyThisMatters:
      'Viewing nutritious eating as an essential component of athletic performance and self-care helps sustain your energy, focus, and physical recovery. Varsity athletes face unique demands: high energy expenditure, tight budget constraints, busy travel, and microwave-only dorm access. Practical tools make fueling consistent and straightforward.',
    evidenceHighlight:
      'Timely carbohydrate and protein intake after training supports glycogen replenishment and muscle recovery for upcoming sessions.',
    strategies: [
      {
        id: 'nu-strat-1',
        title: 'Flexible Fueling Plate',
        summary: 'Use a simple plate framework as a starting point for building meals around your day. Meals do not need to look identical every time — the amount and types of food you choose may change depending on appetite, schedule, food access, training demands, preferences, and what is realistically available.',
        keyPoints: [
          'Start with a carbohydrate source for energy, such as rice, pasta, potatoes, oats, bread, or tortillas.',
          'Add a protein source, such as eggs, beans, lentils, yogurt, chicken, fish, tofu, or another preferred option.',
          'Include fruit and/or vegetables when available.',
          'Add fats, sauces, toppings, or other foods that make the meal satisfying and practical.',
          'On demanding training or competition days, athletes may find they need more food and more carbohydrate-rich foods than on lighter days.'
        ],
        athleteTip: 'A useful meal does not have to look perfect. A microwave rice bowl, sandwich, oatmeal, restaurant meal, or convenience-store combination can still support fueling when it fits your real situation.'
      },
      {
        id: 'nu-strat-2',
        title: 'Fueling When You’re Away From Home',
        summary: 'Use simple planning strategies when travel, hotels, restaurants, or limited food access make regular eating harder.',
        keyPoints: [
          'Check ahead for grocery stores, restaurants, hotel fridges, microwaves, or other food options when possible.',
          'Pack familiar snacks or simple foods that travel well.',
          'At convenience stores or restaurants, focus on combining available foods rather than finding a “perfect” meal.',
          'Keep water accessible throughout travel.',
          'Bring foods you know work well for you before competitions rather than experimenting with unfamiliar options.'
        ],
        athleteTip: 'Travel days will not always look like your usual routine. The goal is not perfect nutrition — it is finding realistic ways to stay fed, hydrated, and prepared with the options available.'
      }
    ],
    worksheets: [
      {
        id: 'ws-build-my-fuel',
        name: 'BUILD MY FUEL',
        description: 'Find realistic meal and snack ideas based on your schedule, cooking access, dietary needs, budget, and what your day looks like.',
        category: 'Interactive Tool',
        isInteractive: true,
        interactiveToolId: 'build-my-fuel',
        estimatedMinutes: 5,
        tags: ['Meal Ideas', 'Real-Life Cooking', 'In-App Tool']
      },
      {
        id: 'ws-pack-my-game-bag',
        name: 'PACK MY GAME BAG',
        description: 'Build a quick food and hydration checklist for practices, games, and travel days.',
        category: 'Interactive Tool',
        isInteractive: true,
        interactiveToolId: 'pack-my-game-bag',
        estimatedMinutes: 5,
        tags: ['Packing Checklist', 'Game Day Fuel', 'In-App Tool']
      },
      {
        id: 'ws-healthy-eating-toolkit',
        name: 'Healthy Eating Toolkit',
        description: 'Explore practical healthy-eating resources, meal ideas, and wellness information for University of Alberta students.',
        category: 'Healthy Eating Resource',
        externalUrl: 'https://www.ualberta.ca/en/current-students/wellness-supports/programs/unwind-your-mind/healthy-eating.html',
        externalButtonText: 'OPEN RESOURCE',
        estimatedMinutes: 5,
        tags: ['U of A Guide', 'Healthy Eating', 'Web Resource']
      },
      {
        id: 'ws-budget-nutrition',
        name: 'Budget-Friendly & Microwave Meal Ideas',
        description: 'Find low-cost grocery strategies and simple balanced meals for students with limited time, money, or kitchen access.',
        category: 'Student Nutrition Resources',
        links: [
          {
            label: 'BUDGET-FRIENDLY EATING',
            url: 'https://www.urmc.rochester.edu/news/story/nutrition-on-a-budget-cheap-and-easy-ways-for-students-to-eat-well',
            isPrimary: true
          },
          {
            label: 'MICROWAVE MEAL IDEAS',
            url: 'https://iprsoftwaremedia.com/366/files/20253/Easy_Balanced_Microwaveable_Meals.pdf'
          }
        ],
        estimatedMinutes: 5,
        tags: ['Budget Prep', 'Dorm Meals', 'Resource Links']
      },
      {
        id: 'ws-travel-nutrition',
        name: 'Tournament & Travel Fueling Guide',
        description: 'Practical Alberta Health Services guidance for planning meals, snacks, fluids, and food access during tournaments and travel.',
        category: 'Travel Nutrition Guide',
        externalUrl: 'https://www.albertahealthservices.ca/assets/info/nutrition/if-nfs-tournaments-and-travel.pdf',
        externalButtonText: 'OPEN GUIDE',
        estimatedMinutes: 8,
        tags: ['AHS Guide', 'Travel Nutrition', 'AHS PDF']
      }
    ],
    appsAndResources: [
      {
        id: 'app-whisk',
        name: 'Whisk App (Samsung Food)',
        type: 'app',
        description: 'Free online platform to save recipes, generate automated meal plans, and build smart grocery lists.',
        url: 'https://whisk.com/',
        isFree: true,
        platform: 'iOS, Android & Web',
        badge: 'Meal Planner App'
      },
      {
        id: 'res-aspda',
        name: 'American Sports & Performance Dietitians Association (ASPDA)',
        type: 'website',
        description: 'Free evidence-based sports nutrition handouts covering athlete fueling, hydration, supplements, and recovery.',
        url: 'https://www.sportsrd.org/',
        isFree: true,
        badge: 'Sports RD Evidence'
      }
    ],
    supportResources: [
      {
        name: 'Augustana Food Security Resources',
        role: 'Food Access & Grocery Support',
        description: 'Explore food-security supports available to Augustana students, including information about food hampers, grocery support, and other food-access initiatives.',
        link: 'https://asa.su.ualberta.ca/food-security-initiatives-augustana-camrose',
        buttonText: 'VIEW FOOD SUPPORTS',
        isAugustanaSpecific: true
      },
      {
        name: 'University of Alberta Wellness Supports',
        role: 'Student Wellness',
        description: 'Explore University of Alberta wellness information, programs, and student support resources.',
        link: 'https://www.ualberta.ca/en/current-students/wellness-supports/index.html',
        buttonText: 'VIEW WELLNESS SUPPORTS'
      },
      {
        name: 'Augustana Campus Food Bank & Student Union Pantry',
        role: 'Emergency Food Support',
        description: 'Confidential food support providing non-perishable staples, fresh produce, and hygiene items for students in need.',
        location: 'Augustana Student Union (ASA) Office',
        isAugustanaSpecific: true
      }
    ]
  }
];
