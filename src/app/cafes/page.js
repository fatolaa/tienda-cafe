import Catalogo from "@/components/Catalogo";
import { cafes } from "@/data/cafes";

export const metadata = { title: "Cafés" };

export default function PaginaCafes() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-titulo text-4xl">Nuestros cafés</h1>
      <p className="mt-2 text-cafe">Elige un café para ver sus características, tamaños y precios.</p>
      <Catalogo cafes={cafes} />
    </section>
  );
}
