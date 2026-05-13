"use client";

// Importamos useState para guardar datos que cambian en la pantalla
import { useState } from "react";

// ─────────────────────────────────────────────────────────────
// TIPOS DE DATOS
// Aquí definimos la "forma" de los datos que vamos a manejar
// ─────────────────────────────────────────────────────────────

// Los tres subtonos de piel posibles
type SubtonoPiel = "calido" | "frio" | "neutro";

// Cómo se ve una prenda de ropa en nuestros datos
type Prenda = {
  tipo: string;   // Ej: "Jeans", "Blusa", "Blazer"
  color: string;  // Ej: "Azul denim", "Mostaza"
  hex: string;    // Código de color Ej: "#4A6FA5"
  nota: string;   // Consejo de uso
};

// Cómo se ve un outfit completo
type Outfit = {
  nombre: string;    // Nombre del look, Ej: "Tierra y Mostaza"
  regla: string;     // Qué regla de color usa
  consejo: string;   // Explicación de por qué funciona
  prendas: Prenda[]; // Lista de 3 prendas principales
  accesorio: Prenda; // El accesorio de acento (10% del look)
};

// ─────────────────────────────────────────────────────────────
// LISTA DE OUTFITS
// Cada outfit tiene colores reales que existen en ropa.
// Los jeans siempre son azul denim, las bases son neutras,
// y los colores vivos van en blusas o accesorios.
// ─────────────────────────────────────────────────────────────

const OUTFITS_CALIDO: Outfit[] = [
  {
    nombre: "Tierra y Mostaza",
    regla: "Regla 60/30/10",
    consejo: "El camel es tu base (60%), la blusa mostaza es el color principal (30%) y los botines marrones son el acento (10%). Todos los tonos son cálidos y se llevan bien.",
    prendas: [
      { tipo: "Pantalón chino", color: "Camel",         hex: "#C19A6B", nota: "60% del outfit — la base neutra" },
      { tipo: "Blusa",          color: "Mostaza",       hex: "#C8963E", nota: "30% — el color con personalidad" },
      { tipo: "Blazer",         color: "Crema",         hex: "#F0E6D3", nota: "une los dos colores sin competir" },
    ],
    accesorio: { tipo: "Botines", color: "Marrón oscuro", hex: "#4A2C17", nota: "10% — el acento que cierra el look" },
  },
  {
    nombre: "Vaquero y Naranja Quemado",
    regla: "Regla 60/30/10",
    consejo: "Los jeans son el neutro perfecto para cualquier subtono cálido. La blusa naranja añade color sin saturar. Los accesorios en canela mantienen la calidez.",
    prendas: [
      { tipo: "Jeans",             color: "Azul denim medio", hex: "#4A6FA5", nota: "60% — neutro universal que va con todo" },
      { tipo: "Blusa",             color: "Naranja quemado",  hex: "#C8602A", nota: "30% — el color estrella del look" },
      { tipo: "Chaqueta vaquera",  color: "Azul denim claro", hex: "#7BA7C7", nota: "mismo tono que el jean, más claro" },
    ],
    accesorio: { tipo: "Bolso y zapatos", color: "Canela", hex: "#A0522D", nota: "10% — mantiene la calidez del look" },
  },
  {
    nombre: "Todo Camel (Monocromático)",
    regla: "Look Monocromático",
    consejo: "Tres tonos del mismo color tierra. La clave es que el tono más oscuro va abajo y el más claro arriba. Cambia las texturas: lana, seda, cuero para que no se vea plano.",
    prendas: [
      { tipo: "Pantalón chino", color: "Camel oscuro", hex: "#8B6914", nota: "60% — el tono más profundo, abajo" },
      { tipo: "Blusa de seda",  color: "Camel medio",  hex: "#C19A6B", nota: "30% — el tono intermedio" },
      { tipo: "Abrigo",         color: "Beige claro",  hex: "#E8DCC8", nota: "el tono más claro, afuera" },
    ],
    accesorio: { tipo: "Bolso", color: "Marrón rojizo", hex: "#7B3F00", nota: "10% — da profundidad al look total" },
  },
  {
    nombre: "Verde Oliva y Terracota",
    regla: "Colores Análogos",
    consejo: "Colores vecinos en la rueda cromática — todos cálidos y terrosos. Fluyen de forma natural, sin esfuerzo. Ideal para otoño.",
    prendas: [
      { tipo: "Pantalón chino", color: "Verde oliva",  hex: "#6B7C3A", nota: "60% — color tierra dominante" },
      { tipo: "Camisa",         color: "Terracota",    hex: "#C1440E", nota: "30% — vecino cálido del oliva" },
      { tipo: "Cardigan",       color: "Beige",        hex: "#D4B896", nota: "el neutro que equilibra ambos" },
    ],
    accesorio: { tipo: "Bolso", color: "Marrón caramelo", hex: "#8B5E3C", nota: "10% — ancla cálida del look" },
  },
];

