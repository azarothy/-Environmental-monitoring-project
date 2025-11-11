"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { SidebarNav } from "@/components/sidebar-nav"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ScrollText,
  Search,
  Filter,
  Download,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Info,
  AlertTriangle,
  Clock,
} from "lucide-react"
import { mockSystemLogs } from "@/lib/mock-data"

export default function SystemLogsPage() {
  const [filter, setFilter] = useState<"all" | "info" | "warning" | "error" | "success">("all")

  const filteredLogs = mockSystemLogs.filter((log) => {
    if (filter === "all") return true
    return log.type === filter
  })

  const errorLogs = mockSystemLogs.filter((l) => l.type === "error")
  const warningLogs = mockSystemLogs.filter((l) => l.type === "warning")
  const successLogs = mockSystemLogs.filter((l) => l.type === "success")
  const infoLogs = mockSystemLogs.filter((l) => l.type === "info")

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
              <h2 className="text-3xl font-bold tracking-tight">Logs do Sistema</h2>
              <p className="text-muted-foreground">Registro detalhado de todas as atividades e eventos</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Atualizar
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid gap-4 md:grid-cols-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Logs</CardTitle>
                <ScrollText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockSystemLogs.length}</div>
                <p className="text-xs text-muted-foreground">Últimas 24 horas</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Erros</CardTitle>
                <AlertCircle className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">{errorLogs.length}</div>
                <p className="text-xs text-muted-foreground">Requerem atenção</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avisos</CardTitle>
                <AlertTriangle className="h-4 w-4 text-warning" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-warning">{warningLogs.length}</div>
                <p className="text-xs text-muted-foreground">Monitoramento necessário</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sucesso</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-success" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">{successLogs.length}</div>
                <p className="text-xs text-muted-foreground">Operações bem-sucedidas</p>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <div className="flex items-center gap-3 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar nos logs..." className="pl-9" />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtros Avançados
            </Button>
          </div>

          {/* Logs Tabs */}
          <Tabs defaultValue="all" onValueChange={(v) => setFilter(v as any)}>
            <TabsList>
              <TabsTrigger value="all">Todos ({mockSystemLogs.length})</TabsTrigger>
              <TabsTrigger value="error">Erros ({errorLogs.length})</TabsTrigger>
              <TabsTrigger value="warning">Avisos ({warningLogs.length})</TabsTrigger>
              <TabsTrigger value="success">Sucesso ({successLogs.length})</TabsTrigger>
              <TabsTrigger value="info">Info ({infoLogs.length})</TabsTrigger>
            </TabsList>

            <TabsContent value={filter} className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Registro de Atividades</CardTitle>
                  <CardDescription>Visualização cronológica de eventos do sistema</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {filteredLogs.length === 0 ? (
                      <div className="text-center py-12 text-muted-foreground">
                        <ScrollText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Nenhum log encontrado para este filtro</p>
                      </div>
                    ) : (
                      filteredLogs.map((log) => (
                        <div
                          key={log.id}
                          className={`flex items-start gap-3 p-4 rounded-lg border ${
                            log.type === "error"
                              ? "border-destructive/50 bg-destructive/5"
                              : log.type === "warning"
                                ? "border-warning/50 bg-warning/5"
                                : log.type === "success"
                                  ? "border-success/50 bg-success/5"
                                  : "bg-muted/30"
                          }`}
                        >
                          <div
                            className={`p-2 rounded-lg ${
                              log.type === "error"
                                ? "bg-destructive/10 text-destructive"
                                : log.type === "warning"
                                  ? "bg-warning/10 text-warning"
                                  : log.type === "success"
                                    ? "bg-success/10 text-success"
                                    : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {log.type === "error" ? (
                              <AlertCircle className="h-4 w-4" />
                            ) : log.type === "warning" ? (
                              <AlertTriangle className="h-4 w-4" />
                            ) : log.type === "success" ? (
                              <CheckCircle2 className="h-4 w-4" />
                            ) : (
                              <Info className="h-4 w-4" />
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-medium text-sm">{log.message}</p>
                              <Badge
                                variant={
                                  log.type === "error"
                                    ? "destructive"
                                    : log.type === "warning"
                                      ? "secondary"
                                      : log.type === "success"
                                        ? "default"
                                        : "secondary"
                                }
                                className="text-xs"
                              >
                                {log.type === "error"
                                  ? "Erro"
                                  : log.type === "warning"
                                    ? "Aviso"
                                    : log.type === "success"
                                      ? "Sucesso"
                                      : "Info"}
                              </Badge>
                            </div>
                            {log.details && <p className="text-sm text-muted-foreground mb-2">{log.details}</p>}
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {log.timestamp.toLocaleString("pt-BR")}
                              </span>
                              {log.userId && <span className="font-mono">ID: {log.userId}</span>}
                            </div>
                          </div>

                          <Button variant="ghost" size="sm">
                            Detalhes
                          </Button>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* System Health */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Status do Sistema</CardTitle>
              <CardDescription>Saúde geral e métricas de performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">CPU</span>
                    <Badge variant="default">Normal</Badge>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[35%]" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">35% em uso</p>
                </div>

                <div className="p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Memória</span>
                    <Badge variant="default">Normal</Badge>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[52%]" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">52% em uso</p>
                </div>

                <div className="p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Armazenamento</span>
                    <Badge variant="secondary">Atenção</Badge>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-warning w-[78%]" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">78% em uso</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
