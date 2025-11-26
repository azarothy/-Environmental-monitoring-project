"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { SidebarNav } from "@/components/sidebar-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Clock,
  Calendar,
  Thermometer,
  Droplets,
  Flame,
  Radio,
  Search,
  Filter,
  Download,
  TrendingUp,
} from "lucide-react"
import { generateHistoricalData } from "@/lib/mock-data"

export default function HistoryPage() {
  const [period, setPeriod] = useState<"24h" | "7d" | "30d">("7d")

  const historicalData = generateHistoricalData(period === "24h" ? 24 : period === "7d" ? 168 : 720)

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
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Histórico de Dados</h2>
              <p className="text-muted-foreground">Registros históricos de sensores e eventos</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Selecionar Período
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>

          {/* Period Selector */}
          <div className="flex gap-2 mb-6">
            <Button variant={period === "24h" ? "default" : "outline"} onClick={() => setPeriod("24h")}>
              Últimas 24h
            </Button>
            <Button variant={period === "7d" ? "default" : "outline"} onClick={() => setPeriod("7d")}>
              Últimos 7 dias
            </Button>
            <Button variant={period === "30d" ? "default" : "outline"} onClick={() => setPeriod("30d")}>
              Últimos 30 dias
            </Button>
          </div>

          {/* Summary Stats */}
          <div className="grid gap-4 md:grid-cols-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Registros Totais</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{historicalData.length}</div>
                <p className="text-xs text-muted-foreground">Leituras registradas</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Temp. Máxima</CardTitle>
                <Thermometer className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">
                  {Math.max(...historicalData.map((d) => d.temperature)).toFixed(1)}°C
                </div>
                <p className="text-xs text-muted-foreground">Pico registrado</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Umidade Mínima</CardTitle>
                <Droplets className="h-4 w-4 text-warning" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-warning">
                  {Math.min(...historicalData.map((d) => d.humidity)).toFixed(0)}%
                </div>
                <p className="text-xs text-muted-foreground">Mínimo registrado</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Eventos Críticos</CardTitle>
                <Flame className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">No período selecionado</p>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <div className="flex items-center gap-3 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar eventos..." className="pl-9" />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtros Avançados
            </Button>
          </div>

          {/* Historical Events Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Linha do Tempo de Eventos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Event 1 */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="p-2 rounded-lg bg-destructive/10 text-destructive">
                      <Flame className="h-4 w-4" />
                    </div>
                    <div className="w-px h-full bg-border mt-2" />
                  </div>
                  <div className="flex-1 pb-6">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">Foco de Calor Detectado</h4>
                          <Badge variant="destructive">Crítico</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Temperatura de 45.2°C registrada no Sensor Sudoeste - Iranduba
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">Há 2 horas</span>
                    </div>
                    <div className="flex gap-4 text-xs text-muted-foreground">
                      <span>Zona Sudoeste - Iranduba</span>
                      <span>•</span>
                      <span>Resolvido em 30 minutos</span>
                    </div>
                  </div>
                </div>

                {/* Event 2 */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="p-2 rounded-lg bg-warning/10 text-warning">
                      <Thermometer className="h-4 w-4" />
                    </div>
                    <div className="w-px h-full bg-border mt-2" />
                  </div>
                  <div className="flex-1 pb-6">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">Temperatura Elevada</h4>
                          <Badge variant="secondary">Médio</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Múltiplos sensores registraram temperaturas acima de 38°C
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">Há 5 horas</span>
                    </div>
                    <div className="flex gap-4 text-xs text-muted-foreground">
                      <span>3 sensores afetados</span>
                      <span>•</span>
                      <span>Duração: 2h 15min</span>
                    </div>
                  </div>
                </div>

                {/* Event 3 */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="p-2 rounded-lg bg-muted text-muted-foreground">
                      <Radio className="h-4 w-4" />
                    </div>
                    <div className="w-px h-full bg-border mt-2" />
                  </div>
                  <div className="flex-1 pb-6">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">Sensor Reconectado</h4>
                          <Badge>Informativo</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Sensor Mata Sudoeste restabeleceu conexão após manutenção
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">Há 8 horas</span>
                    </div>
                    <div className="flex gap-4 text-xs text-muted-foreground">
                      <span>Zona Sudoeste - Aldeia YUKURO</span>
                      <span>•</span>
                      <span>Tempo offline: 4 minutos</span>
                    </div>
                  </div>
                </div>

                {/* Event 4 */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <TrendingUp className="h-4 w-4" />
                    </div>
                    <div className="w-px h-full bg-border mt-2" />
                  </div>
                  <div className="flex-1 pb-6">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">Análise Diária Completa</h4>
                          <Badge>Informativo</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Relatório automático gerado com estatísticas do período
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">Há 12 horas</span>
                    </div>
                    <div className="flex gap-4 text-xs text-muted-foreground">
                      <span>144 leituras processadas</span>
                      <span>•</span>
                      <span>Disponível para download</span>
                    </div>
                  </div>
                </div>

                {/* Event 5 */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="p-2 rounded-lg bg-success/10 text-success">
                      <Droplets className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">Umidade Normalizada</h4>
                          <Badge variant="secondary">Baixo</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Níveis de umidade retornaram ao padrão em todas as áreas
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">Há 18 horas</span>
                    </div>
                    <div className="flex gap-4 text-xs text-muted-foreground">
                      <span>Todas as zonas</span>
                      <span>•</span>
                      <span>Umidade média: 42%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
