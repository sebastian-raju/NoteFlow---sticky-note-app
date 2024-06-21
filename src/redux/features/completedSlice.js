import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createTodoApi, deleteCompletedApi, getAllCompletedApi } from "../../services/allApi";
import { createTodo, fetchTodos, markAsDone } from "./todoSlice";



export const fetchAllCompleted = createAsyncThunk("completed/fetchAllCompleted", async()=>{
  const response  = await getAllCompletedApi();
  return response?.data;
})


export const deleteCompleted = createAsyncThunk("completed/deleteCompleted", async(id, { dispatch })=>{
  const response = await deleteCompletedApi(id);
  dispatch(fetchAllCompleted());
  return id;
})

export const undoCompleted = createAsyncThunk("completed/undoCompleted", async(completed, { dispatch })=>{
  const { id, finishedAt, ...rest } = completed;
  await createTodoApi(rest);
  await deleteCompletedApi(completed.id);
  dispatch(fetchAllCompleted());
  dispatch(fetchTodos());
  return completed;
})



const initialState = {
  loading : false,
  completedList: [],
  completedListCopy: [],
  error : ""
}


const completedSlice = createSlice({
  name:"completed",
  initialState,
  reducers:{
    sortPriority:(state, action)=>{
      state.completedList = state.completedListCopy.filter(todo => todo.priority === action.payload);
    },
    sortCategory:(state, action)=>{
      state.completedList = state.completedListCopy.filter(todo => todo.category === action.payload);
    }
  },
  extraReducers:(builder)=>{
    builder.addCase(fetchAllCompleted.pending, (state)=>{
      state.loading = true;
    })
    builder.addCase(fetchAllCompleted.fulfilled, (state,action)=>{
      state.loading = false;
      state.completedList = action.payload;
      state.completedListCopy = action.payload;
    })
    builder.addCase(fetchAllCompleted.rejected, (state,action)=>{
      state.loading = false;
      state.completedList = [];
      state.error = action.payload;
    })
    builder.addCase(markAsDone.fulfilled, (state,action)=>{
      state.completedList.push(action.payload);
    })
    
    builder.addCase(deleteCompleted.fulfilled, (state,action)=>{
      state.completedList = state.completedList.filter(completed => completed.id !== action.payload);
    })
  }
})


export const {sortPriority, sortCategory} = completedSlice.actions;
export default completedSlice.reducer;