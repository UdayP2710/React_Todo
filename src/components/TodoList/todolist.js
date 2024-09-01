import styles from "./todolist.module.css";
import { useDispatch, useSelector } from "react-redux";
import { todoState } from "../../Reducer/todoReducer";
import { todoApiCall } from "../../Reducer/todoReducer";
import { todoActions } from "../../Reducer/todoReducer";
import cross from "../../images/cross.jpg";
import { todoDeleteTodo } from "../../Reducer/todoReducer";

import { useState } from "react";
export function TodoList({ setModalOpen, setData }) {
  const dispatch = useDispatch();
  const { todo_list } = useSelector(todoState);
  useState(() => {
    dispatch(todoApiCall());
  }, []);
  return (
    <>
      <div className={styles.outer_list_cont}>
        <h1>...Todo List...</h1>
        <hr></hr>
        <div className={styles.inner_list_cont}>
          {todo_list.map((todo, index) => {
            return (
              <>
                <div className={styles.box}>
                  <div className={styles.pin}>
                    <div>
                      <img
                        onClick={() => dispatch(todoDeleteTodo(todo.id))}
                        src={cross}
                      />
                    </div>
                  </div>
                  <div className={styles.pin}>
                    <h3>{todo.title}</h3>
                  </div>
                  <div className={styles.btn_div}>
                    {todo.completed ? (
                      <button
                        onClick={() =>
                          dispatch(todoActions.toggleTodo(todo.id))
                        }
                        className={styles.done}
                      >
                        Done
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          dispatch(todoActions.toggleTodo(todo.id))
                        }
                        className={styles.pending}
                      >
                        Pending
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setModalOpen(true);
                        setData(todo);
                      }}
                      className={styles.update}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
