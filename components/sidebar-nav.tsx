"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Radio,
  Flame,
  BarChart3,
  Map,
  Bell,
  Clock,
  Brain,
  Settings,
  ScrollText,
  User,
  Shield,
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Sensores", href: "/sensors", icon: Radio },
  { name: "Detecção de Queimadas", href: "/fire-detection", icon: Flame },
  { name: "Gráficos e Análises", href: "/analytics", icon: BarChart3 },
  { name: "Mapa Interativo", href: "/map", icon: Map },
  { name: "Alertas", href: "/alerts", icon: Bell },
  { name: "Histórico de Dados", href: "/history", icon: Clock },
  { name: "Análise Preditiva", href: "/prediction", icon: Brain },
  { name: "Configurações", href: "/settings", icon: Settings },
  { name: "Logs do Sistema", href: "/logs", icon: ScrollText },
  { name: "Perfil", href: "/profile", icon: User },
  { name: "Gerenciar Acesso", href: "/access", icon: Shield },
]

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-1 p-4">
      {navigation.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href

        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
              "hover:bg-accent hover:text-accent-foreground",
              isActive ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground",
            )}
          >
            <Icon className="h-4 w-4" />
            <span>{item.name}</span>
          </Link>
        )
      })}
    </nav>
  )
}
