import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Encabezado from "@/components/Encabezado";
import PiePagina from "@/components/PiePagina";
import { tienda } from "@/data/tienda";

const titulos = Fraunces({ variable: "--font-titulos", subsets: ["latin"] });
const texto = Inter({ variable: "--font-texto", subsets: ["latin"] });

export const metadata = {
  title: { default: tienda.nombre, template: `%s | ${tienda.nombre}` },
  description: tienda.lema,
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${titulos.variable} ${texto.variable} font-sans antialiased`}>
        <div className="flex min-h-screen flex-col">
          <Encabezado />
          <main className="flex-1">{children}</main>
          <PiePagina />
        </div>
      </body>
    </html>
  );
}
