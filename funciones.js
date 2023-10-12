export function contienePalabrasConInicialesMayusculas(cadena) {
    const expresionRegular = /\b[A-Z][a-z]*\b/g;
    const coincidencias = cadena.match(expresionRegular);
  
    return coincidencias !== null;
  }
  
