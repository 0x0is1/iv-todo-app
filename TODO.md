Here is the exhaustive agent prompt:

---

# AGENT BRIEF: Build a Full-Stack React Native To-Do App (Expo + TypeScript)

## OVERVIEW
Build a production-quality To-Do mobile application for **Android only** using **Expo with TypeScript**. The app must be visually slick, performant, and fully functional with zero broken UI or placeholder features. Every screen, every button, every interaction must work. Backend is required.

---

## TECH STACK

### Frontend
- Expo SDK (latest stable)
- TypeScript (strict mode)
- Tamagui (UI component library + design system)
- React Navigation v6 (native stack + bottom tabs)
- Zustand (state management)
- React Hook Form + Zod + @hookform/resolvers (forms + validation)
- Firebase (Authentication + Firestore)
- @react-native-async-storage/async-storage
- @react-native-community/datetimepicker
- date-fns
- expo-notifications (local push notifications as task reminders)
- expo-font (Inter + Space Grotesk)
- expo-splash-screen
- expo-status-bar
- react-native-safe-area-context
- react-native-screens
- react-native-svg
- @expo/vector-icons (Ionicons set only)
- react-native-reanimated (for animations)

### Backend
- Node.js + NestJS framework
- MongoDB + Mongoose
- JWT authentication
- REST API

---

## COLOR SYSTEM (STRICT — DO NOT DEVIATE)

```
bg-primary:       #0A0A0F   (main screen background)
bg-secondary:     #12121A   (cards, modals, bottom sheet)
bg-tertiary:      #1A1A27   (inputs, list items, inactive tabs)

accent-primary:   #00D4FF   (buttons, active states, highlights)
accent-secondary: #0099BB   (pressed/hover state of accent)
accent-glow:      #00D4FF20 (glow shadows, subtle backgrounds)

text-primary:     #F0F0F5   (headings, primary text)
text-secondary:   #A0A0B0   (subtitles, descriptions)
text-muted:       #505065   (disabled, placeholders, hints)

success:          #00E5A0   (completed tasks, success states)
warning:          #FFB830   (medium priority, warnings)
danger:           #FF4560   (high priority, delete, errors)
info:             #00D4FF   (low priority, info — same as accent)

border:           #1E1E2E   (default borders, dividers)
border-active:    #00D4FF40 (focused input borders, active cards)

overlay:          #00000080 (modal backdrops)
```

---

## TYPOGRAPHY

- **Space Grotesk Bold/SemiBold** — all headings, screen titles, button text, app name
- **Inter Regular/Medium** — body text, descriptions, input values, labels
- Load both fonts via `expo-font` in `App.tsx` before rendering anything
- Base font size: 14px. Scale: 12, 14, 16, 18, 22, 28, 36
- Line heights must be comfortable — never cramped

---

## FONTS LOADING
In `App.tsx`, use `expo-splash-screen` to keep splash visible until fonts are loaded. Only hide splash after fonts are ready. This prevents font flash on startup.

---

## SPLASH SCREEN
- Background: `#0A0A0F`
- Center: App name `"DOIT"` in Space Grotesk Bold, `#F0F0F5` — `DO` white, `IT` in `#00D4FF`
- Below name: tagline `"Get it done."` in Inter Light, `#505065`
- Animation: fade in the text from opacity 0 to 1 over 800ms, then slide up 10px simultaneously using react-native-reanimated. Smooth easing (ease out).
- After animation completes wait 600ms then hide native splash and show app
- No logo image — pure text based splash

---

## HEADER (ALL SCREENS)
- Background: `#12121A`
- Bottom border: 1px `#1E1E2E`
- Title: Screen name in Space Grotesk SemiBold, size 18, `#F0F0F5`
- No logo, no icon branding in header
- Back button: Ionicons `chevron-back` in `#00D4FF`, left side, only on screens that are pushed onto stack
- Right side actions (where needed): icon buttons in `#00D4FF` (e.g. add task button on Home)
- Header is consistent across all screens — configure in React Navigation's screenOptions globally

---

