import React, { useEffect, useState } from 'react'
import CompletedCard from './CompletedCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCompleted, sortCategory, sortPriority } from '../redux/features/completedSlice';
import './styles/Completed.css'

function Completed() {

  const [isSortingOpen, setIsSortingOpen] = useState(false);
  const [isPriority, setIsPriority] = useState(true);
  const [isCategory, setIsCategory] = useState(false);

  const dispatch = useDispatch();
  const {completedList, loading, error} = useSelector((state)=>state.completedSlice);


  useEffect(()=>{
    dispatch(fetchAllCompleted());
  },[])


  // const btnEList = document.querySelectorAll('.sort-option');

  // btnEList.forEach(btn => {
  //     btn.addEventListener('click', ()=>{
  //     document.querySelector('.bg-slate-800.text-white')?.classList?.remove('bg-slate-800','text-white');
  //     btn.classList.add('bg-slate-800','text-white');
  //   })
  // })


  // button

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
      <div className="col-span-12 mlg:col-span-4 rounded-lg border-2 p-4 min-h-[570px]">
          <div className='title-container flex gap-2 items-center sm:justify-normal justify-between mb-4'>
              <div className='flex items-center gap-2'>
                <div className='text-[17px] font-questrial '>Completed</div>
                <div className='min-h-[10px] min-w-[10px] bg-green-300 rounded-full'></div>
              </div>
              <div className='py-[7px] px-[7px] bg-slate-50 rounded-full ring-1 ring-slate-500 active:rotate-90 transition-all delay-[50ms] cursor-pointer' onClick={()=>{
                dispatch(fetchAllCompleted());
                document.querySelector('.font-semibold.shadow-lg')?.classList?.remove('font-semibold','shadow-lg');
              }}>
                <img src="https://i.postimg.cc/26hsgW3v/pngwing-com-2.png" className='w-[9px] h-[9px]' alt="" />
              </div>
          </div>
        <div className='flex gap-3 mt-[10px] '>
          {isPriority && <div className='flex gap-3'>
            <div className='bg-red-100 option-high rounded-md ring-black ring-1 p-1 px-2 sm:px-3 text-[12px] sm:text-[13px] cursor-pointer ' onClick={()=>{
              dispatch(sortPriority("high"));
              toggleButton('.option-high');
            }}>
              #high
            </div>
            <div className='bg-orange-100 option-medium rounded-md ring-black ring-1 p-1 px-2 sm:px-3 text-[12px] sm:text-[13px] cursor-pointer' onClick={()=>{
              dispatch(sortPriority("medium"));
              toggleButton('.option-medium');
            }}>
              #medium
            </div>
            <div className='bg-yellow-100 option-low rounded-md ring-black ring-1 p-1 px-2 sm:px-3 text-[12px] sm:text-[13px] cursor-pointer' onClick={()=>{
              dispatch(sortPriority("low"));
              toggleButton('.option-low');
            }}>
              #low
            </div>
          </div>}
          {isCategory && <div className='flex gap-3'>
            <div className='bg-red-100 option-work rounded-md ring-black ring-1 p-1 px-2 sm:px-3 text-[12px] sm:text-[13px] cursor-pointer' onClick={()=>{
              dispatch(sortCategory("work"));
              toggleButton('.option-work');
            }}>
            #work
            </div>
            <div className='bg-orange-100 option-home rounded-md ring-black ring-1 p-1 px-2 sm:px-3 text-[12px] sm:text-[13px] cursor-pointer' onClick={()=>{
              dispatch(sortCategory("home"));
              toggleButton('.option-home');
            }}>
            #home
            </div>
            <div className='bg-yellow-100 option-other rounded-md ring-black ring-1 p-1 px-2 sm:px-3 text-[12px] sm:text-[13px] cursor-pointer' onClick={()=>{
              dispatch(sortCategory("other"));
              toggleButton('.option-other');
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

        <div className='grid grid-cols-12 mt-[30px] gap-5 h-[425px] overflow-y-auto no-scrollbar p-2'>
          

        {completedList.length > 0?
          completedList.map(completed => <CompletedCard key={completed.id} completed = {completed}/>)
          :
          <div className='loader flex justify-center items-center col-span-12'></div>
        }

      {/* {loading &&
        <div className='loader flex justify-center items-center col-span-12'></div>
      } */}

        {
          error &&
          <div>{error}</div>
        }
          
        </div>

      </div> 
    </>
  )
}

export default Completed
