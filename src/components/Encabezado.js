"use client";

// Encabezado con menú, lista de marcas y búsqueda. En celular el menú se abre con un botón.
import { useState } from "react";
import Link from "next/link";
import { tienda } from "@/data/tienda";
import { marcas } from "@/data/cafes";
import { useCarrito } from "@/lib/carrito";

function BotonCarrito({ onClick }) {
  const { unidades, listo } = useCarrito();
  const etiqueta = unidades === 1 ? "Carrito, 1 producto" : `Carrito, ${unidades} productos`;
  return (
    <Link href="/carrito" onClick={onClick} aria-label={etiqueta} className="relative inline-flex rounded-lg p-2 hover:text-acento-fuerte">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 7h12l-1 13H7L6 7z" />
        <path d="M9 7a3 3 0 0 1 6 0" />
      </svg>
      {listo && unidades > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-acento-fuerte px-1 text-xs font-semibold text-white">
          {unidades}
        </span>
      )}
    </Link>
  );
}

function Busqueda({ className = "" }) {
  // Formulario simple: al enviar va a /cafes?q=... (funciona incluso sin JavaScript).
  return (
    <form action="/cafes" role="search" className={className}>
      <label htmlFor="busqueda" className="sr-only">Buscar café</label>
      <input
        id="busqueda"
        name="q"
        type="search"
        placeholder="Buscar café, marca o sabor"
        className="w-full rounded-full border border-borde bg-superficie px-4 py-2 text-sm outline-none focus:border-texto-suave"
      />
    </form>
  );
}

export default function Encabezado() {
  const [abierto, setAbierto] = useState(false);
  const cerrar = () => setAbierto(false);

  return (
    <header className="sticky top-0 z-20 border-b border-borde bg-fondo/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-4">
        <Link href="/" className="font-titulo text-2xl font-semibold text-texto" onClick={cerrar}>
          {tienda.nombre}
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link href="/cafes" className="hover:text-acento-fuerte">Todos los cafés</Link>
          <div className="group relative">
            <button type="button" className="hover:text-acento-fuerte" aria-haspopup="true">
              Marcas ▾
            </button>
            <ul className="invisible absolute left-0 top-full mt-2 w-56 rounded-xl bg-superficie p-2 opacity-0 shadow-lg ring-1 ring-borde transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
              {marcas.map((marca) => (
                <li key={marca}>
                  <Link
                    href={`/cafes?marca=${encodeURIComponent(marca)}`}
                    className="block rounded-lg px-3 py-2 hover:bg-fondo"
                  >
                    {marca}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Link href="/#como-comprar" className="hover:text-acento-fuerte">Cómo comprar</Link>
        </nav>

        <Busqueda className="ml-auto hidden w-64 md:block" />

        <div className="ml-auto md:ml-0">
          <BotonCarrito onClick={cerrar} />
        </div>

        <button
          type="button"
          className="rounded-lg p-2 md:hidden"
          onClick={() => setAbierto(!abierto)}
          aria-expanded={abierto}
          aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {abierto ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {abierto && (
        <div className="border-t border-borde px-4 pb-6 pt-4 md:hidden">
          <Busqueda />
          <nav className="mt-4 flex flex-col gap-1 text-base font-medium">
            <Link href="/cafes" onClick={cerrar} className="py-2">Todos los cafés</Link>
            <p className="pt-2 text-xs font-semibold uppercase tracking-wide text-texto-suave">Marcas</p>
            {marcas.map((marca) => (
              <Link
                key={marca}
                href={`/cafes?marca=${encodeURIComponent(marca)}`}
                onClick={cerrar}
                className="py-2 pl-3"
              >
                {marca}
              </Link>
            ))}
            <Link href="/#como-comprar" onClick={cerrar} className="pt-2">Cómo comprar</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
