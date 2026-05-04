"use client";

import React, { useEffect, useRef, useState } from "react";
import { HelmetColor } from "@/data/zones";

export type DetectedColor = HelmetColor | "unknown";

interface CameraDetectorProps {
  onColorDetected: (color: DetectedColor) => void;
  isActive: boolean;
}

const REF_COLORS = {
  yellow: { r: 234, g: 179, b: 8 },
  red:    { r: 239, g: 68,  b: 68 },
  brown:  { r: 146, g: 64,  b: 14 },
  white:  { r: 245, g: 245, b: 245 },
  green:  { r: 16,  g: 185, b: 129 },
};

const getColorDistance = (r1: number, g1: number, b1: number, r2: number, g2: number, b2: number) => {
  return Math.sqrt(Math.pow(r1 - r2, 2) + Math.pow(g1 - g2, 2) + Math.pow(b1 - b2, 2));
};

export default function CameraDetector({ onColorDetected, isActive }: CameraDetectorProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  // Initialize camera
  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setHasPermission(true);
      } catch (err) {
        console.error("Error accessing camera:", err);
        setHasPermission(false);
      }
    };

    if (isActive) {
      startCamera();
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isActive]);

  // Color detection loop
  useEffect(() => {
    if (!isActive || !hasPermission) return;

    let animationFrameId: number;
    let lastProcessTime = 0;
    
    let consecutiveColor = "unknown" as DetectedColor;
    let consecutiveCount = 0;

    const processFrame = (timestamp: number) => {
      // Limit processing to ~5 fps for performance
      if (timestamp - lastProcessTime > 200) {
        if (videoRef.current && canvasRef.current && videoRef.current.readyState >= 2) {
          const video = videoRef.current;
          const canvas = canvasRef.current;
          
          if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
          }

          const ctx = canvas.getContext("2d", { willReadFrequently: true });

          if (ctx && canvas.width > 0 && canvas.height > 0) {
            // Draw current video frame to canvas
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            // Bounding box
            const boxX = Math.floor(canvas.width * 0.3);
            const boxY = Math.floor(canvas.height * 0.1);
            const boxW = Math.floor(canvas.width * 0.4);
            const boxH = Math.floor(canvas.height * 0.3);

            if (boxW > 0 && boxH > 0) {
              const imageData = ctx.getImageData(boxX, boxY, boxW, boxH);
              const data = imageData.data;

              const counts: Record<string, number> = { yellow: 0, red: 0, brown: 0, white: 0, green: 0 };
              
              // Only sample a subset of pixels to save CPU
              for (let i = 0; i < data.length; i += 16) {
                const r = data[i];
                const g = data[i+1];
                const b = data[i+2];
                
                // Ignore very dark pixels
                if (r < 60 && g < 60 && b < 60) continue;
                
                let minDist = Infinity;
                let closest = null;
                
                for (const [colorName, ref] of Object.entries(REF_COLORS)) {
                  const dist = getColorDistance(r, g, b, ref.r, ref.g, ref.b);
                  if (dist < minDist) {
                    minDist = dist;
                    closest = colorName;
                  }
                }
                
                if (closest && minDist < 120) {
                  counts[closest]++;
                }
              }

              // Find most prominent color
              let detectedFrameColor: DetectedColor = "unknown";
              let maxCount = 0;
              const sampledPixels = data.length / 16;

              for (const [color, count] of Object.entries(counts)) {
                // Require at least 15% of sampled pixels to match
                if (count > maxCount && count > sampledPixels * 0.15) {
                  maxCount = count;
                  detectedFrameColor = color as DetectedColor;
                }
              }

              // Debounce
              if (detectedFrameColor === consecutiveColor) {
                consecutiveCount++;
                if (consecutiveCount === 3) {
                  onColorDetected(detectedFrameColor);
                }
              } else {
                consecutiveColor = detectedFrameColor;
                consecutiveCount = 1;
                if (detectedFrameColor === "unknown") {
                   onColorDetected("unknown");
                }
              }
            }
          }
        }
        lastProcessTime = timestamp;
      }
      animationFrameId = requestAnimationFrame(processFrame);
    };

    animationFrameId = requestAnimationFrame(processFrame);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isActive, hasPermission, onColorDetected]);

  return (
    <div className="bg-[#1e293b] p-6 rounded-2xl border border-[#334155] shadow-xl w-full flex flex-col items-center">
      <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-4 self-start">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        Identificación de Casco
      </h2>

      {hasPermission === false ? (
        <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-red-500/50 rounded-xl bg-red-500/5 text-red-400 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="font-semibold">No se pudo acceder a la cámara</p>
          <p className="text-sm mt-1 text-red-400/80">Por favor otorga permisos de cámara para continuar.</p>
        </div>
      ) : (
        <>
          <div className="relative w-full max-w-md aspect-video bg-black rounded-xl overflow-hidden border-4 border-[#334155] shadow-2xl">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover transform -scale-x-100"
            />
            <canvas ref={canvasRef} className="hidden" />

            {/* Overlay to show where the helmet should be */}
            <div className="absolute inset-0 pointer-events-none flex flex-col items-center">
              <div className="w-[40%] h-[30%] border-2 border-dashed border-yellow-400 mt-[10%] rounded-lg flex items-center justify-center bg-yellow-400/10 shadow-[0_0_15px_rgba(250,204,21,0.5)]">
                <span className="text-yellow-400 font-bold text-xs bg-black/50 px-2 py-1 rounded">Casco</span>
              </div>
            </div>
            
            {/* Scanning Line Animation */}
            <div className="absolute left-0 right-0 h-0.5 bg-blue-500/50 shadow-[0_0_8px_#3b82f6] animate-[scan_3s_ease-in-out_infinite]" />
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-400">
              Apunta un objeto con el color de tu casco dentro del recuadro amarillo para validación automática.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
