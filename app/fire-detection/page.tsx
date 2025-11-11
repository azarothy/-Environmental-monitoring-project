import { Header } from "@/components/header"
import { SidebarNav } from "@/components/sidebar-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Flame,
  MapPin,
  Clock,
  Thermometer,
  TrendingUp,
  Search,
  Filter,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react"
import { mockFireDetections } from "@/lib/mock-data"

export default function FireDetectionPage() {
  const activeFires = mockFireDetections.filter((f) => f.status === "active")
  const resolvedFires = mockFireDetections.filter((f) => f.status === "resolved")

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
            <h2 className="text-3xl font-bold tracking-tight">Detecção de Queimadas</h2>
            <p className="text-muted-foreground">Monitoramento de focos de calor e incêndios ativos</p>
          </div>

          {/* Summary Cards */}
          <div className="grid gap-4 md:grid-cols-3 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Focos Ativos</CardTitle>
                <Flame className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">{activeFires.length}</div>
                <p className="text-xs text-muted-foreground">Queimadas em andamento</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Focos Resolvidos</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-success" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">{resolvedFires.length}</div>
                <p className="text-xs text-muted-foreground">Últimas 24 horas</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Área Afetada</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeFires.reduce((sum, f) => sum + (f.area || 0), 0)} m²</div>
                <p className="text-xs text-muted-foreground">Área total estimada</p>
              </CardContent>
            </Card>
          </div>

          {/* Actions Bar */}
          <div className="flex items-center gap-3 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar detecções..." className="pl-9" />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Atualizar
            </Button>
          </div>

          {/* Active Fires Section */}
          {activeFires.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                <h3 className="text-xl font-semibold">Focos Ativos</h3>
                <Badge variant="destructive">{activeFires.length}</Badge>
              </div>

              <div className="space-y-4">
                {activeFires.map((fire) => (
                  <Card key={fire.id} className="border-destructive/50">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-4">
                          <div className="p-3 rounded-lg bg-destructive/10 text-destructive">
                            <Flame className="h-6 w-6 animate-pulse" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-lg font-semibold">Foco de Calor Detectado</h4>
                              <Badge
                                variant={
                                  fire.severity === "critical"
                                    ? "destructive"
                                    : fire.severity === "high"
                                      ? "destructive"
                                      : fire.severity === "medium"
                                        ? "secondary"
                                        : "default"
                                }
                              >
                                {fire.severity === "critical"
                                  ? "Crítico"
                                  : fire.severity === "high"
                                    ? "Alto"
                                    : fire.severity === "medium"
                                      ? "Médio"
                                      : "Baixo"}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                              <MapPin className="h-4 w-4" />
                              {fire.location}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              Detectado há {Math.floor((Date.now() - fire.detectedAt.getTime()) / 1000 / 60)} minutos
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Ver no Mapa
                          </Button>
                          <Button variant="destructive" size="sm">
                            Acionar Equipe
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-destructive/10">
                            <Thermometer className="h-4 w-4 text-destructive" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Temperatura</p>
                            <p className="text-sm font-bold">{fire.temperature.toFixed(1)}°C</p>
                          </div>
                        </div>

                        {fire.area && (
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-destructive/10">
                              <TrendingUp className="h-4 w-4 text-destructive" />
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Área Estimada</p>
                              <p className="text-sm font-bold">{fire.area} m²</p>
                            </div>
                          </div>
                        )}

                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-destructive/10">
                            <MapPin className="h-4 w-4 text-destructive" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Coordenadas</p>
                            <p className="text-xs font-mono">
                              {fire.coordinates.lat.toFixed(4)}, {fire.coordinates.lng.toFixed(4)}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 p-3 rounded-lg bg-destructive/10 text-destructive">
                        <p className="text-sm font-medium">⚠️ Condições críticas detectadas - Ação imediata requerida</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Resolved Fires Section */}
          {resolvedFires.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="h-5 w-5 text-success" />
                <h3 className="text-xl font-semibold">Focos Resolvidos</h3>
              </div>

              <div className="space-y-4">
                {resolvedFires.map((fire) => (
                  <Card key={fire.id} className="opacity-75">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="p-3 rounded-lg bg-success/10 text-success">
                            <CheckCircle2 className="h-6 w-6" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-lg font-semibold">Foco Controlado</h4>
                              <Badge variant="secondary">Resolvido</Badge>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                              <MapPin className="h-4 w-4" />
                              {fire.location}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              Detectado: {fire.detectedAt.toLocaleString("pt-BR")}
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Ver Relatório
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* No Active Fires Message */}
          {activeFires.length === 0 && (
            <Card>
              <CardContent className="p-12">
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="p-4 rounded-full bg-success/10 text-success mb-4">
                    <CheckCircle2 className="h-12 w-12" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Nenhum Foco Ativo</h3>
                  <p className="text-muted-foreground">Todos os sensores estão reportando condições normais</p>
                </div>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  )
}
