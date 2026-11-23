import Link from "next/link";
import { tienda } from "@/data/tienda";

export default function Encabezado() {
  return (
    <header className="border-b border-crema-oscura bg-crema/90 backdrop-blur sticky top-0 z-10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="font-titulo text-2xl font-semibold text-espresso">
          {tienda.nombre}
        </Link>
        <nav className="flex gap-6 text-sm font-medium">
          <Link href="/cafes" className="hover:text-caramelo-oscuro">Cafés</Link>
          <Link href="/#como-comprar" className="hover:text-caramelo-oscuro">Cómo comprar</Link>
        </nav>
      </div>
    </header>
  );
}