## ANIMATIONS (react-native-reanimated — smooth, not flashy)
- **Splash screen**: fade + slide up on app name and tagline
- **Screen transitions**: native stack default (slide) is fine, do not override
- **Task card entry**: FadeInDown with staggered delay per item (50ms per index, max 300ms) using Reanimated entering prop
- **Task card delete**: FadeOutLeft before removing from list
- **Bottom tab switch**: subtle opacity transition on tab icons
- **Modal/bottom sheet open**: slide up from bottom, fade backdrop
- **Button press**: scale down to 0.96 on press, back to 1 on release (use Pressable with reanimated)
- **Checkbox/complete toggle**: scale bounce + color transition
- **Priority badge**: no animation, static
- Keep all animation durations between 200ms–400ms. Nothing longer.

---

## FOLDER STRUCTURE

```
root/
├── App.tsx
├── app.json
├── eas.json
├── .easignore
├── tsconfig.json
├── babel.config.js
├── backend/
│   ├── src/
│   │   ├── auth/
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.guard.ts
│   │   │   ├── jwt.strategy.ts
│   │   │   └── dto/
│   │   │       ├── register.dto.ts
│   │   │       └── login.dto.ts
│   │   ├── tasks/
│   │   │   ├── tasks.module.ts
│   │   │   ├── tasks.controller.ts
│   │   │   ├── tasks.service.ts
│   │   │   ├── task.schema.ts
│   │   │   └── dto/
│   │   │       ├── create-task.dto.ts
│   │   │       └── update-task.dto.ts
│   │   ├── users/
│   │   │   ├── users.module.ts
│   │   │   ├── users.service.ts
│   │   │   └── user.schema.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── package.json
│   └── tsconfig.json
└── src/
    ├── assets/
    │   └── fonts/
    ├── constants/
    │   ├── colors.ts
    │   ├── fonts.ts
    │   ├── spacing.ts
    │   └── config.ts
    ├── theme/
    │   ├── tamagui.config.ts
    │   └── tokens.ts
    ├── types/
    │   ├── task.types.ts
    │   ├── user.types.ts
    │   └── navigation.types.ts
    ├── store/
    │   ├── auth.store.ts
    │   ├── task.store.ts
    │   └── ui.store.ts
    ├── services/
    │   ├── api/
    │   │   ├── axios.config.ts
    │   │   ├── auth.api.ts
    │   │   └── tasks.api.ts
    │   └── notification.service.ts
    ├── hooks/
    │   ├── useAuth.ts
    │   ├── useTasks.ts
    │   ├── useNotification.ts
    │   └── useForm.ts
    ├── utils/
    │   ├── sortTasks.ts
    │   ├── filterTasks.ts
    │   ├── dateHelpers.ts
    │   └── validators.ts
    ├── components/
    │   ├── common/
    │   │   ├── AppButton.tsx
    │   │   ├── AppInput.tsx
    │   │   ├── AppText.tsx
    │   │   ├── AppCard.tsx
    │   │   ├── AppBadge.tsx
    │   │   ├── AppLoader.tsx
    │   │   ├── AppDivider.tsx
    │   │   └── AppModal.tsx
    │   ├── task/
    │   │   ├── TaskCard.tsx
    │   │   ├── TaskList.tsx
    │   │   ├── TaskForm.tsx
    │   │   ├── TaskFilterBar.tsx
    │   │   ├── TaskBadgePriority.tsx
    │   │   ├── TaskStatusToggle.tsx
    │   │   └── TaskEmptyState.tsx
    │   ├── auth/
    │   │   ├── AuthHeader.tsx
    │   │   └── SocialDivider.tsx
    │   └── layout/
    │       ├── ScreenWrapper.tsx
    │       ├── KeyboardWrapper.tsx
    │       └── TabBarIcon.tsx
    ├── navigation/
    │   ├── RootNavigator.tsx
    │   ├── AuthNavigator.tsx
    │   └── AppNavigator.tsx
    └── screens/
        ├── auth/
        │   ├── LoginScreen.tsx
        │   └── RegisterScreen.tsx
        ├── tasks/
        │   ├── HomeScreen.tsx
        │   ├── AddTaskScreen.tsx
        │   ├── EditTaskScreen.tsx
        │   └── TaskDetailScreen.tsx
        └── profile/
            └── ProfileScreen.tsx
```

