import Link from "next/link";
import TarjetaCafe from "@/components/TarjetaCafe";
import { cafes } from "@/data/cafes";
import { tienda } from "@/data/tienda";

const pasos = [
  { titulo: "Elige tu café", texto: "Mira el catálogo y abre la ficha para ver sabor, origen y tamaños." },
  { titulo: "Escoge tamaño y molienda", texto: "Cada tamaño tiene su precio. Te lo molemos según tu cafetera." },
  { titulo: "Pide por WhatsApp", texto: `Te confirmamos el pedido, el pago y la entrega en ${tienda.ciudad}.` },
];

export default function Inicio() {
  const destacados = cafes.filter((cafe) => cafe.destacado);

  return (
    <>
      <section className="bg-vino text-fondo">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:py-28">
          <p className="text-sm font-semibold uppercase tracking-widest text-acento">Café de Bolivia</p>
          <h1 className="mt-4 max-w-2xl font-titulo text-4xl leading-tight sm:text-6xl">
            Las mejores marcas de café boliviano, en una sola tienda
          </h1>
          <p className="mt-6 max-w-xl text-lg text-fondo/80">{tienda.lema}.</p>
          <Link
            href="/cafes"
            className="mt-8 inline-block rounded-full bg-acento px-7 py-3 font-bold text-texto transition hover:bg-acento-suave"
          >
            Ver todos los cafés
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-titulo text-3xl">Destacados</h2>
          <Link href="/cafes" className="text-sm font-semibold text-acento-fuerte hover:underline">
            Ver catálogo
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {destacados.map((cafe) => (
            <TarjetaCafe key={cafe.slug} cafe={cafe} />
          ))}
        </div>
      </section>

      <section id="como-comprar" className="bg-superficie">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="font-titulo text-3xl">Cómo comprar</h2>
          <ol className="mt-8 grid gap-6 sm:grid-cols-3">
            {pasos.map((paso, i) => (
              <li key={paso.titulo} className="rounded-2xl bg-fondo p-6">
                <span className="font-titulo text-3xl text-acento-fuerte">{i + 1}</span>
                <h3 className="mt-2 font-semibold">{paso.titulo}</h3>
                <p className="mt-1 text-sm text-texto-suave">{paso.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
