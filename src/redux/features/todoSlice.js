import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addCompletedApi, createTodoApi, deleteTodoApi, editTodoApi, getAllTodosApi, getSingleTodoApi } from "../../services/allApi";
import { fetchAllCompleted, undoCompleted } from "./completedSlice";



export const fetchTodos = createAsyncThunk("todos/fetchTodos", async()=>{
  const response = await getAllTodosApi();
  return response?.data;
});

// export const fetchSingleTodo = createAsyncThunk("todos/fetchSingleTodo", async(id)=>{
//   const response = await getSingleTodoApi(id);
//   return response;
// });

export const createTodo = createAsyncThunk('todos/createTodo', async(data , {dispatch})=>{
  const response = await createTodoApi(data);
  dispatch(fetchTodos());
  return response?.data;
})


export const editTodo = createAsyncThunk('todos/editTodo', async(todo , {dispatch})=>{
  const response = await editTodoApi(todo.id, todo);
  dispatch(fetchTodos());
  return response?.data;
})

 export const deleteTodo = createAsyncThunk("todos/deleteTodo", async(id, { dispatch })=>{
  const response = await deleteTodoApi(id);
  dispatch(fetchTodos());
  return id;
});

export const markAsDone = createAsyncThunk('todos/markAsDone', async(todo, { dispatch })=>{
  const {id, ...rest} = todo
  await addCompletedApi(rest);
  await deleteTodoApi(todo.id);
  dispatch(fetchTodos());
  dispatch(fetchAllCompleted());
  return todo;
})


const initialState = {
  loading:false,
  todos:[],
  todosCopy:[],
  error:"",
  singleTodo:{}
}

const todoSlice = createSlice({
  name:"todos",
  initialState,
  reducers:{
    searchToDo:(state, action)=>{
      state.todos = state.todosCopy.filter(todo => todo.title.toLowerCase().includes(action.payload.toLowerCase()));
    },
    sortPriority:(state, action)=>{
      state.todos = state.todosCopy.filter(todo => todo.priority === action.payload);
    },
    sortCategory:(state, action)=>{
      state.todos = state.todosCopy.filter(todo => todo.category === action.payload);
    }
  },
  extraReducers:(builder)=>{
    // get all todos
    builder.addCase(fetchTodos.pending, (state)=>{
      state.loading = true
    });
    builder.addCase(fetchTodos.fulfilled, (state,action)=>{
      state.loading = false;
      state.todos = action.payload;
      state.todosCopy = action.payload;
      state.error = ""
    });
    builder.addCase(fetchTodos.rejected, (state,action)=>{
      state.loading = false;
      state.todos = [];
      state.error = action.payload;
    })

    // get single todo
    // builder.addCase(fetchSingleTodo.pending, (state)=>{
    //   state.loading = true
    // });
    // builder.addCase(fetchSingleTodo.fulfilled, (state,action)=>{
    //   state.loading = false;
    //   state.singleTodo = action.payload.data;
    //   state.error = ""
    // });
    // builder.addCase(fetchSingleTodo.rejected, (state,action)=>{
    //   state.loading = false;
    //   state.singleTodo = {};
    //   state.error = action.payload.response.data;
    // })

    // create todo
    builder.addCase(createTodo.pending, (state)=>{
      state.loading = true
    });
    builder.addCase(createTodo.fulfilled, (state,action)=>{
      state.loading = false;
      state.todos.push(action.payload);
      state.error = ""
    });
    builder.addCase(createTodo.rejected, (state,action)=>{
      state.loading = false;
      state.error = action.payload;
    })


    // edit todo
    builder.addCase(editTodo.pending, (state)=>{
      state.loading = true
    });
    builder.addCase(editTodo.fulfilled, (state,action)=>{
      state.loading = false;
      state.todos = state.todos.map(todo => todo.id === action.payload?.id ? action.payload : todo);
      state.error = ""
    });
    builder.addCase(editTodo.rejected, (state,action)=>{
      state.loading = false;
      state.error = action.payload;
    })


    // delete a todo
    // builder.addCase(deleteTodo.pending, (state)=>{
    //   state.loading = true
    // });
    builder.addCase(deleteTodo.fulfilled, (state,action)=>{
      state.loading = false;
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
      state.error = ""
    });
    builder.addCase(deleteTodo.rejected, (state,action)=>{
      state.loading = false;
      state.error = action.payload;
    })

    builder.addCase(markAsDone.fulfilled, (state,action)=>{
      // state.loading = false;
      state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
      // state.error = ""
    });
    // builder.addCase(markAsDone.rejected, (state,action)=>{
    //   state.loading = false;
    //   state.error = action.payload.response.data;
    // })

    builder.addCase(undoCompleted.fulfilled, (state,action)=>{
      state.todos.push(action.payload);
    })

  }
})


export const {searchToDo, sortPriority, sortCategory } = todoSlice.actions;
export default todoSlice.reducer;