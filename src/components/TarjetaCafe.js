import Link from "next/link";
import BolsaCafe from "@/components/BolsaCafe";
import { precioDesde } from "@/data/cafes";
import { formatoBs } from "@/lib/formato";

export default function TarjetaCafe({ cafe }) {
  return (
    <Link
      href={`/cafes/${cafe.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-superficie shadow-sm ring-1 ring-borde transition hover:-translate-y-1 hover:shadow-md"
    >
      <BolsaCafe cafe={cafe} className="aspect-[5/6] w-full" />
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-texto-suave">{cafe.marca}</p>
        <h3 className="mt-1 font-titulo text-lg leading-snug group-hover:text-acento-fuerte">{cafe.nombre}</h3>
        <p className="mt-1 text-sm text-texto-suave">{cafe.notas.join(" · ")}</p>
        <p className="mt-auto pt-3 font-semibold">
          <span className="text-sm font-normal text-texto-suave">Desde </span>
          {formatoBs(precioDesde(cafe))}
        </p>
      </div>
    </Link>
  );
}
