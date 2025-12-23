import { Heart, Car, Building2, User, Shield, Briefcase, Home, Stethoscope } from "lucide-react";

export const servicesData = [
    {
        slug: "vida-y-salud",
        title: "Seguros de Vida y Salud",
        shortDescription: "Protección integral para ti y tu familia.",
        fullDescription: "Tu bienestar y el de tus seres queridos es lo más importante. Nuestras soluciones de vida y salud están diseñadas para garantizar tranquilidad en los momentos difíciles y acceso a la mejor atención médica cuando la necesites.",
        icon: Heart,
        color: "text-rose-600",
        bg: "bg-rose-50",
        gradient: "from-rose-500 to-pink-600",
        image: "/images/service-health.png",
        features: [
            {
                title: "Pólizas de Salud",
                desc: "Acceso a especialistas, urgencias y hospitalización con las mejores clínicas."
            },
            {
                title: "Seguro de Vida",
                desc: "Respaldo económico para tu familia en caso de fallecimiento o incapacidad."
            },
            {
                title: "Accidentes Personales",
                desc: "Cobertura ante imprevistos que puedan afectar tu integridad física."
            }
        ]
    },
    {
        slug: "vehiculos",
        title: "Seguros de Vehículos",
        shortDescription: "Viaja tranquilo con cobertura completa.",
        fullDescription: "Ya sea para tu carro particular, moto o flota empresarial, te protegemos contra accidentes, hurto y daños a terceros. Viaja con la seguridad de tener asistencia en carretera 24/7.",
        icon: Car,
        color: "text-blue-600",
        bg: "bg-blue-50",
        gradient: "from-blue-500 to-cyan-600",
        image: "/images/service-auto.png",
        features: [
            {
                title: "Todo Riesgo",
                desc: "Cobertura amplia por daños parciales o totales y hurto."
            },
            {
                title: "Responsabilidad Civil",
                desc: "Protección ante daños causados a terceros o sus bienes."
            },
            {
                title: "Asistencia en Viaje",
                desc: "Grúa, carro taller y conductor elegido."
            }
        ]
    },
    {
        slug: "empresariales",
        title: "Seguros Empresariales",
        shortDescription: "Respaldo total para tu negocio.",
        fullDescription: "Sabemos el esfuerzo que conlleva construir una empresa. Por eso, diseñamos paquetes de protección que cubren desde tus activos físicos hasta la responsabilidad legal y el cumplimiento de contratos.",
        icon: Building2,
        color: "text-slate-600",
        bg: "bg-slate-50",
        gradient: "from-slate-700 to-slate-900",
        image: "/images/service-business.png",
        features: [
            {
                title: "Cumplimiento",
                desc: "Garantía de seriedad de oferta y cumplimiento de contratos estatales o privados."
            },
            {
                title: "Pyme",
                desc: "Protección multiriesgo para locales, oficinas y mercancía."
            },
            {
                title: "Responsabilidad Civil",
                desc: "Cobertura ante reclamaciones por daños a terceros en el desarrollo de tu actividad."
            }
        ]
    },
    {
        slug: "personas",
        title: "Seguros de Personas",
        shortDescription: "Seguridad para tu hogar y bienes.",
        fullDescription: "Protege tu patrimonio y estilo de vida. Desde tu hogar hasta tus mascotas y dispositivos electrónicos, tenemos una solución para asegurar lo que te hace feliz.",
        icon: User,
        color: "text-emerald-600",
        bg: "bg-emerald-50",
        gradient: "from-emerald-500 to-teal-600",
        image: "/images/office-building.png", // Using office building as a placeholder for now since generate_image failed
        features: [
            {
                title: "Hogar",
                desc: "Cubre incendio, terremoto, hurto y daños por agua en tu vivienda."
            },
            {
                title: "Copropiedades",
                desc: "Seguros para áreas comunes en edificios y conjuntos residenciales."
            },
            {
                title: "Exequiales",
                desc: "Tranquilidad y respaldo para los servicios funerarios."
            }
        ]
    }
];

