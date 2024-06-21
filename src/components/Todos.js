import React, { useEffect, useState } from 'react'
import TodoCard from './TodoCard';
import { useDispatch, useSelector } from 'react-redux';
import { createTodo, fetchTodos, sortCategory, sortPriority } from '../redux/features/todoSlice';
import { toast } from 'sonner';
import './styles/Todos.css'

function Todos() {

  const [isSortingOpen, setIsSortingOpen] = useState(false);
  const [isPriority, setIsPriority] = useState(true);
  const [isCategory, setIsCategory] = useState(false);

  const [isAddOpen, setIsAddOpen] = useState(false);

  const dispatch = useDispatch(); 
  const {todos, loading, error} =useSelector((state)=> state.todoSlice);
  
  let today = new Date()
  let curDate = today.toDateString();


  const [userInput, setInput] = useState({
    title:"",
    description:"",
    priority:"",
    category:"",
    createdAt:curDate.slice(3,),
  })


  useEffect(()=>{
    dispatch(fetchTodos());
  },[])

  const getUserInput = (e) =>{
    const {name, value} = e.target;
    setInput({
      ...userInput, [name]:value
    })
  }

  
  const addToDo = async() => {
    const {title, description, category, priority } = userInput;
    if(!title || !description || !category || !priority ){
      return toast.error('please fill all the fields');
    }
    dispatch(createTodo(userInput));
    if(loading === false){
      toast.success("Task added successfully");
      setIsAddOpen(false)
      setInput({
        title:"",
        description:"",
        priority:"",
        category:"",
        createdAt:curDate.slice(3,),
      })
    }
  }


  // button

  // const btnList = document.querySelectorAll('.sort-options');

  // btnList.forEach(btn => {
  //     btn.addEventListener('click', ()=>{
  //     document.querySelector('.bg-slate-800.text-white')?.classList?.remove('bg-slate-800','text-white');
  //     btn.classList.add('bg-slate-800','text-white');
  //   })
  // })


  const toggleButton = (selector) => {
    const button = document.querySelector(selector);
    if (!button?.classList?.contains('font-semibold','shadow-lg')) {
  
      turnOffPreviousButton();
  
      button?.classList?.add('font-semibold','shadow-lg');
    } else {
      button?.classList?.remove('font-semibold','shadow-lg');
    }
  }

  const turnOffPreviousButton = () => {
    const previousButton = document.querySelector('.font-semibold.shadow-lg');
    if (previousButton) {
      previousButton?.classList?.remove('font-semibold','shadow-lg');
    }
  }
  

  return (
    <>
      <div className="col-span-12 mlg:col-span-8 rounded-lg border-2 p-4 h-[570px]">
          <div className='title-container flex gap-2 items-center sm:justify-normal justify-between mb-4'>
            <div className='flex items-center gap-2'>
            {/* <img src="https://i.postimg.cc/26hsgW3v/pngwing-com-2.png" className='w-[14px] h-[15px]' alt="" /> */}
              <div className='text-[17px] font-questrial'>Tasks</div>
              <div className='min-h-[10px] min-w-[10px] bg-orange-300 rounded-full'></div>
            </div>
            <div className='flex items-center gap-3'>
              <div className='py-[4px] px-[5.5px] rounded-full bg-slate-50 ring-1 ring-slate-500 text-[11px] leading-[12px] active:rotate-90 transition-all delay-[50ms] cursor-pointer' onClick={()=>{setIsAddOpen(true)}}><i className="fa-solid fa-plus"></i></div>
              <div className='py-[6px] px-[6px] bg-slate-50 rounded-full ring-1 ring-slate-500 active:rotate-90 transition-all delay-[50ms] cursor-pointer' 
                onClick={()=>{
                  dispatch(fetchTodos())
                  document.querySelector('.font-semibold.shadow-lg')?.classList?.remove('font-semibold','shadow-lg');
                }}>
                <img src="https://i.postimg.cc/26hsgW3v/pngwing-com-2.png" className='w-[9px] h-[9px]' alt="" />
              </div>
            </div>
          </div>
        <div className='flex gap-3 mt-[10px] '>
          {isPriority && <div className='flex gap-3'>
            <div className='bg-red-100 sort-option-high rounded-md ring-black ring-1 p-1 px-2 sm:px-3 text-[12px] sm:text-[13px] cursor-pointer ' onClick={()=>{
              dispatch(sortPriority("high"));
              toggleButton(".sort-option-high");
              }}>
              #high
            </div>
            <div className='bg-orange-100 sort-option-medium rounded-md ring-black ring-1 p-1 px-2 sm:px-3 text-[12px] sm:text-[13px] cursor-pointer ' onClick={()=>{
              dispatch(sortPriority("medium"))
              toggleButton(".sort-option-medium");
            }}>
              #medium
            </div>
            <div className='bg-yellow-100 sort-option-low rounded-md ring-black ring-1 p-1 px-2 sm:px-3 text-[12px] sm:text-[13px] cursor-pointer ' onClick={()=>{
              dispatch(sortPriority("low"));
              toggleButton(".sort-option-low");
              }}>
              #low
            </div>
          </div>}
          {isCategory && <div className='flex gap-3'>
            <div className='bg-red-100 sort-option-work rounded-md ring-black ring-1 p-1 px-2 sm:px-3 text-[12px] sm:text-[13px] cursor-pointer ' onClick={()=>{
              dispatch(sortCategory("work"));
              toggleButton(".sort-option-work");
              }}>
            #work
            </div>
            <div className='bg-orange-100 sort-option-home rounded-md ring-black ring-1 p-1 px-2 sm:px-3 text-[12px] sm:text-[13px] cursor-pointer  ' onClick={()=>{
              dispatch(sortCategory("home"));
              toggleButton(".sort-option-home");
              }}>
            #home
            </div>
            <div className='bg-yellow-100 sort-option-other rounded-md ring-black ring-1 p-1 px-2 sm:px-3 text-[12px] sm:text-[13px] cursor-pointer ' onClick={()=>{
              dispatch(sortCategory("other"));
              toggleButton(".sort-option-other");
              }}>
              #other
            </div>
          </div>}
          <div className='relative'>
            <img src="https://i.postimg.cc/59wPsVPr/free-category-icon-872-thumb.png" className='w-[30px] h-[30px] cursor-pointer' alt="" onClick={()=>{
              setIsSortingOpen(!isSortingOpen);
            }} />
            {isSortingOpen && 
            <div className='flex flex-col p-1 absolute top-10 left-[-60px] sm:top-8 sm:left-2 bg-white shadow-xl ring-1 ring-slate-200 rounded-lg z-10'>
              <div className='rounded-md hover:bg-slate-200 py-2 px-4 text-[14px] cursor-pointer transition-all delay-0' onClick={()=>{
                setIsPriority(true);
                setIsCategory(false);
                setIsSortingOpen(false);
                
              }} >priority</div>
              <div className='rounded-md hover:bg-slate-200 py-2 px-4 text-[14px] cursor-pointer transition-all delay-0' onClick={()=>{
                setIsCategory(true);
                setIsPriority(false);
                setIsSortingOpen(false);
              }}>category</div>
            </div>}
          </div>
        </div>

        {/* MAIN-TASKS-SECTION */}

        <div className='grid grid-cols-12 mt-[30px] gap-5 sm:gap-6 h-[420px] overflow-y-auto py-2 px-2 no-scrollbar'>
          
      {todos.length > 0 ?
        todos.map(todo => <TodoCard key={todo.id} todo = {todo}/>)
          :
        <div className='loader flex justify-center items-center col-span-12'></div>
      }

      {/* {loading &&
        <div className='loader flex justify-center items-center col-span-12'></div>
      } */}

       {/* <div className='loader flex justify-center items-center col-span-12'></div> */}

      {
        error &&
        <div>{error}</div>
      }


        </div>
      </div>
      
      {/* add modal */}
        
      {isAddOpen && 
      <div className='add-modal absolute transform -translate-x-1/2 -translate-y-1/5 left-1/2 w-[100%] max-w-[500px]'>
              <div className='bg-white font-questrial shadow-2xl p-5 mx-4 rounded-lg ring-1 ring-slate-200'>
                <div className='flex justify-between items-center mb-7'>
                  <div className='text-[19px] leading-[20px] flex justify-center items-center'>Add Task</div>
                  <div className='text-[25px] leading-[9px] rotate-45 cursor-pointer hover:text-red-900 transition-all ease delay-[50ms]' onClick={()=>
                    {
                      setIsAddOpen(false)
                      setInput({
                        title:"",
                        description:"",
                        priority:"",
                        category:"",
                        createdAt:curDate.slice(3,),
                      })
                    }
                  } >+</div>
                </div>
                <div className='input-container flex flex-col gap-3 font-questrial mt-4'>
                  <input type="text" name="title" id="" placeholder='task name' className='p-3 border-2 rounded-lg outline-none' onChange={getUserInput} />

                  <select id="priority" name='priority' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-3 text-[14px]" onChange={getUserInput} >
                  <option selected>choose a priority..</option>
                  <option value="high">high</option>
                  <option value="medium">medium</option>
                  <option value="low">low</option>
                  </select>

                  <textarea type="text" name="description" id="" rows="3" cols="10"  placeholder='task description' className='p-3 border-2 rounded-lg outline-none' onChange={getUserInput}/>
                  
                  <select id="category" name='category' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-3 text-[14px]" onChange={getUserInput} >
                  <option selected>choose a category..</option>
                  <option value="work">work</option>
                  <option value="home">home</option>
                  <option value="other">other</option>
                  </select>

                </div>
              <div className='footer mt-[20px] flex justify-end items-center gap-3'>
                <button className='category-text text-[14px]  tracking-wider bg-green-200 p-3 cursor-pointer  rounded-lg hover:bg-green-300 transition-all delay-[50ms]' onClick={addToDo}>add task</button>
                <div className='p-3 bg-slate-100 rounded-lg text-[14px] cursor-pointer hover:bg-slate-200 transition-all delay-[50ms]' onClick={()=>
                {
                  setIsAddOpen(false)
                  setInput({
                    title:"",
                    description:"",
                    priority:"",
                    category:"",
                    createdAt:curDate.slice(3,),
                  })
                }
                  }>
                    cancel
                  </div>
              </div>
              </div>
            </div>}
    </>
  )
}

export default Todos
