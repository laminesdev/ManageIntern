# ManageIntern Project Setup Guide

This guide explains how to set up and run both the frontend and backend of the ManageIntern project locally.

## Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [PHP](https://www.php.net/) (v8.1+)
- [Composer](https://getcomposer.org/)
- [MySQL](https://www.mysql.com/) (or compatible database)

## Backend Setup (Laravel)

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install PHP dependencies:
   ```bash
   composer install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Generate application key:
   ```bash
   php artisan key:generate
   ```

5. Configure database settings in `.env`:
   ```ini
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=manageintern
   DB_USERNAME=root
   DB_PASSWORD=your_password
   ```

6. Create database:
   ```bash
   mysql -u root -p -e "CREATE DATABASE manageintern;"
   ```

7. Run database migrations:
   ```bash
   php artisan migrate
   ```

8. Seed database with sample data:
   ```bash
   php artisan db:seed
   ```

9. Start backend server:
   ```bash
   php artisan serve
   ```
   The backend will run at `http://localhost:8000`

## Frontend Setup (React)

1. Navigate to frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install JavaScript dependencies:
   ```bash
   npm install
   ```

3. Configure API endpoint in `.env`:
   ```ini
   VITE_API_BASE_URL=http://localhost:8000/api
   ```

4. Start development server:
   ```bash
   npm run dev
   ```
   The frontend will run at `http://localhost:5173`

## Accessing the Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000

## Resetting Data
To reset the database with fresh seed data:
```bash
cd backend
php artisan migrate:fresh --seed
```

## Troubleshooting
- **Composer issues**: Run `composer update` if dependencies fail to install
- **Node.js issues**: Ensure you're using Node v18+
- **Database connection errors**: Verify MySQL credentials in `.env` match your local setup
- **CORS errors**: Ensure backend CORS configuration allows requests from frontend origin
