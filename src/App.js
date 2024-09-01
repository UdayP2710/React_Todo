import "./App.css";
import { TodoForm } from "./components/TodoForm/todo_form";
import { TodoList } from "./components/TodoList/todolist";
import { todoStore } from "./store";
import { Provider } from "react-redux";
import Modal from "./components/UpdateForm/update";
import { useState } from "react";

function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState({});
  return (
    <div className="App">
      <Provider store={todoStore}>
        <TodoForm />
        <TodoList setData={setData} setModalOpen={setModalOpen} />
        <Modal
          data={data}
          setData={setData}
          isOpen={isModalOpen}
          closeModal={setModalOpen}
        ></Modal>
      </Provider>
    </div>
  );
}

export default App;
