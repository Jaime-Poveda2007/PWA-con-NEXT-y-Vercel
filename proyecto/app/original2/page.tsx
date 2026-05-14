"use client";

import { useState } from "react";
import Link from "next/link";

// ─────────────────────────────────────────────────────────────
// TIPOS
// ─────────────────────────────────────────────────────────────

type Clima = "frio" | "templado" | "calor";
type Ocasion = "trabajo" | "salida" | "casual";

type Prenda = {
  tipo: string;
  color: string;
  hex: string;
  pct: number;
  nota: string;
};

type Outfit = {
  nombre: string;
  regla: string;
  clima: string;
  ocasion: string;
  consejo: string;
  prendas: Prenda[];
  accesorio: Prenda;
};

// ─────────────────────────────────────────────────────────────
// DATOS: 3 climas × 3 ocasiones = 9 combinaciones, 2 outfits c/u
// ─────────────────────────────────────────────────────────────

const OUTFITS: Record<string, Outfit[]> = {
  frio_trabajo: [
    {
      nombre: "Sastre Gris con Rollneck",
      regla: "Regla 60/30/10",
      clima: "Frío",
      ocasion: "Trabajo",
      consejo:
        "El pantalón de sastre gris da seriedad. El rollneck crema evita la corbata sin perder formalidad. El abrigo largo cierra todo con autoridad.",
      prendas: [
        { tipo: "Pantalón de sastre", color: "Gris antracita", hex: "#374151", pct: 60, nota: "60% — base formal dominante" },
        { tipo: "Rollneck", color: "Crema", hex: "#F0E6D3", pct: 30, nota: "30% — alternativa elegante a la camisa" },
        { tipo: "Abrigo largo", color: "Camel", hex: "#C19A6B", pct: 0, nota: "capa exterior que une el look" },
      ],
      accesorio: { tipo: "Botines de cuero", color: "Negro", hex: "#1a1a1a", pct: 10, nota: "10% — cierra con autoridad" },
    },
    {
      nombre: "Navy y Blanco Invierno",
      regla: "Regla 60/30/10",
      clima: "Frío",
      ocasion: "Trabajo",
      consejo:
        "Azul marino + blanco es el clásico de oficina invierno. El blazer de tweed añade textura sin romper el esquema de color.",
      prendas: [
        { tipo: "Pantalón marino", color: "Azul marino", hex: "#1E293B", pct: 60, nota: "60% — el clásico formal frío" },
        { tipo: "Camisa blanca", color: "Blanco", hex: "#F8FAFC", pct: 30, nota: "30% — el contrapunto limpio" },
        { tipo: "Blazer tweed", color: "Gris perla", hex: "#D1D5DB", pct: 0, nota: "textura que da carácter" },
      ],
      accesorio: { tipo: "Zapatos Oxford", color: "Marrón oscuro", hex: "#4A2C17", pct: 10, nota: "10% — toque clásico" },
    },
  ],
  frio_salida: [
    {
      nombre: "Borgoña y Negro Nocturno",
      regla: "Look Monocromático",
      clima: "Frío",
      ocasion: "Salida",
      consejo:
        "Borgoña y negro son la dupla perfecta para noche de invierno. El accesorio dorado da calor al look oscuro.",
      prendas: [
        { tipo: "Pantalón negro", color: "Negro", hex: "#1a1a1a", pct: 60, nota: "60% — base nocturna infalible" },
        { tipo: "Blusa / top", color: "Borgoña", hex: "#831843", pct: 30, nota: "30% — el color joya que brilla de noche" },
        { tipo: "Blazer", color: "Negro", hex: "#1a1a1a", pct: 0, nota: "cohesiona el look oscuro" },
      ],
      accesorio: { tipo: "Aretes o collar", color: "Dorado", hex: "#B8860B", pct: 10, nota: "10% — el calor que necesita el look oscuro" },
    },
    {
      nombre: "Teal y Gris Humo",
      regla: "Colores Complementarios",
      clima: "Frío",
      ocasion: "Salida",
      consejo:
        "El teal es sofisticado y diferente, perfecto para destacar sin esfuerzo. Combinación ideal para cena o evento de noche.",
      prendas: [
        { tipo: "Falda midi / pantalón", color: "Gris humo", hex: "#4B5563", pct: 60, nota: "60% — neutro frío elegante" },
        { tipo: "Blusa de seda", color: "Verde teal", hex: "#0D9488", pct: 30, nota: "30% — el color sofisticado de la noche" },
        { tipo: "Cardigan fino", color: "Gris perla", hex: "#D1D5DB", pct: 0, nota: "capa ligera sin romper el look" },
      ],
      accesorio: { tipo: "Clutch y zapatos", color: "Plateado", hex: "#94A3B8", pct: 10, nota: "10% — las joyas plateadas potencian el teal" },
    },
  ],
  frio_casual: [
    {
      nombre: "Comfy Capas en Neutros",
      regla: "Look Monocromático",
      clima: "Frío",
      ocasion: "Casual",
      consejo:
        "La regla de las capas: la más fina abajo, la más gruesa afuera. Los neutros nunca fallan juntos. La bufanda es el acento visual.",
      prendas: [
        { tipo: "Jeans oscuros", color: "Azul denim oscuro", hex: "#1E3A5F", pct: 60, nota: "60% — base cómoda y versátil" },
        { tipo: "Suéter grueso", color: "Gris medio", hex: "#9CA3AF", pct: 30, nota: "30% — la capa principal del look" },
        { tipo: "Parka / abrigo", color: "Caqui", hex: "#8B8B5A", pct: 0, nota: "la capa más gruesa, afuera" },
      ],
      accesorio: { tipo: "Bufanda", color: "Camel", hex: "#C19A6B", pct: 10, nota: "10% — el único acento cálido del look" },
    },
    {
      nombre: "Todo Gris Texturado",
      regla: "Look Monocromático",
      clima: "Frío",
      ocasion: "Casual",
      consejo:
        "Tres grises distintos se ven bien si varías las texturas: lana, algodón, terciopelo. El negro en las botas ancla el look.",
      prendas: [
        { tipo: "Joggers / pantalón", color: "Gris carbón", hex: "#374151", pct: 60, nota: "60% — el más oscuro, abajo" },
        { tipo: "Suéter de lana", color: "Gris medio", hex: "#9CA3AF", pct: 30, nota: "30% — tono intermedio" },
        { tipo: "Puffer / chaleco", color: "Gris perla", hex: "#E5E7EB", pct: 0, nota: "el más claro, encima" },
      ],
      accesorio: { tipo: "Botas", color: "Negro", hex: "#1a1a1a", pct: 10, nota: "10% — ancla visual del look" },
    },
  ],
  templado_trabajo: [
    {
      nombre: "Smart Casual Azul y Blanco",
      regla: "Regla 60/30/10",
      clima: "Templado",
      ocasion: "Trabajo",
      consejo:
        "Jeans oscuros + camisa blanca es el smart casual más limpio. El blazer navy lo convierte en oficina sin esfuerzo.",
      prendas: [
        { tipo: "Jeans oscuros", color: "Azul denim oscuro", hex: "#1E3A5F", pct: 60, nota: "60% — la base de todo smart casual" },
        { tipo: "Camisa", color: "Blanco", hex: "#F8FAFC", pct: 30, nota: "30% — el clásico de oficina" },
        { tipo: "Blazer", color: "Azul marino", hex: "#1E293B", pct: 0, nota: "sube el look a formal sin sofocarlo" },
      ],
      accesorio: { tipo: "Zapatos o mocasines", color: "Marrón medio", hex: "#8B5E3C", pct: 10, nota: "10% — toque cálido en look frío" },
    },
    {
      nombre: "Verde Oliva y Crema Office",
      regla: "Colores Análogos",
      clima: "Templado",
      ocasion: "Trabajo",
      consejo:
        "El oliva es el verde más serio — perfecto para oficina. La camisa crema aporta calidez. Funciona especialmente bien para tonos cálidos de piel.",
      prendas: [
        { tipo: "Pantalón chino", color: "Verde oliva", hex: "#6B7C3A", pct: 60, nota: "60% — color tierra con actitud" },
        { tipo: "Camisa", color: "Crema", hex: "#F0E6D3", pct: 30, nota: "30% — base cálida y limpia" },
        { tipo: "Blazer", color: "Camel claro", hex: "#C19A6B", pct: 0, nota: "une los tonos análogos" },
      ],
      accesorio: { tipo: "Zapatos", color: "Marrón oscuro", hex: "#4A2C17", pct: 10, nota: "10% — ancla cálida del look" },
    },
  ],
  templado_salida: [
    {
      nombre: "Brunch: Terracota y Blanco",
      regla: "Regla 60/30/10",
      clima: "Templado",
      ocasion: "Salida",
      consejo:
        "La terracota es el color del momento para salidas de día. Blanco lo limpia y moderniza. El accesorio dorado lo convierte en look de brunch perfecto.",
      prendas: [
        { tipo: "Pantalón o falda", color: "Blanco", hex: "#F8FAFC", pct: 60, nota: "60% — la base fresca y luminosa" },
        { tipo: "Blusa o top", color: "Terracota", hex: "#C1440E", pct: 30, nota: "30% — el color de temporada" },
        { tipo: "Cardigan fino", color: "Beige", hex: "#D4B896", pct: 0, nota: "por si refresca — mismo tono cálido" },
      ],
      accesorio: { tipo: "Sandalias y bolso", color: "Dorado claro", hex: "#B8860B", pct: 10, nota: "10% — el brillo que pide el look de día" },
    },
    {
      nombre: "Tarde de Domingo: Malva y Gris",
      regla: "Colores Análogos",
      clima: "Templado",
      ocasion: "Salida",
      consejo:
        "El malva y el gris lila son análogos suaves, perfectos para una tarde tranquila. El nude en los accesorios lo mantiene discreto.",
      prendas: [
        { tipo: "Pantalón o jeans", color: "Gris lila", hex: "#9CA3AF", pct: 60, nota: "60% — neutro con matiz frío suave" },
        { tipo: "Blusa", color: "Malva", hex: "#9D4EDD", pct: 30, nota: "30% — el color suave protagonista" },
        { tipo: "Blazer ligero", color: "Gris perla", hex: "#E5E7EB", pct: 0, nota: "por si baja la temperatura" },
      ],
      accesorio: { tipo: "Sandalias", color: "Nude", hex: "#C8A882", pct: 10, nota: "10% — no distrae del malva" },
    },
  ],
  templado_casual: [
    {
      nombre: "Jeans + Básico de Color",
      regla: "Regla 60/30/10",
      clima: "Templado",
      ocasion: "Casual",
      consejo:
        "La fórmula más versátil de la moda. Jeans como base neutra + básico de color. Siempre funciona.",
      prendas: [
        { tipo: "Jeans", color: "Azul denim medio", hex: "#4A6FA5", pct: 60, nota: "60% — el neutro universal" },
        { tipo: "Camiseta básica", color: "Verde menta", hex: "#6EE7B7", pct: 30, nota: "30% — el color que da frescura" },
        { tipo: "Chaqueta vaquera", color: "Azul denim claro", hex: "#7BA7C7", pct: 0, nota: "misma familia que el jean, más claro" },
      ],
      accesorio: { tipo: "Zapatillas", color: "Blanco", hex: "#F8FAFC", pct: 10, nota: "10% — las blancas van con todo" },
    },
    {
      nombre: "Beige Total Casual",
      regla: "Look Monocromático",
      clima: "Templado",
      ocasion: "Casual",
      consejo:
        "El beige monocromático se ve sofisticado aunque sea casual. La clave: al menos dos texturas distintas.",
      prendas: [
        { tipo: "Pantalón", color: "Beige oscuro", hex: "#A3875E", pct: 60, nota: "60% — base terrosa" },
        { tipo: "Camiseta o blusa", color: "Crema", hex: "#F0E6D3", pct: 30, nota: "30% — tono claro" },
        { tipo: "Chaqueta ligera", color: "Beige claro", hex: "#D4B896", pct: 0, nota: "tercer tono de la gama" },
      ],
      accesorio: { tipo: "Zapatillas o sandalias", color: "Marrón caramelo", hex: "#8B5E3C", pct: 10, nota: "10% — cierra la paleta tierra" },
    },
  ],
  calor_trabajo: [
    {
      nombre: "Lino Blanco y Azul Marino",
      regla: "Regla 60/30/10",
      clima: "Calor",
      ocasion: "Trabajo",
      consejo:
        "El lino blanco es el tejido más inteligente para calor en oficina: transpira y se ve impecable. El blazer ligero mantiene la formalidad.",
      prendas: [
        { tipo: "Pantalón de lino", color: "Blanco", hex: "#F8FAFC", pct: 60, nota: "60% — fresco y formal a la vez" },
        { tipo: "Camisa de lino", color: "Celeste", hex: "#BAE6FD", pct: 30, nota: "30% — frío y profesional" },
        { tipo: "Blazer ligero", color: "Azul marino", hex: "#1E293B", pct: 0, nota: "para reuniones o el AC del office" },
      ],
      accesorio: { tipo: "Zapatos de cuero", color: "Marrón claro", hex: "#8B5E3C", pct: 10, nota: "10% — el calor que pide el look blanco" },
    },
    {
      nombre: "Oliva y Crema Frescos",
      regla: "Colores Análogos",
      clima: "Calor",
      ocasion: "Trabajo",
      consejo:
        "El verde oliva en tejido fresco (lino, viscosa) se ve profesional sin dar calor visual. Ideal para climas tropicales de oficina.",
      prendas: [
        { tipo: "Pantalón de lino", color: "Verde oliva claro", hex: "#8B9A5E", pct: 60, nota: "60% — color tierra fresco" },
        { tipo: "Blusa ligera", color: "Crema", hex: "#F0E6D3", pct: 30, nota: "30% — base cálida y ligera" },
        { tipo: "Sin capa exterior", color: "—", hex: "#E5E7EB", pct: 0, nota: "en calor se evitan las capas" },
      ],
      accesorio: { tipo: "Sandalias planas", color: "Marrón claro", hex: "#A0795E", pct: 10, nota: "10% — práctico y acorde al look" },
    },
  ],
  calor_salida: [
    {
      nombre: "Vestido Blanco Nocturno",
      regla: "Look Monocromático",
      clima: "Calor",
      ocasion: "Salida",
      consejo:
        "El blanco de noche es elegante y fresco a la vez. El accesorio de color es lo que personaliza el look y lo diferencia del día.",
      prendas: [
        { tipo: "Vestido o conjunto", color: "Blanco", hex: "#F8FAFC", pct: 90, nota: "90% — el lienzo perfecto para la noche" },
        { tipo: "(sin capas)", color: "—", hex: "#F0F0F0", pct: 0, nota: "" },
        { tipo: "(sin capas)", color: "—", hex: "#F0F0F0", pct: 0, nota: "" },
      ],
      accesorio: { tipo: "Accesorios", color: "Dorado o color joya", hex: "#B8860B", pct: 10, nota: "10% — el único color del look, por eso impacta" },
    },
    {
      nombre: "Verano Nocturno: Azul y Coral",
      regla: "Colores Complementarios",
      clima: "Calor",
      ocasion: "Salida",
      consejo:
        "Azul marino oscuro + coral es una de las combinaciones más vivas del verano. Muy favorecedoras bajo luz cálida.",
      prendas: [
        { tipo: "Pantalón o falda", color: "Azul marino", hex: "#1E293B", pct: 60, nota: "60% — el oscuro que controla el look" },
        { tipo: "Top o blusa", color: "Coral vivo", hex: "#F87171", pct: 30, nota: "30% — el verano del look" },
        { tipo: "(sin capas)", color: "—", hex: "#F0F0F0", pct: 0, nota: "en calor, sin capas" },
      ],
      accesorio: { tipo: "Sandalias", color: "Dorado", hex: "#B8860B", pct: 10, nota: "10% — une el azul y el coral" },
    },
  ],
  calor_casual: [
    {
      nombre: "Máxima Ligereza: Lino Neutro",
      regla: "Look Monocromático",
      clima: "Calor",
      ocasion: "Casual",
      consejo:
        "Para calor extremo: lino claro de pies a cabeza. Varía el tono (no el mismo color arriba y abajo). El accesorio de color es tu toque personal.",
      prendas: [
        { tipo: "Pantalón de lino", color: "Beige claro", hex: "#E8DCC8", pct: 60, nota: "60% — el más claro y fresco abajo" },
        { tipo: "Camiseta de lino", color: "Blanco roto", hex: "#F5F0EB", pct: 30, nota: "30% — ligerísimo" },
        { tipo: "(sin capas)", color: "—", hex: "#F0F0F0", pct: 0, nota: "" },
      ],
      accesorio: { tipo: "Sandalias o alpargatas", color: "Marrón natural", hex: "#8B6914", pct: 10, nota: "10% — el toque natural que cierra el look" },
    },
    {
      nombre: "Jeans + Blanco Verano",
      regla: "Regla 60/30/10",
      clima: "Calor",
      ocasion: "Casual",
      consejo:
        "Jeans claros en verano son más frescos que los oscuros. La camiseta blanca es la más versátil del armario. El accesorio de color hace el trabajo visual.",
      prendas: [
        { tipo: "Jeans claros", color: "Azul denim claro", hex: "#7BA7C7", pct: 60, nota: "60% — más fresco que el denim oscuro" },
        { tipo: "Camiseta", color: "Blanco", hex: "#F8FAFC", pct: 30, nota: "30% — el básico perfecto" },
        { tipo: "(sin capas)", color: "—", hex: "#F0F0F0", pct: 0, nota: "" },
      ],
      accesorio: { tipo: "Zapatillas o sandalias", color: "Color de temporada", hex: "#F97316", pct: 10, nota: "10% — aquí va tu personalidad" },
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// FUNCIÓN AUXILIAR
// ─────────────────────────────────────────────────────────────

function elegirAleatorio<T>(lista: T[]): T {
  return lista[Math.floor(Math.random() * lista.length)];
}

function colorDeTexto(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.5 ? "#000000" : "#ffffff";
}

// ─────────────────────────────────────────────────────────────
// COMPONENTE PRINCIPAL
// ─────────────────────────────────────────────────────────────

export default function OutfitClimaOcasion() {
  const [clima, setClima] = useState<Clima | null>(null);
  const [ocasion, setOcasion] = useState<Ocasion | null>(null);
  const [outfit, setOutfit] = useState<Outfit | null>(null);
  const [error, setError] = useState(false);

  function generarOutfit() {
    if (!clima || !ocasion) {
      setError(true);
      return;
    }
    setError(false);
    const key = `${clima}_${ocasion}`;
    const lista = OUTFITS[key];
    setOutfit(elegirAleatorio(lista));
  }

  const prendasReales = outfit
    ? outfit.prendas.filter((p) => p.pct > 0 && p.hex !== "#F0F0F0")
    : [];

  return (
    <main style={{ maxWidth: 640, margin: "0 auto", padding: "24px 16px" }}>

      {/* ── BOTÓN VOLVER ── */}
      <Link href="/" style={{
        display: "inline-block",
        marginBottom: 20,
        fontSize: 14,
        color: "#555",
        textDecoration: "none",
        background: "#f3f4f6",
        padding: "6px 14px",
        borderRadius: 8,
        border: "1px solid #e5e7eb",
      }}>
        ← Volver al inicio
      </Link>

      <h1>Outfit por Clima y Ocasión</h1>
      <p>Selecciona el clima del día y la ocasión para recibir una combinación personalizada.</p>

      <hr />

      {/* ── PASO 1: CLIMA ── */}
      <section>
        <h2>1. Clima del día</h2>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {(["frio", "templado", "calor"] as Clima[]).map((c) => (
            <button
              key={c}
              onClick={() => setClima(c)}
              style={{ fontWeight: clima === c ? "bold" : "normal" }}
            >
              {c === "frio" ? "🥶 Frío" : c === "templado" ? "🌤 Templado" : "☀️ Calor"}
            </button>
          ))}
        </div>
        {clima && <p>Clima seleccionado: <strong>{clima}</strong></p>}
      </section>

      <hr />

      {/* ── PASO 2: OCASIÓN ── */}
      <section>
        <h2>2. Ocasión</h2>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {(["trabajo", "salida", "casual"] as Ocasion[]).map((o) => (
            <button
              key={o}
              onClick={() => setOcasion(o)}
              style={{ fontWeight: ocasion === o ? "bold" : "normal" }}
            >
              {o === "trabajo" ? "💼 Trabajo" : o === "salida" ? "🌙 Salida" : "🧢 Casual"}
            </button>
          ))}
        </div>
        {ocasion && <p>Ocasión seleccionada: <strong>{ocasion}</strong></p>}
      </section>

      <hr />

      {/* ── PASO 3: GENERAR ── */}
      <section>
        <h2>3. Genera tu combinación</h2>
        <button onClick={generarOutfit}>
          {outfit ? "↻ Generar otra combinación" : "Ver mi outfit"}
        </button>
        {error && <p style={{ color: "red" }}>⚠️ Selecciona el clima y la ocasión primero.</p>}
      </section>

      <hr />

      {/* ── RESULTADO ── */}
      {outfit && (
        <section>
          <h2>Tu look: {outfit.nombre}</h2>
          <p><strong>Regla usada:</strong> {outfit.regla}</p>
          <p><strong>Clima:</strong> {outfit.clima} &nbsp;|&nbsp; <strong>Ocasión:</strong> {outfit.ocasion}</p>
          <p><strong>¿Por qué funciona?</strong> {outfit.consejo}</p>

          {/* Barra de colores */}
          <div style={{ display: "flex", height: 72, marginBottom: 16, borderRadius: 8, overflow: "hidden" }}>
            {prendasReales.map((prenda, i) => {
              const flex = i === 0 ? 6 : 3;
              return (
                <div
                  key={i}
                  style={{
                    flex,
                    backgroundColor: prenda.hex,
                    color: colorDeTexto(prenda.hex),
                    display: "flex",
                    alignItems: "flex-end",
                    padding: "6px 8px",
                    fontSize: 11,
                  }}
                >
                  {prenda.color}
                </div>
              );
            })}
            <div
              style={{
                flex: 1,
                backgroundColor: outfit.accesorio.hex,
                color: colorDeTexto(outfit.accesorio.hex),
                display: "flex",
                alignItems: "flex-end",
                padding: "6px 6px",
                fontSize: 11,
              }}
            >
              {outfit.accesorio.color}
            </div>
          </div>

          {/* Lista de prendas */}
          <h3>Prendas:</h3>
          <ul>
            {prendasReales.map((prenda, i) => (
              <li key={i}>
                <span style={{
                  display: "inline-block", width: 14, height: 14,
                  backgroundColor: prenda.hex, border: "1px solid #ccc",
                  marginRight: 8, verticalAlign: "middle",
                }} />
                <strong>{prenda.tipo}</strong> — {prenda.color} ({prenda.pct}%)
                <br />
                <small>{prenda.nota}</small>
              </li>
            ))}
          </ul>

          <h3>Accesorio (10%):</h3>
          <ul>
            <li>
              <span style={{
                display: "inline-block", width: 14, height: 14,
                backgroundColor: outfit.accesorio.hex, border: "1px solid #ccc",
                marginRight: 8, verticalAlign: "middle",
              }} />
              <strong>{outfit.accesorio.tipo}</strong> — {outfit.accesorio.color}
              <br />
              <small>{outfit.accesorio.nota}</small>
            </li>
          </ul>
        </section>
      )}

      {!outfit && (
        <section>
          <p>👗 Selecciona el clima y la ocasión para ver tu combinación.</p>
        </section>
      )}
    </main>
  );
}