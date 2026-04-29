"use client";

import React from "react";
import { ZoneType } from "./MapZone";
import { DetectedColor } from "./CameraDetector";

interface ValidationStatusProps {
  selectedZone: ZoneType;
  detectedColor: DetectedColor;
}

export default function ValidationStatus({ selectedZone, detectedColor }: ValidationStatusProps) {
  let isAccessGranted = false;
  let statusMessage = "ESPERANDO...";
  let statusColorClass = "bg-[#334155] border-[#475569] text-gray-400";
  let zoneNameLabel = "Ninguna";
  
  let Icon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  const zoneRules: Record<NonNullable<ZoneType>, { name: string; req: DetectedColor[] }> = {
    campamento: { name: "Campamento", req: ["red", "green", "unknown"] }, // Libre
    taller: { name: "Taller Mecánico", req: ["green"] }, // Solo verde
    tajo: { name: "Tajo Abierto", req: ["red"] }, // Solo rojo
    planta: { name: "Planta de Proceso", req: ["red"] }, // Solo rojo
    polvorin: { name: "Polvorín", req: ["red"] } // Solo rojo
  };

  if (!selectedZone) {
    statusMessage = "SELECCIONE ZONA";
  } else {
    const rule = zoneRules[selectedZone];
    if (!rule) {
      statusMessage = "ZONA INVÁLIDA O ACTUALIZANDO...";
      zoneNameLabel = "Ninguna";
    } else {
      zoneNameLabel = rule.name;

      if (rule.req.includes(detectedColor)) {
        isAccessGranted = true;
        statusMessage = "ACCESO PERMITIDO";
      } else {
        isAccessGranted = false;
        statusMessage = "ACCESO DENEGADO";
      }
    }

    if (isAccessGranted) {
      statusColorClass = "bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.2)]";
      Icon = (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    } else {
      statusColorClass = "bg-red-500/10 border-red-500 text-red-400 shadow-[0_0_30px_rgba(239,68,68,0.2)]";
      Icon = (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    }
  }

  // Helper for helmet color UI
  const helmetColorUI = {
    red: { label: "ROJO", bg: "bg-red-500", text: "text-red-400" },
    green: { label: "VERDE", bg: "bg-emerald-500", text: "text-emerald-400" },
    unknown: { label: "NO DETECTADO", bg: "bg-gray-500", text: "text-gray-400" },
  };

  return (
    <div className="bg-[#1e293b] p-6 rounded-2xl border border-[#334155] shadow-xl w-full flex flex-col items-center">
      <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-6 self-start">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        Validación
      </h2>

      <div className="grid grid-cols-2 gap-4 w-full mb-8">
        <div className="bg-[#0f172a] rounded-xl p-4 flex flex-col items-center justify-center border border-[#334155] text-center">
          <span className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Zona Solicitada</span>
          <span className="text-lg font-bold text-white truncate w-full px-2">
            {zoneNameLabel}
          </span>
        </div>
        <div className="bg-[#0f172a] rounded-xl p-4 flex flex-col items-center justify-center border border-[#334155]">
          <span className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Casco Detectado</span>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${helmetColorUI[detectedColor].bg} animate-pulse`} />
            <span className={`text-lg font-bold ${helmetColorUI[detectedColor].text}`}>
              {helmetColorUI[detectedColor].label}
            </span>
          </div>
        </div>
      </div>

      <div className={`w-full py-8 rounded-xl border-4 flex flex-col items-center justify-center transition-all duration-500 ${statusColorClass}`}>
        <div className="mb-4 transform transition-transform duration-500 hover:scale-110">
          {Icon}
        </div>
        <span className="text-3xl md:text-4xl font-black tracking-widest text-center px-4">
          {statusMessage}
        </span>
      </div>
    </div>
  );
}
