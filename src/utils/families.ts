export interface Family {
  key: string;
  label: string;
  description: string;
}

export const families: Family[] = [
  {
    key: "escritura",
    label: "LaTeX",
    description: "Redacción y estructura de documentos científicos con LaTeX.",
  },
  {
    key: "tikz",
    label: "TikZ",
    description: "Dibujos y diagramas científicos con TikZ.",
  },
  {
    key: "pgfplots",
    label: "PGFPlots",
    description: "Representación de datos y gráficas automáticas de alta calidad directamente en LaTeX.",
  },
  {
    key: "especialidades",
    label: "Especialidades",
    description: "Herramientas específicas: moléculas, circuitos, diagramas avanzados.",
  },
];