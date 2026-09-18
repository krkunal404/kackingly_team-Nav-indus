// ═══════════════════════════════════════════════════════════
// FMovies Knowledge Pack — AI-discovered from autonomous scan
// App: FMovies | Package: com.example.fmovies | v1.0.0
// Screens: 6 | Elements: 38 | Journeys: 8 | Actions: 22
// ═══════════════════════════════════════════════════════════

export const DEMOSHOP_APP = {
  name: "FMovies",
  version: "v1.0.0",
  package: "com.example.fmovies",
  screensCount: 6,
  elementsCount: 38,
  journeysCount: 8,
  actionsCount: 22,
  apkName: "FMovies.apk",
  status: "Scan Complete"
};

export const DEMOSHOP_SCREENS = [
  {
    screen_id: "screen_01",
    badge: 1,
    name: "Home",
    category: "Main Hub",
    icon: "home",
    iconColor: "#3D5A99",
    borderColor: "rgba(61, 90, 153, 0.4)",
    elementsCount: 7,
    purpose: "Central landing screen. Greets the user, shows active rental count, provides quick-action tiles (Explore, Rentals), and displays a horizontally scrollable Featured Movies carousel.",
    phoneState: {
      title: "FMovies Home",
      subtitle: "Hello, Movie Buff!",
      customContent: "home"
    },
    elements: [
      { id: "el_h1", type: "text",   label: "App title bar (FMovies Home)",              icon: "T" },
      { id: "el_h2", type: "text",   label: "Greeting (Hello, Movie Buff!)",              icon: "T" },
      { id: "el_h3", type: "text",   label: "Subtitle (You have 0 active rentals)",       icon: "T" },
      { id: "el_h4", type: "button", label: "Profile avatar button",  interactive: true, icon: "▣" },
      { id: "el_h5", type: "card",   label: "Explore quick-action tile",interactive: true, icon: "▣" },
      { id: "el_h6", type: "card",   label: "Rentals quick-action tile",interactive: true, icon: "▣" },
      { id: "el_h7", type: "list",   label: "Featured Movies carousel",interactive: true, icon: "▣" }
    ],
    actions: [
      { type: "tap", intent: "Navigate to Explore", target: "screen_02", label: 'tap "Explore" tile' },
      { type: "tap", intent: "Navigate to Rentals", target: "screen_03", label: 'tap "Rentals" tile' },
      { type: "tap", intent: "Navigate to Profile", target: "screen_04", label: 'tap avatar' }
    ],
    navigation: { prev: null, next: "Movie Explorer" },
    design: {
      theme: "light",
      primary_color: "#3D5A99",
      background_color: "#F2F4FA",
      font_family: "Inter",
      corner_style: "rounded"
    }
  },
  {
    screen_id: "screen_02",
    badge: 2,
    name: "Movie Explorer",
    category: "Browse",
    icon: "search",
    iconColor: "#5C7EC7",
    borderColor: "rgba(92, 126, 199, 0.4)",
    elementsCount: 8,
    purpose: "Full-screen movie browsing experience. Users can search by title, filter by genre (All, Action, Adventure, Animation…), and browse movie cards with poster, rating, daily price, and a Rent CTA.",
    phoneState: {
      title: "Movie Explorer",
      customContent: "explorer"
    },
    elements: [
      { id: "el_e1", type: "text",    label: "Screen title (Movie Explorer)",     icon: "T" },
      { id: "el_e2", type: "input",   label: "Search movies… input",  interactive: true, icon: "▣" },
      { id: "el_e3", type: "chip",    label: "Genre filter: All (active)",interactive: true, icon: "▣" },
      { id: "el_e4", type: "chip",    label: "Genre filter: Action",  interactive: true, icon: "▣" },
      { id: "el_e5", type: "chip",    label: "Genre filter: Adventure",interactive: true,icon: "▣" },
      { id: "el_e6", type: "card",    label: "Movie card — Shawshank Redemption", interactive: true, icon: "▣" },
      { id: "el_e7", type: "card",    label: "Movie card — The Godfather",        interactive: true, icon: "▣" },
      { id: "el_e8", type: "button",  label: "Rent button (per card)", interactive: true, icon: "▣" }
    ],
    actions: [
      { type: "tap",  intent: "Open movie detail", target: "screen_06", label: 'tap movie card' },
      { type: "tap",  intent: "Rent a movie",       target: "screen_03", label: 'tap "Rent" button' },
      { type: "input",intent: "Search movies",      target: "screen_02", label: 'type in search bar' }
    ],
    navigation: { prev: "Home", next: "Movie Detail" },
    design: {
      theme: "light",
      primary_color: "#3D5A99",
      background_color: "#F2F4FA",
      font_family: "Inter",
      corner_style: "rounded"
    }
  },
  {
    screen_id: "screen_03",
    badge: 3,
    name: "My Rentals",
    category: "Rentals",
    icon: "film",
    iconColor: "#6B46C1",
    borderColor: "rgba(107, 70, 193, 0.4)",
    elementsCount: 4,
    purpose: "Shows all active and past movie rentals. Displays an empty-state illustration when no rentals exist. Provides a Reminder Interval control (−/+ buttons) to set notification cadence.",
    phoneState: {
      title: "My Rentals",
      customContent: "rentals"
    },
    elements: [
      { id: "el_r1", type: "text",   label: "Screen title (My Rentals)",              icon: "T" },
      { id: "el_r2", type: "text",   label: "Empty state message",                    icon: "T" },
      { id: "el_r3", type: "button", label: "Reminder interval − button", interactive: true, icon: "▣" },
      { id: "el_r4", type: "button", label: "Reminder interval + button", interactive: true, icon: "▣" }
    ],
    actions: [
      { type: "tap", intent: "Decrease reminder interval", target: "screen_03", label: 'tap "−"' },
      { type: "tap", intent: "Increase reminder interval", target: "screen_03", label: 'tap "+"' }
    ],
    navigation: { prev: "Movie Explorer", next: "User Profile" },
    design: {
      theme: "light",
      primary_color: "#3D5A99",
      background_color: "#F2F4FA",
      font_family: "Inter",
      corner_style: "rounded"
    }
  },
  {
    screen_id: "screen_04",
    badge: 4,
    name: "User Profile",
    category: "Settings",
    icon: "user",
    iconColor: "#3D5A99",
    borderColor: "rgba(61, 90, 153, 0.4)",
    elementsCount: 8,
    purpose: "User identity hub. Shows avatar, name, email, an Edit Profile CTA, and a Settings panel with toggles for Push Notifications and Dark Mode. Includes a Logout button.",
    phoneState: {
      title: "User Profile",
      customContent: "profile"
    },
    elements: [
      { id: "el_p1", type: "image",  label: "User avatar circle",                       icon: "▣" },
      { id: "el_p2", type: "text",   label: "User name (John Doe)",                     icon: "T" },
      { id: "el_p3", type: "text",   label: "User email",                               icon: "T" },
      { id: "el_p4", type: "button", label: "Edit Profile button",   interactive: true,  icon: "▣" },
      { id: "el_p5", type: "toggle", label: "Push Notifications toggle", interactive: true, icon: "▣" },
      { id: "el_p6", type: "toggle", label: "Dark Mode toggle",       interactive: true, icon: "▣" },
      { id: "el_p7", type: "button", label: "Logout button",          interactive: true, icon: "▣" },
      { id: "el_p8", type: "text",   label: "Settings section header",                  icon: "T" }
    ],
    actions: [
      { type: "tap", intent: "Navigate to Edit Profile", target: "screen_05", label: 'tap "Edit Profile"' },
      { type: "tap", intent: "Toggle notifications",     target: "screen_04", label: 'tap notifications toggle' },
      { type: "tap", intent: "Toggle dark mode",         target: "screen_04", label: 'tap dark mode toggle' },
      { type: "tap", intent: "Log out of app",           target: "screen_01", label: 'tap "Logout"' }
    ],
    navigation: { prev: "My Rentals", next: "Edit Profile" },
    design: {
      theme: "light",
      primary_color: "#3D5A99",
      background_color: "#F2F4FA",
      font_family: "Inter",
      corner_style: "rounded"
    }
  },
  {
    screen_id: "screen_05",
    badge: 5,
    name: "Edit Profile",
    category: "Settings",
    icon: "edit",
    iconColor: "#E53E3E",
    borderColor: "rgba(229, 62, 62, 0.4)",
    elementsCount: 7,
    purpose: "Editable form screen for updating user identity. Contains labelled text fields for Name, Email, and Phone. Two action buttons at the bottom: Save Profile (primary) and Cancel (secondary).",
    phoneState: {
      title: "Edit Profile",
      customContent: "edit_profile"
    },
    elements: [
      { id: "el_ep1", type: "text",   label: "Back arrow + screen title (Edit Profile)", icon: "T" },
      { id: "el_ep2", type: "input",  label: "Name input (John Doe)",   interactive: true, icon: "▣" },
      { id: "el_ep3", type: "input",  label: "Email input",             interactive: true, icon: "▣" },
      { id: "el_ep4", type: "input",  label: "Phone input (+1 234 567 890)", interactive: true, icon: "▣" },
      { id: "el_ep5", type: "button", label: "Save Profile button",     interactive: true, isPrimary: true, icon: "▣" },
      { id: "el_ep6", type: "button", label: "Cancel button",           interactive: true, icon: "▣" },
      { id: "el_ep7", type: "text",   label: "Screen heading (Edit Profile)", icon: "T" }
    ],
    actions: [
      { type: "tap",   intent: "Save profile changes",   target: "screen_04", label: 'tap "Save Profile"' },
      { type: "tap",   intent: "Discard changes",        target: "screen_04", label: 'tap "Cancel"' },
      { type: "input", intent: "Edit name",              target: "screen_05", label: 'type in Name field' },
      { type: "input", intent: "Edit email",             target: "screen_05", label: 'type in Email field' }
    ],
    navigation: { prev: "User Profile", next: null },
    design: {
      theme: "light",
      primary_color: "#3D5A99",
      background_color: "#F8FAFC",
      font_family: "Inter",
      corner_style: "pill (50px)"
    }
  },
  {
    screen_id: "screen_06",
    badge: 6,
    name: "Movie Detail",
    category: "Browse",
    icon: "film",
    iconColor: "#D69E2E",
    borderColor: "rgba(214, 158, 46, 0.4)",
    elementsCount: 6,
    purpose: "Detailed view of a single movie. Shows large poster, title, genre, star rating, daily rental price, full synopsis, and a prominent Rent button.",
    phoneState: {
      title: "Movie Detail",
      customContent: "movie_detail"
    },
    elements: [
      { id: "el_md1", type: "image",  label: "Movie poster (full-width)", icon: "▣" },
      { id: "el_md2", type: "text",   label: "Movie title",               icon: "T" },
      { id: "el_md3", type: "text",   label: "Genre tag",                 icon: "T" },
      { id: "el_md4", type: "text",   label: "Star rating + score",       icon: "T" },
      { id: "el_md5", type: "text",   label: "Daily price (₹/day)",       icon: "T" },
      { id: "el_md6", type: "button", label: "Rent button", interactive: true, isPrimary: true, icon: "▣" }
    ],
    actions: [
      { type: "tap", intent: "Rent the movie",     target: "screen_03", label: 'tap "Rent"' },
      { type: "tap", intent: "Go back to Explorer",target: "screen_02", label: 'tap back arrow' }
    ],
    navigation: { prev: "Movie Explorer", next: "My Rentals" },
    design: {
      theme: "light",
      primary_color: "#3D5A99",
      background_color: "#F2F4FA",
      font_family: "Inter",
      corner_style: "rounded"
    }
  }
];