---

## BACKEND DETAIL (NestJS + MongoDB)

### Purpose
The backend handles user registration, login, and all task CRUD operations. Firebase is used ONLY for push notification token management if needed. All auth and data goes through the NestJS backend.

### User Schema (MongoDB)
```
_id, email, passwordHash, name, createdAt
```

### Task Schema (MongoDB)
```
_id, userId (ref), title, description, dateTime, deadline, priority (low/medium/high),
status (pending/completed), category/tag, createdAt, updatedAt
```

### Auth Endpoints
- `POST /auth/register` — name, email, password → returns JWT
- `POST /auth/login` — email, password → returns JWT

### Task Endpoints (all protected by JWT guard)
- `GET /tasks` — get all tasks for logged in user
- `POST /tasks` — create task
- `PATCH /tasks/:id` — update task (any field)
- `DELETE /tasks/:id` — delete task
- `PATCH /tasks/:id/complete` — toggle complete status

### Security
- Passwords hashed with bcrypt (salt rounds: 10)
- JWT secret in environment variable
- JWT expiry: 7 days
- All task endpoints verify that the task belongs to the requesting user before any operation — never trust client-sent userId

### Validation
- Use class-validator and class-transformer in all DTOs
- Return proper HTTP status codes — 400 for validation, 401 for unauth, 404 for not found, 500 for server errors
- Never expose passwordHash in any response

### CORS
- Enable CORS in main.ts for mobile client

### Environment
- MongoDB URI in `.env`
- JWT_SECRET in `.env`
- PORT in `.env`
- Provide a `.env.example` file

---

## FRONTEND DETAIL

### axios.config.ts
- Base URL points to backend (use a constant in `config.ts` for the API base URL so it can be changed easily)
- Attach JWT token from AsyncStorage to every request via axios interceptor
- On 401 response, clear auth store and redirect to login automatically
- Handle network errors gracefully — never let the app crash silently

### auth.store.ts (Zustand)
- State: `user` (name, email, token), `isAuthenticated`, `isLoading`
- Actions: `login`, `register`, `logout`, `restoreSession`
- On app start, `restoreSession` reads token from AsyncStorage and validates — if valid restore user, if not clear and go to login
- `logout` clears AsyncStorage token and resets store

### task.store.ts (Zustand)
- State: `tasks[]`, `isLoading`, `error`, `activeFilter`, `activeSortMode`
- Actions: `fetchTasks`, `addTask`, `updateTask`, `deleteTask`, `toggleComplete`, `setFilter`, `setSortMode`
- After every mutation (add/update/delete/toggle) re-fetch tasks from backend to keep state in sync — do not rely on optimistic updates unless you implement full rollback on error
- `error` state should be set with user-readable message on any API failure

### ui.store.ts (Zustand)
- State: `isGlobalLoading`, `toastMessage`, `toastType` (success/error/info), `toastVisible`
- Actions: `showToast`, `hideToast`, `setGlobalLoading`
- Toast auto-hides after 3 seconds

### notification.service.ts
- On app start, request notification permissions (Android channel setup with sound and vibration)
- `scheduleTaskReminder(taskId, title, deadline)` — schedules a local notification 1 hour before deadline. If deadline is less than 1 hour away, schedule for 5 minutes before. If deadline has passed, do not schedule.
- `cancelTaskReminder(taskId)` — cancels scheduled notification for that task using taskId as notification identifier
- When a task is marked complete, cancel its reminder
- When a task is deleted, cancel its reminder
- When a task deadline is updated, cancel old and schedule new
- Store notification identifiers in AsyncStorage keyed by taskId

---

## TASK DATA MODEL (Frontend Type)

```typescript
type Priority = 'low' | 'medium' | 'high'
type TaskStatus = 'pending' | 'completed'

interface Task {
  _id: string
  userId: string
  title: string
  description: string
  dateTime: string        // ISO string — when the task starts/is set
  deadline: string        // ISO string — when it must be done by
  priority: Priority
  status: TaskStatus
  category: string        // free text tag/category
  createdAt: string
  updatedAt: string
}
```

---

## SORT ALGORITHM (sortTasks.ts)

