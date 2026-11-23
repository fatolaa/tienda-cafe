// Muestra un número como precio en bolivianos: 45 -> "Bs 45"
export function formatoBs(monto) {
  return `Bs ${monto.toLocaleString("es-BO")}`;
}

// Arma el enlace de WhatsApp con un mensaje ya escrito.
export function enlaceWhatsApp(numero, mensaje) {
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
}
