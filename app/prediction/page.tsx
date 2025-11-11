"use client"

import { Header } from "@/components/header"
import { SidebarNav } from "@/components/sidebar-nav"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Brain, TrendingUp, AlertTriangle, Sparkles, Calendar, Download, Target, Zap } from "lucide-react"

export default function PredictionPage() {
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
              <h2 className="text-3xl font-bold tracking-tight">Análise Preditiva</h2>
              <p className="text-muted-foreground">IA e machine learning para previsão de riscos</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Período de Previsão
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Relatório
              </Button>
            </div>
          </div>

          {/* AI Status Banner */}
          <Card className="mb-6 border-primary">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <Brain className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Sistema de IA Ativo</h3>
                  <p className="text-sm text-muted-foreground">
                    Modelo treinado com 50.000+ registros históricos - Última atualização: hoje às 06:00
                  </p>
                </div>
                <Badge variant="default" className="gap-1">
                  <Zap className="h-3 w-3" />
                  Precisão: 94.2%
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Risk Predictions */}
          <div className="grid gap-6 md:grid-cols-2 mb-6">
            <Card className="border-destructive/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <AlertTriangle className="h-5 w-5" />
                  Alto Risco - Próximas 24h
                </CardTitle>
                <CardDescription>Áreas com probabilidade elevada de incêndio</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border border-destructive/50 bg-destructive/5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold mb-1">Zona Sul - Cerrado</h4>
                        <p className="text-sm text-muted-foreground">Sensor Cerrado Sul</p>
                      </div>
                      <Badge variant="destructive">87% risco</Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Temp. prevista:</span>
                        <span className="font-semibold text-destructive">44°C</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Umidade prevista:</span>
                        <span className="font-semibold text-destructive">18%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Horário crítico:</span>
                        <span className="font-semibold">14:00 - 17:00</span>
                      </div>
                    </div>
                    <Button variant="destructive" className="w-full mt-4" size="sm">
                      <Target className="h-4 w-4 mr-2" />
                      Programar Monitoramento
                    </Button>
                  </div>

                  <div className="p-4 rounded-lg border border-warning/50 bg-warning/5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold mb-1">Zona Leste - Reserva</h4>
                        <p className="text-sm text-muted-foreground">Sensor Reserva Leste</p>
                      </div>
                      <Badge variant="secondary">64% risco</Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Temp. prevista:</span>
                        <span className="font-semibold">39°C</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Umidade prevista:</span>
                        <span className="font-semibold">26%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Horário crítico:</span>
                        <span className="font-semibold">13:00 - 16:00</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full mt-4 bg-transparent" size="sm">
                      Ver Detalhes
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Insights da IA
                </CardTitle>
                <CardDescription>Recomendações baseadas em análise preditiva</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-muted">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary mt-1">
                        <TrendingUp className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Padrão de Temperatura Anômalo</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Modelo detectou aumento de temperatura 15% acima do esperado para esta época do ano nas
                          regiões sul e leste.
                        </p>
                        <Badge variant="secondary">Confiança: 92%</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-muted">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-warning/10 text-warning mt-1">
                        <AlertTriangle className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Frente Seca Aproximando</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Análise meteorológica indica baixa umidade persistente nos próximos 3 dias. Recomenda-se
                          aumentar frequência de monitoramento.
                        </p>
                        <Badge variant="secondary">Confiança: 88%</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-muted">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-success/10 text-success mt-1">
                        <Sparkles className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Melhoria Esperada</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Previsão de chuvas na região norte deve reduzir risco de incêndios em 40% a partir de
                          quinta-feira.
                        </p>
                        <Badge variant="secondary">Confiança: 76%</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Prediction Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Previsão de Risco - Próximos 7 Dias</CardTitle>
              <CardDescription>Probabilidade de ocorrência de focos de calor por dia</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {[
                  { day: "Seg", risk: 85, label: "Alto" },
                  { day: "Ter", risk: 78, label: "Alto" },
                  { day: "Qua", risk: 72, label: "Médio" },
                  { day: "Qui", risk: 45, label: "Baixo" },
                  { day: "Sex", risk: 38, label: "Baixo" },
                  { day: "Sáb", risk: 42, label: "Baixo" },
                  { day: "Dom", risk: 51, label: "Médio" },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="text-xs text-muted-foreground mb-2">{item.day}</div>
                    <div className="w-full h-32 bg-muted rounded-lg overflow-hidden relative">
                      <div
                        className={`absolute bottom-0 left-0 right-0 transition-all ${
                          item.risk > 70 ? "bg-destructive" : item.risk > 50 ? "bg-warning" : "bg-success"
                        }`}
                        style={{ height: `${item.risk}%` }}
                      />
                    </div>
                    <div className="text-sm font-semibold mt-2">{item.risk}%</div>
                    <Badge
                      variant={item.risk > 70 ? "destructive" : item.risk > 50 ? "secondary" : "default"}
                      className="text-[10px] mt-1"
                    >
                      {item.label}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
