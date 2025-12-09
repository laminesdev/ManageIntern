# ManageIntern Backend

The backend for ManageIntern, an internship management system built with Laravel.

## Features
- User authentication and authorization
- Department management
- Task management and assignment
- Attendance tracking
- Evaluation system
- Notification system
- Reclamation handling
- Report generation

## Technology Stack
- **Framework**: Laravel 10
- **Database**: MySQL (compatible with other SQL databases)
- **API**: RESTful API
- **Authentication**: Laravel Sanctum
- **Testing**: PHPUnit

## Prerequisites
- PHP 8.1+
- Composer
- Node.js 16+
- MySQL 5.7+

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/laminesdev/ManageIntern.git
   cd ManageIntern/backend
   ```

2. Install dependencies:
   ```bash
   composer install
   npm install
   ```

3. Configure environment:
   ```bash
   cp .env.example .env
   ```
   Edit the `.env` file with your database credentials and other settings.

4. Generate application key:
   ```bash
   php artisan key:generate
   ```

5. Run database migrations and seeders:
   ```bash
   php artisan migrate --seed
   ```

## Running the Application
Start the development server:
```bash
php artisan serve
```

The API will be available at `http://localhost:8000/api`.

## Testing
Run tests with PHPUnit:
```bash
php artisan test
```

## Directory Structure
```
backend/
├── app/              # Application core
│   ├── Models/       # Database models
│   ├── Http/         # Controllers, middleware, requests
│   └── Providers/    # Service providers
├── config/           # Configuration files
├── database/         # Database migrations and seeders
├── public/           # Publicly accessible files
├── resources/        # Views and assets
├── routes/           # API routes
├── storage/          # Storage for logs, cache, etc.
└── tests/            # Test cases
```

## API Documentation
API documentation is available at `/api/documentation` when the application is running.

## Deployment
For production deployment, configure your web server (Nginx/Apache) to point to the `public` directory.
