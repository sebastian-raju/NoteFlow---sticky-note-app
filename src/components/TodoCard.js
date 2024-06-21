import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import { fetchSingleTodo } from '../redux/features/todoSlice';
import { getSingleTodoApi } from '../services/allApi';
import { deleteTodo, editTodo, markAsDone } from '../redux/features/todoSlice';
import { toast } from 'sonner';

function TodoCard({todo}) {

  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const {id, title, description, createdAt, priority, category} = todo;

  // const {singleTodo} = useSelector((state)=>state.todoSlice);
  // const [thisTodo, setThisTodo] = useState({});

  const {loading} = useSelector((state)=>state.todoSlice);

  const dispatch = useDispatch(); 

  // useEffect(()=>{
  //   setThisTodo(singleTodo)
  // },[singleTodo]);   

  const [singleTodo, setSingleTodo] = useState({});

  let today = new Date()
  let curDate = today.toDateString();


  const getSingleTodo = async() =>{
    const response = await getSingleTodoApi(id);
    if(response.status>=200 && response.status<300){
      setSingleTodo(response.data);
    }
    else{
      alert(response.response.data);
    }
  }


  const getEditInput = (e) => {
    const {name, value} = e.target;
    setSingleTodo({
      ...singleTodo, [name]:value
    })
  };


  const updateToDo = async() => {
    dispatch(editTodo(singleTodo));
    if(loading === false){
      toast.success("Task edited successfully");
      setIsEditOpen(false);
    }
  }


  return (
    <>
      <div className={`col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 p-3 rounded-lg 
        ${category === "work" ? "bg-red-50" : 
          category === "home" ? "bg-orange-50": "bg-yellow-50"} 
        font-questrial ring-1 ring-slate-700 max-h-[240px] flex flex-col justify-between shadow-lg hover:scale-[1.02] transition-all delay-[30ms]`}>
              <div className='text-[14px] flex items-center justify-between'>
                <div>
                  {createdAt}
                </div>
                <div className='text-[12px] rounded-full h-[30px] w-[30px] ring-1 text-gray-600 ring-slate-700 flex justify-center items-center cursor-pointer hover:text-white hover:bg-black active:rotate-45 transition-all ease delay-[30ms]' 
                onClick={()=>{
                  const updatedTodo = {
                    ...todo, finishedAt:curDate.slice(3,)
                  }
                  dispatch(markAsDone(updatedTodo));
                }}><i className="fa-solid fa-arrow-up-long rotate-45"></i></div>
              </div>
              <div className='cursor-pointer' onClick={()=>{
              //  dispatch(fetchSingleTodo(id));
              getSingleTodo();
               setIsViewOpen(true);
                }}>
                <div className="title text-[24px] mt-[20px] leading-[23px] line-clamp-2 h-[46px]">{title}</div>
                <div className={`priority-text text-[12px]
                  ${priority === "high" ? "bg-red-200" : 
                    priority === "medium" ? "bg-orange-200": "bg-yellow-200"} 
                  py-2 px-3 rounded-full mt-2 w-[60px] flex justify-center items-center`}>{priority}</div>
                <div className="title text-[11px] mt-[5px] line-clamp-2 h-[33px]">
                  {description}
                </div>
              </div>
              <div className='footer mt-[20px] flex justify-between items-center'>
                <div className='flex item-center gap-1'>
                  <div className='category-text text-[11px] tracking-wider p-1'>{category === "work"? <i className="fa-solid fa-briefcase fa-lg"></i> : category
                  === "home"? <i className="fa-solid fa-house fa-lg"></i>  :<i className="fa-solid fa-feather fa-lg"></i> }</div>
                  <div className='text-[10px] flex items-center'>{category}</div>
                </div>
                <div className='flex gap-1 items-center'>
                  <img src="https://i.postimg.cc/RZNTC4dg/edit-icon.png" className='w-[20px] h-[20px] cursor-pointer active:rotate-45 transition-all delay-[50ms]' onClick={()=>{
                    getSingleTodo();
                    setIsEditOpen(true)
                    }} alt="" />
                  <div className='text-[25px] leading-[15px] rotate-45  hover:text-red-900 transition-all ease delay-[50ms] cursor-pointer' onClick={()=>{
                    getSingleTodo();
                    setIsDeleteOpen(true)}}>+</div>
                </div>
               
              </div>
            </div>



            {/* view modal */}
            {isViewOpen && 
            <div className='view-modal absolute transform -translate-x-1/2 -translate-y-1/3 left-1/2 w-[100%] max-w-[500px] z-10'>
              <div className='bg-white font-questrial shadow-2xl p-5 mx-4 rounded-lg ring-1 ring-slate-200'>
                <div className='flex justify-between items-center'>
                  <div className='flex items-center'>
                    {singleTodo?.createdAt}
                  </div>
                  <div className='text-[25px] leading-[15px] rotate-45 cursor-pointer hover:text-red-900 transition-all ease delay-[50ms] self-start' onClick={()=>{
                    // setThisTodo({});
                    setIsViewOpen(false);
                    }}>+</div>
                </div>
                <div className="title mt-[35px] text-[35px] leading-[35px] tracking-tight">{singleTodo?.title}</div>
                <div className={`priority-text text-[12px] ${singleTodo?.priority === "high" ? "bg-red-200" : 
                    singleTodo?.priority === "medium" ? "bg-orange-200": "bg-yellow-200"}  py-2 px-3 rounded-full mt-3 w-[25%] flex justify-center items-center`}>{singleTodo?.priority}</div>
                <div className='mt-[15px] text-[14px] mb-12'>
                {singleTodo?.description}
                </div>
              <div className='footer mt-[20px] flex justify-between items-center'>
                <div className='category-text text-[13px] font-semibold tracking-wider self-end'>{singleTodo?.category === "work"? <i className="fa-solid fa-briefcase fa-lg"></i> : singleTodo?.category
                === "home"? <i className="fa-solid fa-house fa-lg"></i>  :<i className="fa-solid fa-feather fa-lg"></i> }</div>
                <div className=' p-2 bg-green-200 hover:bg-green-300 transition-all delay-[50ms] rounded-lg text-[14px] cursor-pointer ring-slate-800 ring-1'
                onClick={()=>{
                  const updatedTodo = {
                    ...todo, finishedAt:curDate.slice(3,)
                  }
                  setIsViewOpen(false);
                  dispatch(markAsDone(updatedTodo));
                }}>
                    mark as done <i className="fa-solid fa-arrow-up-long rotate-45 text-gray-800 ms-1"></i>
                  </div>
              </div>
              </div>
            </div>}


      {/* edit modal */}
        
      {isEditOpen && 
      <div className='edit-modal absolute transform -translate-x-1/2 -translate-y-1/3 left-1/2 w-[100%] max-w-[500px] z-10'>
              <div className='bg-white font-questrial shadow-2xl p-5 mx-4 rounded-lg ring-1 ring-slate-200'>
                <div className='flex justify-between items-center mb-7'>
                  <div className='text-[19px] leading-[20px] flex justify-center items-center'>Edit Task</div>
                  <div className='text-[25px] leading-[9px] rotate-45 cursor-pointer hover:text-red-900 transition-all ease delay-[50ms]' onClick={()=>{setIsEditOpen(false)}} >+</div>
                </div>
                <div className='input-container flex flex-col gap-3 font-questrial mt-4'>
                  <input type="text" name="title" id="" placeholder='task name' className='p-3 border-2 rounded-lg outline-none' value={singleTodo?.title}  onChange={getEditInput}/>

                  <select id="priority" name='priority' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-3 text-[14px]" value={singleTodo?.priority} onChange={getEditInput}>
                  <option selected>choose a priority..</option>
                  <option value="high">high</option>
                  <option value="medium">medium</option>
                  <option value="low">low</option>
                  </select>

                  <textarea type="text" name="description" id="" rows="3" cols="10"  placeholder='task description' className='p-3 border-2 rounded-lg outline-none' value={singleTodo?.description} onChange={getEditInput}/>
                  
                  <select id="category" name='category' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-3 text-[14px]" value={singleTodo?.category} onChange={getEditInput}>
                  <option selected>choose a category..</option>
                  <option value="work">work</option>
                  <option value="home">home</option>
                  <option value="other">other</option>
                  </select>

                </div>
              <div className='footer mt-[20px] flex justify-end items-center gap-3'>
                <button className='category-text text-[14px]  tracking-wider bg-red-200 hover:bg-red-300 transition-all delay-[50ms] p-3 cursor-pointer  rounded-lg' onClick={()=>
                {    
                  // dispatch(editTodo(singleTodo));
                  // setIsEditOpen(false);
                  updateToDo();
                  
                }}>edit task</button>
                <div className='p-3 bg-slate-100 hover:bg-slate-200 transition-all delay-[50ms] rounded-lg text-[14px] cursor-pointer ' onClick={()=>{setIsEditOpen(false)}}>
                    cancel
                  </div>
              </div>
              </div>
            </div>}


            {/* delete modal */}

            {isDeleteOpen && 
            <div className='delete-modal absolute transform -translate-x-1/2 -translate-y-1/4 left-1/2 w-[100%] max-w-[500px] z-10'>
              <div className='bg-white font-questrial shadow-2xl p-5 mx-4 rounded-lg ring-1 ring-slate-200'>
                <div className='cursor-pointer flex item-center justify-end'>
                  <div className='rotate-45 text-[25px] leading-[15px]' onClick={()=>{setIsDeleteOpen(false)}}>+</div>
                </div>
                <div className='text-center mt-[30px] mb-[40px] text-[17px]'>Do you want to delete this task ?</div>
                <div className='button-container flex item-center gap-3'>
                  <button className='flex-1 p-4 bg-red-200 hover:bg-red-300 transition-all delay-[50ms] text-black text-[14px] rounded-md ring-1 ring-red-200' onClick={()=>{
                    dispatch(deleteTodo(singleTodo?.id));
                    setIsDeleteOpen(false);
                  }}>delete</button>
                  <button className='flex-1 p-4 bg-slate-100 hover:bg-slate-200 transition-all delay-[50ms] text-black text-[14px] rounded-md ring-1 ring-slate-950/10' onClick={()=>{setIsDeleteOpen(false)}}>cancel</button>
                </div>
              </div>
            </div>}
    </>
  )
}

export default TodoCard
