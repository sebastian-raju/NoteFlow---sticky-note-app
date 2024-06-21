import React, { useEffect, useState } from 'react'
import Todos from '../components/Todos';
import Completed from '../components/Completed';
import { useDispatch } from 'react-redux';
import { searchToDo } from '../redux/features/todoSlice';
import { Toaster } from 'sonner';

function Home() {

  let today = new Date()
  let curHr = today.getHours()
  let curDate = today.toDateString();

  // console.log(curDate.slice(3,));

  const [wish, setWish] = useState("");
  const [dateToday, setDateToday] = useState(curDate);

  const dispatch = useDispatch();
  

  useEffect(()=>{
    if (curHr < 12 && curHr >= 5) {
      setWish("Good Morning")
    } else if (curHr < 18 && curHr >= 12) {
      setWish("Good Afternoon")
    } else if( curHr >= 18 && curHr < 19) {
      setWish("Good Evening")
    }
    else{
      setWish("Good Night")
    }
  },[]);

  

  return (
    <>
      <div className="heading-container flex justify-between items-center gap-4 px-[28px] mt-[18px] sm:px-[50px] sm:mt-[30px] font-questrial">
        <div className='inp-container flex-1'>
          <div className="flex items-center w-[100%] max-w-[400px] gap-0 sm:gap-1">
            <img src="https://i.postimg.cc/Xvck02Bv/search-icon.png" className='w-[28px] h-[28px]' alt="" />
            <input type="text" placeholder='Search tasks...' name="" id="" className=' p-3 w-[100%] outline-none' onChange={(e)=>{
              dispatch(searchToDo(e.target.value));
            }} />
          </div>
        </div>
        <div className='flex gap-5 items-center'>
          <div className="text-gray-500 bg-slate-50 py-2 px-3 rounded-xl hidden sm:block">Welcome back <span className='text-black ms-1'>Seb</span></div>
          <img src="https://i.postimg.cc/TPj7dVHt/9147776d7dde331dcf28c8427e853e92-removebg-preview.png" className='w-[30px] h-[30px]' alt="" />
          <img src="https://i.postimg.cc/6qPZkfFj/favpng-google-account-icon-design-login.png" className='w-[25px] h-[25px]' alt="" />
        </div>
      </div> 

      <div className="hero-container text-slate-900 mt-[30px] font-barlow tracking-tight text-[50px] leading-[55px] sm:text-[60px] sm:leading-[50px] px-[28px] sm:px-[50px]">
        {wish}
      </div>
      <div className="date-time mt-[7px] px-[28px] sm:px-[50px] track-tight">{dateToday}</div>

    <div className="main-section-container px-[28px] sm:px-[50px] mt-[40px] grid grid-cols-12 gap-5 sm:gap-7 mb-[50px]">
     
      <Todos/>
      
      
      <Completed/>

    </div>
    <Toaster richColors position='bottom-center' />
    </>
  )
}

export default Home


