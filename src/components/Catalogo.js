"use client";

// Catálogo con búsqueda, filtros y orden. Los filtros se guardan en la dirección
// (por ejemplo /cafes?marca=Valle+Alto&orden=precio-asc), así se pueden compartir.
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import TarjetaCafe from "@/components/TarjetaCafe";
import { departamento, marcas, precioDesde } from "@/data/cafes";
import { formatoBs } from "@/lib/formato";
import { normalizar } from "@/lib/texto";

const preciosMaximos = [50, 80, 120];

const ordenes = {
  destacados: { etiqueta: "Destacados", comparar: (a, b) => Number(b.destacado) - Number(a.destacado) },
  "precio-asc": { etiqueta: "Precio: menor a mayor", comparar: (a, b) => precioDesde(a) - precioDesde(b) },
  "precio-desc": { etiqueta: "Precio: mayor a menor", comparar: (a, b) => precioDesde(b) - precioDesde(a) },
  puntaje: { etiqueta: "Mayor puntaje", comparar: (a, b) => b.puntaje - a.puntaje },
  nombre: { etiqueta: "Nombre (A-Z)", comparar: (a, b) => a.nombre.localeCompare(b.nombre, "es") },
};

function Selector({ etiqueta, valor, cambiar, children }) {
  return (
    <label className="flex flex-col gap-1 text-sm font-medium">
      {etiqueta}
      <select
        value={valor}
        onChange={(e) => cambiar(e.target.value)}
        className="rounded-lg border border-borde bg-superficie px-3 py-2"
      >
        {children}
      </select>
    </label>
  );
}

function coincideBusqueda(cafe, busqueda) {
  if (!busqueda) return true;
  const texto = normalizar([cafe.nombre, cafe.marca, cafe.origen, cafe.tueste, ...cafe.notas].join(" "));
  return normalizar(busqueda).split(/\s+/).every((palabra) => texto.includes(palabra));
}

export default function Catalogo({ cafes }) {
  const router = useRouter();
  const ruta = usePathname();
  const params = useSearchParams();

  const q = params.get("q") ?? "";
  const marca = params.get("marca") ?? "";
  const tueste = params.get("tueste") ?? "";
  const region = params.get("region") ?? "";
  const hasta = params.get("hasta") ?? "";
  const orden = ordenes[params.get("orden")] ? params.get("orden") : "destacados";

  // Cambia un filtro en la dirección sin recargar la página.
  function cambiar(nombre, valor) {
    const nuevos = new URLSearchParams(params.toString());
    if (valor) nuevos.set(nombre, valor);
    else nuevos.delete(nombre);
    const texto = nuevos.toString();
    router.replace(texto ? `${ruta}?${texto}` : ruta, { scroll: false });
  }

  const tuestes = ["Claro", "Medio", "Oscuro"].filter((t) => cafes.some((c) => c.tueste === t));
  const regiones = [...new Set(cafes.map(departamento))].sort();

  const visibles = cafes
    .filter(
      (c) =>
        coincideBusqueda(c, q) &&
        (!marca || c.marca === marca) &&
        (!tueste || c.tueste === tueste) &&
        (!region || departamento(c) === region) &&
        (!hasta || precioDesde(c) <= Number(hasta))
    )
    .sort(ordenes[orden].comparar);

  const hayFiltros = q || marca || tueste || region || hasta;

  return (
    <>
      <div className="mt-6 rounded-2xl bg-superficie p-4 ring-1 ring-borde">
        <label className="flex flex-col gap-1 text-sm font-medium">
          Buscar
          <input
            type="search"
            value={q}
            onChange={(e) => cambiar("q", e.target.value)}
            placeholder="Nombre, marca, origen o sabor (por ejemplo: chocolate)"
            className="rounded-lg border border-borde px-3 py-2"
          />
        </label>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          <Selector etiqueta="Marca" valor={marca} cambiar={(v) => cambiar("marca", v)}>
            <option value="">Todas</option>
            {marcas.map((m) => <option key={m} value={m}>{m}</option>)}
          </Selector>
          <Selector etiqueta="Tueste" valor={tueste} cambiar={(v) => cambiar("tueste", v)}>
            <option value="">Todos</option>
            {tuestes.map((t) => <option key={t} value={t}>{t}</option>)}
          </Selector>
          <Selector etiqueta="Origen" valor={region} cambiar={(v) => cambiar("region", v)}>
            <option value="">Todos</option>
            {regiones.map((r) => <option key={r} value={r}>{r}</option>)}
          </Selector>
          <Selector etiqueta="Precio" valor={hasta} cambiar={(v) => cambiar("hasta", v)}>
            <option value="">Cualquiera</option>
            {preciosMaximos.map((p) => <option key={p} value={p}>Hasta {formatoBs(p)}</option>)}
          </Selector>
          <Selector etiqueta="Ordenar por" valor={orden} cambiar={(v) => cambiar("orden", v === "destacados" ? "" : v)}>
            {Object.entries(ordenes).map(([clave, { etiqueta }]) => (
              <option key={clave} value={clave}>{etiqueta}</option>
            ))}
          </Selector>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-4 text-sm text-texto-suave">
        <p>{visibles.length === 1 ? "1 café" : `${visibles.length} cafés`}</p>
        {hayFiltros && (
          <button
            type="button"
            onClick={() => router.replace(orden === "destacados" ? ruta : `${ruta}?orden=${orden}`, { scroll: false })}
            className="font-semibold text-acento-fuerte hover:underline"
          >
            Quitar filtros
          </button>
        )}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {visibles.map((cafe) => (
          <TarjetaCafe key={cafe.slug} cafe={cafe} />
        ))}
      </div>
      {visibles.length === 0 && (
        <p className="mt-8 text-texto-suave">No encontramos cafés con esa búsqueda o esos filtros.</p>
      )}
    </>
  );
}
