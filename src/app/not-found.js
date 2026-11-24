import Link from "next/link";

export default function NoEncontrado() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 text-center">
      <h1 className="font-titulo text-4xl">No encontramos esa página</h1>
      <Link href="/cafes" className="mt-6 inline-block font-semibold text-caramelo-claro hover:underline">
        Volver al catálogo
      </Link>
    </section>
  );
}
