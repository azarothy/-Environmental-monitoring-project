"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { SidebarNav } from "@/components/sidebar-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Flame, Radio, CheckCircle2, Clock, MapPin, Search, Filter, Download, Bell } from "lucide-react"
import { mockAlerts } from "@/lib/mock-data"

export default function AlertsPage() {
  const [filter, setFilter] = useState<"all" | "active" | "resolved">("all")

  const filteredAlerts = mockAlerts.filter((alert) => {
    if (filter === "all") return true
    return alert.status === filter
  })

  const activeAlerts = mockAlerts.filter((a) => a.status === "active")
  const resolvedAlerts = mockAlerts.filter((a) => a.status === "resolved")

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
            <h2 className="text-3xl font-bold tracking-tight">Gerenciamento de Alertas</h2>
            <p className="text-muted-foreground">Sistema de notificação e acompanhamento de eventos</p>
          </div>

          {/* Summary Cards */}
          <div className="grid gap-4 md:grid-cols-3 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Alertas Ativos</CardTitle>
                <Bell className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">{activeAlerts.length}</div>
                <p className="text-xs text-muted-foreground">Requerem atenção imediata</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Resolvidos Hoje</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-success" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">{resolvedAlerts.length}</div>
                <p className="text-xs text-muted-foreground">Últimas 24 horas</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tempo Médio de Resposta</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18 min</div>
                <p className="text-xs text-muted-foreground">Média da última semana</p>
              </CardContent>
            </Card>
          </div>

          {/* Actions Bar */}
          <div className="flex items-center gap-3 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar alertas..." className="pl-9" />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>

          {/* Alerts Tabs */}
          <Tabs defaultValue="all" onValueChange={(v) => setFilter(v as any)}>
            <TabsList>
              <TabsTrigger value="all">Todos ({mockAlerts.length})</TabsTrigger>
              <TabsTrigger value="active">Ativos ({activeAlerts.length})</TabsTrigger>
              <TabsTrigger value="resolved">Resolvidos ({resolvedAlerts.length})</TabsTrigger>
            </TabsList>

            <TabsContent value={filter} className="space-y-4 mt-6">
              {filteredAlerts.length === 0 ? (
                <Card>
                  <CardContent className="p-12">
                    <div className="flex flex-col items-center justify-center text-center">
                      <CheckCircle2 className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Nenhum Alerta</h3>
                      <p className="text-muted-foreground">Não há alertas para exibir no momento</p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                filteredAlerts.map((alert) => (
                  <Card key={alert.id} className={alert.status === "active" ? "border-destructive/50" : ""}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <div
                            className={`p-3 rounded-lg ${
                              alert.severity === "critical"
                                ? "bg-destructive text-destructive-foreground"
                                : alert.severity === "high"
                                  ? "bg-destructive/80 text-destructive-foreground"
                                  : alert.severity === "medium"
                                    ? "bg-warning text-warning-foreground"
                                    : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {alert.type === "fire" ? (
                              <Flame className="h-5 w-5" />
                            ) : alert.type === "sensor" ? (
                              <Radio className="h-5 w-5" />
                            ) : (
                              <AlertTriangle className="h-5 w-5" />
                            )}
                          </div>

                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="text-lg font-semibold">{alert.title}</h3>
                                  <Badge
                                    variant={
                                      alert.severity === "critical" || alert.severity === "high"
                                        ? "destructive"
                                        : alert.severity === "medium"
                                          ? "secondary"
                                          : "default"
                                    }
                                  >
                                    {alert.severity === "critical"
                                      ? "Crítico"
                                      : alert.severity === "high"
                                        ? "Alto"
                                        : alert.severity === "medium"
                                          ? "Médio"
                                          : "Baixo"}
                                  </Badge>
                                  <Badge variant={alert.status === "active" ? "destructive" : "secondary"}>
                                    {alert.status === "active" ? "Ativo" : "Resolvido"}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">{alert.message}</p>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                              {alert.location && (
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {alert.location}
                                </div>
                              )}
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {alert.timestamp.toLocaleString("pt-BR")}
                              </div>
                              {alert.resolvedAt && (
                                <div className="flex items-center gap-1 text-success">
                                  <CheckCircle2 className="h-3 w-3" />
                                  Resolvido em {alert.resolvedAt.toLocaleString("pt-BR")}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2 ml-4">
                          {alert.status === "active" ? (
                            <>
                              <Button variant="outline" size="sm">
                                Ver Detalhes
                              </Button>
                              <Button variant="default" size="sm">
                                Resolver
                              </Button>
                            </>
                          ) : (
                            <Button variant="outline" size="sm">
                              Ver Relatório
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
