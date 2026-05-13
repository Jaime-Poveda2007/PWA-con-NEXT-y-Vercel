"use client";

import { useState, useEffect } from "react";

// ─── TIPOS ───────────────────────────────────────────────────

type SubtonoPiel = "calido" | "frio" | "neutro";

type Prenda = {
  tipo: string;
  color: string;
  hex: string;
  nota: string;
};

type Outfit = {
  nombre: string;
  regla: string;
  consejo: string;
  prendas: Prenda[];
  accesorio: Prenda;
};

// ─── OUTFITS (igual que antes) ────────────────────────────────

const OUTFITS_CALIDO: Outfit[] = [
  {
    nombre: "Tierra y Mostaza",
    regla: "Regla 60/30/10",
    consejo: "El camel es tu base (60%), la blusa mostaza es el color principal (30%) y los botines marrones son el acento (10%). Todos los tonos son cálidos y se llevan bien.",
    prendas: [
      { tipo: "Pantalón chino", color: "Camel",   hex: "#C19A6B", nota: "60% del outfit — la base neutra" },
      { tipo: "Blusa",          color: "Mostaza", hex: "#C8963E", nota: "30% — el color con personalidad" },
      { tipo: "Blazer",         color: "Crema",   hex: "#F0E6D3", nota: "une los dos colores sin competir" },
    ],
    accesorio: { tipo: "Botines", color: "Marrón oscuro", hex: "#4A2C17", nota: "10% — el acento que cierra el look" },
  },
  {
    nombre: "Vaquero y Naranja Quemado",
    regla: "Regla 60/30/10",
    consejo: "Los jeans son el neutro perfecto para cualquier subtono cálido. La blusa naranja añade color sin saturar. Los accesorios en canela mantienen la calidez.",
    prendas: [
      { tipo: "Jeans",            color: "Azul denim medio", hex: "#4A6FA5", nota: "60% — neutro universal" },
      { tipo: "Blusa",            color: "Naranja quemado",  hex: "#C8602A", nota: "30% — el color estrella" },
      { tipo: "Chaqueta vaquera", color: "Azul denim claro", hex: "#7BA7C7", nota: "mismo tono, más claro" },
    ],
    accesorio: { tipo: "Bolso y zapatos", color: "Canela", hex: "#A0522D", nota: "10% — mantiene la calidez" },
  },
  {
    nombre: "Todo Camel (Monocromático)",
    regla: "Look Monocromático",
    consejo: "Tres tonos del mismo color tierra. La clave es que el tono más oscuro va abajo y el más claro arriba. Cambia las texturas: lana, seda, cuero para que no se vea plano.",
    prendas: [
      { tipo: "Pantalón chino", color: "Camel oscuro", hex: "#8B6914", nota: "60% — el más profundo, abajo" },
      { tipo: "Blusa de seda",  color: "Camel medio",  hex: "#C19A6B", nota: "30% — el tono intermedio" },
      { tipo: "Abrigo",         color: "Beige claro",  hex: "#E8DCC8", nota: "el tono más claro, afuera" },
    ],
    accesorio: { tipo: "Bolso", color: "Marrón rojizo", hex: "#7B3F00", nota: "10% — da profundidad" },
  },
  {
    nombre: "Verde Oliva y Terracota",
    regla: "Colores Análogos",
    consejo: "Colores vecinos en la rueda cromática — todos cálidos y terrosos. Fluyen de forma natural, sin esfuerzo. Ideal para otoño.",
    prendas: [
      { tipo: "Pantalón chino", color: "Verde oliva", hex: "#6B7C3A", nota: "60% — color tierra dominante" },
      { tipo: "Camisa",         color: "Terracota",   hex: "#C1440E", nota: "30% — vecino cálido del oliva" },
      { tipo: "Cardigan",       color: "Beige",       hex: "#D4B896", nota: "el neutro que equilibra" },
    ],
    accesorio: { tipo: "Bolso", color: "Marrón caramelo", hex: "#8B5E3C", nota: "10% — ancla cálida" },
  },
];

