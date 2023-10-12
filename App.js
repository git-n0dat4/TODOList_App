import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { contienePalabrasConInicialesMayusculas } from './funciones';

export default function App() {
  const [text, setText] = useState("");
  const [unitTestResults, setUnitTestResults] = useState("");
  const [savedText, setSavedText] = useState("");
  const [todoList, setTodoList] = useState([]); // Para almacenar el To-Do List
  const [markedItems, setMarkedItems] = useState([]); // Para marcar elementos en el To-Do List

  const handleSaveText = () => {
    setText(text);
    if (contienePalabrasConInicialesMayusculas(text)) {
      setUnitTestResults(
        "El texto cumple con la prueba unitaria: contiene palabras con iniciales en mayúsculas."
      );
      // Guardar el texto si pasa la prueba unitaria
      setSavedText(text);
      // Agregar el texto como una tarea al To-Do List
      setTodoList((prevTodoList) => [...prevTodoList, text]);
    } else {
      setUnitTestResults(
        "El texto no cumple con la prueba unitaria: debe contener palabras con iniciales en mayúsculas."
      );
    }
  };

  const toggleItem = (index) => {
    // Marcar o desmarcar un elemento en el To-Do List
    setMarkedItems((prevMarkedItems) => {
      const isAlreadyMarked = prevMarkedItems.includes(index);
      const updatedMarkedItems = isAlreadyMarked
        ? prevMarkedItems.filter((item) => item !== index)
        : [...prevMarkedItems, index];
  
      // Actualizar el estado de las tareas
      const updatedTodoList = todoList.map((item, itemIndex) => {
        if (itemIndex === index) {
          if (isAlreadyMarked && item.endsWith('(Done)')) {
            return item.substring(0, item.length - 7);
          } else {
            return `${item} (Done)`;
          }
        }
        return item;
      });
  
      setTodoList(updatedTodoList);
      return updatedMarkedItems;
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Modo de Escritura</Text>
        <TextInput
          style={styles.input}
          placeholder="Escribe algo..."
          onChangeText={(newText) => setText(newText)}
        />
        <Button title="Guardar" onPress={handleSaveText} />
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>To-Do List</Text>
        <FlatList
          data={todoList}
          renderItem={({ item, index }) => (
            <TouchableOpacity 
            onPress={() => toggleItem(index)}
            testID={`task-${index}`}
            >
              <Text style={markedItems.includes(index) ? styles.todoItem : {}}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Resultados de Pruebas Unitarias</Text>
        <Text>{unitTestResults}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 16,
    margin: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 8,
    padding: 8,
  },
  todoItem: {
    textDecorationLine: "line-through",
  },
});
