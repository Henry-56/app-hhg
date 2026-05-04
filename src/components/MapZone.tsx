"use client";

import React from "react";
import { AREAS, AreaCode, getAllowedHelmetColors, HELMET_COLORS } from "@/data/zones";

export type ZoneType = AreaCode | null;

interface MapZoneProps {
  selectedZone: ZoneType;
  onSelectZone: (zone: ZoneType) => void;
}

export default function MapZone({ selectedZone, onSelectZone }: MapZoneProps) {
  const getZoneName = (z: ZoneType): string => {
    if (!z) return "";
    return AREAS[z]?.name || "";
  };

  const getZoneColor = (riskLevel: string): { rgb: string; hex: string } => {
    switch (riskLevel) {
      case "critical":
        return { rgb: "239, 68, 68", hex: "#ef4444" }; // Red
      case "high":
        return { rgb: "249, 115, 22", hex: "#f97316" }; // Orange
      case "medium":
        return { rgb: "16, 185, 129", hex: "#10b981" }; // Emerald
      case "low":
        return { rgb: "59, 130, 246", hex: "#3b82f6" }; // Blue
      default:
        return { rgb: "148, 163, 184", hex: "#94a3b8" }; // Gray
    }
  };

  return (
    <div className="bg-[#1e293b] p-6 rounded-2xl border border-[#334155] shadow-xl w-full h-full flex flex-col min-h-[400px]">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          Zonas Seleccionables (ARES)
        </h2>
        <p className="text-sm text-gray-400">Selecciona una zona para validar acceso</p>
      </div>

      {/* Risk Level Legend */}
      <div className="mb-4 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
        <div className="flex items-center gap-2 bg-[#0f172a] p-2 rounded border border-[#334155]">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#ef4444" }}></div>
          <span className="text-gray-300">Crítico</span>
        </div>
        <div className="flex items-center gap-2 bg-[#0f172a] p-2 rounded border border-[#334155]">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#f97316" }}></div>
          <span className="text-gray-300">Alto</span>
        </div>
        <div className="flex items-center gap-2 bg-[#0f172a] p-2 rounded border border-[#334155]">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#10b981" }}></div>
          <span className="text-gray-300">Medio</span>
        </div>
        <div className="flex items-center gap-2 bg-[#0f172a] p-2 rounded border border-[#334155]">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#3b82f6" }}></div>
          <span className="text-gray-300">Bajo</span>
        </div>
      </div>

      {/* Zones Grid */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2 overflow-y-auto">
        {Object.entries(AREAS).map(([code, zone]) => {
          const color = getZoneColor(zone.riskLevel);
          const isSelected = selectedZone === code;

          return (
            <button
              key={code}
              onClick={() => onSelectZone(code as AreaCode)}
              className={`p-3 rounded-lg border-2 transition-all duration-200 text-left
                ${isSelected 
                  ? "border-current shadow-lg scale-105" 
                  : "border-[#334155] hover:border-[#475569]"
                }`}
              style={{
                backgroundColor: isSelected ? `rgba(${color.rgb}, 0.15)` : "#0f172a",
                borderColor: isSelected ? color.hex : "#334155",
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="font-bold text-white flex items-center gap-2">
                    <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ backgroundColor: color.hex, color: "white" }}>
                      {code}
                    </span>
                  </div>
                  <div className="text-sm text-gray-300 font-semibold mt-1">{zone.name}</div>
                  {/* Location removed */}
                </div>
              </div>
              {/* Risk and Helmet indicators */}
              <div className="mt-2 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {zone.risks.slice(0, 2).map((risk, idx) => (
                    <span key={idx} className="text-xs bg-[#1e293b] text-gray-400 px-2 py-0.5 rounded">
                      {risk}
                    </span>
                  ))}
                </div>
                
                {/* Allowed Helmets Avatar Group */}
                <div className="flex -space-x-1.5 opacity-80 hover:opacity-100 transition-opacity ml-2">
                  {getAllowedHelmetColors(code as AreaCode).map((c) => {
                    const bg = c === "red" ? "bg-red-500" :
                               c === "green" ? "bg-emerald-500" :
                               c === "yellow" ? "bg-yellow-500" :
                               c === "brown" ? "bg-amber-800" :
                               "bg-gray-100";
                    return (
                      <div 
                        key={c} 
                        className={`w-4 h-4 rounded-full border border-[#0f172a] ${bg}`} 
                        title={`Permitido: ${HELMET_COLORS[c]} (${c})`}
                      />
                    );
                  })}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Zone Info */}
      {selectedZone && (
        <div className="mt-4 p-4 rounded-lg border border-[#334155] bg-[#0f172a]">
          <div className="text-sm text-gray-400 mb-2">ZONA SELECCIONADA</div>
          <div className="font-bold text-white text-lg mb-2">{getZoneName(selectedZone)}</div>
          <div className="space-y-2">
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">Riesgos Identificados</div>
              <div className="flex flex-wrap gap-1 mt-1">
                {AREAS[selectedZone as AreaCode]?.risks.map((risk, idx) => (
                  <span key={idx} className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded">
                    {risk}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">EPP Requerido</div>
              <div className="flex gap-2 mt-1">
                {getAllowedHelmetColors(selectedZone as AreaCode).map((color) => (
                  <span
                    key={color}
                    className="text-xs font-bold px-2 py-1 rounded text-white"
                    style={{
                      backgroundColor:
                        color === "red"
                          ? "#ef4444"
                          : color === "green"
                            ? "#10b981"
                            : color === "yellow"
                              ? "#eab308"
                              : color === "brown"
                                ? "#92400e"
                                : color === "white"
                                  ? "#d1d5db"
                                  : "#6b7280",
                    }}
                  >
                    Casco {HELMET_COLORS[color]}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