// ── Journeys ──────────────────────────────────────────────────────────────────
export const DEMOSHOP_JOURNEYS = [
  {
    id: "j_01",
    name: "Browse & Rent a Movie",
    title: "Full Movie Rental Journey",
    subtitle: "4 steps · 8 key elements · Core transaction",
    screensCount: 4,
    icon: "credit-card",
    iconBg: "rgba(61, 90, 153, 0.2)",
    iconColor: "#3D5A99",
    steps: [
      {
        stepNumber: 1,
        screen_id: "screen_01",
        name: "Home",
        elementsCount: 7,
        caption: "Entry point",
        actionSummary: "Tap Explore tile",
        actionBadge: 'tap "Explore"',
        purpose: "User sees greeting and taps Explore to browse movies.",
        phoneType: "home",
        elements: [
          { icon: "▣", label: "Explore tile", isPrimary: true },
          { icon: "T", label: "Greeting text" }
        ],
        nav: { prev: "None", next: "Movie Explorer" }
      },
      {
        stepNumber: 2,
        screen_id: "screen_02",
        name: "Movie Explorer",
        elementsCount: 8,
        caption: "Search & filter",
        actionSummary: "Browse and select a movie",
        actionBadge: 'tap movie card',
        purpose: "User searches or filters movies by genre, then selects one.",
        phoneType: "explorer",
        elements: [
          { icon: "▣", label: "Search bar", isPrimary: true },
          { icon: "▣", label: "Genre chips" },
          { icon: "▣", label: "Movie cards" }
        ],
        nav: { prev: "Home", next: "Movie Detail" }
      },
      {
        stepNumber: 3,
        screen_id: "screen_06",
        name: "Movie Detail",
        elementsCount: 6,
        caption: "Review & decide",
        actionSummary: "Review movie, tap Rent",
        actionBadge: 'tap "Rent"',
        purpose: "User reads synopsis, checks price and rating, then rents.",
        phoneType: "movie_detail",
        elements: [
          { icon: "▣", label: "Rent button", isPrimary: true },
          { icon: "T", label: "Rating & price" }
        ],
        nav: { prev: "Movie Explorer", next: "My Rentals" }
      },
      {
        stepNumber: 4,
        screen_id: "screen_03",
        name: "My Rentals",
        elementsCount: 4,
        caption: "Confirmation",
        actionSummary: "Movie added to rentals",
        actionBadge: "rental confirmed",
        purpose: "Movie appears in user's active rentals list.",
        phoneType: "rentals",
        elements: [
          { icon: "▣", label: "Active rental card", isPrimary: true }
        ],
        nav: { prev: "Movie Detail", next: "None" }
      }
    ]
  },
  {
    id: "j_02",
    name: "Update User Profile",
    title: "Profile Edit Journey",
    subtitle: "2 steps · 7 key elements · Settings flow",
    screensCount: 2,
    icon: "user",
    iconBg: "rgba(61, 90, 153, 0.2)",
    iconColor: "#5C7EC7",
    steps: [
      {
        stepNumber: 1,
        screen_id: "screen_04",
        name: "User Profile",
        elementsCount: 8,
        caption: "Profile hub",
        actionSummary: "Tap Edit Profile",
        actionBadge: 'tap "Edit Profile"',
        purpose: "User views their profile and taps Edit Profile to make changes.",
        phoneType: "profile",
        elements: [
          { icon: "▣", label: "Edit Profile button", isPrimary: true },
          { icon: "▣", label: "Avatar" },
          { icon: "T", label: "Name & email" }
        ],
        nav: { prev: "None", next: "Edit Profile" }
      },
      {
        stepNumber: 2,
        screen_id: "screen_05",
        name: "Edit Profile",
        elementsCount: 7,
        caption: "Edit & save",
        actionSummary: "Update fields, tap Save",
        actionBadge: 'tap "Save Profile"',
        purpose: "User edits name, email, or phone number then saves.",
        phoneType: "edit_profile",
        elements: [
          { icon: "▣", label: "Save Profile button", isPrimary: true },
          { icon: "▣", label: "Name input" },
          { icon: "▣", label: "Email input" }
        ],
        nav: { prev: "User Profile", next: "None" }
      }
    ]
  },
  {
    id: "j_03",
    name: "Search & Explore Movies",
    title: "Movie Discovery Flow",
    subtitle: "1 step · 8 key elements · Discovery",
    screensCount: 1,
    icon: "shopping-bag",
    iconBg: "rgba(107, 70, 193, 0.15)",
    iconColor: "#6B46C1",
    steps: [
      {
        stepNumber: 1,
        screen_id: "screen_02",
        name: "Movie Explorer",
        elementsCount: 8,
        caption: "Full browse",
        actionSummary: "Type in search bar or tap genre chip",
        actionBadge: 'filter movies',
        purpose: "User uses search or genre filters to discover movies.",
        phoneType: "explorer",
        elements: [
          { icon: "▣", label: "Search input", isPrimary: true },
          { icon: "▣", label: "Filter chips" }
        ],
        nav: { prev: "Home", next: "Movie Detail" }
      }
    ]
  },
  {
    id: "j_04",
    name: "Manage Rental Reminders",
    title: "Reminder Interval Configuration",
    subtitle: "1 step · 2 key elements · Utility",
    screensCount: 1,
    icon: "clock",
    iconBg: "rgba(214, 158, 46, 0.15)",
    iconColor: "#D69E2E",
    steps: [
      {
        stepNumber: 1,
        screen_id: "screen_03",
        name: "My Rentals",
        elementsCount: 4,
        caption: "Set reminder",
        actionSummary: "Tap − or + to change interval",
        actionBadge: 'adjust interval',
        purpose: "User adjusts how often they receive rental reminders.",
        phoneType: "rentals",
        elements: [
          { icon: "▣", label: "− button", isPrimary: true },
          { icon: "▣", label: "+ button" }
        ],
        nav: { prev: "None", next: "None" }
      }
    ]
  },
  {
    id: "j_05",
    name: "Toggle Push Notifications",
    title: "Notification Settings Flow",
    subtitle: "1 step · 1 key element · Settings",
    screensCount: 1,
    icon: "settings",
    iconBg: "rgba(61, 90, 153, 0.15)",
    iconColor: "#3D5A99",
    steps: [
      {
        stepNumber: 1,
        screen_id: "screen_04",
        name: "User Profile",
        elementsCount: 8,
        caption: "Toggle notifications",
        actionSummary: "Tap Push Notifications toggle",
        actionBadge: 'toggle on/off',
        purpose: "User enables or disables rental reminder notifications.",
        phoneType: "profile",
        elements: [
          { icon: "▣", label: "Push Notifications toggle", isPrimary: true }
        ],
        nav: { prev: "None", next: "None" }
      }
    ]
  }
];

