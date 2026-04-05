import { Image, Pressable, StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e9ecef",
    marginBottom: 10,
    elevation: 2,
  },

  icon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },

  text: {
    flex: 1,
    fontSize: 16,
    color: "#2b2d42",
  },

  completedText: {
    textDecorationLine: "line-through",
    color: "#8d99ae",
  },

  deleteIcon: {
    width: 24,
    height: 24,
    opacity: 0.6,
  },
});

type TodoType = {
  no: number;
  text: string;
  completed: boolean;
};

type Props = {
  no: number;
  text: string;
  completed: boolean;
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
};

const TodoItem: React.FC<Props> = ({
  no,
  text,
  completed,
  todos,
  setTodos,
}) => {
  const deleteTodo = () => {
    const updated = todos.filter((item) => item.no !== no);
    setTodos(updated);
  };

  const toggle = () => {
    const updated = todos.map((item) => {
      if (item.no === no) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setTodos(updated);
  };

  return (
    <Pressable style={styles.container} onPress={toggle}>
      <Image
        source={completed ? require("./tick.png") : require("./not_tick.png")}
        style={styles.icon}
      />

      <Text style={[styles.text, completed && styles.completedText]}>
        {text}
      </Text>

      <Pressable
        onPress={(e) => {
          e.stopPropagation();
          deleteTodo();
        }}
      >
        <Image source={require("./cross.png")} style={styles.deleteIcon} />
      </Pressable>
    </Pressable>
  );
};

export default TodoItem;
