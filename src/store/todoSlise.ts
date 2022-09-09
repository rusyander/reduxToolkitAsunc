import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodos: any = createAsyncThunk(
  "todos/fetchTodos",
  async function (_, { rejectWithValue }) {
    try {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=20"
      );
      if (!res.ok) {
        throw new Error("Failed to fetch todos");
      }
      const data = await res.json();
      return data;
    } catch (e: any) {
      console.log(e);
      return rejectWithValue(e.message);
    }
  }
);

export const deleteTodos: any = createAsyncThunk(
  "todos/deleteTodos",
  async function (id: any, { rejectWithValue, dispatch }) {
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) {
        throw new Error("Failed to delete todos");
      }
      dispatch(deleteTodo({ id }));
      // return id;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const toggleTodo: any = createAsyncThunk(
  "todos/toggleTodo",
  async function (id: any, { rejectWithValue, dispatch, getState }: any) {
    const todo: any = getState().todos.todos.find(
      (todo: any) => todo.id === id
    );
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            completed: !todo.completed,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      if (!res.ok) {
        throw new Error("Failed to toggle todos");
      }
      dispatch(toggle({ id }));
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const addTodos: any = createAsyncThunk(
  "todos/addTodos",
  async function (title: any, { rejectWithValue, dispatch }) {
    console.log(title);

    try {
      const todo = {
        title: title,
        completed: false,
        userId: 1,
      };
      const res = await fetch(`https://jsonplaceholder.typicode.com/todos`, {
        method: "POST",
        body: JSON.stringify(todo),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (!res.ok) {
        throw new Error("Failed to add todos");
      }
      const data = await res.json();
      console.log(data);

      dispatch(addTodo({ data }));
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

const setError = (state: any, action: any) => {
  state.status = "rejected";
  state.error = action.payload;
};

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    status: null,
    error: null,
  },
  reducers: {
    addTodo: (state: any, action) => {
      state.todos.push(action.payload.data);
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(
        (todo: any) => todo.id !== action.payload.id
      );
    },
    toggle: (state: any, action) => {
      const togglleTodo = state.todos.find(
        (todo: any) => todo.id === action.payload.id
      );
      togglleTodo.completed = !togglleTodo.completed;
    },
  },
  extraReducers: {
    [fetchTodos.pending]: (state: any, action: any) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchTodos.fulfilled]: (state: any, action: any) => {
      state.status = "resolved";
      state.todos = action.payload;
    },
    [fetchTodos.rejected]: setError,
    // ------------------
    // [deleteTodos.pending]: (state: any, action: any) => {
    //   state.status = "loading";
    //   state.error = null;
    // },
    // [deleteTodos.fulfilled]: (state: any, action: any) => {
    //   state.status = "resolved";
    //   state.todos = state.todos.filter(
    //     (todo: any) => todo.id !== action.payload.id
    //   );
    // },
    [deleteTodos.rejected]: setError,
    //---------------------------
    [toggleTodo.rejected]: setError,
  },
});

export const { addTodo, deleteTodo, toggle } = todoSlice.actions;

export default todoSlice.reducer;