Implement a weighted scoring algorithm. Each task gets a score and list is sorted ascending (lowest score = highest priority in list):

```
score = (priorityWeight * 0.4) + (deadlineWeight * 0.4) + (dateTimeWeight * 0.2)

priorityWeight:
  high   = 1
  medium = 2
  low    = 3

deadlineWeight = hours remaining until deadline (capped at 168 — 1 week)
  if deadline passed → 0 (show at very top)

dateTimeWeight = hours since dateTime was set (older tasks bubble up slightly)
```

Completed tasks always go to the bottom regardless of score. Within completed tasks sort by completedAt descending.

---

## FILTER SYSTEM (filterTasks.ts)

Support these filter modes simultaneously:
- by status: all / pending / completed
- by priority: all / low / medium / high
- by category: all / specific category string

Filters are combinable — a task must match ALL active filters to appear.

---

## VALIDATORS (validators.ts — Zod schemas)

```
registerSchema: name (min 2), email (valid), password (min 6)
loginSchema: email (valid), password (min 1)
taskSchema:
  title: min 1, max 100
  description: max 500, optional
  dateTime: valid ISO date string, required
  deadline: valid ISO date string, must be after dateTime
  priority: enum low/medium/high
  category: max 50, optional
```

---

## SCREENS DETAIL

### LoginScreen
- Full screen, bg-primary background
- Top section: App name `DOIT` in Space Grotesk Bold size 36, `DO` white `IT` cyan, centered with tagline below in Inter muted
- Form: email input, password input (with show/hide toggle using Ionicons eye/eye-off)
- Cyan filled button "Login" — full width
- Below: "Don't have an account? Register" — text link in accent color
- Validation errors shown inline below each field in danger color, small Inter font
- On submit show loading state on button (spinner inside button, disable button)
- On success navigate to Home, on error show toast

### RegisterScreen
- Same aesthetic as Login
- Form: name, email, password, confirm password
- Same validation UX
- On success navigate to Home

### HomeScreen
- Header title "DOIT" right side has add button (Ionicons `add` icon in accent color, 24px)
- Below header: `TaskFilterBar` — horizontal scroll row of filter chips. Chips for: All / Pending / Completed / Low / Medium / High / and any existing categories
- Active chip: filled accent background, accent text. Inactive: bg-tertiary, muted text
- Sort button on right of filter bar — Ionicons `funnel` icon, opens a small modal with sort options (Smart Sort / By Deadline / By Priority / By Date Added)
- Below filter bar: `TaskList` — FlatList of `TaskCard` components
- `TaskEmptyState` shown when no tasks match filter — Ionicons `checkmark-done-circle` large icon in muted color, friendly message
- Pull to refresh triggers `fetchTasks`
- Each TaskCard entry animates in with FadeInDown stagger

### TaskCard
- bg-secondary card, rounded corners (12px), subtle border `#1E1E2E`
- Left side: `TaskStatusToggle` — circular checkbox. Unchecked: border accent. Checked: filled accent with checkmark icon. Toggle bounce animation on press.
- Center: title in Space Grotesk SemiBold, text-primary. Description preview (1 line, ellipsis) in Inter, text-secondary. Below: deadline formatted as "Due Mar 15, 3:00 PM" in small Inter, muted. If deadline is within 24 hours and task pending — show deadline in warning color. If deadline passed and pending — show in danger color.
- Right side: `TaskBadgePriority` — small pill badge. High=danger bg, Medium=warning bg, Low=info bg. Text white, Inter bold small.
- Long press on card → show delete confirmation modal
- Tap on card → navigate to TaskDetailScreen
- Swipe right on card → quick complete toggle (use PanGestureHandler or a simple swipe detection — keep it simple and reliable, do not use a library that might break)
- Delete animation: FadeOutLeft before item is removed from list

### AddTaskScreen / EditTaskScreen
- These are essentially the same screen — EditTask pre-populates form with existing task data
- Header: "Add Task" or "Edit Task" with back chevron
- Form fields:
  - Title (AppInput)
  - Description (multiline AppInput, max 4 lines visible)
  - Date & Time picker — label "Task Date & Time", uses `@react-native-community/datetimepicker`, show formatted date in a pressable AppInput-style field, opens picker on press
  - Deadline picker — same as above, label "Deadline"
  - Priority selector — 3 horizontal pressable cards: Low / Medium / High. Selected one has border-active and accent-glow background. Unselected bg-tertiary.
  - Category — AppInput, free text, placeholder "e.g. Work, Personal"
