// Ilustración de una bolsa de café. Se usa mientras no tengamos fotos reales.
export default function BolsaCafe({ cafe, className = "" }) {
  return (
    <svg viewBox="0 0 200 240" className={className} role="img" aria-label={`Bolsa de ${cafe.nombre}`}>
      <rect width="200" height="240" fill="#e2d3b6" />
      <path d="M55 40 L145 40 L155 70 L160 215 L40 215 L45 70 Z" fill={cafe.color} />
      <path d="M55 40 L145 40 L150 55 L50 55 Z" fill="#000" opacity="0.18" />
      <rect x="62" y="95" width="76" height="80" rx="6" fill="#f7f1e8" />
      <text x="100" y="118" textAnchor="middle" fontSize="8" fill="#6f4e37" fontFamily="Georgia, serif" textLength={cafe.marca.length > 11 ? 66 : undefined} lengthAdjust="spacingAndGlyphs">
        {cafe.marca.toUpperCase()}
      </text>
      <ellipse cx="100" cy="142" rx="9" ry="13" fill={cafe.color} />
      <path d="M100 130 Q95 142 100 154" stroke="#f7f1e8" strokeWidth="2" fill="none" />
      <text x="100" y="168" textAnchor="middle" fontSize="8" fill="#2b1d14">
        Tueste {cafe.tueste.toLowerCase()}
      </text>
    </svg>
  );
}