const OUTFITS_FRIO: Outfit[] = [
  {
    nombre: "Azul Marino y Blanco",
    regla: "Regla 60/30/10",
    consejo: "La combinación más clásica para subtonos fríos. El accesorio de color es lo que le da tu toque personal.",
    prendas: [
      { tipo: "Pantalón de sastre", color: "Azul marino", hex: "#1E293B", nota: "60% — el clásico dominante frío" },
      { tipo: "Camisa o blusa",     color: "Blanco",      hex: "#F8FAFC", nota: "30% — el neutro luminoso" },
      { tipo: "Blazer",             color: "Gris perla",  hex: "#D1D5DB", nota: "une el look" },
    ],
    accesorio: { tipo: "Bolso o pañuelo", color: "Fucsia", hex: "#BE185D", nota: "10% — el acento que te diferencia" },
  },
  {
    nombre: "Jeans y Esmeralda",
    regla: "Regla 60/30/10",
    consejo: "El verde esmeralda es uno de los colores más favorecedores para pieles frías. Los jeans oscuros son la base neutra ideal.",
    prendas: [
      { tipo: "Jeans oscuros", color: "Azul denim oscuro", hex: "#1E3A5F", nota: "60% — base neutra oscura" },
      { tipo: "Blusa",         color: "Verde esmeralda",   hex: "#0D9488", nota: "30% — protagonista del look" },
      { tipo: "Blazer",        color: "Negro",             hex: "#1a1a1a", nota: "da estructura y elegancia" },
    ],
    accesorio: { tipo: "Aretes o collar", color: "Plateado", hex: "#94A3B8", nota: "10% — las joyas plateadas favorecen al subtono frío" },
  },
  {
    nombre: "Todo en Azul (Monocromático)",
    regla: "Look Monocromático",
    consejo: "Del azul marino al celeste. Muy elongador. El tono más oscuro siempre abajo, el más claro arriba.",
    prendas: [
      { tipo: "Pantalón de sastre", color: "Azul marino", hex: "#1E293B", nota: "60% — el más oscuro, abajo" },
      { tipo: "Blusa",              color: "Azul medio",  hex: "#3B82F6", nota: "30% — tono intermedio" },
      { tipo: "Blazer ligero",      color: "Azul pálido", hex: "#BFDBFE", nota: "el más claro, afuera" },
    ],
    accesorio: { tipo: "Zapatos", color: "Blanco", hex: "#F8FAFC", nota: "10% — alarga las piernas" },
  },
  {
    nombre: "Borgoña y Teal",
    regla: "Colores Complementarios",
    consejo: "Borgoña y teal son casi complementarios y muy propios de pieles frías. El blanco los separa para que no compitan entre sí.",
    prendas: [
      { tipo: "Falda midi", color: "Borgoña",     hex: "#831843", nota: "60% — color joya dominante" },
      { tipo: "Suéter",     color: "Teal oscuro", hex: "#0F766E", nota: "30% — el complementario frío" },
      { tipo: "Camisa",     color: "Blanco",      hex: "#F8FAFC", nota: "separa los dos colores oscuros" },
    ],
    accesorio: { tipo: "Botines", color: "Negro", hex: "#1a1a1a", nota: "10% — cierra el look de invierno" },
  },
];

const OUTFITS_NEUTRO: Outfit[] = [
  {
    nombre: "Negro, Blanco y Rojo",
    regla: "Regla 60/30/10",
    consejo: "La combinación más infalible de la moda. El rojo solo en el accesorio para que no sea demasiado.",
    prendas: [
      { tipo: "Pantalón", color: "Negro",  hex: "#1a1a1a", nota: "60% — el dominante neutro por excelencia" },
      { tipo: "Camisa",   color: "Blanco", hex: "#F8FAFC", nota: "30% — contraste máximo" },
      { tipo: "Blazer",   color: "Negro",  hex: "#1a1a1a", nota: "une arriba y abajo" },
    ],
    accesorio: { tipo: "Bolso o zapatos", color: "Rojo clásico", hex: "#DC2626", nota: "10% — el único color, por eso impacta" },
  },
  {
    nombre: "Beige y Verde Bosque",
    regla: "Regla 60/30/10",
    consejo: "Inspirado en la naturaleza. El beige es neutro y versátil, el verde bosque es actual y fresco.",
    prendas: [
      { tipo: "Pantalón chino",  color: "Beige",        hex: "#D4B896", nota: "60% — base cálida y versátil" },
      { tipo: "Suéter",          color: "Verde bosque",  hex: "#166534", nota: "30% — el color naturaleza" },
      { tipo: "Camisa interior", color: "Blanco roto",   hex: "#F5F0EB", nota: "asoma por el cuello" },
    ],
    accesorio: { tipo: "Botines", color: "Marrón oscuro", hex: "#4A2C17", nota: "10% — calza con el beige" },
  },
  {
    nombre: "Gris y Violeta",
    regla: "Regla 60/30/10",
    consejo: "El gris es el neutro más fácil de combinar. El violeta le da vida sin ser exagerado.",
    prendas: [
      { tipo: "Pantalón", color: "Gris antracita", hex: "#374151", nota: "60% — neutro frío dominante" },
      { tipo: "Suéter",   color: "Violeta medio",  hex: "#7C3AED", nota: "30% — el color que da vida" },
      { tipo: "Camisa",   color: "Blanco",         hex: "#F8FAFC", nota: "aligera el look" },
    ],
    accesorio: { tipo: "Zapatos", color: "Gris oscuro", hex: "#4B5563", nota: "10% — coherente con la paleta" },
  },
  {
    nombre: "Escala de Grises (Monocromático)",
    regla: "Look Monocromático",
    consejo: "Clásico y moderno. Oscuro abajo, claro arriba. Agrega una textura brillante para que no se vea sin vida.",
    prendas: [
      { tipo: "Pantalón", color: "Gris carbón", hex: "#374151", nota: "60% — el más oscuro abajo" },
      { tipo: "Suéter",   color: "Gris medio",  hex: "#9CA3AF", nota: "30% — el tono intermedio" },
      { tipo: "Abrigo",   color: "Gris perla",  hex: "#E5E7EB", nota: "el más claro, afuera" },
    ],
    accesorio: { tipo: "Cinturón o bolso", color: "Negro", hex: "#1a1a1a", nota: "10% — ancla la paleta gris" },
  },
];