- Bottom: full width "Save Task" button in accent
- On save: validate, call API, schedule notification, navigate back, show success toast
- On any API error: show toast with error message, keep form open

### TaskDetailScreen
- Header: task title truncated, back button, edit button (Ionicons `create-outline`) on right
- Full task details displayed cleanly:
  - Title large
  - Description full text
  - Row: calendar icon + formatted dateTime
  - Row: alarm icon + formatted deadline (colored based on urgency)
  - Row: priority badge large
  - Row: category tag if present
  - Row: status — "Pending" or "Completed" with colored dot
- Bottom: two buttons — "Mark Complete" (accent) or "Mark Pending" (secondary outlined) based on status, and "Delete Task" (danger outlined)
- Delete shows confirmation modal before proceeding

### ProfileScreen
- Header: "Profile"
- Top: large Ionicons `person-circle` icon in accent color, user's name in large Space Grotesk, email in Inter muted below
- Stats section: bg-secondary card showing "Total Tasks", "Completed", "Pending" counts in a 3-column row with accent numbers
- Account section: list item style rows — "Email", "Member Since" (formatted)
- Bottom: "Logout" button in danger color, full width, with confirmation modal before logout
- On logout: clear store, clear AsyncStorage, navigate to Login

---

## COMMON COMPONENTS DETAIL

### AppButton
- Props: label, onPress, variant (filled/outlined/ghost), color (accent/danger/success), loading (bool), disabled (bool)
- Filled: bg=accent, text white
- Outlined: transparent bg, border=color, text=color
- Ghost: no border, text=color
- Loading: show ActivityIndicator inside button, hide label, disable press
- Press animation: scale 0.96 with reanimated
- Border radius: 10px
- Height: 52px

### AppInput
- Props: label, placeholder, error, secureTextEntry, multiline, rightIcon, onRightIconPress, ...rest TextInput props
- Label above input in Inter medium text-secondary small
- Input container: bg-tertiary, border `#1E1E2E`, border radius 10px, height 52px (auto for multiline)
- Focused border: border-active (`#00D4FF40`)
- Error state: border danger, error message below in danger color small
- Padding horizontal: 16px

### AppModal
- Backdrop overlay `#00000080` with fade in animation
- Modal container slides up from bottom: bg-secondary, rounded top corners 16px
- Title, content slot, action buttons slot
- Close on backdrop tap

### AppToast
- Positioned at top of screen (below status bar)
- Slides down from top, stays 3 seconds, slides back up
- Types: success (success color left border), error (danger), info (accent)
- Text in Inter medium, white
- Should be rendered at root level via ui.store

### AppBadge
- Small pill, bg and text color passed as props
- Used for priority, status, category

---

## NAVIGATION DETAIL

### RootNavigator
- Checks `isAuthenticated` from auth.store
- If authenticated → AppNavigator
- If not → AuthNavigator
- On `restoreSession` completing, decide which to show
- Show a blank bg-primary screen while restoring session (not a full splash, just bg color) — this prevents white flash

### AuthNavigator
- Native stack: Login → Register
- No header on auth screens (handled inside screen itself)

### AppNavigator
- Bottom tab navigator with 3 tabs: Home (Ionicons `home`), Add Task (Ionicons `add-circle` — larger, accent colored, center tab), Profile (Ionicons `person`)
- Tab bar: bg `#12121A`, border top `#1E1E2E`, active tint accent, inactive tint muted
- Add Task tab does not navigate to a tab screen — it pushes AddTaskScreen onto the stack. Handle this with a custom tab button that calls navigation.navigate('AddTask')
- Home and Profile are tab screens
- Task stack (Home → TaskDetail → EditTask) lives inside the Home tab

### Navigation Types
- Define all route params strictly in `navigation.types.ts`
- EditTaskScreen receives the full Task object as param
- TaskDetailScreen receives taskId as param and fetches/finds from store

