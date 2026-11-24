import { Suspense } from "react";
import Catalogo from "@/components/Catalogo";
import { cafes } from "@/data/cafes";

export const metadata = { title: "Cafés" };

export default function PaginaCafes() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-titulo text-4xl">Nuestros cafés</h1>
      <p className="mt-2 text-texto-suave">Busca, filtra y elige un café para ver sus características, tamaños y precios.</p>
      {/* Suspense es necesario porque el catálogo lee los filtros de la dirección. */}
      <Suspense fallback={<p className="mt-8 text-texto-suave">Cargando cafés…</p>}>
        <Catalogo cafes={cafes} />
      </Suspense>
    </section>
  );
}
