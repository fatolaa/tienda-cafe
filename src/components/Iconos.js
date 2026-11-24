// Íconos minimalistas de línea. Toman el color del texto (currentColor).
const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  className: "shrink-0",
};

export function IconoCarrito(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="9" cy="20" r="1.2" />
      <circle cx="18" cy="20" r="1.2" />
      <path d="M2.5 3h2.2l2.4 11.2a1.8 1.8 0 0 0 1.8 1.4h8.6a1.8 1.8 0 0 0 1.8-1.4L21 7H6" />
    </svg>
  );
}

export function IconoWhatsApp(props) {
  // Globo de conversación con un teléfono adentro, al estilo del logo de WhatsApp.
  return (
    <svg {...base} {...props}>
      <path d="M3.5 20.5l1.3-4.2A8.6 8.6 0 1 1 8 19.3z" />
      <path
        d="M9 8.6c.2-.5.5-.7.8-.7h.6c.2 0 .4.1.5.4l.6 1.5c.1.2 0 .5-.1.6l-.5.6c.6 1.2 1.6 2.2 2.8 2.8l.6-.5c.2-.2.4-.2.6-.1l1.5.6c.3.1.4.3.4.5v.6c0 .3-.2.6-.7.8-.7.3-1.6.3-2.5-.1-1.8-.8-3.4-2.4-4.2-4.2-.4-.9-.4-1.8-.2-2.5z"
        strokeWidth="1.3"
      />
    </svg>
  );
}
