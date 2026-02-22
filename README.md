# DOIT - To-Do Application

DOIT is a modern, high-performance To-Do application built with a React Native (Expo) frontend and a NestJS backend. It features a heavy emphasis on dynamic, high-contrast, beautiful aesthetics across both light and dark themes. 

## Architecture & Working Mechanism

The project follows a decoupled, client-server architecture. The repository is split into two primary directories:

- `/frontend`: Contains the React Native Expo application.
- `/backend`: Contains the NestJS + MongoDB API.

### The Backend (NestJS + MongoDB)
The backend is a robust RESTful API built on the NestJS framework. It uses Mongoose to communicate with a MongoDB database. 
- **Authentication**: JWT-based authentication. Users must register/login to receive a Bearer token.
- **Tasks Module**: Handles CRUD operations and advanced filtering/sorting for the tasks. All tasks are linked to the authenticated user's ID.
- **Validation**: Strict schema validation using `class-validator` and `zod`.

### The Frontend (React Native + Expo)
The mobile application is built with Expo and Tamagui for high-performance styling.
- **State Management**: Uses `Zustand` for decoupled, synchronous local state management (`auth.store`, `task.store`, `ui.store`).
- **Navigation**: React Navigation handle stack and tab-based routing securely.
- **Animations**: `react-native-reanimated` powers smooth layouts and entering/exiting transitions.
- **Theming**: A custom dynamic theming engine swaps the entire color palette of the app seamlessly between Light and Dark modes.

## Connection & Data Flow

The frontend connects to the backend exclusively via an Axios HTTP client layer. Here is how the connection fundamentally breathes:

1. **API Interceptors**: 
    - Found in `frontend/src/services/api/axios.config.ts`.
    - Every outgoing request is intercepted to attach the `userToken` (from AsyncStorage) to the `Authorization` header.
    - Global loading states and API timeouts (60 seconds) are managed directly within this interceptor.
2. **Environment Variables & Production Backend**:
    - The production backend is actively hosted at `https://iv-todo-app.onrender.com`. 
    - The frontend expects an `EXPO_PUBLIC_API_URL` variable to define the backend's location for local testing (e.g., `http://192.168.1.5:3000`). If none is provided, it gracefully defaults to the live Render production backend.
    - The backend expects `MONGO_URI` and `JWT_SECRET` environment variables.
3. **Data Sync**:
    - The `useTaskStore` calls the `tasksApi` service to fetch new lists of tasks from the database and updates its local Zustand array asynchronously, driving continuous UI reactivity.
    - Local operations like toggling a task completion trigger parallel UI state changes and backend API updates for maximum responsiveness.


## Running the Project Locally

### 1. Start the Backend
```bash
cd backend
npm install
# Ensure you have your .env file with MONGO_URI and JWT_SECRET
npm run start:dev
```

### 2. Start the Frontend
In a separate terminal:
```bash
cd frontend
npm install
npm start
```

Press `a` to open the app on a connected Android device or emulator, or `i` for iOS.

## Deployment & CI/CD
The project workflow is fully automated via GitHub Actions for Expo Application Services (EAS):
- When code is pushed, actions automatically build development and preview APKs.
- Pushing to the `frontend/` directory triggers Over-The-Air (OTA) updates using `eas update`, delivering instant UI modifications directly to users' devices without app store delays!
