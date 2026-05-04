export type HelmetColor = "yellow" | "red" | "brown" | "white" | "green";

export type AreaCode = 
  | "ingreso-vehicular" | "oficinas" | "comedor" | "vestuarios" | "jefatura"
  | "laboratorio" | "reactivos" | "chancado" | "tolva-gruesos" | "tolva-finos"
  | "molienda" | "molino-bolas" | "molino-barras" | "flotacion" | "celdas-flotacion"
  | "filtro-prensa" | "cancha-concentrado" | "bombeo-relave" | "poza-relave" | "bombas"
  | "tanques-agua" | "subestacion" | "taller-mecanico" | "taller-electrico" | "lubricantes"
  | "deposito-residuos" | "almacen-temporal" | "balanza" | "rutas-evacuacion" | "punto-reunion";

export interface Area {
  code: AreaCode;
  name: string;
  allowedRoles: {
    yellow: boolean;  // Visita
    red: boolean;     // Brigadista
    brown: boolean;   // Seguridad
    white: boolean;   // Supervisor
    green: boolean;   // Trabajador
  };
  riskLevel: "critical" | "high" | "medium" | "low";
  risks: string[];
}

export const AREAS: Record<AreaCode, Area> = {
  "ingreso-vehicular": {
    code: "ingreso-vehicular",
    name: "Ingreso / Acceso Vehicular",
    allowedRoles: { yellow: true, red: true, brown: true, white: true, green: true },
    riskLevel: "high",
    risks: ["Tránsito vehicular", "Control de acceso"]
  },
  "oficinas": {
    code: "oficinas",
    name: "Oficinas Administrativas",
    allowedRoles: { yellow: true, red: true, brown: true, white: true, green: true },
    riskLevel: "low",
    risks: ["Área administrativa"]
  },
  "comedor": {
    code: "comedor",
    name: "Comedor",
    allowedRoles: { yellow: true, red: true, brown: true, white: true, green: true },
    riskLevel: "low",
    risks: ["Área de descanso"]
  },
  "vestuarios": {
    code: "vestuarios",
    name: "Vestuarios",
    allowedRoles: { yellow: false, red: true, brown: true, white: true, green: true },
    riskLevel: "low",
    risks: ["Área de cambio"]
  },
  "jefatura": {
    code: "jefatura",
    name: "Jefatura de Planta",
    allowedRoles: { yellow: true, red: true, brown: true, white: true, green: false },
    riskLevel: "low",
    risks: ["Área administrativa"]
  },
  "laboratorio": {
    code: "laboratorio",
    name: "Laboratorio",
    allowedRoles: { yellow: true, red: true, brown: false, white: true, green: true },
    riskLevel: "high",
    risks: ["Riesgo químico", "Sustancias peligrosas"]
  },
  "reactivos": {
    code: "reactivos",
    name: "Reactivos",
    allowedRoles: { yellow: false, red: true, brown: false, white: true, green: true },
    riskLevel: "critical",
    risks: ["Sustancias químicas", "Riesgo de exposición"]
  },
  "chancado": {
    code: "chancado",
    name: "Chancado",
    allowedRoles: { yellow: false, red: true, brown: false, white: true, green: true },
    riskLevel: "critical",
    risks: ["Riesgo mecánico", "Atrapamiento"]
  },
  "tolva-gruesos": {
    code: "tolva-gruesos",
    name: "Tolva de Gruesos",
    allowedRoles: { yellow: false, red: true, brown: false, white: true, green: true },
    riskLevel: "critical",
    risks: ["Riesgo de caída", "Materiales en movimiento"]
  },
  "tolva-finos": {
    code: "tolva-finos",
    name: "Tolvas de Finos",
    allowedRoles: { yellow: false, red: true, brown: false, white: true, green: true },
    riskLevel: "high",
    risks: ["Riesgo de caída", "Polvo"]
  },
  "molienda": {
    code: "molienda",
    name: "Molienda",
    allowedRoles: { yellow: false, red: true, brown: false, white: true, green: true },
    riskLevel: "critical",
    risks: ["Riesgo mecánico", "Ruido", "Energía eléctrica"]
  },
  "molino-bolas": {
    code: "molino-bolas",
    name: "Molino de Bolas",
    allowedRoles: { yellow: false, red: true, brown: false, white: true, green: true },
    riskLevel: "critical",
    risks: ["Riesgo mecánico", "Ruido extremo"]
  },
  "molino-barras": {
    code: "molino-barras",
    name: "Molino de Barras",
    allowedRoles: { yellow: false, red: true, brown: false, white: true, green: true },
    riskLevel: "critical",
    risks: ["Riesgo mecánico", "Ruido extremo"]
  },
  "flotacion": {
    code: "flotacion",
    name: "Flotación",
    allowedRoles: { yellow: false, red: true, brown: false, white: true, green: true },
    riskLevel: "high",
    risks: ["Riesgo químico", "Resbalones", "Equipos en movimiento"]
  },
  "celdas-flotacion": {
    code: "celdas-flotacion",
    name: "Celdas de Flotación",
    allowedRoles: { yellow: false, red: true, brown: false, white: true, green: true },
    riskLevel: "high",
    risks: ["Riesgo químico", "Resbalones"]
  },
  "filtro-prensa": {
    code: "filtro-prensa",
    name: "Filtro Prensa",
    allowedRoles: { yellow: false, red: true, brown: false, white: true, green: true },
    riskLevel: "high",
    risks: ["Riesgo operacional", "Presión"]
  },
  "cancha-concentrado": {
    code: "cancha-concentrado",
    name: "Cancha de Concentrado",
    allowedRoles: { yellow: true, red: true, brown: true, white: true, green: true },
    riskLevel: "medium",
    risks: ["Tránsito de vehículos"]
  },
  "bombeo-relave": {
    code: "bombeo-relave",
    name: "Bombeo de Relave",
    allowedRoles: { yellow: false, red: true, brown: false, white: true, green: true },
    riskLevel: "critical",
    risks: ["Riesgo de caída", "Inundación", "Exposición a relaves"]
  },
  "poza-relave": {
    code: "poza-relave",
    name: "Poza de Relave",
    allowedRoles: { yellow: false, red: true, brown: false, white: true, green: true },
    riskLevel: "critical",
    risks: ["Riesgo de caída", "Inundación"]
  },
  "bombas": {
    code: "bombas",
    name: "Bombas Warman / Toyo / Feluwa",
    allowedRoles: { yellow: false, red: true, brown: false, white: true, green: true },
    riskLevel: "high",
    risks: ["Riesgo mecánico", "Vibración"]
  },
  "tanques-agua": {
    code: "tanques-agua",
    name: "Tanques de Agua",
    allowedRoles: { yellow: true, red: true, brown: false, white: true, green: true },
    riskLevel: "medium",
    risks: ["Riesgo de caída", "Mantenimiento"]
  },
  "subestacion": {
    code: "subestacion",
    name: "Subestación Eléctrica",
    allowedRoles: { yellow: false, red: true, brown: false, white: true, green: true },
    riskLevel: "critical",
    risks: ["Riesgo eléctrico crítico"]
  },
  "taller-mecanico": {
    code: "taller-mecanico",
    name: "Taller Mecánico",
    allowedRoles: { yellow: false, red: true, brown: false, white: true, green: true },
    riskLevel: "high",
    risks: ["Herramientas", "Riesgo mecánico"]
  },
  "taller-electrico": {
    code: "taller-electrico",
    name: "Taller Eléctrico",
    allowedRoles: { yellow: false, red: true, brown: false, white: true, green: true },
    riskLevel: "high",
    risks: ["Riesgo eléctrico", "Soldadura"]
  },
  "lubricantes": {
    code: "lubricantes",
    name: "Lubricantes",
    allowedRoles: { yellow: false, red: true, brown: false, white: true, green: true },
    riskLevel: "medium",
    risks: ["Químicos", "Inflamables"]
  },
  "deposito-residuos": {
    code: "deposito-residuos",
    name: "Depósito de Residuos",
    allowedRoles: { yellow: false, red: true, brown: true, white: true, green: true },
    riskLevel: "medium",
    risks: ["Gestión de residuos"]
  },
  "almacen-temporal": {
    code: "almacen-temporal",
    name: "Almacén Temporal de Materiales",
    allowedRoles: { yellow: true, red: true, brown: true, white: true, green: true },
    riskLevel: "medium",
    risks: ["Materiales almacenados"]
  },
  "balanza": {
    code: "balanza",
    name: "Balanza Electrónica",
    allowedRoles: { yellow: true, red: true, brown: true, white: true, green: true },
    riskLevel: "low",
    risks: ["Equipo de medición"]
  },
  "rutas-evacuacion": {
    code: "rutas-evacuacion",
    name: "Rutas de Evacuación",
    allowedRoles: { yellow: true, red: true, brown: true, white: true, green: true },
    riskLevel: "low",
    risks: ["Evacuación de emergencia"]
  },
  "punto-reunion": {
    code: "punto-reunion",
    name: "Punto de Reunión / Zona Segura",
    allowedRoles: { yellow: true, red: true, brown: true, white: true, green: true },
    riskLevel: "low",
    risks: ["Zona de concentración"]
  }
};

export const AREA_CODES = Object.keys(AREAS) as AreaCode[];

// Helper function to get allowed helmet colors for an area
export function getAllowedHelmetColors(areaCode: AreaCode): HelmetColor[] {
  const area = AREAS[areaCode];
  const colors: HelmetColor[] = [];
  
  if (area.allowedRoles.yellow) colors.push("yellow");
  if (area.allowedRoles.red) colors.push("red");
  if (area.allowedRoles.brown) colors.push("brown");
  if (area.allowedRoles.white) colors.push("white");
  if (area.allowedRoles.green) colors.push("green");
  
  return colors;
}

// Role definitions
export const HELMET_COLORS: Record<HelmetColor, string> = {
  yellow: "Visita",
  red: "Brigadista",
  brown: "Seguridad",
  white: "Supervisor",
  green: "Trabajador"
};
