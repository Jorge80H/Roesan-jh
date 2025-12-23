import React from "react";
import { Container } from "../ui/Container";

export function TrustBar() {
    // In a real app, these would be SVG imports
    const partners = [
        "Sura", "Allianz", "Mapfre", "Axa Colpatria", "Seguros Bolívar", "Liberty", "Zurich", "Chubb"
    ];

    return (
        <section className="border-y border-slate-100 bg-white py-12">
            <Container>
                <p className="mb-8 text-center text-sm font-semibold uppercase tracking-wider text-slate-500">
                    Respaldados por las mejores aseguradoras
                </p>
                <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale transition-all hover:grayscale-0">
                    {partners.map((partner) => (
                        <div key={partner} className="flex items-center justify-center">
                            <span className="text-xl font-bold text-slate-400">{partner}</span>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