const OUTFITS_FRIO: Outfit[] = [
  {
    nombre: "Azul Marino y Blanco",
    regla: "Regla 60/30/10",
    consejo: "La combinación más clásica para subtonos fríos. Azul marino + blanco nunca falla. El accesorio de color (fucsia, esmeralda) es lo que le da tu toque personal.",
    prendas: [
      { tipo: "Pantalón de sastre", color: "Azul marino", hex: "#1E293B", nota: "60% — el clásico dominante frío" },
      { tipo: "Camisa o blusa",     color: "Blanco",      hex: "#F8FAFC", nota: "30% — el neutro luminoso" },
      { tipo: "Blazer",             color: "Gris perla",  hex: "#D1D5DB", nota: "mismo tono frío, une el look" },
    ],
    accesorio: { tipo: "Bolso o pañuelo", color: "Fucsia", hex: "#BE185D", nota: "10% — el acento que te diferencia" },
  },
  {
    nombre: "Jeans y Esmeralda",
    regla: "Regla 60/30/10",
    consejo: "El verde esmeralda es uno de los colores más favorecedores para pieles frías. Los jeans oscuros son la base neutra ideal para que el esmeralda brille.",
    prendas: [
      { tipo: "Jeans oscuros",        color: "Azul denim oscuro", hex: "#1E3A5F", nota: "60% — base neutra oscura" },
      { tipo: "Blusa",                color: "Verde esmeralda",   hex: "#0D9488", nota: "30% — protagonista del look" },
      { tipo: "Blazer",               color: "Negro",             hex: "#1a1a1a", nota: "da estructura y elegancia" },
    ],
    accesorio: { tipo: "Aretes o collar", color: "Plateado", hex: "#94A3B8", nota: "10% — las joyas plateadas favorecen al subtono frío" },
  },
  {
    nombre: "Todo en Azul (Monocromático)",
    regla: "Look Monocromático",
    consejo: "Del azul marino al celeste. Muy elongador. Recuerda: el tono más oscuro siempre abajo, el más claro arriba. Varía texturas para que no se vea uniforme.",
    prendas: [
      { tipo: "Pantalón de sastre", color: "Azul marino",  hex: "#1E293B", nota: "60% — el más oscuro, abajo" },
      { tipo: "Blusa",              color: "Azul medio",   hex: "#3B82F6", nota: "30% — tono intermedio" },
      { tipo: "Blazer ligero",      color: "Azul pálido",  hex: "#BFDBFE", nota: "el más claro, como capa exterior" },
    ],
    accesorio: { tipo: "Zapatos", color: "Blanco", hex: "#F8FAFC", nota: "10% — corta visualmente y alarga las piernas" },
  },
  {
    nombre: "Borgoña y Teal",
    regla: "Colores Complementarios",
    consejo: "Borgoña y teal son casi complementarios y muy propios de pieles frías. El blanco los separa para que no compitan entre sí. Look muy sofisticado de otoño/invierno.",
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
    consejo: "La combinación más infalible de la moda. Funciona para cualquier subtono y cualquier ocasión. El rojo solo en el accesorio para que no sea demasiado.",
    prendas: [
      { tipo: "Pantalón",  color: "Negro",  hex: "#1a1a1a", nota: "60% — el dominante neutro por excelencia" },
      { tipo: "Camisa",    color: "Blanco", hex: "#F8FAFC", nota: "30% — contraste máximo, look limpio" },
      { tipo: "Blazer",    color: "Negro",  hex: "#1a1a1a", nota: "mismo tono que el pantalón, une arriba y abajo" },
    ],
    accesorio: { tipo: "Bolso o zapatos", color: "Rojo clásico", hex: "#DC2626", nota: "10% — el único color del look, por eso impacta" },
  },
  {
    nombre: "Beige y Verde Bosque",
    regla: "Regla 60/30/10",
    consejo: "Inspirado en la naturaleza. El beige es neutro y versátil, el verde bosque es actual y fresco. El blanco roto aparece en el cuello y los puños de la camisa interior.",
    prendas: [
      { tipo: "Pantalón chino",  color: "Beige",       hex: "#D4B896", nota: "60% — base cálida y versátil" },
      { tipo: "Suéter",          color: "Verde bosque", hex: "#166534", nota: "30% — el color naturaleza" },
      { tipo: "Camisa interior", color: "Blanco roto",  hex: "#F5F0EB", nota: "asoma por el cuello y los puños" },
    ],
    accesorio: { tipo: "Botines", color: "Marrón oscuro", hex: "#4A2C17", nota: "10% — calza con el beige" },
  },
  {
    nombre: "Gris y Violeta",
    regla: "Regla 60/30/10",
    consejo: "El gris es el neutro más fácil de combinar. El violeta le da vida sin ser exagerado. La blusa blanca añade frescura al look.",
    prendas: [
      { tipo: "Pantalón",  color: "Gris antracita", hex: "#374151", nota: "60% — neutro frío dominante" },
      { tipo: "Suéter",    color: "Violeta medio",  hex: "#7C3AED", nota: "30% — el color que da vida" },
      { tipo: "Camisa",    color: "Blanco",         hex: "#F8FAFC", nota: "base que aligera el look" },
    ],
    accesorio: { tipo: "Zapatos", color: "Gris oscuro", hex: "#4B5563", nota: "10% — coherente con la paleta" },
  },
  {
    nombre: "Escala de Grises (Monocromático)",
    regla: "Look Monocromático",
    consejo: "Clásico y moderno. Oscuro abajo, claro arriba. Agrega una textura brillante (satén, cuero) para que no se vea sin vida.",
    prendas: [
      { tipo: "Pantalón",  color: "Gris carbón", hex: "#374151", nota: "60% — el más oscuro abajo" },
      { tipo: "Suéter",    color: "Gris medio",  hex: "#9CA3AF", nota: "30% — el tono intermedio" },
      { tipo: "Abrigo",    color: "Gris perla",  hex: "#E5E7EB", nota: "el más claro, afuera" },
    ],
    accesorio: { tipo: "Cinturón o bolso", color: "Negro", hex: "#1a1a1a", nota: "10% — ancla la paleta gris" },
  },
];