---

## CONFIGURATION FILES

### app.json
```json
{
  "expo": {
    "name": "DOIT",
    "slug": "doit-todo-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "userInterfaceStyle": "dark",
    "backgroundColor": "#0A0A0F",
    "splash": {
      "backgroundColor": "#0A0A0F"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#0A0A0F"
      },
      "package": "com.doit.todoapp",
      "permissions": [
        "NOTIFICATIONS",
        "RECEIVE_BOOT_COMPLETED",
        "VIBRATE"
      ]
    },
    "plugins": [
      "expo-font",
      "expo-notifications"
    ]
  }
}
```

### eas.json
```json
{
  "cli": {
    "version": ">= 5.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "aab"
      }
    }
  }
}
```

### .easignore
```
node_modules/
.git/
.env
*.log
android/
ios/
backend/node_modules/
```

### tsconfig.json
```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

### babel.config.js
```js
module.exports = function(api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      '@tamagui/babel-plugin',
      'react-native-reanimated/plugin'
    ]
  }
}
```

---

## KNOWN ISSUES TO HANDLE WITH CAUTION

1. **Reanimated plugin must be last in babel plugins** — if it is not last, app will crash on startup. Always ensure `react-native-reanimated/plugin` is the last entry in babel plugins.

2. **expo-notifications on Android requires a notification channel** — create it on app startup before scheduling any notifications. Without a channel, notifications silently fail on Android 8+.

3. **DateTimePicker on Android** — it opens as a dialog (not inline). It fires `onChange` immediately when user picks or dismisses. Handle both cases — check if `event.type === 'set'` before updating state. Do not show two pickers at once.

4. **Tamagui requires its babel plugin and the config must be passed to TamaguiProvider at root** — without this, components will not style correctly and may throw errors. Make sure `tamagui.config.ts` is imported in `App.tsx` and passed to provider.

5. **AsyncStorage is async** — never read token synchronously. Always await. The `restoreSession` in auth store must complete before navigation renders — handle this with a ready state flag.

6. **JWT expiry** — if token is expired and backend returns 401, the axios interceptor must catch this, clear auth, and redirect to login. If this is not handled, user will see confusing blank screens or infinite loading.

7. **FlatList with reanimated entering prop** — when using `entering={FadeInDown.delay(index * 50)}` on Animated.View inside FlatList, ensure the component is wrapped in `Animated.View` from reanimated not the standard one. Mixing them causes crashes.

8. **Keyboard avoiding on Android** — use `KeyboardAvoidingView` with `behavior="height"` on Android (not `padding` which is for iOS). Wrap all forms in `KeyboardWrapper` component.

9. **Navigation before mount** — never call navigation.navigate before the navigator is fully mounted. Use `isReady` from navigation ref if navigating from outside component tree (e.g. from axios interceptor). Set up a navigationRef in RootNavigator and export it.

10. **Zustand store hydration** — do not call store actions during module initialization. Only call them inside components or hooks after mount.

11. **Category filter chips in FilterBar** — derive unique categories dynamically from the tasks array in store. Do not hardcode categories. Re-derive whenever tasks change.

12. **Deadline validation** — always enforce that deadline must be strictly after dateTime both in Zod schema and display. Show clear error if user sets deadline before task dateTime.

13. **Notification scheduling edge cases** — if deadline is in the past when task is created or edited, do not schedule notification and do not crash. Silently skip scheduling. Log a warning at most.

14. **Empty states** — every list that can be empty must show a proper empty state component. Never show a blank screen.

15. **Backend userId injection** — never trust userId from request body. Always extract userId from the JWT payload in the auth guard and attach to request object. Tasks service uses `req.user._id` not `body.userId`.

16. **Form reset on navigation** — when navigating back from AddTask or EditTask, reset the form. If user presses back mid-form and returns, they should see a fresh form for Add, or the original task data for Edit.

17. **Swipe to complete** — keep swipe implementation simple. A basic PanResponder or a threshold-based translateX with reanimated is fine. Do not use complex gesture libraries for this single feature. Ensure it does not conflict with FlatList scroll. Use `activeOffsetX` to differentiate swipe from scroll.

18. **Modal confirmation for delete and logout** — never delete or logout on single tap. Always show AppModal asking "Are you sure?" with Cancel and Confirm buttons. This prevents accidental data loss.

19. **API base URL** — put it in `src/constants/config.ts` as `API_BASE_URL`. During development use local IP (not localhost — Android emulator/device cannot reach localhost of host machine). Document this clearly for setup.

20. **Backend .env** — never commit real secrets. Provide `.env.example` with dummy values. Add `.env` to `.gitignore`.

21. **Backend pagination** — implement pagination for tasks list. Use `page` and `limit` query parameters. Return `total` and `pages` in response.

22. **Backend sorting** — implement sorting for tasks list. Use `sort` query parameter. Return `sorted` in response.

23. **Backend filtering** — implement filtering for tasks list. Use `filter` query parameter. Return `filtered` in response.

24. **Backend search** — implement search for tasks list. Use `search` query parameter. Return `searched` in response.

25. Mongo url:   url: "mongodb+srv://testeruser:testeruser@cluster0.z5tzaou.mongodb.net/dliver?retryWrites=true&w=majority&appName=Cluster0"
- change collection name from dliver to tasks

---

## AESTHETIC GUIDELINES

- Consistent 16px horizontal padding on all screens
- Cards have 12px border radius, inputs 10px, buttons 10px, badges 20px (pill)
- Spacing between elements should feel breathable — never cramped. Use 12–16px vertical gaps between form fields, 10–12px between list items
- Section headers inside screens in Inter SemiBold, text-secondary, uppercase, letter spacing 1px — used sparingly
- Dividers use `#1E1E2E` 1px lines
- Every interactive element must have a visible press state — either scale or color shift. No element should feel unresponsive.
- Use subtle `shadowColor: #00D4FF` with low opacity (0.15) on active/selected cards for glow effect on Android (elevation + shadow)
- Bottom tab add button should be slightly larger (32px icon vs 24px for others) and in full accent color to draw attention
- Task cards for completed tasks: title gets `text-decoration: line-through`, opacity reduced to 0.6 on the whole card
- High priority tasks: left border 3px danger color on card
- Medium priority: left border 3px warning color
- Low priority: left border 3px info/accent color

