"use client";

// Permite elegir tamaño y molienda, muestra el precio y arma el pedido por WhatsApp.
import { useState } from "react";
import { moliendas } from "@/data/cafes";
import { tienda } from "@/data/tienda";
import { formatoBs, enlaceWhatsApp } from "@/lib/formato";

function Opciones({ titulo, opciones, elegida, elegir }) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold">{titulo}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {opciones.map((op) => (
          <button
            key={op}
            type="button"
            onClick={() => elegir(op)}
            aria-pressed={op === elegida}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              op === elegida
                ? "border-texto bg-texto text-fondo"
                : "border-borde bg-superficie hover:border-texto-suave"
            }`}
          >
            {op}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export default function SelectorCompra({ cafe }) {
  const [peso, setPeso] = useState(cafe.tamanos[0].peso);
  const [molienda, setMolienda] = useState(moliendas[0]);
  const [cantidad, setCantidad] = useState(1);

  const precio = cafe.tamanos.find((t) => t.peso === peso).precio;
  const total = precio * cantidad;
  const mensaje = `Hola, quiero pedir ${cantidad} x ${cafe.nombre} (${cafe.marca}), ${peso}, ${molienda.toLowerCase()}. Total: ${formatoBs(total)}.`;

  return (
    <div className="space-y-6">
      <p className="text-3xl font-semibold">{formatoBs(precio)}</p>
      <Opciones titulo="Tamaño" opciones={cafe.tamanos.map((t) => t.peso)} elegida={peso} elegir={setPeso} />
      <Opciones titulo="Molienda" opciones={moliendas} elegida={molienda} elegir={setMolienda} />
      <div>
        <p className="text-sm font-semibold">Cantidad</p>
        <div className="mt-2 inline-flex items-center rounded-full border border-borde bg-superficie">
          <button type="button" className="px-4 py-2" onClick={() => setCantidad(Math.max(1, cantidad - 1))} aria-label="Restar uno">−</button>
          <span className="w-8 text-center">{cantidad}</span>
          <button type="button" className="px-4 py-2" onClick={() => setCantidad(cantidad + 1)} aria-label="Sumar uno">+</button>
        </div>
      </div>
      <a
        href={enlaceWhatsApp(tienda.whatsapp, mensaje)}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-full bg-acento-fuerte px-6 py-4 text-center font-semibold text-white transition hover:bg-acento"
      >
        Pedir por WhatsApp · {formatoBs(total)}
      </a>
      <p className="text-sm text-texto-suave">Entregas en {tienda.ciudad}. Coordinamos pago y envío por WhatsApp.</p>
    </div>
  );
}
