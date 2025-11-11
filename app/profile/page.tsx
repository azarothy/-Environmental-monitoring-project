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
import { Mail, Shield, Key, Bell, Activity } from "lucide-react"
import { mockUsers } from "@/lib/mock-data"

export default function ProfilePage() {
  const currentUser = mockUsers[0] // Admin user
  const [isEditing, setIsEditing] = useState(false)

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
            <h2 className="text-3xl font-bold tracking-tight">Perfil do Usuário</h2>
            <p className="text-muted-foreground">Gerencie suas informações pessoais e preferências</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Profile Summary Card */}
            <Card className="md:col-span-1">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-24 w-24 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-3xl font-bold mb-4">
                    {currentUser.name.charAt(0)}
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{currentUser.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{currentUser.email}</p>
                  <Badge variant="default" className="mb-4">
                    <Shield className="h-3 w-3 mr-1" />
                    {currentUser.role === "admin"
                      ? "Administrador"
                      : currentUser.role === "operator"
                        ? "Operador"
                        : "Visualizador"}
                  </Badge>
                  <div className="w-full space-y-2 text-sm">
                    <div className="flex justify-between py-2 border-t">
                      <span className="text-muted-foreground">Membro desde:</span>
                      <span className="font-medium">{currentUser.createdAt.toLocaleDateString("pt-BR")}</span>
                    </div>
                    <div className="flex justify-between py-2 border-t">
                      <span className="text-muted-foreground">Último acesso:</span>
                      <span className="font-medium">{currentUser.lastLogin?.toLocaleString("pt-BR")}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Profile Settings */}
            <div className="md:col-span-2">
              <Tabs defaultValue="personal">
                <TabsList className="mb-6">
                  <TabsTrigger value="personal">Informações Pessoais</TabsTrigger>
                  <TabsTrigger value="security">Segurança</TabsTrigger>
                  <TabsTrigger value="notifications">Notificações</TabsTrigger>
                </TabsList>

                <TabsContent value="personal">
                  <Card>
                    <CardHeader>
                      <CardTitle>Informações Pessoais</CardTitle>
                      <CardDescription>Atualize seus dados cadastrais</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome Completo</Label>
                        <Input id="name" defaultValue={currentUser.name} disabled={!isEditing} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue={currentUser.email} disabled={!isEditing} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefone</Label>
                        <Input id="phone" placeholder="(00) 00000-0000" disabled={!isEditing} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="department">Departamento</Label>
                        <Input id="department" placeholder="Monitoramento Ambiental" disabled={!isEditing} />
                      </div>
                      <div className="flex gap-2 pt-4">
                        {isEditing ? (
                          <>
                            <Button onClick={() => setIsEditing(false)}>Salvar Alterações</Button>
                            <Button variant="outline" onClick={() => setIsEditing(false)}>
                              Cancelar
                            </Button>
                          </>
                        ) : (
                          <Button onClick={() => setIsEditing(true)}>Editar Perfil</Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="security">
                  <Card>
                    <CardHeader>
                      <CardTitle>Segurança da Conta</CardTitle>
                      <CardDescription>Gerencie senha e autenticação</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h4 className="text-sm font-semibold">Alterar Senha</h4>
                        <div className="space-y-2">
                          <Label htmlFor="current-password">Senha Atual</Label>
                          <Input id="current-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-password">Nova Senha</Label>
                          <Input id="new-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                          <Input id="confirm-password" type="password" />
                        </div>
                        <Button>
                          <Key className="h-4 w-4 mr-2" />
                          Atualizar Senha
                        </Button>
                      </div>

                      <div className="space-y-4 pt-6 border-t">
                        <h4 className="text-sm font-semibold">Autenticação de Dois Fatores</h4>
                        <div className="flex items-center justify-between p-4 rounded-lg border">
                          <div>
                            <p className="font-medium">2FA não está ativado</p>
                            <p className="text-sm text-muted-foreground">Adicione uma camada extra de segurança</p>
                          </div>
                          <Button variant="outline">Ativar 2FA</Button>
                        </div>
                      </div>

                      <div className="space-y-4 pt-6 border-t">
                        <h4 className="text-sm font-semibold">Sessões Ativas</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-4 rounded-lg border">
                            <div className="flex items-center gap-3">
                              <Activity className="h-5 w-5 text-success" />
                              <div>
                                <p className="font-medium">Sessão Atual</p>
                                <p className="text-sm text-muted-foreground">Chrome no Windows • São Paulo, BR</p>
                              </div>
                            </div>
                            <Badge variant="default">Ativo</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="notifications">
                  <Card>
                    <CardHeader>
                      <CardTitle>Preferências de Notificação</CardTitle>
                      <CardDescription>Configure como deseja receber alertas</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h4 className="text-sm font-semibold">Alertas de Sistema</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 rounded-lg border">
                            <div className="flex items-center gap-3">
                              <Bell className="h-4 w-4" />
                              <div>
                                <p className="font-medium text-sm">Focos de Calor</p>
                                <p className="text-xs text-muted-foreground">
                                  Notificar quando novo foco for detectado
                                </p>
                              </div>
                            </div>
                            <input type="checkbox" defaultChecked className="h-4 w-4" />
                          </div>
                          <div className="flex items-center justify-between p-3 rounded-lg border">
                            <div className="flex items-center gap-3">
                              <Bell className="h-4 w-4" />
                              <div>
                                <p className="font-medium text-sm">Sensores Offline</p>
                                <p className="text-xs text-muted-foreground">Alertar sobre perda de conexão</p>
                              </div>
                            </div>
                            <input type="checkbox" defaultChecked className="h-4 w-4" />
                          </div>
                          <div className="flex items-center justify-between p-3 rounded-lg border">
                            <div className="flex items-center gap-3">
                              <Bell className="h-4 w-4" />
                              <div>
                                <p className="font-medium text-sm">Temperatura Elevada</p>
                                <p className="text-xs text-muted-foreground">Avisar sobre temperaturas críticas</p>
                              </div>
                            </div>
                            <input type="checkbox" defaultChecked className="h-4 w-4" />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4 pt-6 border-t">
                        <h4 className="text-sm font-semibold">Canais de Notificação</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 rounded-lg border">
                            <div className="flex items-center gap-3">
                              <Mail className="h-4 w-4" />
                              <span className="text-sm">Email</span>
                            </div>
                            <input type="checkbox" defaultChecked className="h-4 w-4" />
                          </div>
                          <div className="flex items-center justify-between p-3 rounded-lg border">
                            <div className="flex items-center gap-3">
                              <Bell className="h-4 w-4" />
                              <span className="text-sm">Push Notifications</span>
                            </div>
                            <input type="checkbox" defaultChecked className="h-4 w-4" />
                          </div>
                        </div>
                      </div>

                      <Button className="mt-4">Salvar Preferências</Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
