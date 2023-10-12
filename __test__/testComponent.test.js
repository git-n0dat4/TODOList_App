import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import App from '../App';

describe('App', () => {
    let renderResult; // Almacenar el resultado de renderizado para reutilización
  
    beforeEach(() => {
      // Configuración inicial antes de cada prueba
      renderResult = render(<App />);
    });
  
    it('renders correctly', () => {
      const { getByText } = renderResult;
      const title = getByText('Modo de Escritura'); // Buscar el título del modo de escritura
      expect(title).toBeTruthy();
    });
  
    it('adds a new task to the list', () => {
      const { getByText, getByPlaceholderText, getByTestId } = renderResult;
      const input = getByPlaceholderText('Escribe algo...'); // Encontrar el campo de entrada
      const button = getByText('Guardar'); // Encontrar el botón de guardar
  
      fireEvent.changeText(input, 'New Task'); // Ingresar un nuevo texto
      fireEvent.press(button); // Presionar el botón de guardar
  
      const task = getByTestId('task-0'); // Buscar la tarea recién creada
  
      expect(task).toBeTruthy();
    });
  
    it('marks a task as done', () => {
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

      const doneTask2 = queryByText('New Task '); // Aqui se esta marcando la tarea sin el (Done), para demostrar el fallo de la prueba
      expect(doneTask2).toBeTruthy();

    });
  });