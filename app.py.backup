from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import psutil
import platform
import time
from datetime import datetime
from typing import Dict, List, Any

app = FastAPI(
    title="System Dashboard API",
    description="Real-time system monitoring dashboard with FastAPI backend",
    version="2.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Add CORS middleware for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # React dev server
        "http://localhost:5173",  # Vite dev server
        "http://localhost:5174",  # Vite dev server (alternative port)
        "http://localhost:5175",  # Vite dev server (alternative port)
        "http://localhost:5176",  # Vite dev server (alternative port)
        "http://localhost:5177",  # Vite dev server (alternative port)
        "http://localhost:5178",  # Vite dev server (alternative port)
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
        "http://127.0.0.1:5175",
        "http://127.0.0.1:5176",
        "http://127.0.0.1:5177",
        "http://127.0.0.1:5178",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    """Root endpoint - API information"""
    return {
        "message": "System Dashboard API",
        "version": "2.0.0",
        "docs": "/docs",
        "health": "/api/health"
    }

@app.get("/api/metrics", response_model=Dict[str, Any])
async def get_metrics():
    """Get real-time system metrics including CPU, memory, disk, and network stats"""
    try:
        # CPU metrics
        cpu_percent = psutil.cpu_percent(interval=0.1)  # Reduced interval for faster response
        cpu_count = psutil.cpu_count()
        cpu_freq = psutil.cpu_freq()
        
        # Memory metrics
        memory = psutil.virtual_memory()
        swap = psutil.swap_memory()
        
        # Disk metrics - handle different OS paths
        try:
            disk = psutil.disk_usage('/')
        except:
            # Windows fallback
            disk = psutil.disk_usage('C:\\')
            
        disk_io = psutil.disk_io_counters()
        
        # Network metrics
        network = psutil.net_io_counters()
        
        # System info
        boot_time = datetime.fromtimestamp(psutil.boot_time())
        uptime = datetime.now() - boot_time
        
        # Process count
        process_count = len(psutil.pids())
        
        # Load average (Unix-like systems only)
        load_avg = None
        try:
            load_avg = psutil.getloadavg()
        except (AttributeError, OSError):
            # Windows doesn't have load average - simulate based on CPU
            load_avg = [
                round(cpu_percent / 100 * cpu_count, 2),
                round(cpu_percent / 100 * cpu_count * 0.8, 2),
                round(cpu_percent / 100 * cpu_count * 0.6, 2)
            ]
        
        metrics = {
            'cpu': {
                'usage': round(cpu_percent, 1),
                'count': cpu_count,
                'frequency': {
                    'current': round(cpu_freq.current if cpu_freq else 0, 0),
                    'max': round(cpu_freq.max if cpu_freq else 0, 0)
                }
            },
            'memory': {
                'total': round(memory.total / (1024**3), 2),
                'available': round(memory.available / (1024**3), 2),
                'used': round(memory.used / (1024**3), 2),
                'usage': round(memory.percent, 1),
                'swap': {
                    'total': round(swap.total / (1024**3), 2),
                    'used': round(swap.used / (1024**3), 2),
                    'usage': round(swap.percent, 1)
                }
            },
            'disk': {
                'total': round(disk.total / (1024**3), 1),
                'used': round(disk.used / (1024**3), 1),
                'free': round(disk.free / (1024**3), 1),
                'usage': round((disk.used / disk.total) * 100, 1),
                'io': {
                    'read_bytes': disk_io.read_bytes if disk_io else 0,
                    'write_bytes': disk_io.write_bytes if disk_io else 0
                }
            },
            'network': {
                'bytes_sent': network.bytes_sent,
                'bytes_recv': network.bytes_recv,
                'packets_sent': network.packets_sent,
                'packets_recv': network.packets_recv
            },
            'system': {
                'os': f"{platform.system()} {platform.release()}",
                'architecture': platform.architecture()[0],
                'processor': platform.processor() or platform.machine(),
                'hostname': platform.node(),
                'uptime': str(uptime).split('.')[0],
                'boot_time': boot_time.strftime('%Y-%m-%d %H:%M:%S'),
                'load_average': [round(x, 2) for x in load_avg] if load_avg else [0, 0, 0],
                'processes': process_count
            },
            'timestamp': datetime.now().isoformat()
        }
        
        return metrics
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch metrics: {str(e)}")

@app.get("/api/processes", response_model=List[Dict[str, Any]])
async def get_processes():
    """Get list of running processes sorted by CPU usage"""
    try:
        processes = []
        for proc in psutil.process_iter(['pid', 'name', 'cpu_percent', 'memory_percent', 'status']):
            try:
                proc_info = proc.info
                # Ensure cpu_percent is not None
                if proc_info['cpu_percent'] is None:
                    proc_info['cpu_percent'] = 0.0
                processes.append(proc_info)
            except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
                pass
        
        # Sort by CPU usage and return top 15
        processes = sorted(processes, key=lambda x: x['cpu_percent'] or 0, reverse=True)[:15]
        
        return processes
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch processes: {str(e)}")

@app.get("/api/network-stats", response_model=Dict[str, Any])
async def get_network_stats():
    """Get network interface statistics"""
    try:
        # Get network interface statistics
        net_if_stats = psutil.net_if_stats()
        net_if_addrs = psutil.net_if_addrs()
        
        interfaces = {}
        for interface, stats in net_if_stats.items():
            if interface != 'lo' and stats.isup:  # Skip loopback and down interfaces
                interfaces[interface] = {
                    'isup': stats.isup,
                    'speed': stats.speed,
                    'mtu': stats.mtu,
                    'addresses': []
                }
                
                if interface in net_if_addrs:
                    for addr in net_if_addrs[interface]:
                        interfaces[interface]['addresses'].append({
                            'family': str(addr.family),
                            'address': addr.address,
                            'netmask': addr.netmask
                        })
        
        return interfaces
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch network stats: {str(e)}")

@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "version": "2.0.0"
    }

# For development only
if __name__ == '__main__':
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=5000, reload=True)