# Tienda de café (etapa 1: catálogo básico)

Tienda en línea de café de varias marcas para Cochabamba, Bolivia. Hecha con Next.js y Tailwind CSS.

## Cómo verla en tu computadora

1. Instala [Node.js](https://nodejs.org/) (versión 20 o más nueva).
2. En esta carpeta ejecuta `npm install` y luego `npm run dev`.
3. Abre http://localhost:3000 en el navegador.

## Dónde cambiar cada cosa

| Qué | Archivo |
| --- | --- |
| Nombre de la tienda, WhatsApp, ciudad | `src/data/tienda.js` |
| Cafés, precios, tamaños | `src/data/cafes.js` |
| Colores | `src/app/globals.css` |
| Portada | `src/app/page.js` |
| Ficha de producto | `src/app/cafes/[slug]/page.js` |

El nombre "Grano Andino", el número de WhatsApp y los cafés son provisionales.
