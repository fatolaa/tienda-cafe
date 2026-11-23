import { tienda } from "@/data/tienda";

export default function BarraAnuncios() {
  return (
    <div className="bg-caramelo text-espresso">
      <ul className="mx-auto flex max-w-6xl items-center justify-center gap-x-6 overflow-hidden px-4 py-2 text-xs font-semibold sm:text-sm">
        {tienda.anuncios.map((anuncio, i) => (
          // En celular solo se muestra el primer anuncio para no amontonar.
          <li key={anuncio} className={i === 0 ? "" : "hidden md:block"}>
            {anuncio}
          </li>
        ))}
      </ul>
    </div>
  );
}
