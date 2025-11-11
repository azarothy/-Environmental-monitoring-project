"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { SidebarNav } from "@/components/sidebar-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Flame, Radio, Search, Layers, ZoomIn, ZoomOut, Maximize2, Filter } from "lucide-react"
import { mockSensors, mockFireDetections } from "@/lib/mock-data"

export default function MapPage() {
  const [selectedLayer, setSelectedLayer] = useState<"sensors" | "fires" | "both">("both")

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
            <h2 className="text-3xl font-bold tracking-tight">Mapa Interativo</h2>
            <p className="text-muted-foreground">Visualização geográfica de sensores e focos de calor</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Map Container */}
            <div className="lg:col-span-3">
              <Card className="overflow-hidden">
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Visualização do Mapa
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <ZoomIn className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <ZoomOut className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Maximize2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0 relative">
                  {/* Simulated Map View */}
                  <div className="w-full h-[600px] bg-gradient-to-br from-green-50 to-amber-50 dark:from-green-950 dark:to-amber-950 relative overflow-hidden">
                    {/* Grid overlay for map effect */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
                        {Array.from({ length: 64 }).map((_, i) => (
                          <div key={i} className="border border-foreground/20" />
                        ))}
                      </div>
                    </div>

                    {/* Map markers for sensors */}
                    {(selectedLayer === "sensors" || selectedLayer === "both") &&
                      mockSensors.map((sensor, index) => (
                        <div
                          key={sensor.id}
                          className="absolute group cursor-pointer"
                          style={{
                            left: `${20 + index * 15}%`,
                            top: `${30 + (index % 3) * 20}%`,
                          }}
                        >
                          <div
                            className={`relative p-2 rounded-full ${
                              sensor.status === "online"
                                ? "bg-success shadow-success/50"
                                : sensor.status === "warning"
                                  ? "bg-warning shadow-warning/50"
                                  : "bg-destructive shadow-destructive/50"
                            } shadow-lg transition-transform hover:scale-125`}
                          >
                            <Radio className="h-4 w-4 text-white" />
                            {sensor.status !== "offline" && (
                              <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-white animate-pulse" />
                            )}
                          </div>

                          {/* Tooltip on hover */}
                          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block z-10">
                            <div className="bg-card border rounded-lg p-3 shadow-lg min-w-[200px]">
                              <p className="font-semibold text-sm mb-1">{sensor.name}</p>
                              <p className="text-xs text-muted-foreground mb-2">{sensor.location}</p>
                              <div className="space-y-1">
                                <div className="flex justify-between text-xs">
                                  <span>Temp:</span>
                                  <span className="font-mono">{sensor.readings.temperature}°C</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                  <span>Umidade:</span>
                                  <span className="font-mono">{sensor.readings.humidity}%</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                    {/* Map markers for fires */}
                    {(selectedLayer === "fires" || selectedLayer === "both") &&
                      mockFireDetections
                        .filter((fire) => fire.status === "active")
                        .map((fire, index) => (
                          <div
                            key={fire.id}
                            className="absolute group cursor-pointer"
                            style={{
                              left: `${30 + index * 25}%`,
                              top: `${40 + index * 15}%`,
                            }}
                          >
                            <div className="relative">
                              {/* Pulsing danger zone */}
                              <div className="absolute inset-0 -m-8 rounded-full bg-destructive/20 animate-ping" />
                              <div className="relative p-3 rounded-full bg-destructive shadow-lg shadow-destructive/50 animate-pulse">
                                <Flame className="h-5 w-5 text-white" />
                              </div>
                            </div>

                            {/* Tooltip on hover */}
                            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block z-10">
                              <div className="bg-card border border-destructive rounded-lg p-3 shadow-lg min-w-[200px]">
                                <p className="font-semibold text-sm mb-1 text-destructive">Foco Ativo</p>
                                <p className="text-xs text-muted-foreground mb-2">{fire.location}</p>
                                <div className="space-y-1">
                                  <div className="flex justify-between text-xs">
                                    <span>Temp:</span>
                                    <span className="font-mono text-destructive">{fire.temperature}°C</span>
                                  </div>
                                  <div className="flex justify-between text-xs">
                                    <span>Severidade:</span>
                                    <Badge variant="destructive" className="h-4 text-[10px]">
                                      {fire.severity}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}

                    {/* Legend */}
                    <div className="absolute bottom-4 left-4 bg-card border rounded-lg p-4 shadow-lg">
                      <p className="text-sm font-semibold mb-3">Legenda</p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs">
                          <div className="h-3 w-3 rounded-full bg-success" />
                          <span>Sensor Online</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <div className="h-3 w-3 rounded-full bg-warning" />
                          <span>Sensor em Aviso</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <div className="h-3 w-3 rounded-full bg-destructive" />
                          <span>Foco de Calor</span>
                        </div>
                      </div>
                    </div>

                    {/* Coordinates display */}
                    <div className="absolute bottom-4 right-4 bg-card border rounded px-3 py-1.5 text-xs font-mono">
                      -15.7801, -47.9292
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Controls */}
            <div className="space-y-4">
              {/* Search */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Busca</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Localização..." className="pl-9" />
                  </div>
                  <Button variant="outline" className="w-full bg-transparent" size="sm">
                    <MapPin className="h-4 w-4 mr-2" />
                    Ir para
                  </Button>
                </CardContent>
              </Card>

              {/* Layer Controls */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Layers className="h-4 w-4" />
                    Camadas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    variant={selectedLayer === "both" ? "default" : "outline"}
                    className="w-full justify-start"
                    size="sm"
                    onClick={() => setSelectedLayer("both")}
                  >
                    Todas as Camadas
                  </Button>
                  <Button
                    variant={selectedLayer === "sensors" ? "default" : "outline"}
                    className="w-full justify-start"
                    size="sm"
                    onClick={() => setSelectedLayer("sensors")}
                  >
                    <Radio className="h-4 w-4 mr-2" />
                    Sensores
                  </Button>
                  <Button
                    variant={selectedLayer === "fires" ? "default" : "outline"}
                    className="w-full justify-start"
                    size="sm"
                    onClick={() => setSelectedLayer("fires")}
                  >
                    <Flame className="h-4 w-4 mr-2" />
                    Focos de Calor
                  </Button>
                </CardContent>
              </Card>

              {/* Statistics */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Estatísticas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Sensores Ativos:</span>
                    <span className="font-semibold">{mockSensors.filter((s) => s.status === "online").length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Focos Ativos:</span>
                    <span className="font-semibold text-destructive">
                      {mockFireDetections.filter((f) => f.status === "active").length}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Área Monitorada:</span>
                    <span className="font-semibold">2,400 km²</span>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Ações Rápidas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtros Avançados
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                    <Layers className="h-4 w-4 mr-2" />
                    Heatmap
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                    Exportar Dados
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
