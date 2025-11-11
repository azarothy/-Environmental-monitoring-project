// Mock data for demonstration - will be replaced with real sensor data

import type { Sensor, FireDetection, Alert, SystemLog, User } from "./types"

export const mockSensors: Sensor[] = [
  {
    id: "sensor-001",
    name: "Sensor Floresta Norte",
    location: "Zona Norte - Área Florestal",
    coordinates: { lat: -15.7801, lng: -47.9292 },
    status: "online",
    lastUpdate: new Date(),
    readings: {
      temperature: 28.5,
      humidity: 45,
      pressure: 1013,
      smokeLevel: 12,
    },
  },
  {
    id: "sensor-002",
    name: "Sensor Cerrado Sul",
    location: "Zona Sul - Cerrado",
    coordinates: { lat: -15.8267, lng: -47.9218 },
    status: "warning",
    lastUpdate: new Date(Date.now() - 120000),
    readings: {
      temperature: 42.8,
      humidity: 22,
      pressure: 1011,
      smokeLevel: 68,
    },
  },
  {
    id: "sensor-003",
    name: "Sensor Parque Central",
    location: "Centro - Parque Urbano",
    coordinates: { lat: -15.7942, lng: -47.8822 },
    status: "online",
    lastUpdate: new Date(),
    readings: {
      temperature: 32.1,
      humidity: 38,
      pressure: 1012,
      smokeLevel: 18,
    },
  },
  {
    id: "sensor-004",
    name: "Sensor Reserva Leste",
    location: "Zona Leste - Reserva Ambiental",
    coordinates: { lat: -15.7698, lng: -47.8695 },
    status: "online",
    lastUpdate: new Date(),
    readings: {
      temperature: 30.2,
      humidity: 42,
      pressure: 1014,
      smokeLevel: 8,
    },
  },
  {
    id: "sensor-005",
    name: "Sensor Mata Oeste",
    location: "Zona Oeste - Mata Nativa",
    coordinates: { lat: -15.8156, lng: -47.9544 },
    status: "offline",
    lastUpdate: new Date(Date.now() - 3600000),
    readings: {
      temperature: 0,
      humidity: 0,
      pressure: 0,
      smokeLevel: 0,
    },
  },
]

export const mockFireDetections: FireDetection[] = [
  {
    id: "fire-001",
    sensorId: "sensor-002",
    location: "Zona Sul - Cerrado",
    coordinates: { lat: -15.8267, lng: -47.9218 },
    severity: "high",
    detectedAt: new Date(Date.now() - 300000),
    temperature: 42.8,
    area: 150,
    status: "active",
  },
  {
    id: "fire-002",
    sensorId: "sensor-003",
    location: "Centro - Parque Urbano",
    coordinates: { lat: -15.7942, lng: -47.8822 },
    severity: "medium",
    detectedAt: new Date(Date.now() - 1800000),
    temperature: 38.5,
    area: 45,
    status: "resolved",
  },
]

export const mockAlerts: Alert[] = [
  {
    id: "alert-001",
    type: "fire",
    title: "Temperatura Crítica Detectada",
    message: "Sensor Cerrado Sul registrou temperatura acima de 40°C",
    severity: "high",
    timestamp: new Date(Date.now() - 300000),
    sensorId: "sensor-002",
    location: "Zona Sul - Cerrado",
    coordinates: { lat: -15.8267, lng: -47.9218 },
    status: "active",
  },
  {
    id: "alert-002",
    type: "sensor",
    title: "Sensor Offline",
    message: "Sensor Mata Oeste não responde há mais de 1 hora",
    severity: "medium",
    timestamp: new Date(Date.now() - 3600000),
    sensorId: "sensor-005",
    location: "Zona Oeste - Mata Nativa",
    status: "active",
  },
  {
    id: "alert-003",
    type: "fire",
    title: "Foco de Calor Resolvido",
    message: "Temperatura normalizada no Parque Central",
    severity: "low",
    timestamp: new Date(Date.now() - 1800000),
    sensorId: "sensor-003",
    location: "Centro - Parque Urbano",
    status: "resolved",
    resolvedAt: new Date(Date.now() - 900000),
  },
]

export const mockSystemLogs: SystemLog[] = [
  {
    id: "log-001",
    type: "warning",
    message: "Sensor X reconectado",
    timestamp: new Date(Date.now() - 120000),
    details: "Sensor Cerrado Sul restabeleceu conexão após 2 minutos offline",
  },
  {
    id: "log-002",
    type: "error",
    message: "Falha de comunicação com nó LoRa",
    timestamp: new Date(Date.now() - 600000),
    details: "Gateway LoRa não respondeu à tentativa de sincronização",
  },
  {
    id: "log-003",
    type: "success",
    message: "Banco de dados sincronizado",
    timestamp: new Date(Date.now() - 900000),
    details: "127 registros sincronizados com sucesso",
  },
  {
    id: "log-004",
    type: "info",
    message: "Tentativa de login",
    timestamp: new Date(Date.now() - 1200000),
    details: "Usuário admin@sistema.com acessou o sistema",
    userId: "user-001",
  },
]

export const mockUsers: User[] = [
  {
    id: "user-001",
    name: "Admin Sistema",
    email: "admin@sistema.com",
    role: "admin",
    createdAt: new Date("2024-01-01"),
    lastLogin: new Date(),
  },
  {
    id: "user-002",
    name: "Operador Florestal",
    email: "operador@sistema.com",
    role: "operator",
    createdAt: new Date("2024-02-15"),
    lastLogin: new Date(Date.now() - 7200000),
  },
  {
    id: "user-003",
    name: "Visitante Técnico",
    email: "tecnico@sistema.com",
    role: "viewer",
    createdAt: new Date("2024-03-20"),
    lastLogin: new Date(Date.now() - 86400000),
  },
]

// Function to generate historical data for charts
export function generateHistoricalData(hours = 24) {
  const data = []
  const now = new Date()

  for (let i = hours; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000)
    data.push({
      timestamp,
      temperature: 25 + Math.random() * 15 + Math.sin(i / 4) * 5,
      humidity: 30 + Math.random() * 30,
      sensors: Math.floor(4 + Math.random() * 2),
    })
  }

  return data
}
