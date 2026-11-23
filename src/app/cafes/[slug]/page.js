import Link from "next/link";
import { notFound } from "next/navigation";
import BolsaCafe from "@/components/BolsaCafe";
import SelectorCompra from "@/components/SelectorCompra";
import { cafes, buscarCafe } from "@/data/cafes";

// Genera una página por cada café al publicar la tienda.
export function generateStaticParams() {
  return cafes.map((cafe) => ({ slug: cafe.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const cafe = buscarCafe(slug);
  return cafe ? { title: cafe.nombre, description: cafe.descripcion } : {};
}

export default async function FichaCafe({ params }) {
  const { slug } = await params;
  const cafe = buscarCafe(slug);
  if (!cafe) notFound();

  const caracteristicas = [
    ["Marca", cafe.marca],
    ["Origen", cafe.origen],
    ["Tueste", cafe.tueste],
    ["Notas de cata", cafe.notas.join(", ")],
    ["Altura", cafe.altura],
    ["Proceso", cafe.proceso],
    ["Variedad", cafe.variedad],
    ["Puntaje de taza", cafe.puntaje],
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <nav className="text-sm text-cafe">
        <Link href="/" className="hover:underline">Inicio</Link> /{" "}
        <Link href="/cafes" className="hover:underline">Cafés</Link> / {cafe.nombre}
      </nav>

      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <BolsaCafe cafe={cafe} className="w-full rounded-2xl" />

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-cafe">{cafe.marca}</p>
          <h1 className="mt-1 font-titulo text-4xl">{cafe.nombre}</h1>
          <p className="mt-4 text-lg text-cafe">{cafe.descripcion}</p>
          <div className="mt-8">
            <SelectorCompra cafe={cafe} />
          </div>
        </div>
      </div>

      <div className="mt-14 max-w-2xl">
        <h2 className="font-titulo text-2xl">Características</h2>
        <dl className="mt-4 divide-y divide-crema-oscura rounded-2xl bg-white ring-1 ring-crema-oscura">
          {caracteristicas.map(([nombre, valor]) => (
            <div key={nombre} className="grid grid-cols-2 px-5 py-3 text-sm">
              <dt className="text-cafe">{nombre}</dt>
              <dd className="font-medium">{valor}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
