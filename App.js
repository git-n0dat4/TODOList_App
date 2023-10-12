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

function contienePalabrasConInicialesMayusculas(cadena) {
  const palabras = cadena.split(" ");
  return palabras.every((palabra) => /^[A-Z][a-z]*$/.test(palabra));
}
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
    setMarkedItems((prevMarkedItems) =>
      prevMarkedItems.includes(index)
        ? prevMarkedItems.filter((item) => item !== index)
        : [...prevMarkedItems, index]
    );
    // Además, actualiza el estado de la tarea como "hecha" en tu estructura de datos
    const updatedTodoList = [...todoList];
    updatedTodoList[index] = todoList[index] + " (Done)";
    setTodoList(updatedTodoList);
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
        <Text style={styles.cardTitle}>Resultados de Pruebas Unitarias</Text>
        <Text>{unitTestResults}</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginBottom: 16,
    padding: 8,
  },
  todoItem: {
    textDecorationLine: "line-through",
  },
});