// ─── AUXILIARES ───────────────────────────────────────────────

function elegirAleatorio<T>(lista: T[]): T {
  return lista[Math.floor(Math.random() * lista.length)];
}

function colorDeTexto(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.5 ? "#000000" : "#ffffff";
}

// Usamos el nombre del outfit como ID único
const STORAGE_KEY = "outfits_favoritos";

// ─── COMPONENTE DE BARRA DE COLOR (reutilizable) ──────────────

function BarraColor({ outfit }: { outfit: Outfit }) {
  return (
    <div style={{ display: "flex", height: 64, marginBottom: 12, borderRadius: 6, overflow: "hidden" }}>
      {outfit.prendas.map((prenda, i) => {
        const proporcion = i === 0 ? 6 : i === 1 ? 3 : 0;
        if (proporcion === 0) return null;
        return (
          <div
            key={i}
            style={{
              flex: proporcion,
              backgroundColor: prenda.hex,
              color: colorDeTexto(prenda.hex),
              display: "flex",
              alignItems: "flex-end",
              padding: 6,
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
          padding: 6,
          fontSize: 11,
        }}
      >
        {outfit.accesorio.color}
      </div>
    </div>
  );
}

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────

export default function Pagina() {
  const [subtono, setSubtono] = useState<SubtonoPiel>("neutro");
  const [outfit, setOutfit] = useState<Outfit | null>(null);
  const [favoritos, setFavoritos] = useState<Outfit[]>([]);
  const [vista, setVista] = useState<"generar" | "favoritos">("generar");

  // Cargar favoritos desde localStorage al montar
  // (useEffect evita errores de hidratación en Next.js)
  useEffect(() => {
    try {
      const guardados = localStorage.getItem(STORAGE_KEY);
      if (guardados) setFavoritos(JSON.parse(guardados));
    } catch {
      // Si hay error al leer, iniciamos vacío
    }
  }, []);

  function guardarEnStorage(lista: Outfit[]) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
    } catch {
      // Si el storage está lleno, ignoramos silenciosamente
    }
  }

  function generarOutfit() {
    const lista =
      subtono === "calido" ? OUTFITS_CALIDO :
      subtono === "frio"   ? OUTFITS_FRIO   :
                             OUTFITS_NEUTRO;
    setOutfit(elegirAleatorio(lista));
  }

  function toggleFavorito(outfitTarget: Outfit) {
    const yaExiste = favoritos.some((f) => f.nombre === outfitTarget.nombre);
    const nuevaLista = yaExiste
      ? favoritos.filter((f) => f.nombre !== outfitTarget.nombre)
      : [...favoritos, outfitTarget];
    setFavoritos(nuevaLista);
    guardarEnStorage(nuevaLista);
  }

  function esFavorito(outfitTarget: Outfit): boolean {
    return favoritos.some((f) => f.nombre === outfitTarget.nombre);
  }

  // ── RENDER ──

  return (
    <main>
      <h1>Generador de Outfits por Color</h1>
      <p>Combinaciones reales basadas en tu subtono de piel.</p>

      {/* ── NAVEGACIÓN DE VISTAS ── */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button
          onClick={() => setVista("generar")}
          style={{ fontWeight: vista === "generar" ? "bold" : "normal" }}
        >
          🎨 Generar outfit
        </button>
        <button
          onClick={() => setVista("favoritos")}
          style={{ fontWeight: vista === "favoritos" ? "bold" : "normal" }}
        >
          ♥ Mis favoritos ({favoritos.length})
        </button>
      </div>

      <hr />

      {/* ════════════════════════════════════════════
          VISTA: GENERAR OUTFIT
      ════════════════════════════════════════════ */}
      {vista === "generar" && (
        <>
          {/* PASO 1 */}
          <section>
            <h2>1. ¿Cuál es tu subtono de piel?</h2>
            <div>
              <button onClick={() => setSubtono("calido")}>
                🌿 Cálido (venas verdes, joyas doradas)
              </button>
              {"  "}
              <button onClick={() => setSubtono("frio")}>
                ❄️ Frío (venas azules, joyas plateadas)
              </button>
              {"  "}
              <button onClick={() => setSubtono("neutro")}>
                ✨ Neutro (mezcla de ambos)
              </button>
            </div>
            <p>
              Subtono seleccionado: <strong>{subtono}</strong>
            </p>
          </section>

          <hr />

          {/* PASO 2 */}
          <section>
            <h2>2. Genera tu combinación</h2>
            <button onClick={generarOutfit}>
              {outfit ? "↻ Generar otra combinación" : "Generar combinación"}
            </button>
          </section>

          <hr />

          {/* RESULTADO */}
          {outfit && (
            <section>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                <h2 style={{ margin: 0 }}>Tu combinación: {outfit.nombre}</h2>
                {/* Botón de favorito */}
                <button
                  onClick={() => toggleFavorito(outfit)}
                  title={esFavorito(outfit) ? "Quitar de favoritos" : "Guardar en favoritos"}
                  style={{ fontSize: 22, lineHeight: 1, background: "none", border: "none", cursor: "pointer" }}
                >
                  {esFavorito(outfit) ? "♥" : "♡"}
                </button>
              </div>

              <p><strong>Regla usada:</strong> {outfit.regla}</p>
              <p><strong>¿Por qué funciona?</strong> {outfit.consejo}</p>

              <BarraColor outfit={outfit} />

              <h3>Prendas del outfit:</h3>
              <ul>
                {outfit.prendas.map((prenda, i) => (
                  <li key={i}>
                    <span
                      style={{
                        display: "inline-block",
                        width: 16,
                        height: 16,
                        backgroundColor: prenda.hex,
                        border: "1px solid #ccc",
                        marginRight: 8,
                        verticalAlign: "middle",
                      }}
                    />
                    <strong>{prenda.tipo}</strong> — {prenda.color}
                    <br />
                    <small>{prenda.nota}</small>
                  </li>
                ))}
              </ul>

              <h3>Accesorio (acento 10%):</h3>
              <ul>
                <li>
                  <span
                    style={{
                      display: "inline-block",
                      width: 16,
                      height: 16,
                      backgroundColor: outfit.accesorio.hex,
                      border: "1px solid #ccc",
                      marginRight: 8,
                      verticalAlign: "middle",
                    }}
                  />
                  <strong>{outfit.accesorio.tipo}</strong> — {outfit.accesorio.color}
                  <br />
                  <small>{outfit.accesorio.nota}</small>
                </li>
              </ul>
            </section>
          )}

          {!outfit && (
            <section>
              <p>👗 Selecciona tu subtono y presiona el botón para ver tu primera combinación.</p>
            </section>
          )}
        </>
      )}

      {/* ════════════════════════════════════════════
          VISTA: FAVORITOS
      ════════════════════════════════════════════ */}
      {vista === "favoritos" && (
        <section>
          <h2>Mis favoritos</h2>

          {favoritos.length === 0 ? (
            <p>
              Todavía no tienes favoritos guardados. Genera outfits y presiona ♡ para guardarlos aquí.
            </p>
          ) : (
            <div style={{ display: "grid", gap: 24 }}>
              {favoritos.map((fav) => (
                <div
                  key={fav.nombre}
                  style={{
                    border: "1px solid #e5e7eb",
                    borderRadius: 8,
                    padding: 16,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                    <div>
                      <strong>{fav.nombre}</strong>
                      <span style={{ marginLeft: 8, fontSize: 13, color: "#6b7280" }}>{fav.regla}</span>
                    </div>
                    {/* Botón para quitar de favoritos */}
                    <button
                      onClick={() => toggleFavorito(fav)}
                      title="Quitar de favoritos"
                      style={{ fontSize: 20, lineHeight: 1, background: "none", border: "none", cursor: "pointer" }}
                    >
                      ♥
                    </button>
                  </div>

                  <BarraColor outfit={fav} />

                  <p style={{ fontSize: 13, color: "#6b7280", margin: 0 }}>{fav.consejo}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </main>
  );
}