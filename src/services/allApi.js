import { BASE_URL } from "./baseUrl"
import commonRequest from "./commonRequest"


// get all todos
export const getAllTodosApi = async() => {
  return await commonRequest("GET", `${BASE_URL}/todos`, {});
}

// get a single todos
export const getSingleTodoApi = async(id) => {
  return await commonRequest("GET", `${BASE_URL}/todos/${id}`, {});
}

// create a todo
export const createTodoApi = async(data) => {
  return await commonRequest("POST", `${BASE_URL}/todos`, data);
}

// edit a todo
export const editTodoApi = async(id,data) => {
  return await commonRequest("PUT", `${BASE_URL}/todos/${id}`, data);
}

// delete a todo
export const deleteTodoApi = async(id) => {
  return await commonRequest("DELETE", `${BASE_URL}/todos/${id}`, {});
}



// completed section


// get all completed
export const getAllCompletedApi = async() => {
  return await commonRequest("GET", `${BASE_URL}/completed`, {});
}

// single completed
export const getSingleCompletedApi = async(id) => {
  return await commonRequest("GET", `${BASE_URL}/completed/${id}`, {});
}

// add a completed task
export const addCompletedApi = async(data) => {
  return await commonRequest("POST", `${BASE_URL}/completed`, data);
}

// delete a completed task
export const deleteCompletedApi = async(id) => {
  return await commonRequest("DELETE", `${BASE_URL}/completed/${id}`, {});
}
