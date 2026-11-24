"use client";

// Permite elegir tamaño, molienda y cantidad, muestra el precio y agrega al carrito.
import { useState } from "react";
import Link from "next/link";
import { useCarrito } from "@/lib/carrito";
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
  const [agregado, setAgregado] = useState(false);
  const { agregar } = useCarrito();

  const precio = cafe.tamanos.find((t) => t.peso === peso).precio;
  const total = precio * cantidad;
  const mensaje = `Hola, quiero pedir ${cantidad} x ${cafe.nombre} (${cafe.marca}), ${peso}, ${molienda.toLowerCase()}. Total: ${formatoBs(total)}.`;

  function agregarAlCarrito() {
    agregar({ slug: cafe.slug, peso, molienda, cantidad });
    setAgregado(true);
  }

  return (
    <div className="space-y-6">
      <p className="text-3xl font-semibold">{formatoBs(precio)}</p>
      <Opciones titulo="Tamaño" opciones={cafe.tamanos.map((t) => t.peso)} elegida={peso} elegir={(v) => { setPeso(v); setAgregado(false); }} />
      <Opciones titulo="Molienda" opciones={moliendas} elegida={molienda} elegir={(v) => { setMolienda(v); setAgregado(false); }} />
      <div>
        <p className="text-sm font-semibold">Cantidad</p>
        <div className="mt-2 inline-flex items-center rounded-full border border-borde bg-superficie">
          <button type="button" className="px-4 py-2" onClick={() => setCantidad(Math.max(1, cantidad - 1))} aria-label="Restar uno">−</button>
          <span className="w-8 text-center">{cantidad}</span>
          <button type="button" className="px-4 py-2" onClick={() => setCantidad(cantidad + 1)} aria-label="Sumar uno">+</button>
        </div>
      </div>
      <button
        type="button"
        onClick={agregarAlCarrito}
        className="block w-full rounded-full bg-acento px-6 py-4 text-center font-bold text-texto transition hover:bg-acento-suave"
      >
        Agregar al carrito · {formatoBs(total)}
      </button>
      {agregado && (
        <p role="status" className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-superficie px-4 py-3 text-sm ring-1 ring-borde">
          <span>Agregado al carrito.</span>
          <Link href="/carrito" className="font-semibold text-acento-fuerte hover:underline">
            Ver carrito y enviar pedido
          </Link>
        </p>
      )}
      <a
        href={enlaceWhatsApp(tienda.whatsapp, mensaje)}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-center text-sm font-semibold text-texto-suave underline-offset-4 hover:underline"
      >
        O pedir solo este café por WhatsApp
      </a>
      <p className="text-sm text-texto-suave">Entregas en {tienda.ciudad}. Coordinamos pago y envío por WhatsApp.</p>
    </div>
  );
}
