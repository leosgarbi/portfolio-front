"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Code2, Camera, Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-effect shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
            <span className="text-xl font-bold text-white">P</span>
          </div>
          <span className="font-bold text-xl text-foreground">Portfolio</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/">
            <Button variant={pathname === "/" ? "default" : "ghost"} className="group gap-2">
              <Code2 className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              Developer
            </Button>
          </Link>

          <Link href="/photography">
            <Button variant={pathname === "/photography" ? "default" : "ghost"} className="group gap-2">
              <Camera className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Photo & Video
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden glass-effect border-t border-border">
          <div className="px-4 py-4 flex flex-col gap-2">
            <Link href="/" onClick={() => setIsMenuOpen(false)}>
              <Button variant={pathname === "/" ? "default" : "ghost"} className="w-full justify-start gap-2">
                <Code2 className="w-4 h-4" />
                Developer
              </Button>
            </Link>

            <Link href="/photography" onClick={() => setIsMenuOpen(false)}>
              <Button
                variant={pathname === "/photography" ? "default" : "ghost"}
                className="w-full justify-start gap-2"
              >
                <Camera className="w-4 h-4" />
                Photo & Video
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
