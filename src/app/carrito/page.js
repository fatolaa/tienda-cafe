import VistaCarrito from "@/components/VistaCarrito";

export const metadata = { title: "Carrito" };

export default function PaginaCarrito() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="font-titulo text-4xl">Tu carrito</h1>
      <VistaCarrito />
    </section>
  );
}
