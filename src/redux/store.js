import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./features/todoSlice";
import completedSlice from "./features/completedSlice";



const store = configureStore({
  reducer:{
    todoSlice,
    completedSlice
  }
});


export default store;