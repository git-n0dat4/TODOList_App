import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import App from '../App';

describe('App', () => {
    let renderResult; // Almacenar el resultado de renderizado para reutilización
  
    beforeEach(() => {
      // Configuración inicial antes de cada prueba
      renderResult = render(<App />);
    });
  
    it('Se visualiza correctamente', () => {
      const { getByText } = renderResult;
      const title = getByText('Modo de Escritura'); // Buscar el título del modo de escritura
      expect(title).toBeTruthy();
    });
  
    it('Añade una nueva tarea a la lista', () => {
      const { getByText, getByPlaceholderText, getByTestId } = renderResult;
      const input = getByPlaceholderText('Escribe algo...'); // Encontrar el campo de entrada
      const button = getByText('Guardar'); // Encontrar el botón de guardar
  
      fireEvent.changeText(input, 'New Task'); // Ingresar un nuevo texto
      fireEvent.press(button); // Presionar el botón de guardar
  
      const task = getByTestId('task-0'); // Buscar la tarea recién creada
  
      expect(task).toBeTruthy();
    });
  
    it('Marca una tarea como realizada', () => {
      const { getByText, getByPlaceholderText, getByTestId, queryByText } = renderResult;
      const input = getByPlaceholderText('Escribe algo...');
      const button = getByText('Guardar');
  
      fireEvent.changeText(input, 'New Task');
      fireEvent.press(button);
  
      const task = getByTestId('task-0');
  
      expect(task).toBeTruthy();
  
      fireEvent.press(task); // Marcar la tarea como hecha
  
      const doneTask = queryByText('New Task (Done)'); // Buscar la tarea marcada como "hecha"
      expect(doneTask).toBeTruthy();
    });

    // Aqui se esta marcando la tarea sin el (Done), la cual no deberia de existir
    // Pero se esta controlando el error
    it('Comprueba que una tarea marcada no contenga el (Done)',()=>{
        const {queryByText } = renderResult;
        const doneTask = queryByText('New Task');
        expect(doneTask).toBeNull();
    });
  });