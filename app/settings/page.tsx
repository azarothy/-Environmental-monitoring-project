"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { SidebarNav } from "@/components/sidebar-nav"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Database, Bell, Palette, Globe, Save, RefreshCw, AlertTriangle } from "lucide-react"

export default function SettingsPage() {
  const [hasChanges, setHasChanges] = useState(false)

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
              <h2 className="text-3xl font-bold tracking-tight">Configurações do Sistema</h2>
              <p className="text-muted-foreground">Gerencie as configurações gerais da plataforma</p>
            </div>
            {hasChanges && (
              <Button onClick={() => setHasChanges(false)}>
                <Save className="h-4 w-4 mr-2" />
                Salvar Alterações
              </Button>
            )}
          </div>

          <Tabs defaultValue="general" className="space-y-6">
            <TabsList>
              <TabsTrigger value="general">Geral</TabsTrigger>
              <TabsTrigger value="sensors">Sensores</TabsTrigger>
              <TabsTrigger value="alerts">Alertas</TabsTrigger>
              <TabsTrigger value="integrations">Integrações</TabsTrigger>
              <TabsTrigger value="advanced">Avançado</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informações do Sistema</CardTitle>
                  <CardDescription>Configurações básicas da plataforma</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="system-name">Nome do Sistema</Label>
                      <Input
                        id="system-name"
                        defaultValue="Sistema de Monitoramento de Queimadas"
                        onChange={() => setHasChanges(true)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="organization">Organização</Label>
                      <Input id="organization" placeholder="Nome da organização" onChange={() => setHasChanges(true)} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Fuso Horário</Label>
                    <select
                      id="timezone"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      onChange={() => setHasChanges(true)}
                    >
                      <option value="America/Sao_Paulo">América/São Paulo (BRT)</option>
                      <option value="America/Manaus">América/Manaus (AMT)</option>
                      <option value="America/Recife">América/Recife (BRT)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Idioma</Label>
                    <select
                      id="language"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      onChange={() => setHasChanges(true)}
                    >
                      <option value="pt-BR">Português (Brasil)</option>
                      <option value="en-US">English (US)</option>
                      <option value="es-ES">Español</option>
                    </select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Aparência
                  </CardTitle>
                  <CardDescription>Personalize a interface do sistema</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Tema</Label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="theme" defaultChecked />
                        <span className="text-sm">Claro</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="theme" />
                        <span className="text-sm">Escuro</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="theme" />
                        <span className="text-sm">Automático</span>
                      </label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="primary-color">Cor Principal</Label>
                    <div className="flex gap-2">
                      <Input id="primary-color" type="color" defaultValue="#ea580c" className="w-20" />
                      <Input defaultValue="#ea580c" className="flex-1" readOnly />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sensors" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações de Sensores</CardTitle>
                  <CardDescription>Parâmetros de monitoramento e coleta de dados</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="update-interval">Intervalo de Atualização</Label>
                      <select
                        id="update-interval"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        onChange={() => setHasChanges(true)}
                      >
                        <option value="30">30 segundos</option>
                        <option value="60">1 minuto</option>
                        <option value="300" selected>
                          5 minutos
                        </option>
                        <option value="600">10 minutos</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="offline-timeout">Timeout Offline</Label>
                      <select
                        id="offline-timeout"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        onChange={() => setHasChanges(true)}
                      >
                        <option value="300">5 minutos</option>
                        <option value="600">10 minutos</option>
                        <option value="1800">30 minutos</option>
                        <option value="3600" selected>
                          1 hora
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="temp-threshold">Limiar de Temperatura Crítica (°C)</Label>
                    <Input id="temp-threshold" type="number" defaultValue="40" onChange={() => setHasChanges(true)} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="humidity-threshold">Limiar de Umidade Baixa (%)</Label>
                    <Input
                      id="humidity-threshold"
                      type="number"
                      defaultValue="20"
                      onChange={() => setHasChanges(true)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="smoke-threshold">Limiar de Nível de Fumaça (%)</Label>
                    <Input id="smoke-threshold" type="number" defaultValue="50" onChange={() => setHasChanges(true)} />
                  </div>

                  <div className="flex items-center gap-2 pt-4">
                    <input type="checkbox" id="auto-calibration" defaultChecked />
                    <Label htmlFor="auto-calibration" className="cursor-pointer">
                      Calibração automática de sensores
                    </Label>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="alerts" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Sistema de Alertas
                  </CardTitle>
                  <CardDescription>Configure regras de notificação e escalação</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold">Regras de Notificação</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 rounded-lg border">
                        <div>
                          <p className="font-medium text-sm">Alerta Imediato - Crítico</p>
                          <p className="text-xs text-muted-foreground">
                            Temperatura acima de 45°C ou fumaça acima de 80%
                          </p>
                        </div>
                        <input type="checkbox" defaultChecked className="h-4 w-4" />
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg border">
                        <div>
                          <p className="font-medium text-sm">Alerta Elevado</p>
                          <p className="text-xs text-muted-foreground">
                            Temperatura entre 40-45°C ou fumaça entre 50-80%
                          </p>
                        </div>
                        <input type="checkbox" defaultChecked className="h-4 w-4" />
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg border">
                        <div>
                          <p className="font-medium text-sm">Alerta de Sensor Offline</p>
                          <p className="text-xs text-muted-foreground">Sensor não responde por mais de 1 hora</p>
                        </div>
                        <input type="checkbox" defaultChecked className="h-4 w-4" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t">
                    <h4 className="text-sm font-semibold">Escalação de Alertas</h4>
                    <div className="space-y-2">
                      <Label htmlFor="escalation-time">Tempo para Escalação (minutos)</Label>
                      <Input
                        id="escalation-time"
                        type="number"
                        defaultValue="15"
                        onChange={() => setHasChanges(true)}
                      />
                      <p className="text-xs text-muted-foreground">
                        Se um alerta não for reconhecido, será escalado após este período
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t">
                    <h4 className="text-sm font-semibold">Canais de Notificação</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 rounded-lg border">
                        <span className="text-sm">Email</span>
                        <input type="checkbox" defaultChecked className="h-4 w-4" />
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg border">
                        <span className="text-sm">SMS</span>
                        <input type="checkbox" className="h-4 w-4" />
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg border">
                        <span className="text-sm">Webhook</span>
                        <input type="checkbox" className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="integrations" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Integrações Externas
                  </CardTitle>
                  <CardDescription>Conecte com serviços e APIs externas</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg border">
                      <div>
                        <p className="font-semibold mb-1">API de Clima</p>
                        <p className="text-sm text-muted-foreground">
                          Integração com serviço de previsão meteorológica
                        </p>
                      </div>
                      <Badge variant="secondary">Não configurado</Badge>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg border">
                      <div>
                        <p className="font-semibold mb-1">Imagens de Satélite</p>
                        <p className="text-sm text-muted-foreground">Dados do INPE e NASA para análise complementar</p>
                      </div>
                      <Badge variant="secondary">Não configurado</Badge>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg border">
                      <div>
                        <p className="font-semibold mb-1">Sistema de Emergência</p>
                        <p className="text-sm text-muted-foreground">
                          Integração com corpo de bombeiros e defesa civil
                        </p>
                      </div>
                      <Badge variant="default">Conectado</Badge>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full mt-4 bg-transparent">
                    <Globe className="h-4 w-4 mr-2" />
                    Adicionar Nova Integração
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações Avançadas</CardTitle>
                  <CardDescription>Opções para usuários avançados</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold">Banco de Dados</h4>
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-muted">
                      <Database className="h-4 w-4" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Status da Conexão</p>
                        <p className="text-xs text-muted-foreground">Conectado ao PostgreSQL</p>
                      </div>
                      <Badge variant="default">Online</Badge>
                    </div>
                    <Button variant="outline" size="sm">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Testar Conexão
                    </Button>
                  </div>

                  <div className="space-y-4 pt-4 border-t">
                    <h4 className="text-sm font-semibold">Manutenção</h4>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                        Limpar Cache do Sistema
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                        Backup Manual de Dados
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                        Exportar Logs do Sistema
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t">
                    <h4 className="text-sm font-semibold flex items-center gap-2 text-destructive">
                      <AlertTriangle className="h-4 w-4" />
                      Zona de Perigo
                    </h4>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start text-destructive bg-transparent"
                      >
                        Resetar Todas as Configurações
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start text-destructive bg-transparent"
                      >
                        Limpar Histórico de Dados
                      </Button>
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
