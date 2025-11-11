"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { SidebarNav } from "@/components/sidebar-nav"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Shield, UserPlus, Search, Filter, MoreVertical, Mail, Clock, CheckCircle2, XCircle } from "lucide-react"
import { mockUsers } from "@/lib/mock-data"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function AccessManagementPage() {
  const [showInviteForm, setShowInviteForm] = useState(false)

  const adminUsers = mockUsers.filter((u) => u.role === "admin")
  const operatorUsers = mockUsers.filter((u) => u.role === "operator")
  const viewerUsers = mockUsers.filter((u) => u.role === "viewer")

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
              <h2 className="text-3xl font-bold tracking-tight">Gerenciamento de Acesso</h2>
              <p className="text-muted-foreground">Controle de usuários e permissões do sistema</p>
            </div>
            <Button onClick={() => setShowInviteForm(!showInviteForm)}>
              <UserPlus className="h-4 w-4 mr-2" />
              Convidar Usuário
            </Button>
          </div>

          {/* Invite Form */}
          {showInviteForm && (
            <Card className="mb-6 border-primary">
              <CardHeader>
                <CardTitle>Convidar Novo Usuário</CardTitle>
                <CardDescription>Envie um convite por email para um novo membro</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Nome Completo</label>
                      <Input placeholder="João Silva" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input type="email" placeholder="joao@exemplo.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nível de Acesso</label>
                    <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                      <option value="viewer">Visualizador - Apenas leitura</option>
                      <option value="operator">Operador - Leitura e ações</option>
                      <option value="admin">Administrador - Acesso total</option>
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <Button>
                      <Mail className="h-4 w-4 mr-2" />
                      Enviar Convite
                    </Button>
                    <Button variant="outline" onClick={() => setShowInviteForm(false)}>
                      Cancelar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Summary Cards */}
          <div className="grid gap-4 md:grid-cols-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockUsers.length}</div>
                <p className="text-xs text-muted-foreground">Contas ativas</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Administradores</CardTitle>
                <Shield className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{adminUsers.length}</div>
                <p className="text-xs text-muted-foreground">Acesso total</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Operadores</CardTitle>
                <Shield className="h-4 w-4 text-warning" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{operatorUsers.length}</div>
                <p className="text-xs text-muted-foreground">Acesso operacional</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Visualizadores</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{viewerUsers.length}</div>
                <p className="text-xs text-muted-foreground">Apenas leitura</p>
              </CardContent>
            </Card>
          </div>

          {/* Search Bar */}
          <div className="flex items-center gap-3 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar usuários..." className="pl-9" />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
          </div>

          {/* Roles Description */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-base">Níveis de Acesso</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="p-4 rounded-lg border">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-4 w-4 text-destructive" />
                    <h4 className="font-semibold">Administrador</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Acesso completo ao sistema, incluindo gerenciamento de usuários, configurações e todas as
                    funcionalidades.
                  </p>
                </div>
                <div className="p-4 rounded-lg border">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-4 w-4 text-warning" />
                    <h4 className="font-semibold">Operador</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Pode visualizar dados, gerenciar alertas, controlar sensores e executar ações operacionais.
                  </p>
                </div>
                <div className="p-4 rounded-lg border">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <h4 className="font-semibold">Visualizador</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Acesso somente leitura aos dashboards, relatórios e dados do sistema.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Users List */}
          <Card>
            <CardHeader>
              <CardTitle>Usuários Cadastrados</CardTitle>
              <CardDescription>Lista de todos os membros com acesso ao sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium">{user.name}</p>
                          <Badge
                            variant={
                              user.role === "admin" ? "destructive" : user.role === "operator" ? "secondary" : "default"
                            }
                          >
                            {user.role === "admin" ? "Admin" : user.role === "operator" ? "Operador" : "Visualizador"}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {user.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Último acesso: {user.lastLogin?.toLocaleString("pt-BR")}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {user.lastLogin && new Date().getTime() - user.lastLogin.getTime() < 3600000 ? (
                        <Badge variant="default" className="gap-1">
                          <CheckCircle2 className="h-3 w-3" />
                          Online
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="gap-1">
                          <XCircle className="h-3 w-3" />
                          Offline
                        </Badge>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Ver Perfil</DropdownMenuItem>
                          <DropdownMenuItem>Editar Permissões</DropdownMenuItem>
                          <DropdownMenuItem>Desativar Usuário</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Remover Acesso</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
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
