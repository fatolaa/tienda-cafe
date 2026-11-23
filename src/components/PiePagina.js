import { tienda } from "@/data/tienda";

export default function PiePagina() {
  return (
    <footer className="mt-16 bg-espresso text-crema">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:grid-cols-2">
        <div>
          <p className="font-titulo text-xl">{tienda.nombre}</p>
          <p className="mt-2 text-sm text-crema/70">{tienda.lema}</p>
        </div>
        <div className="text-sm text-crema/70 sm:text-right">
          <p>Entregas en {tienda.ciudad}, Bolivia</p>
          <p className="mt-1">Pedidos por WhatsApp</p>
        </div>
      </div>
    </footer>
  );
}
