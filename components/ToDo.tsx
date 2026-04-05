import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useRef, useState } from "react";

import {
  FlatList,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import TodoItem from "./To-Do-Items";

const COLORS = {
  primary: "#4361ee",
  primaryLight: "#4895ef",
  secondary: "#f8f9fa",
  accent: "#f72585",
  text: "#2b2d42",
  textLight: "#8d99ae",
  white: "#ffffff",
  border: "#e9ecef",
};

const styles = StyleSheet.create({
  todo: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 20,
  },

  header: {
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
    color: COLORS.primary,
    marginVertical: 20,
  },

  addSection: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },

  input: {
    flex: 1,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.secondary,
    borderWidth: 2,
    borderColor: COLORS.border,
    paddingHorizontal: 20,
    fontSize: 16,
  },

  button: {
    marginLeft: 10,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});

type TodoType = {
  no: number;
  text: string;
  completed: boolean;
};

const Todo: React.FC = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [text, setText] = useState("");
  const countRef = useRef(0);

  const add = async () => {
    if (!text.trim()) return;

    const newTodo: TodoType = {
      no: countRef.current++,
      text: text,
      completed: false,
    };

    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    setText("");
    Keyboard.dismiss();

    await AsyncStorage.setItem("todos_count", countRef.current.toString());
    await AsyncStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  // تحميل البيانات عند أول مرة
  useEffect(() => {
    const loadData = async () => {
      const savedTodos = await AsyncStorage.getItem("todos");
      const savedCount = await AsyncStorage.getItem("todos_count");

      if (savedTodos) setTodos(JSON.parse(savedTodos));
      if (savedCount) countRef.current = parseInt(savedCount);
    };

    loadData();
  }, []);

  return (
    <View style={styles.todo}>
      <Text style={styles.header}>To-Do List</Text>

      <View style={styles.addSection}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Add Your Task"
          style={styles.input}
          onSubmitEditing={add} // Enter key on keyboard
        />

        <Pressable style={styles.button} onPress={add}>
          <Text style={styles.buttonText}>ADD</Text>
        </Pressable>
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.no.toString()}
        renderItem={({ item }) => (
          <TodoItem
            no={item.no}
            text={item.text}
            completed={item.completed}
            todos={todos}
            setTodos={setTodos}
          />
        )}
      />
    </View>
  );
};

export default Todo;
