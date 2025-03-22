"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Package,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  User,
  ChevronDown,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/uso-mobil"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const isMobile = useIsMobile()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: BarChart3,
      current: pathname === "/dashboard",
    },
    {
      name: "Products",
      href: "/dashboard/products",
      icon: Package,
      current: pathname.includes("/dashboard/products"),
    },
    {
      name: "Orders",
      href: "/dashboard/orders",
      icon: ShoppingCart,
      current: pathname.includes("/dashboard/orders"),
    },
    {
      name: "Customers",
      href: "/dashboard/customers",
      icon: Users,
      current: pathname.includes("/dashboard/customers"),
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
      current: pathname.includes("/dashboard/settings"),
    },
  ]

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm z-10">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center">
            {isMobile && (
              <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="mr-2">
                {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            )}
            <Link href="/dashboard" className="flex items-center">
              <span className="text-xl font-bold text-primary">E-Commerce</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center flex-1 px-6 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Search..." className="pl-10 w-full" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              <span className="sr-only">Notifications</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 h-8 pl-2 pr-1">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-user.jpg" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline-block font-medium">John Doe</span>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-500">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`${
            isMobile
              ? isSidebarOpen
                ? "fixed inset-0 z-40 transform translate-x-0 transition-transform duration-300 ease-in-out pt-16"
                : "fixed inset-0 z-40 transform -translate-x-full transition-transform duration-300 ease-in-out pt-16"
              : "w-64"
          } bg-white shadow-md`}
        >
          <div className="h-full flex flex-col">
            <nav className="flex-1 overflow-y-auto p-4">
              <ul className="space-y-2">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`flex items-center p-3 rounded-md transition-colors ${
                        item.current ? "bg-primary/10 text-primary" : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => isMobile && setIsSidebarOpen(false)}
                    >
                      <item.icon className="h-5 w-5 mr-3" />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div className={`${isMobile ? "w-full" : "flex-1"} overflow-y-auto bg-gray-50 flex flex-col`}>
          <main className="flex-1">{children}</main>

          {/* Footer */}
          <footer className="bg-white border-t py-4 px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-sm text-gray-500 mb-2 md:mb-0">
                © {new Date().getFullYear()} E-Commerce Dashboard. All rights reserved.
              </div>
              <div className="flex space-x-4 text-sm">
                <Link href="#" className="text-gray-500 hover:text-primary">
                  Privacy Policy
                </Link>
                <Link href="#" className="text-gray-500 hover:text-primary">
                  Terms of Service
                </Link>
                <Link href="#" className="text-gray-500 hover:text-primary">
                  Contact Us
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}

