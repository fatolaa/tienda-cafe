// Catálogo de la etapa 1. Cada café tiene tamaños con su precio (en Bs)
// y opciones de molienda. Más adelante estos datos pasarán a una base de datos.
// PROVISIONAL: marcas, descripciones y precios son de ejemplo.

export const moliendas = ["En grano", "Molido medio", "Molido fino (espresso)"];

export const cafes = [
  {
    slug: "caranavi-tueste-medio",
    marca: "Altura Yungueña",
    nombre: "Caranavi Tueste Medio",
    origen: "Caranavi, La Paz",
    tueste: "Medio",
    notas: ["Chocolate", "Caramelo", "Nuez"],
    altura: "1.600 m",
    proceso: "Lavado",
    variedad: "Typica",
    puntaje: 84,
    descripcion:
      "Un café equilibrado y dulce, ideal para empezar el día. Funciona bien en prensa francesa, filtro o cafetera italiana.",
    tamanos: [
      { peso: "250 g", precio: 45 },
      { peso: "500 g", precio: 85 },
      { peso: "1 kg", precio: 160 },
    ],
    color: "#8B5A2B",
    destacado: true,
  },
  {
    slug: "samaipata-honey",
    marca: "Valle Alto",
    nombre: "Samaipata Honey",
    origen: "Samaipata, Santa Cruz",
    tueste: "Claro",
    notas: ["Miel", "Durazno", "Floral"],
    altura: "1.700 m",
    proceso: "Honey",
    variedad: "Caturra",
    puntaje: 86,
    descripcion:
      "Dulzor de miel con acidez brillante. Pensado para métodos de filtrado como V60 o Chemex.",
    tamanos: [
      { peso: "250 g", precio: 55 },
      { peso: "500 g", precio: 100 },
    ],
    color: "#C8873A",
    destacado: true,
  },
  {
    slug: "coroico-oscuro",
    marca: "Altura Yungueña",
    nombre: "Coroico Tueste Oscuro",
    origen: "Coroico, La Paz",
    tueste: "Oscuro",
    notas: ["Cacao amargo", "Tostado", "Especias"],
    altura: "1.500 m",
    proceso: "Lavado",
    variedad: "Catuaí",
    puntaje: 82,
    descripcion:
      "Intenso y con mucho cuerpo. Excelente para espresso y para tomar con leche.",
    tamanos: [
      { peso: "250 g", precio: 42 },
      { peso: "500 g", precio: 80 },
      { peso: "1 kg", precio: 150 },
    ],
    color: "#3E2618",
    destacado: true,
  },
  {
    slug: "taipiplaya-natural",
    marca: "Finca Las Nubes",
    nombre: "Taipiplaya Natural",
    origen: "Taipiplaya, La Paz",
    tueste: "Medio",
    notas: ["Frutos rojos", "Vino", "Panela"],
    altura: "1.800 m",
    proceso: "Natural",
    variedad: "Bourbon",
    puntaje: 87,
    descripcion:
      "Proceso natural con notas frutales marcadas. Un café para descubrir sabores nuevos.",
    tamanos: [
      { peso: "250 g", precio: 60 },
      { peso: "500 g", precio: 115 },
    ],
    color: "#9E3B3B",
    destacado: false,
  },
  {
    slug: "yungas-clasico",
    marca: "Café del Tunari",
    nombre: "Yungas Clásico",
    origen: "Sud Yungas, La Paz",
    tueste: "Medio",
    notas: ["Chocolate con leche", "Almendra"],
    altura: "1.400 m",
    proceso: "Lavado",
    variedad: "Typica y Caturra",
    puntaje: 82,
    descripcion:
      "El café de todos los días: suave, redondo y rendidor. Muy bueno en cafetera de goteo.",
    tamanos: [
      { peso: "250 g", precio: 35 },
      { peso: "500 g", precio: 65 },
      { peso: "1 kg", precio: 120 },
    ],
    color: "#6F4E37",
    destacado: false,
  },
  {
    slug: "tunari-espresso",
    marca: "Café del Tunari",
    nombre: "Blend Espresso Tunari",
    origen: "Mezcla de Yungas y Caranavi",
    tueste: "Oscuro",
    notas: ["Cacao", "Caramelo quemado"],
    altura: "1.400 a 1.700 m",
    proceso: "Lavado",
    variedad: "Mezcla",
    puntaje: 83,
    descripcion:
      "Mezcla pensada para máquina de espresso: crema densa y sabor que resiste bien la leche.",
    tamanos: [
      { peso: "500 g", precio: 75 },
      { peso: "1 kg", precio: 140 },
    ],
    color: "#2B1D14",
    destacado: false,
  },
  {
    slug: "nubes-geisha",
    marca: "Finca Las Nubes",
    nombre: "Geisha Edición Limitada",
    origen: "Caranavi, La Paz",
    tueste: "Claro",
    notas: ["Jazmín", "Bergamota", "Té negro"],
    altura: "1.900 m",
    proceso: "Lavado",
    variedad: "Geisha",
    puntaje: 89,
    descripcion:
      "Un café de especialidad poco común, delicado y muy aromático. Recomendado en V60.",
    tamanos: [{ peso: "250 g", precio: 120 }],
    color: "#5B7553",
    destacado: false,
  },
  {
    slug: "valle-alto-descafeinado",
    marca: "Valle Alto",
    nombre: "Descafeinado Suave",
    origen: "Samaipata, Santa Cruz",
    tueste: "Medio",
    notas: ["Chocolate", "Galleta"],
    altura: "1.600 m",
    proceso: "Descafeinado al agua",
    variedad: "Caturra",
    puntaje: 81,
    descripcion:
      "Todo el sabor, sin la cafeína. Para disfrutar una taza en la tarde o la noche.",
    tamanos: [
      { peso: "250 g", precio: 50 },
      { peso: "500 g", precio: 95 },
    ],
    color: "#7A6A55",
    destacado: false,
  },
];

export function buscarCafe(slug) {
  return cafes.find((cafe) => cafe.slug === slug);
}

export function precioDesde(cafe) {
  return Math.min(...cafe.tamanos.map((t) => t.precio));
}
