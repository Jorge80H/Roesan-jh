"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import { Container } from "./ui/Container";
import Image from "next/image";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 z-40 w-full transition-all duration-300 ${isScrolled ? "glass-panel shadow-sm" : "bg-transparent"
                }`}
        >
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 group cursor-pointer">
                        <div className="relative h-12 w-48">
                            <Image
                                src="/logo-roesan.png"
                                alt="Roesan Seguros"
                                fill
                                className="object-contain transition-transform duration-500 group-hover:scale-105"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/" className="text-sm font-medium text-slate-600 hover:text-navy-800 transition-colors">
                            Inicio
                        </Link>
                        <Link href="/nosotros" className="text-sm font-medium text-slate-600 hover:text-navy-800 transition-colors">
                            Nosotros
                        </Link>
                        <Link href="/servicios" className="text-sm font-medium text-slate-600 hover:text-navy-800 transition-colors">
                            Servicios
                        </Link>
                        <Link href="/contacto">
                            <button className="bg-navy-800 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-navy-900 transition-all hover:scale-105 hover:shadow-lg flex items-center gap-2 group">
                                <span>Contáctanos</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            </button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-navy-800 hover:text-navy-900"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden glass-panel border-t border-slate-200">
                    <div className="space-y-1 px-4 pb-3 pt-2">
                        <Link
                            href="/"
                            className="block rounded-md px-3 py-2 text-base font-medium text-navy-800 hover:bg-slate-50"
                            onClick={() => setIsOpen(false)}
                        >
                            Inicio
                        </Link>
                        <Link
                            href="/nosotros"
                            className="block rounded-md px-3 py-2 text-base font-medium text-navy-800 hover:bg-slate-50"
                            onClick={() => setIsOpen(false)}
                        >
                            Nosotros
                        </Link>
                        <Link
                            href="/servicios"
                            className="block rounded-md px-3 py-2 text-base font-medium text-navy-800 hover:bg-slate-50"
                            onClick={() => setIsOpen(false)}
                        >
                            Servicios
                        </Link>
                        <Link
                            href="/contacto"
                            className="block rounded-md px-3 py-2 text-base font-medium text-gold-500 hover:bg-slate-50"
                            onClick={() => setIsOpen(false)}
                        >
                            Contáctanos
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
