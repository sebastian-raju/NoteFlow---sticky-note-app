import React, { useState } from 'react'
import { getSingleCompletedApi } from '../services/allApi';
import { useDispatch } from 'react-redux';
import { deleteCompleted, undoCompleted } from '../redux/features/completedSlice';

function CompletedCard({completed}) {

  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [singleCompleted, setSingleCompleted] = useState({});

  const dispatch = useDispatch();

  const {id, title, description, createdAt, priority, category, finishedAt} = completed;


  const getSingleCompleted = async() =>{
    const response = await getSingleCompletedApi(id);
    if(response.status>=200 && response.status < 300){
      setSingleCompleted(response?.data);
      setIsViewOpen(true)
    }

  }




  return (
    <>
      <div className={`col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-6 p-3 rounded-lg ${category === "work" ? "bg-red-50" : 
          category === "home" ? "bg-orange-50": "bg-yellow-50"}  font-questrial ring-1 ring-slate-700 max-h-[240px] cursor-pointer flex flex-col justify-between shadow-lg hover:scale-[1.02] transition-all delay-[30ms]`}>
            <div className='text-[14px] flex items-center justify-between'>
              <div className='flex flex-col'>
                <div className='text-[9px]'>completed on:</div>
                <div className='text-[14px] leading-[14px]'>
                  {finishedAt}
                </div>
              </div>
              <button className='text-[12px] rounded-full h-[30px] w-[30px] ring-1 text-black bg-green-200 ring-slate-700 flex justify-center items-center cursor-pointer hover:bg-red-900 transition-all ease-in delay-[20ms] group' 
              onClick={()=>{
                dispatch(undoCompleted(completed));
              }}>
                <i className="fa-solid fa-check block group-hover:hidden transition-all ease delay-[20ms]"></i>
                <i className="fa-solid fa-window-minimize hidden text-white group-hover:block transition-all ease-in delay-[70ms] self-center w-[100%] h-[70%]"></i>
              </button>
            </div>
            <div onClick={()=>{getSingleCompleted()}}>
              <div className="title text-[24px] mt-[20px] leading-[23px] line-clamp-2 h-[46px]">{title}</div>
              <div className={`priority-text text-[12px]  ${priority === "high" ? "bg-red-200" : 
                    priority === "medium" ? "bg-orange-200": "bg-yellow-200"} py-2 px-3 rounded-full mt-2 w-[60px] flex justify-center items-center`}>{priority}</div>
              <div className="title text-[11px] mt-[5px] line-clamp-2 h-[33px]">
                {description}
              </div>
            </div>
            <div className='footer mt-[20px] flex justify-between items-center'>
              <div className='category-text text-[13px] font-semibold tracking-wider'>{category === "work"? <i className="fa-solid fa-briefcase"></i> : category
                === "home"? <i className="fa-solid fa-house"></i>  :<i className="fa-solid fa-feather"></i> }</div>
              <div className='text-[25px] leading-[25px] rotate-45 hover:text-red-900 transition-all ease delay-[50ms]' onClick={()=>{{setIsDeleteOpen(true)}}}>+</div>
            </div>
          </div>


           {/* view modal */}
           {isViewOpen && 
            <div className='view-modal absolute transform -translate-x-1/2 -translate-y-1/3 left-1/2 w-[100%] max-w-[500px]'>
              <div className='bg-white font-questrial shadow-2xl p-5 mx-4 rounded-lg ring-1 ring-slate-200'>
                <div className='flex justify-between items-center'>
                <div className='flex flex-col'>
                  <div className='text-[10px]'>completed on:</div>
                    <div className='flex items-center'>
                      {singleCompleted?.finishedAt}
                    </div>
                </div>
                  <div className='text-[25px] leading-[15px] rotate-45 cursor-pointer hover:text-red-900 transition-all ease delay-[50ms] self-start' onClick={()=>{setIsViewOpen(false)}}>+</div>
                </div>
                <div className="title mt-[35px] text-[35px] leading-[35px] tracking-tight">{singleCompleted?.title}</div>
                <div className={`priority-text text-[12px] ${singleCompleted?.priority === "high" ? "bg-red-200" : 
                    singleCompleted?.priority === "medium" ? "bg-orange-200": "bg-yellow-200"} py-2 px-3 rounded-full mt-3 w-[25%] flex justify-center items-center`}>{singleCompleted?.priority}</div>
                <div className='mt-[15px] text-[14px] mb-12'>
                {singleCompleted?.description}
                </div>
              <div className='footer mt-[20px] flex justify-between items-center'>
                <div className='category-text text-[13px] font-semibold tracking-wider self-end'>{singleCompleted?.category === "work"? <i className="fa-solid fa-briefcase fa-lg"></i> : singleCompleted?.category
                === "home"? <i className="fa-solid fa-house fa-lg"></i>  :<i className="fa-solid fa-feather fa-lg"></i> }</div>
                <div className='p-2 bg-red-200 hover:bg-red-300 transition-all delay-[50ms] rounded-lg text-[14px] cursor-pointer ring-slate-800 ring-1' 
                onClick={()=>{
                  dispatch(undoCompleted(completed));
                  {setIsViewOpen(false)};
                }}>
                    undo completed <i className="fa-solid fa-arrow-up-long rotate-45 text-gray-800 ms-1"></i>
                  </div>
              </div>
              </div>
            </div>}


          {/* delete modal */}

          {isDeleteOpen && 
            <div className='delete-modal absolute transform -translate-x-1/2 -translate-y-1/4 left-1/2 w-[100%] max-w-[500px]'>
              <div className='bg-white font-questrial shadow-2xl p-5 mx-4 rounded-lg ring-1 ring-slate-200'>
                <div className='cursor-pointer flex item-center justify-end'>
                  <div className='rotate-45 text-[25px] leading-[15px]' onClick={()=>{setIsDeleteOpen(false)}}>+</div>
                </div>
                <div className='text-center mt-[30px] mb-[40px] text-[17px] flex justify-center'>
                  <div className='w-[200px]'>
                    This task is completed !!
                    Do you want to delete this task ?
                  </div>
                  </div>
                <div className='button-container flex item-center gap-3'>
                  <button className='flex-1 p-4 bg-red-200 hover:bg-red-300 transition-all delay-[50ms] text-black text-[14px] rounded-md ring-1 ring-red-200' onClick={()=>{
                    dispatch(deleteCompleted(id));
                    setIsDeleteOpen(false);
                  }}>delete</button>
                  <button className='flex-1 p-4 bg-slate-100 hover:bg-slate-200 transition-all delay-[50ms] text-black text-[14px] rounded-md ring-1 ring-slate-950/10' onClick={()=>{setIsDeleteOpen(false)}}>cancel</button>
                </div>
              </div>
            </div>}
    </>
  )
}

export default CompletedCard
