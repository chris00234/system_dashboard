export interface SystemMetrics {
  cpu: {
    usage: number;
    count: number;
    frequency: {
      current: number;
      max: number;
    };
  };
  memory: {
    total: number;
    available: number;
    used: number;
    usage: number;
    swap: {
      total: number;
      used: number;
      usage: number;
    };
  };
  disk: {
    total: number;
    used: number;
    free: number;
    usage: number;
    io: {
      read_bytes: number;
      write_bytes: number;
    };
  };
  network: {
    bytes_sent: number;
    bytes_recv: number;
    packets_sent: number;
    packets_recv: number;
  };
  system: {
    os: string;
    architecture: string;
    processor: string;
    hostname: string;
    uptime: string;
    boot_time: string;
    load_average: number[];
    processes: number;
  };
  timestamp: string;
}

export interface Process {
  pid: number;
  name: string;
  cpu_percent: number;
  memory_percent: number;
  status: string;
}

export interface ConnectionStatus {
  connected: boolean;
}