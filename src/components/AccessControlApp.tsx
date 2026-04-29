"use client";

import React, { useState } from "react";
import MapZone, { ZoneType } from "./MapZone";
import CameraDetector, { DetectedColor } from "./CameraDetector";
import ValidationStatus from "./ValidationStatus";

export default function AccessControlApp() {
  const [selectedZone, setSelectedZone] = useState<ZoneType>(null);
  const [detectedColor, setDetectedColor] = useState<DetectedColor>("unknown");

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col max-w-7xl mx-auto">
      {/* Header */}
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
            Control de Acceso Minero
          </h1>
          <p className="text-gray-400 mt-2">Sistema Inteligente de Validación por Visión</p>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <div className="flex flex-col text-right">
            <span className="text-sm font-bold text-white">Operativo</span>
            <span className="text-xs text-emerald-400">Sistema en línea</span>
          </div>
          <div className="w-12 h-12 rounded-full bg-[#1e293b] border-2 border-[#334155] flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
        
        {/* Left Column (Map & Validation) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="flex-1 min-h-[300px]">
            <MapZone selectedZone={selectedZone} onSelectZone={setSelectedZone} />
          </div>
          
          <div className="mt-auto">
            <ValidationStatus selectedZone={selectedZone} detectedColor={detectedColor} />
          </div>
        </div>

        {/* Right Column (Camera) */}
        <div className="lg:col-span-7 flex flex-col">
          <CameraDetector 
            onColorDetected={setDetectedColor} 
            isActive={selectedZone !== null} // Only active if a zone is selected, to save resources, or always active.
          />
          
          {/* Instructions panel */}
          <div className="mt-6 bg-[#1e293b]/50 p-6 rounded-2xl border border-[#334155]/50 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Instrucciones
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                <span>Selecciona el área a la que deseas ingresar en el <strong className="text-gray-300">Mapa de la Mina</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                <span>Sitúate frente a la cámara, alineando tu casco con el <strong className="text-yellow-400">recuadro amarillo</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                <span>El sistema validará automáticamente si tienes el EPP adecuado para el área seleccionada.</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
