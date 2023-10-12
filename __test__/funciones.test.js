export function contienePalabrasConInicialesMayusculas(cadena) {
    const expresionRegular = /\b[A-Z][a-z]*\b/g;
    const coincidencias = cadena.match(expresionRegular);
  
    return coincidencias !== null;
  }

  describe('contienePalabrasConInicialesMayusculas', () => {
    it('devuelve true si contiene palabras con iniciales en mayúsculas', () => {
      const cadenaConMayusculas = 'Esto Es Una Prueba';
      expect(contienePalabrasConInicialesMayusculas(cadenaConMayusculas)).toBe(true);
    });
  
    it('debería ser false si no contiene palabras con iniciales en mayúsculas', () => {
      const cadenaSinMayusculas = 'esto es una prueba';
      expect(contienePalabrasConInicialesMayusculas(cadenaSinMayusculas)).toBe(false);
    });
  });
