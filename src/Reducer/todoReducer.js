import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const INITIAL_STATE = { todo_list: [] };
//.................fetch api function to extract todos from dumy server...................//
export const todoApiCall = createAsyncThunk(
  "todo/apicall",
  async (arg, thunkApi) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const data = await response.json();
      thunkApi.dispatch(todoActions.setInitialState(data));
    } catch (err) {}
  }
);
//..............post new todo to the dumy server and then updating states..................//
export const todoAddUsingPOST = createAsyncThunk(
  "todo/post",
  async (arg, thunkApi) => {
    try {
      await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify(arg),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      thunkApi.dispatch(todoActions.addTodo(arg));
    } catch (err) {}
  }
);
//..................function to update todo..................................//
export const todoUpdateUsingPUT = createAsyncThunk(
  "todo/update",
  async (arg, thunkApi) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/posts/${arg.id}`, {
        method: "PUT",
        body: JSON.stringify(arg),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      thunkApi.dispatch(todoActions.updateTodo(arg));
    } catch (err) {}
  }
);
//.........................Delete todo function making delete request......................//
export const todoDeleteTodo = createAsyncThunk(
  "todo/delete",
  async (arg, thunkApi) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/posts/${arg}`, {
        method: "DELETE",
      });
      thunkApi.dispatch(todoActions.deleteTodo(arg));
    } catch (err) {}
  }
);
const todoSlice = createSlice({
  name: "todo",
  initialState: INITIAL_STATE,
  reducers: {
    setInitialState: (state, action) => {
      state.todo_list = action.payload;
    },
    addTodo: (state, action) => {
      state.todo_list.push({ ...action.payload, id: state.todo_list.length });
    },
    toggleTodo: (state, action) => {
      const index = state.todo_list.findIndex(
        (todo) => todo.id === action.payload
      );
      state.todo_list.map((todo, id) => {
        if (id === index) {
          todo.completed = !todo.completed;
        }
      });
    },
    updateTodo: (state, action) => {
      const index = state.todo_list.findIndex(
        (todo) => todo.id === action.payload.id
      );
      state.todo_list.map((todo, id) => {
        if (id === index) {
          todo.title = action.payload.title;
        }
      });
    },
    deleteTodo: (state, action) => {
      const index = state.todo_list.findIndex(
        (todo) => todo.id === action.payload
      );
      state.todo_list.splice(index, 1);
    },
  },
});
export const todoReducer = todoSlice.reducer;
export const todoActions = todoSlice.actions;
export const todoState = (state) => state.todoReducer;
