import { Header } from "@/components/header"
import { SidebarNav } from "@/components/sidebar-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Thermometer, Droplets, Flame, Radio, AlertTriangle, MapPin, TrendingUp, Clock } from "lucide-react"
import { mockSensors, mockFireDetections, mockAlerts, generateHistoricalData } from "@/lib/mock-data"

export default function DashboardPage() {
  const activeSensors = mockSensors.filter((s) => s.status === "online").length
  const totalSensors = mockSensors.length
  const activeFires = mockFireDetections.filter((f) => f.status === "active").length
  const activeAlerts = mockAlerts.filter((a) => a.status === "active").length

  const avgTemperature = (
    mockSensors.filter((s) => s.status !== "offline").reduce((sum, s) => sum + s.readings.temperature, 0) /
    mockSensors.filter((s) => s.status !== "offline").length
  ).toFixed(1)

  const avgHumidity = (
    mockSensors.filter((s) => s.status !== "offline").reduce((sum, s) => sum + s.readings.humidity, 0) /
    mockSensors.filter((s) => s.status !== "offline").length
  ).toFixed(1)

  const recentAlerts = mockAlerts.slice(0, 3)
  const criticalSensors = mockSensors.filter((s) => s.status === "warning" || s.status === "offline")

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
            <h2 className="text-3xl font-bold tracking-tight">Dashboard Principal</h2>
            <p className="text-muted-foreground">Visão geral do sistema de monitoramento</p>
          </div>

          {/* Main Stats */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Temperatura Média</CardTitle>
                <Thermometer className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{avgTemperature}°C</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-warning">+2.3°C</span> desde ontem
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Umidade do Ar</CardTitle>
                <Droplets className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{avgHumidity}%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-success">-5%</span> desde ontem
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Focos de Calor</CardTitle>
                <Flame className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeFires}</div>
                <p className="text-xs text-muted-foreground">
                  {activeFires > 0 ? (
                    <span className="text-destructive">Focos ativos detectados</span>
                  ) : (
                    <span className="text-success">Nenhum foco ativo</span>
                  )}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Status de Rede</CardTitle>
                <Radio className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {activeSensors}/{totalSensors}
                </div>
                <p className="text-xs text-muted-foreground">Sensores online</p>
              </CardContent>
            </Card>
          </div>

          {/* Alerts and Sensors Status */}
          <div className="grid gap-4 md:grid-cols-2 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Alertas Ativos
                  {activeAlerts > 0 && <Badge variant="destructive">{activeAlerts}</Badge>}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentAlerts.map((alert) => (
                    <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg border">
                      <div
                        className={`p-2 rounded-lg ${
                          alert.severity === "critical" || alert.severity === "high"
                            ? "bg-destructive/10 text-destructive"
                            : alert.severity === "medium"
                              ? "bg-warning/10 text-warning-foreground"
                              : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {alert.type === "fire" ? <Flame className="h-4 w-4" /> : <Radio className="h-4 w-4" />}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{alert.title}</p>
                          <Badge variant={alert.status === "active" ? "destructive" : "secondary"}>
                            {alert.status === "active" ? "Ativo" : "Resolvido"}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{alert.message}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {alert.timestamp.toLocaleTimeString("pt-BR")}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4 bg-transparent">
                  Ver Todos os Alertas
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Sensores Críticos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {criticalSensors.map((sensor) => (
                    <div key={sensor.id} className="flex items-center gap-3 p-3 rounded-lg border">
                      <div
                        className={`h-3 w-3 rounded-full ${
                          sensor.status === "warning" ? "bg-warning animate-pulse" : "bg-muted-foreground"
                        }`}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{sensor.name}</p>
                        <p className="text-xs text-muted-foreground">{sensor.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold">
                          {sensor.status === "warning" ? `${sensor.readings.temperature}°C` : "Offline"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {sensor.status === "warning" ? "Alta temp." : "Sem conexão"}
                        </p>
                      </div>
                    </div>
                  ))}
                  {criticalSensors.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <p className="text-sm">Todos os sensores operando normalmente</p>
                    </div>
                  )}
                </div>
                <Button variant="outline" className="w-full mt-4 bg-transparent">
                  Ver Todos os Sensores
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Mini Charts Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Evolução da Temperatura (24h)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-end justify-between gap-1">
                {generateHistoricalData(24).map((data, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-primary/20 rounded-t hover:bg-primary/40 transition-colors cursor-pointer"
                    style={{
                      height: `${(data.temperature / 50) * 100}%`,
                      minHeight: "4px",
                    }}
                    title={`${data.temperature.toFixed(1)}°C`}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-4 text-xs text-muted-foreground">
                <span>24h atrás</span>
                <span>12h atrás</span>
                <span>Agora</span>
              </div>
            </CardContent>
          </Card>

          {/* Last Update */}
          <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground">
            <p>Última atualização: {new Date().toLocaleString("pt-BR")}</p>
            <Button variant="outline" size="sm">
              <Clock className="h-4 w-4 mr-2" />
              Atualizar Dados
            </Button>
          </div>
        </main>
      </div>
    </div>
  )
}
