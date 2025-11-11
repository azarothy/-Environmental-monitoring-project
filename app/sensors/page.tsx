import { Header } from "@/components/header"
import { SidebarNav } from "@/components/sidebar-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Radio,
  Thermometer,
  Droplets,
  Gauge,
  Cloud,
  MapPin,
  Clock,
  Activity,
  Search,
  Filter,
  Plus,
  RefreshCw,
} from "lucide-react"
import { mockSensors } from "@/lib/mock-data"

export default function SensorsPage() {
  const onlineSensors = mockSensors.filter((s) => s.status === "online")
  const warningSensors = mockSensors.filter((s) => s.status === "warning")
  const offlineSensors = mockSensors.filter((s) => s.status === "offline")

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r bg-card">
        <div className="h-16 flex items-center px-6 border-b">
          <h2 className="font-semibold">Navegação</h2>
        </div>
        <SidebarNav />
      </aside>

      <div className="flex-1">
        <Header />

        <main className="p-6">
          <div className="mb-6">
            <h2 className="text-3xl font-bold tracking-tight">Gerenciamento de Sensores</h2>
            <p className="text-muted-foreground">Monitor e controle de todos os sensores da rede</p>
          </div>

          {/* Summary Cards */}
          <div className="grid gap-4 md:grid-cols-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Sensores</CardTitle>
                <Radio className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockSensors.length}</div>
                <p className="text-xs text-muted-foreground">Dispositivos registrados</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Online</CardTitle>
                <Activity className="h-4 w-4 text-success" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">{onlineSensors.length}</div>
                <p className="text-xs text-muted-foreground">Funcionando normalmente</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Aviso</CardTitle>
                <Activity className="h-4 w-4 text-warning" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-warning">{warningSensors.length}</div>
                <p className="text-xs text-muted-foreground">Requerem atenção</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Offline</CardTitle>
                <Activity className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">{offlineSensors.length}</div>
                <p className="text-xs text-muted-foreground">Sem comunicação</p>
              </CardContent>
            </Card>
          </div>

          {/* Actions Bar */}
          <div className="flex items-center gap-3 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar sensores..." className="pl-9" />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Atualizar
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Sensor
            </Button>
          </div>

          {/* Sensors List */}
          <div className="space-y-4">
            {mockSensors.map((sensor) => (
              <Card key={sensor.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div
                        className={`p-3 rounded-lg ${
                          sensor.status === "online"
                            ? "bg-success/10 text-success"
                            : sensor.status === "warning"
                              ? "bg-warning/10 text-warning"
                              : "bg-destructive/10 text-destructive"
                        }`}
                      >
                        <Radio className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold">{sensor.name}</h3>
                          <Badge
                            variant={
                              sensor.status === "online"
                                ? "default"
                                : sensor.status === "warning"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {sensor.status === "online" ? "Online" : sensor.status === "warning" ? "Aviso" : "Offline"}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          {sensor.location}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <Clock className="h-3 w-3" />
                          Última atualização: {sensor.lastUpdate.toLocaleString("pt-BR")}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Detalhes
                      </Button>
                      <Button variant="outline" size="sm">
                        Configurar
                      </Button>
                    </div>
                  </div>

                  {sensor.status !== "offline" && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Thermometer className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Temperatura</p>
                          <p className="text-sm font-bold">{sensor.readings.temperature.toFixed(1)}°C</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Droplets className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Umidade</p>
                          <p className="text-sm font-bold">{sensor.readings.humidity.toFixed(0)}%</p>
                        </div>
                      </div>

                      {sensor.readings.pressure && (
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <Gauge className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Pressão</p>
                            <p className="text-sm font-bold">{sensor.readings.pressure} hPa</p>
                          </div>
                        </div>
                      )}

                      {sensor.readings.smokeLevel !== undefined && (
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2 rounded-lg ${
                              sensor.readings.smokeLevel > 50 ? "bg-warning/10" : "bg-primary/10"
                            }`}
                          >
                            <Cloud
                              className={`h-4 w-4 ${sensor.readings.smokeLevel > 50 ? "text-warning" : "text-primary"}`}
                            />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Fumaça</p>
                            <p className="text-sm font-bold">{sensor.readings.smokeLevel}%</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {sensor.status === "offline" && (
                    <div className="pt-4 border-t">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-destructive/10 text-destructive">
                        <span className="text-sm">Sensor sem comunicação há mais de 1 hora</span>
                        <Button variant="destructive" size="sm">
                          Verificar Conexão
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
