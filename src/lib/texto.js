// Quita tildes y pasa a minúsculas para comparar textos ("Café" -> "cafe").
export function normalizar(texto) {
  return texto.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}
