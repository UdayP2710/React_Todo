import React, { useEffect, useRef } from "react";
import styles from "./update.module.css";
import { todoUpdateUsingPUT } from "../../Reducer/todoReducer";
import { useDispatch } from "react-redux";

function Modal({ isOpen, closeModal, data }) {
  const text = useRef();
  const dispatch = useDispatch();
  if (!isOpen) return null;

  function handelUpdate(e) {
    e.preventDefault();

    const newdata = {
      id: data.id,
      title: text.current.value,
      completed: data.completed,
    };

    dispatch(todoUpdateUsingPUT(newdata));
    closeModal(false);
  }
  return (
    <div className={styles.modal_overlay} onClick={closeModal}>
      <div
        className={styles.modal_content}
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <h1>Update Todo</h1>
          <hr></hr>
        </div>

        <form onSubmit={(e) => handelUpdate(e)}>
          <input ref={text} type="text" />
          <button type="submit">Save</button>
        </form>
        <button
          onClick={() => closeModal(false)}
          className={styles.close_button}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Modal;
