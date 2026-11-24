"use client";

// Carrito de compras. Se guarda en el navegador del cliente (localStorage),
// así no se pierde al recargar la página. En la etapa 3 pasará a la base de datos.
import { createContext, useContext, useEffect, useState } from "react";
import { buscarCafe } from "@/data/cafes";

const CLAVE = "carrito-v1";
const ContextoCarrito = createContext(null);

// Cada línea del carrito: { slug, peso, molienda, cantidad }
function leerGuardado() {
  try {
    const datos = JSON.parse(localStorage.getItem(CLAVE) ?? "[]");
    return Array.isArray(datos) ? datos.filter((l) => buscarCafe(l.slug)) : [];
  } catch {
    return [];
  }
}

const mismaLinea = (a, b) => a.slug === b.slug && a.peso === b.peso && a.molienda === b.molienda;

export function ProveedorCarrito({ children }) {
  const [lineas, setLineas] = useState([]);
  const [listo, setListo] = useState(false);

  // Al abrir la página, recupera lo guardado.
  useEffect(() => {
    setLineas(leerGuardado());
    setListo(true);
  }, []);

  // Cada cambio se guarda.
  useEffect(() => {
    if (!listo) return;
    try {
      localStorage.setItem(CLAVE, JSON.stringify(lineas));
    } catch {
      // Navegación privada o almacenamiento bloqueado: el carrito sigue funcionando en esta visita.
    }
  }, [lineas, listo]);

  function agregar(nueva) {
    setLineas((actuales) => {
      const existe = actuales.find((l) => mismaLinea(l, nueva));
      if (existe) {
        return actuales.map((l) => (mismaLinea(l, nueva) ? { ...l, cantidad: l.cantidad + nueva.cantidad } : l));
      }
      return [...actuales, nueva];
    });
  }

  function cambiarCantidad(linea, cantidad) {
    setLineas((actuales) =>
      cantidad < 1
        ? actuales.filter((l) => !mismaLinea(l, linea))
        : actuales.map((l) => (mismaLinea(l, linea) ? { ...l, cantidad } : l))
    );
  }

  const quitar = (linea) => cambiarCantidad(linea, 0);
  const vaciar = () => setLineas([]);

  // Agrega a cada línea los datos del café y su precio.
  const detalle = lineas.map((l) => {
    const cafe = buscarCafe(l.slug);
    const precio = cafe.tamanos.find((t) => t.peso === l.peso)?.precio ?? 0;
    return { ...l, cafe, precio, subtotal: precio * l.cantidad };
  });
  const total = detalle.reduce((suma, l) => suma + l.subtotal, 0);
  const unidades = lineas.reduce((suma, l) => suma + l.cantidad, 0);

  return (
    <ContextoCarrito.Provider value={{ detalle, total, unidades, listo, agregar, cambiarCantidad, quitar, vaciar }}>
      {children}
    </ContextoCarrito.Provider>
  );
}

export function useCarrito() {
  return useContext(ContextoCarrito);
}