// ─────────────────────────────────────────────────────────────
// FUNCIÓN AUXILIAR
// Elige un elemento al azar de cualquier lista
// ─────────────────────────────────────────────────────────────

function elegirAleatorio<T>(lista: T[]): T {
  const indice = Math.floor(Math.random() * lista.length);
  return lista[indice];
}

// ─────────────────────────────────────────────────────────────
// FUNCIÓN AUXILIAR
// Decide si el texto sobre un color debe ser blanco o negro
// para que siempre se pueda leer bien
// ─────────────────────────────────────────────────────────────

function colorDeTexto(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16); // Componente rojo
  const g = parseInt(hex.slice(3, 5), 16); // Componente verde
  const b = parseInt(hex.slice(5, 7), 16); // Componente azul
  // Si el color es claro → texto negro. Si es oscuro → texto blanco.
  const brillo = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return brillo > 0.5 ? "#000000" : "#ffffff";
}

// ─────────────────────────────────────────────────────────────
// COMPONENTE PRINCIPAL
// En Next.js, cada archivo en /app es una página.
// El componente que se exporta como "default" es lo que se muestra.
// ─────────────────────────────────────────────────────────────

export default function Pagina() {
  // useState guarda datos que, al cambiar, actualizan la pantalla automáticamente
  const [subtono, setSubtono] = useState<SubtonoPiel>("neutro");
  const [outfit, setOutfit] = useState<Outfit | null>(null); // null = todavía no hay outfit

  // Esta función se llama cuando el usuario presiona el botón
  function generarOutfit() {
    // Elegimos la lista según el subtono seleccionado
    const lista =
      subtono === "calido" ? OUTFITS_CALIDO :
      subtono === "frio"   ? OUTFITS_FRIO   :
                             OUTFITS_NEUTRO;

    // Elegimos un outfit al azar de esa lista
    const nuevoOutfit = elegirAleatorio(lista);
    setOutfit(nuevoOutfit); // Guardamos el outfit → la pantalla se actualiza
  }

  // ── Lo que se muestra en pantalla ──
  return (
    <main>
      <h1>Generador de Outfits por Color</h1>
      <p>Combinaciones reales basadas en tu subtono de piel.</p>

      <hr />

      {/* ── PASO 1: ELEGIR SUBTONO ── */}
      <section>
        <h2>1. ¿Cuál es tu subtono de piel?</h2>

        {/* Botones de selección de subtono */}
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

        {/* Mostramos cuál está seleccionado */}
        <p>
          Subtono seleccionado: <strong>{subtono}</strong>
        </p>
      </section>

      <hr />

      {/* ── PASO 2: BOTÓN GENERAR ── */}
      <section>
        <h2>2. Genera tu combinación</h2>
        <button onClick={generarOutfit}>
          {outfit ? "↻ Generar otra combinación" : "Generar combinación"}
        </button>
      </section>

      <hr />

      {/* ── RESULTADO ── */}
      {/* El bloque siguiente solo aparece si "outfit" tiene datos (no es null) */}
      {outfit && (
        <section>
          <h2>Tu combinación: {outfit.nombre}</h2>
          <p><strong>Regla usada:</strong> {outfit.regla}</p>
          <p><strong>¿Por qué funciona?</strong> {outfit.consejo}</p>

          {/* Barra de colores proporcional */}
          {/* flex: 6 = 60%, flex: 3 = 30%, flex: 1 = 10% */}
          <div style={{ display: "flex", height: 80, marginBottom: 16 }}>
            {outfit.prendas.map((prenda, indice) => {
              // La primera prenda ocupa el 60%, la segunda el 30%, la tercera no va aquí
              const proporcion = indice === 0 ? 6 : indice === 1 ? 3 : 0;
              if (proporcion === 0) return null;
              return (
                <div
                  key={indice}
                  style={{
                    flex: proporcion,
                    backgroundColor: prenda.hex,
                    color: colorDeTexto(prenda.hex),
                    display: "flex",
                    alignItems: "flex-end",
                    padding: 8,
                    fontSize: 12,
                  }}
                >
                  {prenda.color}
                </div>
              );
            })}
            {/* Accesorio: siempre el 10% */}
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

          {/* Lista de prendas */}
          <h3>Prendas del outfit:</h3>
          <ul>
            {outfit.prendas.map((prenda, indice) => (
              <li key={indice}>
                {/* Cuadrito de color */}
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

          {/* Accesorio */}
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

      {/* Mensaje inicial cuando todavía no se generó nada */}
      {!outfit && (
        <section>
          <p>👗 Selecciona tu subtono y presiona el botón para ver tu primera combinación.</p>
        </section>
      )}
    </main>
  );
}
