# Tienda de café: contexto del proyecto

## Objetivo
Tienda en línea, hecha desde cero (sin Shopify ni similares), para vender café de varias marcas y presentaciones en Bolivia, empezando por Cochabamba. El cliente recorre un catálogo, abre la ficha de cada café y ve características, precio y tamaño.

El dueño es Fabian (GitHub `fatolaa`). Es su primera tienda: se avanza paso a paso, de lo básico a lo profesional, y cada cambio se explica en español sencillo.

## Inspiración: https://latiendadelcafe.co/
Tienda colombiana multimarca (parece Shopify). Se toma su **estructura y experiencia**, nunca su marca, textos, fotos ni códigos promocionales.

| Elemento de la inspiración | Estado aquí |
| --- | --- |
| Portada: hero, destacados, cómo comprar | Hecho (etapa 1) |
| Tarjeta de producto: foto, marca, nombre, notas, precio "desde" | Hecho |
| Ficha con variantes (tamaño y molienda) y precio que cambia | Hecho |
| Tabla de características (origen, altura, proceso, variedad, tueste, notas, puntaje) | Hecho |
| Filtros del catálogo y orden | Hecho: marca, tueste, origen, precio máximo y orden, guardados en la URL. Molienda no aplica (todos los cafés se muelen a pedido) |
| Barra superior de anuncios | Hecho (textos en `tienda.anuncios`, provisionales) |
| Menú con marcas (desplegable y menú de celular) | Hecho. Categorías como accesorios o kits: cuando haya esos productos |
| Búsqueda (encabezado y catálogo, sin importar tildes) | Hecho |
| Fotos reales de producto y galería | Pendiente: hoy se usa una ilustración SVG (`BolsaCafe`) |
| Etiquetas "oferta" y "agotado", stock | Pendiente (etapa 3) |
| Carrito y vista rápida | Pendiente (etapa 3) |
| Nota de envío y políticas (cambios, FAQ, términos) en la ficha | Pendiente (etapas 2 y 4) |
| Reseñas verificadas, cupones, puntos, suscripciones, blog, quiz, newsletter | Pendiente (etapa 5) |

Diferencia buscada: aquí el filtro por **marca** es central, porque la tienda es multimarca.

## Stack
- Next.js 15 (App Router, JavaScript, carpeta `src/`) + Tailwind CSS v4.
- Publicación: Vercel (pendiente de configurar).
- Etapa 3 en adelante: Supabase para productos, stock, pedidos e imágenes.
- Precios en bolivianos (Bs), textos en español de Bolivia, `lang="es"`.

## Estructura
| Ruta | Qué es |
| --- | --- |
| `src/data/tienda.js` | Nombre, lema, ciudad y WhatsApp de la tienda |
| `src/data/cafes.js` | Catálogo: cafés, tamaños con precio, moliendas |
| `src/lib/formato.js` | `formatoBs` y `enlaceWhatsApp` |
| `src/lib/texto.js` | `normalizar` (quita tildes para buscar) |
| `src/app/globals.css` | Paleta crema, verde abeto y rojo tomate (tokens `fondo`, `superficie`, `borde`, `texto`, `texto-suave`, `acento`, `acento-fuerte`) y fuentes |
| `src/app/page.js` | Portada |
| `src/app/cafes/page.js` | Catálogo (usa `components/Catalogo.js`, con filtros en cliente) |
| `src/app/cafes/[slug]/page.js` | Ficha de producto (usa `components/SelectorCompra.js`) |
| `src/components/` | BarraAnuncios, Encabezado (menú y búsqueda), PiePagina, TarjetaCafe, BolsaCafe, Catalogo, SelectorCompra |

## Convenciones
- Nombres de archivos, componentes y variables en español (`TarjetaCafe`, `precioDesde`).
- Colores solo con los tokens de la paleta, nunca hex sueltos en componentes (excepto el color de cada bolsa en `cafes.js` y la ilustración `BolsaCafe`). Fondo crema (`fondo`), texto verde (`texto`), tarjetas `superficie`; secciones oscuras con `bg-texto text-fondo`; botones con `bg-acento-fuerte text-white`.
- Títulos con `font-titulo` (Fraunces); texto con la fuente por defecto (Inter).
- Diseño pensado primero para celular.
- Componentes de servidor por defecto; `"use client"` solo donde hay interacción.
- Antes de subir cambios: `npm run build` sin errores y revisar las páginas en el navegador.

## Flujo de trabajo
- Cada cambio va en una rama nueva con un pull request; Fabian lo revisa y lo une a `main`.
- Commits y PR en español, explicando qué cambia y por qué.
- Plan completo: https://claude.ai/artifact/DHueN6mvKy1rmrVWbmEoXH

## Hoja de ruta
1. **Catálogo básico** (hecho): catálogo, ficha con variantes, pedido por WhatsApp.
2. **Catálogo profesional**: filtros, orden, búsqueda, barra de anuncios y menú (hecho); fotos reales, logo y paleta definitivos, dominio, publicar en Vercel (pendiente).
3. **Carrito y pedidos**: carrito, formulario de entrega, Supabase (productos, stock, pedidos), panel para editar productos.
4. **Pagos y envíos**: QR bancario (primero fijo con confirmación manual), contra entrega, zonas y tarifas en Cochabamba, avisos por correo.
5. **Crecer**: cuentas, reseñas, cupones, suscripciones, blog, envíos a otras ciudades.

## Provisional (cambiar cuando Fabian lo defina)
- Nombre "Grano Andino" y lema.
- WhatsApp `59170000000`.
- Los 8 cafés, sus marcas, precios y descripciones son ficticios.
- Paleta y fuentes.
- Pagos y envíos en Bolivia: suposiciones a confirmar con el banco (QR, NIT, facturación SIN).
