# System Dashboard

A modern full-stack real-time system monitoring dashboard built with React + TypeScript + Tailwind CSS frontend and FastAPI backend.

## 🏗️ Architecture

- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS
- **Backend**: FastAPI + psutil 
- **Styling**: Modern Tailwind CSS with glass-morphism design
- **Real-time Updates**: Auto-refresh every 2 seconds
- **API Communication**: RESTful API with CORS support

## ✨ Features

### Frontend Features
- **Modern React Components**: TypeScript-powered modular architecture
- **Tailwind CSS Styling**: Utility-first CSS with custom components
- **Glass-morphism Design**: Modern UI with backdrop blur effects
- **Responsive Layout**: Mobile-first design that works on all devices
- **Real-time Connection Status**: Visual indicator for API connectivity
- **Smooth Animations**: CSS transitions and hover effects

### System Monitoring
- **CPU Metrics**: Usage, cores, frequency with circular progress charts
- **Memory Usage**: RAM and swap usage with visual indicators
- **Disk Space**: Storage usage and availability
- **Network Statistics**: Bytes/packets sent and received
- **Process Monitoring**: Top CPU-consuming processes
- **System Information**: OS, architecture, uptime, load average

### Interactive Dashboard
- **Multi-section Navigation**: Overview, Performance, Processes, System Info
- **Real-time Charts**: Visual representation of system metrics
- **Auto-refresh**: Updates every 2 seconds with connection status
- **Error Handling**: Graceful handling of API failures

## 🚀 Installation & Setup

### Prerequisites
- Python 3.8+ 
- Node.js 18+
- npm or yarn

### Backend Setup

1. **Install Python dependencies**:
```bash
pip install -r requirements.txt
```

2. **Start the FastAPI backend**:
```bash
# Option 1: Using uvicorn directly
uvicorn app:app --host 0.0.0.0 --port 5000 --reload

# Option 2: Using Python
python app.py
```

3. **Backend will be available at**:
- API: `http://localhost:5000`
- API Docs: `http://localhost:5000/docs`
- Health Check: `http://localhost:5000/api/health`

### Frontend Setup

1. **Navigate to frontend directory**:
```bash
cd frontend
```

2. **Install Node.js dependencies**:
```bash
npm install
```

3. **Start the React development server**:
```bash
npm run dev
```

4. **Frontend will be available at**:
- React App: `http://localhost:5173`

## 🛠️ Development

### Project Structure
```
system_dashboard/
├── app.py                 # FastAPI backend
├── requirements.txt       # Python dependencies
├── README.md             # This file
└── frontend/             # React frontend
    ├── src/
    │   ├── components/   # React components
    │   ├── services/     # API services
    │   ├── types/        # TypeScript types
    │   ├── App.tsx       # Main app component
    │   └── main.tsx      # Entry point
    ├── package.json      # Node.js dependencies
    ├── tailwind.config.js # Tailwind configuration
    ├── postcss.config.js  # PostCSS configuration
    └── vite.config.ts     # Vite configuration
```

### Available Scripts

**Backend**:
```bash
# Start development server
uvicorn app:app --reload

# Start with custom host/port
uvicorn app:app --host 0.0.0.0 --port 8000 --reload
```

**Frontend**:
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🔌 API Endpoints

### System Metrics
- `GET /api/metrics` - Real-time system metrics (CPU, memory, disk, network)
- `GET /api/processes` - Top processes by CPU usage
- `GET /api/network-stats` - Network interface statistics
- `GET /api/health` - API health check

### API Documentation
- Interactive API docs available at `/docs` (Swagger UI)
- Alternative docs at `/redoc` (ReDoc)

## 🎯 Tech Stack

### Backend
- **FastAPI** - Modern, fast web framework for building APIs
- **psutil** - Cross-platform library for system and process utilities
- **uvicorn** - ASGI server for FastAPI
- **Python 3.8+** - Programming language

### Frontend
- **React 18** - UI library with hooks and modern patterns
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **Lucide React** - Modern icon library

## 🔧 Configuration

### Backend Configuration
The FastAPI backend is configured with:
- CORS enabled for frontend origins
- Auto-generated API documentation
- Error handling and validation
- Real-time system metrics collection

### Frontend Configuration
The React frontend includes:
- TypeScript for type safety
- Tailwind CSS for styling
- PostCSS for CSS processing
- Vite for fast development and building

## 📱 Screenshots

The modern dashboard displays:
- **Overview**: Main metrics with circular progress indicators
- **Performance**: Charts and load average visualization
- **Processes**: Real-time process monitoring
- **System Info**: Detailed system information cards

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test both frontend and backend
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🔗 Development URLs

- **React Frontend**: http://localhost:5173
- **FastAPI Backend**: http://localhost:5000
- **API Documentation**: http://localhost:5000/docs
- **API Health Check**: http://localhost:5000/api/health