"use client";

// Lista de cafés con filtros simples por marca y tueste.
import { useState } from "react";
import TarjetaCafe from "@/components/TarjetaCafe";

function Filtro({ etiqueta, opciones, valor, cambiar }) {
  return (
    <label className="flex flex-col gap-1 text-sm font-medium">
      {etiqueta}
      <select
        value={valor}
        onChange={(e) => cambiar(e.target.value)}
        className="rounded-lg border border-crema-oscura bg-white px-3 py-2"
      >
        <option value="">Todas</option>
        {opciones.map((op) => (
          <option key={op} value={op}>{op}</option>
        ))}
      </select>
    </label>
  );
}

export default function Catalogo({ cafes }) {
  const [marca, setMarca] = useState("");
  const [tueste, setTueste] = useState("");

  const marcas = [...new Set(cafes.map((c) => c.marca))].sort();
  const tuestes = [...new Set(cafes.map((c) => c.tueste))];
  const visibles = cafes.filter(
    (c) => (!marca || c.marca === marca) && (!tueste || c.tueste === tueste)
  );

  return (
    <>
      <div className="mt-6 flex flex-wrap items-end gap-4">
        <Filtro etiqueta="Marca" opciones={marcas} valor={marca} cambiar={setMarca} />
        <Filtro etiqueta="Tueste" opciones={tuestes} valor={tueste} cambiar={setTueste} />
        <p className="pb-2 text-sm text-cafe">{visibles.length} cafés</p>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {visibles.map((cafe) => (
          <TarjetaCafe key={cafe.slug} cafe={cafe} />
        ))}
      </div>
      {visibles.length === 0 && (
        <p className="mt-8 text-cafe">No hay cafés con esos filtros.</p>
      )}
    </>
  );
}
