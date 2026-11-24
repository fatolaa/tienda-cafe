"use client";

// Lista del carrito: cambiar cantidades, quitar productos y enviar el pedido completo por WhatsApp.
import { useState } from "react";
import Link from "next/link";
import { IconoWhatsApp } from "@/components/Iconos";
import BolsaCafe from "@/components/BolsaCafe";
import { tienda } from "@/data/tienda";
import { useCarrito } from "@/lib/carrito";
import { formatoBs, enlaceWhatsApp } from "@/lib/formato";

// Arma el texto que llega al WhatsApp de la tienda.
function armarMensaje(detalle, total, nombre, entrega) {
  const lineas = detalle.map(
    (l) => `• ${l.cantidad} x ${l.cafe.nombre} (${l.cafe.marca}), ${l.peso}, ${l.molienda.toLowerCase()}: ${formatoBs(l.subtotal)}`
  );
  return [
    "Hola, quiero hacer este pedido:",
    ...lineas,
    `Total: ${formatoBs(total)}`,
    nombre.trim() && `Nombre: ${nombre.trim()}`,
    entrega.trim() && `Entrega en: ${entrega.trim()}`,
  ]
    .filter(Boolean)
    .join("\n");
}

function Cantidad({ valor, cambiar, nombre }) {
  return (
    <div className="inline-flex items-center rounded-full border border-borde bg-fondo">
      <button type="button" className="px-3 py-1" onClick={() => cambiar(valor - 1)} aria-label={`Restar uno de ${nombre}`}>−</button>
      <span className="w-6 text-center text-sm">{valor}</span>
      <button type="button" className="px-3 py-1" onClick={() => cambiar(valor + 1)} aria-label={`Sumar uno de ${nombre}`}>+</button>
    </div>
  );
}

export default function VistaCarrito() {
  const { detalle, total, unidades, listo, cambiarCantidad, quitar, vaciar } = useCarrito();
  const [nombre, setNombre] = useState("");
  const [entrega, setEntrega] = useState("");

  if (!listo) return <p className="mt-6 text-texto-suave">Cargando tu carrito…</p>;

  if (detalle.length === 0) {
    return (
      <div className="mt-8 rounded-2xl bg-superficie p-8 text-center ring-1 ring-borde">
        <p className="text-lg">Tu carrito está vacío.</p>
        <Link href="/cafes" className="mt-4 inline-block rounded-full bg-acento px-6 py-3 font-bold text-texto hover:bg-acento-suave">
          Ver cafés
        </Link>
      </div>
    );
  }

  const mensaje = armarMensaje(detalle, total, nombre, entrega);

  return (
    <div className="mt-8 grid gap-8 md:grid-cols-[1fr_320px]">
      <ul className="divide-y divide-borde rounded-2xl bg-superficie ring-1 ring-borde">
        {detalle.map((l) => (
          <li key={`${l.slug}-${l.peso}-${l.molienda}`} className="flex gap-4 p-4">
            <Link href={`/cafes/${l.slug}`} className="w-20 shrink-0 overflow-hidden rounded-lg">
              <BolsaCafe cafe={l.cafe} className="w-full" />
            </Link>
            <div className="flex flex-1 flex-col gap-2">
              <div className="flex justify-between gap-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-texto-suave">{l.cafe.marca}</p>
                  <Link href={`/cafes/${l.slug}`} className="font-titulo text-lg leading-snug hover:text-acento-fuerte">
                    {l.cafe.nombre}
                  </Link>
                  <p className="text-sm text-texto-suave">{l.peso} · {l.molienda}</p>
                </div>
                <p className="whitespace-nowrap font-semibold">{formatoBs(l.subtotal)}</p>
              </div>
              <div className="flex items-center justify-between">
                <Cantidad valor={l.cantidad} cambiar={(c) => cambiarCantidad(l, c)} nombre={l.cafe.nombre} />
                <button type="button" onClick={() => quitar(l)} className="text-sm text-texto-suave hover:text-acento-fuerte hover:underline">
                  Quitar
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <aside className="h-fit space-y-4 rounded-2xl bg-superficie p-5 ring-1 ring-borde">
        <div className="flex justify-between text-sm text-texto-suave">
          <span>{unidades === 1 ? "1 producto" : `${unidades} productos`}</span>
        </div>
        <div className="flex items-baseline justify-between border-t border-borde pt-4">
          <span className="font-semibold">Total</span>
          <span className="text-2xl font-semibold">{formatoBs(total)}</span>
        </div>
        <p className="text-xs text-texto-suave">El costo de envío se coordina por WhatsApp.</p>

        <label className="block text-sm font-medium">
          Tu nombre <span className="font-normal text-texto-suave">(opcional)</span>
          <input value={nombre} onChange={(e) => setNombre(e.target.value)} className="mt-1 w-full rounded-lg border border-borde bg-fondo px-3 py-2" />
        </label>
        <label className="block text-sm font-medium">
          Zona o dirección de entrega <span className="font-normal text-texto-suave">(opcional)</span>
          <input value={entrega} onChange={(e) => setEntrega(e.target.value)} placeholder={`Por ejemplo: Cala Cala, ${tienda.ciudad}`} className="mt-1 w-full rounded-lg border border-borde bg-fondo px-3 py-2" />
        </label>

        <a
          href={enlaceWhatsApp(tienda.whatsapp, mensaje)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-full bg-texto px-5 py-4 text-center font-semibold text-fondo transition hover:bg-salvia"
        >
          <IconoWhatsApp />
          Enviar por WhatsApp
        </a>
        <div className="flex justify-between text-sm">
          <Link href="/cafes" className="font-semibold text-acento-fuerte hover:underline">Seguir comprando</Link>
          <button type="button" onClick={vaciar} className="text-texto-suave hover:underline">Vaciar carrito</button>
        </div>
      </aside>
    </div>
  );
}
