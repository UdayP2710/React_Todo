import pin from "../../images/pin.jpg";
import styles from "./todo.module.css";
import { useDispatch } from "react-redux";
import { todoActions } from "../../Reducer/todoReducer";
import { todoAddUsingPOST } from "../../Reducer/todoReducer";
import { useRef } from "react";
export function TodoForm() {
  const dispatch = useDispatch();

  const title = useRef();
  function handelForm(e) {
    e.preventDefault();
    const titleValue = title.current.value;
    console.log(titleValue);
    title.current.value = "";
    dispatch(todoAddUsingPOST({ title: titleValue, completed: false }));
  }

  return (
    <>
      <div className={styles.form_cont}>
        <form onSubmit={(e) => handelForm(e)} className={styles.formdiv}>
          <div className={styles.input_div}>
            <input ref={title} type="text" placeholder="Add Your Task....." />
            <button className={""}>
              <img src={pin} alt="pin" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
