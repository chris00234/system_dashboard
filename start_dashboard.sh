#\!/bin/bash
# System Dashboard Startup Script

cd /var/www/system_dashboard

# Activate virtual environment
. venv/bin/activate

# Install dependencies if needed
pip install -r requirements.txt

# Start FastAPI server on port 8001
exec uvicorn app:app --host 0.0.0.0 --port 8001
