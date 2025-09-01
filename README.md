# TodoApp - Full Stack Task Management Application

A modern, responsive Todo application built with .NET Core Web API backend and React frontend, featuring advanced filtering, due date management, and real-time updates.

## 🎯 Technology Stack & Architecture Decisions

### Backend: .NET Core 8 Web API
**Why .NET Core?**
- **Performance**: Excellent performance characteristics with minimal memory footprint
- **Cross-platform**: Runs on Windows, macOS, and Linux
- **Enterprise-ready**: Built-in dependency injection, logging, and middleware pipeline
- **Entity Framework Core**: Robust ORM with excellent database abstraction
- **Strong typing**: Compile-time error checking and excellent tooling support
- **API-first design**: Built specifically for creating RESTful APIs

### Frontend: React 18 with Modern Hooks
**Why React?**
- **Component reusability**: Modular architecture for maintainable code
- **Virtual DOM**: Efficient rendering and excellent performance
- **Rich ecosystem**: Extensive library support (Lucide React for icons, Axios for HTTP)
- **Developer experience**: Excellent debugging tools and hot reload
- **Hooks-based state management**: Clean, functional approach to state management
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development

### Database: Entity Framework Core with In-Memory/SQL Server
**Why Entity Framework Core?**
- **Code-first approach**: Database schema managed through C# models
- **Migration support**: Version-controlled database changes
- **LINQ support**: Type-safe querying with excellent IntelliSense
- **Flexible providers**: Can switch between SQL Server, PostgreSQL, SQLite easily

### Additional Tools
- **Axios**: Promise-based HTTP client for clean API communication
- **Lucide React**: Consistent, beautiful icon library
- **Tailwind CSS**: Responsive, utility-first styling

## 🚀 Features

- ✅ Create, read, update, and delete todos
- 🔍 Advanced filtering (by status, due date, text search)
- 📅 Due date management with overdue indicators
- 📊 Progress tracking with visual progress bar
- 🎨 Modern, responsive UI with smooth animations
- ⚡ Real-time updates and optimistic UI
- 🏷️ Status-based organization (Pending/Completed)

## 📋 Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js](https://nodejs.org/) (version 18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) (for containerized deployment)

## 🛠️ Local Development Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd todoapp
```

### 2. Backend Setup (.NET Core API)
```bash
# Navigate to the API project
cd backend/TodoApp.Api

# Restore NuGet packages
dotnet restore

# Apply database migrations (if using a persistent database)
dotnet ef database update

# Run the API (will start on https://localhost:7034)
dotnet run
```

The API will be available at:
- HTTPS: `https://localhost:7034`
- HTTP: `http://localhost:5034`
- Swagger UI: `https://localhost:7034/swagger`

### 3. Frontend Setup (React)
```bash
# Open a new terminal and navigate to frontend
cd frontend/todoui

# Install dependencies
npm install

# Start the development server (will start on http://localhost:3000)
npm start
```

The React application will automatically open in your browser at `http://localhost:3000`.

### 4. Verify the Application
1. Open `http://localhost:3000` in your browser
2. Try creating a new todo item
3. Test the filtering functionality
4. Verify API endpoints at `https://localhost:7034/swagger`

## 🐳 Docker Deployment

### Quick Start with Docker Compose
```bash
# Build and start all services
docker-compose up --build

# Run in detached mode
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```
## 📁 Project Structure

```
todoapp/
├── backend/
│   ├── TodoApp.Api/          # Web API project
│   │   ├── Controllers/      # API controllers
│   │   ├── Services/         # Business logic services
│   │   └── Program.cs        # Application entry point
│   ├── TodoApp.Base/         # Shared models and interfaces
│   │   ├── Entities/         # Domain models
│   │   ├── Dtos/            # Data transfer objects
│   │   └── Interfaces/       # Service contracts
│   ├── TodoApp.Data/         # Data access layer
│   │   ├── Migrations/       # EF Core migrations
│   │   └── TodoDbContext.cs  # Database context
│   └── Dockerfile           # Backend container definition
├── frontend/
│   ├── todoui/
│   │   ├── src/
│   │   │   ├── components/   # React components
│   │   │   ├── pages/        # Page components
│   │   │   ├── services/     # API service layer
│   │   │   └── App.js        # Main application component
│   │   ├── public/           # Static assets
│   │   └── package.json      # Dependencies and scripts
│   └── Dockerfile           # Frontend container definition
├── docker-compose.yml       # Multi-container orchestration
└── README.md                # Readme
```

## 🔧 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todos` | Get all todos |
| GET | `/api/todos/{id}` | Get todo by ID |
| POST | `/api/todos` | Create new todo |
| PUT | `/api/todos/{id}` | Update existing todo |
| DELETE | `/api/todos/{id}` | Delete todo |
| GET | `/api/todos/filter` | Get filtered todos |


## Backend Testing
```bash
cd backend/TodoApp.Tests
dotnet test
```
