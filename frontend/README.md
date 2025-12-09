# ManageIntern Frontend

The frontend for ManageIntern, an internship management system built with React and Vite.

## Features
- Role-based authentication (Admin, Manager, Intern)
- Dashboard with analytics
- Department management
- Task assignment and tracking
- Attendance recording
- Evaluation system
- Reclamation management
- Notification center
- Report generation

## Technology Stack
- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Routing**: React Router
- **API Client**: Axios
- **Testing**: Vitest

## Prerequisites
- Node.js 18+
- npm 9+

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/laminesdev/ManageIntern.git
   cd ManageIntern/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment:
   Create a `.env` file in the root directory with your environment variables:
   ```env
   VITE_API_BASE_URL=http://localhost:8000/api
   ```

## Running the Application
Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## Testing
Run tests with Vitest:
```bash
npm run test
```

## Directory Structure
```
frontend/
├── src/               # Source code
│   ├── components/    # Reusable components
│   ├── pages/         # Application pages
│   ├── services/      # API services
│   ├── stores/        # Zustand state stores
│   ├── types/         # TypeScript type definitions
│   ├── layouts/       # Layout components
│   ├── hooks/         # Custom hooks
│   ├── utils/         # Utility functions
│   └── config/        # Configuration files
├── public/            # Public assets
└── tests/             # Test files
```

## Deployment
Build the production bundle:
```bash
npm run build
```

The production-ready files will be in the `dist` directory.
