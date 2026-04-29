"use client";

import React from "react";

export type ZoneType = "campamento" | "taller" | "tajo" | "planta" | "polvorin" | null;

interface MapZoneProps {
  selectedZone: ZoneType;
  onSelectZone: (zone: ZoneType) => void;
}

export default function MapZone({ selectedZone, onSelectZone }: MapZoneProps) {
  // Helper functions for styles based on zone type
  const getZoneStyle = (zoneId: string, baseColor: string, isHatch = false) => {
    const isSelected = selectedZone === zoneId;
    return {
      fill: isSelected ? (isHatch ? `url(#hatch-${baseColor})` : `rgba(${baseColor}, 0.2)`) : "rgba(15, 23, 42, 0.6)",
      stroke: isSelected ? `rgb(${baseColor})` : "#475569",
      strokeWidth: isSelected ? "4" : "2",
      filter: isSelected ? `url(#glow-${baseColor})` : "",
      transform: isSelected ? 'scale(1.02)' : 'scale(1)',
    };
  };

  const getZoneName = (z: ZoneType) => {
    switch (z) {
      case "campamento": return "Campamento";
      case "taller": return "Taller";
      case "tajo": return "Tajo Abierto";
      case "planta": return "Planta";
      case "polvorin": return "Polvorín";
      default: return "";
    }
  };

  return (
    <div className="bg-[#1e293b] p-6 rounded-2xl border border-[#334155] shadow-xl w-full h-full flex flex-col min-h-[400px]">
      <div className="mb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            Mapa Interactivo de la Mina
          </h2>
          <p className="text-sm text-gray-400 mt-1">Haz clic directamente sobre la zona en el mapa para seleccionarla</p>
        </div>
        
        {/* Status Indicators Legend */}
        <div className="flex flex-wrap gap-4 bg-[#0f172a] p-2 px-4 rounded-lg border border-[#334155]">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></div>
            <span className="text-xs text-gray-300">Libre / Casco Verde</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]"></div>
            <span className="text-xs text-gray-300">Restringido (Casco Rojo)</span>
          </div>
        </div>
      </div>

      <div className="flex-1 relative bg-[#0f172a] rounded-xl overflow-hidden border border-[#334155]">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        
        <svg viewBox="0 0 800 500" className="w-full h-full drop-shadow-xl" preserveAspectRatio="xMidYMid meet">
          <defs>
            <filter id="glow-16,185,129" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="8" result="blur" /><feComposite in="SourceGraphic" in2="blur" operator="over" /></filter>
            <filter id="glow-239,68,68" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="8" result="blur" /><feComposite in="SourceGraphic" in2="blur" operator="over" /></filter>
            <pattern id="hatch-239,68,68" width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="10" stroke="#ef4444" strokeWidth="2" strokeOpacity="0.2" />
            </pattern>
            <pattern id="hatch-16,185,129" width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="10" stroke="#10b981" strokeWidth="2" strokeOpacity="0.2" />
            </pattern>
          </defs>

          {/* Roads */}
          <path d="M 400,500 L 400,300 M 400,300 L 200,240 M 400,300 L 600,240 M 400,300 L 400,80 M 400,80 L 250,80 M 400,80 L 550,80" fill="none" stroke="#334155" strokeWidth="15" strokeDasharray="10 10" strokeLinecap="round" strokeLinejoin="round" />
          
          {/* 1. CAMPAMENTO (General - Emerald) */}
          <g 
            onClick={() => onSelectZone("campamento")}
            className="cursor-pointer transition-all duration-300 hover:opacity-80"
            style={{ transformOrigin: '150px 100px', ...getZoneStyle("campamento", "16, 185, 129") }}
          >
            <polygon points="40,30 260,30 230,190 40,170" />
            <rect x="70" y="60" width="60" height="30" fill="#334155" rx="4" />
            <rect x="150" y="60" width="60" height="30" fill="#334155" rx="4" />
            <rect x="70" y="110" width="60" height="30" fill="#334155" rx="4" />
            <rect x="150" y="110" width="60" height="30" fill="#334155" rx="4" />
            <text x="145" y="160" fill="white" fontSize="16" fontWeight="bold" textAnchor="middle" className="pointer-events-none">Campamento</text>
            <text x="145" y="175" fill="#94a3b8" fontSize="10" textAnchor="middle" className="pointer-events-none">Acceso General</text>
          </g>

          {/* 2. POLVORÍN (Restringido - Rojo) */}
          <g 
            onClick={() => onSelectZone("polvorin")}
            className="cursor-pointer transition-all duration-300 hover:opacity-80"
            style={{ transformOrigin: '400px 80px', ...getZoneStyle("polvorin", "239, 68, 68", true) }}
          >
            <polygon points="280,30 480,30 460,140 300,140" />
            <rect x="340" y="60" width="80" height="40" fill="#1e293b" stroke="#ef4444" strokeWidth="2" />
            <text x="380" y="85" fill="#ef4444" fontSize="20" fontWeight="bold" textAnchor="middle" className="pointer-events-none">☢</text>
            <text x="380" y="115" fill="white" fontSize="16" fontWeight="bold" textAnchor="middle" className="pointer-events-none">Polvorín</text>
            <text x="380" y="130" fill="#94a3b8" fontSize="10" textAnchor="middle" className="pointer-events-none">Solo Casco Rojo</text>
          </g>

          {/* 3. PLANTA DE PROCESAMIENTO (Restringido - Rojo) */}
          <g 
            onClick={() => onSelectZone("planta")}
            className="cursor-pointer transition-all duration-300 hover:opacity-80"
            style={{ transformOrigin: '650px 100px', ...getZoneStyle("planta", "239, 68, 68") }}
          >
            <polygon points="500,30 760,30 760,200 480,200" />
            <rect x="550" y="60" width="140" height="60" fill="#334155" rx="4" />
            <circle cx="580" cy="150" r="20" fill="#475569" />
            <circle cx="630" cy="150" r="20" fill="#475569" />
            <circle cx="680" cy="150" r="20" fill="#475569" />
            <text x="630" y="100" fill="white" fontSize="16" fontWeight="bold" textAnchor="middle" className="pointer-events-none">Planta Procesamiento</text>
            <text x="630" y="115" fill="#94a3b8" fontSize="10" textAnchor="middle" className="pointer-events-none">Solo Casco Rojo</text>
          </g>

          {/* 4. TALLER DE MANTENIMIENTO (Restringido - Verde) */}
          <g 
            onClick={() => onSelectZone("taller")}
            className="cursor-pointer transition-all duration-300 hover:opacity-80"
            style={{ transformOrigin: '150px 350px', ...getZoneStyle("taller", "16, 185, 129", true) }}
          >
            <polygon points="40,220 250,220 280,480 40,460" />
            <rect x="80" y="270" width="100" height="120" fill="#334155" rx="4" />
            <rect x="100" y="290" width="60" height="20" fill="#0f172a" />
            <rect x="100" y="340" width="60" height="20" fill="#0f172a" />
            <text x="130" y="420" fill="white" fontSize="16" fontWeight="bold" textAnchor="middle" className="pointer-events-none">Taller Mecánico</text>
            <text x="130" y="440" fill="#94a3b8" fontSize="10" textAnchor="middle" className="pointer-events-none">Solo Casco Verde</text>
          </g>

          {/* 5. TAJO ABIERTO (Restringido - Rojo) */}
          <g 
            onClick={() => onSelectZone("tajo")}
            className="cursor-pointer transition-all duration-300 hover:opacity-80"
            style={{ transformOrigin: '550px 350px', ...getZoneStyle("tajo", "239, 68, 68") }}
          >
            <polygon points="320,240 760,240 760,480 320,480" />
            <ellipse cx="550" cy="360" rx="150" ry="90" fill="#1e293b" stroke="#334155" strokeWidth="2" />
            <ellipse cx="550" cy="360" rx="110" ry="60" fill="#0f172a" stroke="#334155" strokeWidth="2" />
            <ellipse cx="550" cy="360" rx="70" ry="40" fill="#020617" stroke="#334155" strokeWidth="2" />
            <ellipse cx="550" cy="360" rx="30" ry="15" fill="#000000" stroke="#334155" strokeWidth="2" />
            <text x="550" y="310" fill="white" fontSize="18" fontWeight="bold" textAnchor="middle" className="pointer-events-none">Tajo Abierto</text>
            <text x="550" y="325" fill="#94a3b8" fontSize="10" textAnchor="middle" className="pointer-events-none">Solo Casco Rojo</text>
          </g>

        </svg>

        {/* Selected Area Overlay Label */}
        {selectedZone && (
          <div className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-2 rounded-full border shadow-lg backdrop-blur-md font-bold uppercase tracking-wider text-sm transition-all animate-fade-in-up
            ${(selectedZone === "campamento" || selectedZone === "taller")
              ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400" 
              : "bg-red-500/20 border-red-500/50 text-red-400"
            }`}
          >
            Zona Seleccionada: {getZoneName(selectedZone)}
          </div>
        )}
      </div>
    </div>
  );
}
