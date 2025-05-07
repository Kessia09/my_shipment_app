"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Package, User, LogOut } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePathname, useRouter } from "next/navigation"

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false) // In a real app, this would come from your auth state
  const pathname = usePathname()
  const router = useRouter()

  // Check if the current path is in the dashboard section
  const isDashboard = pathname?.startsWith("/dashboard")

  const handleLogout = () => {
    localStorage.removeItem('token')
    if (typeof window !== "undefined" && (window as any).axios) {
      delete (window as any).axios.defaults.headers.common['Authorization']
    }
    router.push('/login')
  }

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Package className="h-6 w-6 mr-2" />
            <span className="font-bold text-xl">ShipTrack</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className={`text-sm ${pathname === "/" ? "font-medium" : ""}`}>
            Home
          </Link>
          <Link href="/about" className={`text-sm ${pathname === "/about" ? "font-medium" : ""}`}>
            About
          </Link>
          <Link href="/pricing" className={`text-sm ${pathname === "/pricing" ? "font-medium" : ""}`}>
            Pricing
          </Link>
          <Link href="/contact" className={`text-sm ${pathname === "/contact" ? "font-medium" : ""}`}>
            Contact
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-2">
          <ModeToggle />

          {isLoggedIn || isDashboard ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center">
          <ModeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-2">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col space-y-4 mt-8">
                <Link href="/" className="text-lg">
                  Home
                </Link>
                <Link href="/about" className="text-lg">
                  About
                </Link>
                <Link href="/pricing" className="text-lg">
                  Pricing
                </Link>
                <Link href="/contact" className="text-lg">
                  Contact
                </Link>
                <div className="border-t my-4 pt-4">
                  {isLoggedIn || isDashboard ? (
                    <>
                      <Link href="/dashboard" className="flex items-center text-lg mb-4">
                        <Package className="h-5 w-5 mr-2" />
                        Dashboard
                      </Link>
                      <Link href="/profile" className="flex items-center text-lg mb-4">
                        <User className="h-5 w-5 mr-2" />
                        Profile
                      </Link>
                      <Button variant="destructive" className="w-full" onClick={handleLogout}>
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" className="w-full mb-2" asChild>
                        <Link href="/login">Login</Link>
                      </Button>
                      <Button className="w-full" asChild>
                        <Link href="/signup">Sign Up</Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
