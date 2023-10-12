function contienePalabrasConInicialesMayusculas(cadena) {
    const expresionRegular = /\b[A-Z][a-z]*\b/g;
    const coincidencias = cadena.match(expresionRegular);
  
    return coincidencias !== null;
  }
  
  describe('contienePalabrasConInicialesMayusculas', () => {
    it('debería devolver true si la cadena contiene palabras con iniciales en mayúsculas', () => {
      const cadenaConMayusculas = 'Esto Es Una Prueba';
      expect(contienePalabrasConInicialesMayusculas(cadenaConMayusculas)).toBe(true);
    });
  
    it('debería devolver false si la cadena no contiene palabras con iniciales en mayúsculas', () => {
      const cadenaSinMayusculas = 'esto es una prueba';
      expect(contienePalabrasConInicialesMayusculas(cadenaSinMayusculas)).toBe(false);
    });
  });