---

## FINAL CHECKLIST FOR AGENT

Before considering the project done, verify every item:

- [ ] Register works, login works, logout works with confirmation
- [ ] JWT persists across app restarts via AsyncStorage
- [ ] All task CRUD operations work end to end (frontend → backend → MongoDB)
- [ ] Task form validates all fields with inline errors
- [ ] DateTimePicker works on Android for both dateTime and deadline fields
- [ ] Deadline must be after dateTime — enforced
- [ ] Priority selector works and saves correctly
- [ ] Category saves and appears in filter chips
- [ ] Sort algorithm runs and reorders list correctly
- [ ] All filter combinations work correctly
- [ ] Pull to refresh works on HomeScreen
- [ ] Swipe to complete works without interfering with scroll
- [ ] Long press delete shows confirmation modal and deletes with animation
- [ ] Task completion toggle works with animation
- [ ] Notification schedules on task create/edit with deadline
- [ ] Notification cancels on task delete or complete
- [ ] Notification cancels and reschedules when deadline is updated
- [ ] Empty state shows when no tasks / no filtered results
- [ ] Toast shows on success and error for all operations
- [ ] Profile screen shows correct user data and task stats
- [ ] Logout clears everything and returns to login
- [ ] All screens have proper headers with back button where needed
- [ ] Splash animation plays smoothly on cold start
- [ ] No screen has placeholder UI that does not function
- [ ] No console errors or warnings in production build
- [ ] Backend validates all inputs and returns proper error codes
- [ ] Backend never exposes password hash
- [ ] Backend task ownership is verified on every task operation
- [ ] `.env.example` provided for backend
- [ ] `API_BASE_URL` is easily configurable in frontend constants
- [ ] All animations are smooth and not janky
- [ ] App does not crash on any happy or unhappy path

---

This is the complete specification. Build it exactly as described. Do not add features not listed. Do not leave any listed feature unimplemented. Do not use placeholder data or mock APIs — everything must be real and functional.