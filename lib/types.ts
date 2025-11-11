// Types for the wildfire monitoring system

export interface Sensor {
  id: string
  name: string
  location: string
  coordinates: {
    lat: number
    lng: number
  }
  status: "online" | "offline" | "warning"
  lastUpdate: Date
  readings: {
    temperature: number
    humidity: number
    pressure?: number
    smokeLevel?: number
  }
}

export interface FireDetection {
  id: string
  sensorId: string
  location: string
  coordinates: {
    lat: number
    lng: number
  }
  severity: "low" | "medium" | "high" | "critical"
  detectedAt: Date
  temperature: number
  area?: number
  status: "active" | "resolved"
}

export interface Alert {
  id: string
  type: "fire" | "sensor" | "system"
  title: string
  message: string
  severity: "low" | "medium" | "high" | "critical"
  timestamp: Date
  sensorId?: string
  location?: string
  coordinates?: {
    lat: number
    lng: number
  }
  status: "active" | "resolved"
  resolvedAt?: Date
}

export interface SystemLog {
  id: string
  type: "info" | "warning" | "error" | "success"
  message: string
  timestamp: Date
  details?: string
  userId?: string
}

export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "operator" | "viewer"
  createdAt: Date
  lastLogin?: Date
}
