"use client"

import { Header } from "@/components/header"
import { SidebarNav } from "@/components/sidebar-nav"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, TrendingUp, Activity, Calendar, Download } from "lucide-react"
import { generateHistoricalData } from "@/lib/mock-data"

export default function AnalyticsPage() {
  const hourlyData = generateHistoricalData(24)
  const weeklyData = generateHistoricalData(7 * 24)

  const maxTemp = Math.max(...hourlyData.map((d) => d.temperature))
  const minTemp = Math.min(...hourlyData.map((d) => d.temperature))
  const avgTemp = (hourlyData.reduce((sum, d) => sum + d.temperature, 0) / hourlyData.length).toFixed(1)

  const avgHumidity = (hourlyData.reduce((sum, d) => sum + d.humidity, 0) / hourlyData.length).toFixed(1)

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
              <h2 className="text-3xl font-bold tracking-tight">Gráficos e Análises</h2>
              <p className="text-muted-foreground">Visualização de dados históricos e tendências</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Período
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid gap-4 md:grid-cols-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Temp. Média (24h)</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{avgTemp}°C</div>
                <p className="text-xs text-muted-foreground">
                  Min: {minTemp.toFixed(1)}°C | Max: {maxTemp.toFixed(1)}°C
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Umidade Média</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{avgHumidity}%</div>
                <p className="text-xs text-muted-foreground">Últimas 24 horas</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tendência</CardTitle>
                <TrendingUp className="h-4 w-4 text-warning" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-warning">+2.3°C</div>
                <p className="text-xs text-muted-foreground">Aumento nas últimas 24h</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Alertas</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">Na última semana</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <Tabs defaultValue="temperature" className="space-y-4">
            <TabsList>
              <TabsTrigger value="temperature">Temperatura</TabsTrigger>
              <TabsTrigger value="humidity">Umidade</TabsTrigger>
              <TabsTrigger value="sensors">Sensores</TabsTrigger>
              <TabsTrigger value="comparison">Comparação</TabsTrigger>
            </TabsList>

            <TabsContent value="temperature" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Evolução da Temperatura</CardTitle>
                  <CardDescription>Dados das últimas 24 horas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-end justify-between gap-1">
                    {hourlyData.map((data, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div
                          className="w-full bg-primary rounded-t hover:bg-primary/80 transition-colors cursor-pointer relative group"
                          style={{
                            height: `${(data.temperature / maxTemp) * 100}%`,
                            minHeight: "8px",
                          }}
                        >
                          <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block">
                            <div className="bg-card border rounded px-2 py-1 text-xs whitespace-nowrap shadow-lg">
                              {data.temperature.toFixed(1)}°C
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-4 text-xs text-muted-foreground">
                    <span>24h atrás</span>
                    <span>12h atrás</span>
                    <span>Agora</span>
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Análise de Pico</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Temperatura Máxima:</span>
                        <Badge variant="destructive">{maxTemp.toFixed(1)}°C</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Temperatura Mínima:</span>
                        <Badge variant="secondary">{minTemp.toFixed(1)}°C</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Variação:</span>
                        <Badge>{(maxTemp - minTemp).toFixed(1)}°C</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Distribuição por Período</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Madrugada (0-6h)</span>
                          <span className="font-medium">26.2°C</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary w-[52%]" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Manhã (6-12h)</span>
                          <span className="font-medium">32.4°C</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary w-[65%]" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Tarde (12-18h)</span>
                          <span className="font-medium">38.7°C</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-destructive w-[78%]" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Noite (18-24h)</span>
                          <span className="font-medium">29.1°C</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary w-[58%]" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="humidity" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Níveis de Umidade</CardTitle>
                  <CardDescription>Monitoramento de umidade relativa do ar</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-end justify-between gap-1">
                    {hourlyData.map((data, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div
                          className="w-full bg-chart-3 rounded-t hover:bg-chart-3/80 transition-colors cursor-pointer relative group"
                          style={{
                            height: `${data.humidity}%`,
                            minHeight: "8px",
                          }}
                        >
                          <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block">
                            <div className="bg-card border rounded px-2 py-1 text-xs whitespace-nowrap shadow-lg">
                              {data.humidity.toFixed(0)}%
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-4 text-xs text-muted-foreground">
                    <span>24h atrás</span>
                    <span>12h atrás</span>
                    <span>Agora</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sensors" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Disponibilidade dos Sensores</CardTitle>
                  <CardDescription>Quantidade de sensores ativos ao longo do tempo</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-end justify-between gap-1">
                    {hourlyData.map((data, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div
                          className="w-full bg-chart-4 rounded-t hover:bg-chart-4/80 transition-colors cursor-pointer relative group"
                          style={{
                            height: `${(data.sensors / 5) * 100}%`,
                            minHeight: "8px",
                          }}
                        >
                          <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block">
                            <div className="bg-card border rounded px-2 py-1 text-xs whitespace-nowrap shadow-lg">
                              {data.sensors} sensores
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-4 text-xs text-muted-foreground">
                    <span>24h atrás</span>
                    <span>12h atrás</span>
                    <span>Agora</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="comparison" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Comparação de Métricas</CardTitle>
                  <CardDescription>Temperatura vs Umidade (últimas 24h)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] relative">
                    {/* Dual axis chart simulation */}
                    <div className="absolute inset-0 flex items-end justify-between gap-1">
                      {hourlyData.map((data, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1 relative">
                          <div
                            className="w-[45%] bg-primary/40 rounded-t absolute bottom-0 left-0"
                            style={{
                              height: `${(data.temperature / maxTemp) * 100}%`,
                              minHeight: "8px",
                            }}
                          />
                          <div
                            className="w-[45%] bg-chart-3/40 rounded-t absolute bottom-0 right-0"
                            style={{
                              height: `${data.humidity}%`,
                              minHeight: "8px",
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-6 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded bg-primary/40" />
                      <span className="text-xs">Temperatura</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded bg-chart-3/40" />
                      <span className="text-xs">Umidade</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