// ── Design System ─────────────────────────────────────────────────────────────
export const DEMOSHOP_DESIGN = {
  theme: "light",
  primary_color: "#3D5A99",
  secondary_color: "#5C7EC7",
  accent_color: "#6B46C1",
  background_color: "#F2F4FA",
  surface_color: "#FFFFFF",
  font_family: "Inter, sans-serif",
  corner_style: "rounded (12–16px); pill (50px) on buttons",
  spacing: "8px base grid",
  navigation: "Bottom Navigation Bar (4 items)",
  design_language: "Material Design 3",
  layout: "Card-based, light mode"
};

// ── Initial AI exploration logs ───────────────────────────────────────────────
export const INITIAL_AI_LOGS = [
  {
    time: "10:15:01", type: "screen",
    title: "Launched Android APK: FMovies.apk",
    desc: "Attached accessibility tree observer via ADB emulator",
    status: "Success", statusType: "success"
  },
  {
    time: "10:15:03", type: "screen",
    title: "Captured screen: Home",
    desc: "Found 7 interactive elements. Fingerprint: fp_home_fmv1",
    status: "Success", statusType: "success"
  },
  {
    time: "10:15:05", type: "decision",
    title: "AI Decision",
    desc: '"Home has 2 primary navigation paths: Explore, Rentals. Prioritizing Explore flow."',
    status: "Reasoned", statusType: "reasoned"
  },
  {
    time: "10:15:07", type: "action",
    title: 'Performed action: tap "Explore" tile',
    desc: "Injected tap on Explore quick-action card",
    status: "Success", statusType: "success"
  },
  {
    time: "10:15:09", type: "screen",
    title: "Navigated to: Movie Explorer",
    desc: "Found 8 elements (search, genre chips, movie cards, Rent buttons)",
    status: "Success", statusType: "success"
  },
  {
    time: "10:15:11", type: "decision",
    title: "AI Decision",
    desc: '"Movie cards are the primary interactive items. Testing Rent flow on Shawshank Redemption."',
    status: "Reasoned", statusType: "reasoned"
  },
  {
    time: "10:15:13", type: "action",
    title: 'Performed action: tap "Rent"',
    desc: "Triggered rental flow for The Shawshank Redemption (₹6.98/day)",
    status: "Success", statusType: "success"
  },
  {
    time: "10:15:16", type: "screen",
    title: "Navigated to: My Rentals",
    desc: "Movie added. 4 elements (empty state + interval controls) mapped.",
    status: "Success", statusType: "success"
  },
  {
    time: "10:15:19", type: "action",
    title: "Navigated to: User Profile via bottom nav",
    desc: "Tapped Profile tab in bottom navigation bar",
    status: "Success", statusType: "success"
  },
  {
    time: "10:15:22", type: "screen",
    title: "Explored: Edit Profile",
    desc: "All 6 screens mapped. 38 UI elements discovered across FMovies.",
    status: "Success", statusType: "success"
  }
];
