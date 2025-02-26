import {useEffect, useState } from "react";
import NavBar from "./NavBar";
import useIsAdmin from "../hooks/Admin/useIsAdmin";
import { Calendar} from "@nextui-org/react";
import useClass from "../hooks/Admin/useClass";
import useTodayDate from "../hooks/Admin/useTodayDate";
import { parseDate } from "@internationalized/date";
import useTodayClasses from "../hooks/Admin/useTodayClasses";
import useSearchCandidate from "../hooks/Admin/useSearchCandidates";
import { Candidate } from "../interfaces/candidate.interface";
import useGetTimeLeft from "../hooks/Admin/useGetTimeLeft"; 
import SideBar from "./SideBar";
import DeleteIcon from '@mui/icons-material/Delete';
import useDeleteClass from "../hooks/Admin/useDeleteClass";
import {TimeInput} from "@heroui/react";

function Admin() {
  const { isAdmin } = useIsAdmin();
  
  //дава селектираната дата и функция за записване на час
  const { setSelectedDate, selectedDate, signNewClass } = useClass();

  //iso формат за да може да се слага дефоут днешна дата на календара
  const dateString = useTodayDate();

  //импорт за функциите които следят останалото работно време
  const {getTimeLeft,workingTime} = useGetTimeLeft();

  //стейт за търсачка
  const [name,setName] = useState("")

  //стейт за името на избрания за час курсист
  const [candidate,setCandidate] = useState("");

  //импортва функцията,която търси кандидатите, самите кандидати и дали е заредило
  const {searchCandidates,candidates} = useSearchCandidate()

  //показва панела за записване на час
  const [isSearchVisible,setIsSearchVisible] = useState(false)

  //показва дали бутона за 100 минути или 50 минути е активен
  const [fiftyMinutesActive,setFiftyMinutesActive] = useState<number>(2)

  //време за часа
  const [hours,setHours] = useState<number|undefined>(0)
  const [minutes,setMinutes] = useState<number|undefined>(0)

  //стейт за часовете
  const [classes,setClasses] = useState<any>()

  //намира всички часове за определена дата
  const { getClasses } = useTodayClasses();

  //изтрива часовете
  const {deleteClass} = useDeleteClass();

  const [createdClasses,setCreatedClasses] = useState<number>(0)
  
  const [screenWidth,setScreenWidth] = useState(window.innerWidth);

  useEffect(()=>{
    async function awaitFunction() {
      setClasses(await getClasses(new Date(dateString))) 
    }
    awaitFunction()
  },[])

  useEffect(()=>{
    async function awaitFunction() {
      const delay = (ms:number) => new Promise(resolve => setTimeout(resolve, ms));
      await delay(1000)
      setClasses(await getClasses(selectedDate)) 
    }
    awaitFunction()
  },[createdClasses])

  useEffect(()=>{
    // дава оставащото работно време на днешния ден
    // (когато заредиш за първи път страницата показваше 0 и трябваше да цъкнеш на дата от календара за да се оправи)
    getTimeLeft(dateString)
  },[])

  return(<>
  { isAdmin ? <div>
    <NavBar/>
    
  <div className="flex">
    <SideBar/>
    <div className = "mt-10 ml-10 flex w-full justify-around">
      <div className = "scale-[1.5] h-[0px] absolute left-[0px] ml-4 bg-black relative left-[0]">
        <Calendar   
        style={{ transformOrigin: 'top left' }} 
        aria-label="Date (Controlled)"
        defaultValue={parseDate(dateString)}
        minValue={parseDate(dateString)}
        onChange={(e) => {
          let date = new Date(e.year, e.month-1, e.day, 0);
          setSelectedDate(date);
          getTimeLeft(date.getTime().toString());

          async function awaitFunction(){
            setClasses(await getClasses(date))
          } 
          awaitFunction()
        }}
        />
      </div>
      

      <div className = "w-[30%] h-[50vh] bg-gray-300 font-bold scale-[1] rounded-lg border-2 border-black">

        <div className = " text-center flex items-center border-b border-black ">
          
          <div className = "text-2xl mx-auto text-center">{
          selectedDate.toLocaleDateString('bg-BG',{ day: 'numeric', month: 'long' })}</div> 
          <div className = "text-sm mt-2 ">{workingTime}</div>
        </div>

        {classes ? classes.map((classItem:any,index:number)=>(
          <div className = "bg-sky-600 w-full items-center h-[50px] border-b border-black flex">
            <div className = "ml-2">{classItem.firstName} {classItem.lastName}</div>
            <div className = "ml-6">{classItem.start}-{classItem.end}</div>
            <DeleteIcon onClick={()=>{
              const temp = [...classes]
              temp.splice(index,1)
              setClasses(temp)
              deleteClass(classItem.class_id)
            }} sx={{marginLeft:"auto"}}/>
          </div>
        )) :<></>}
        

        <div className = "bg-green-500 w-full  h-[50px] border-b border-black flex justify-center items-center">
          <div
          onClick={()=>{
            setIsSearchVisible((prev) => {
            const newValue = !prev;
            return newValue;
          })
          }}>
          Създай нов час
          </div>
        </div>
      </div>
    </div>
    <div className =  {isSearchVisible ? "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-400 w-[600px] h-[600px] rounded-lg border-black border-2" : "hidden"}>
      <div></div>
      <div>
        <div className = "mt-2 flex justify-around items-center">
          <input className = "w-[50%] h-[30px] rounded-sm" placeholder = "Потърси кандидат" 
          onChange={(e)=>{
            setName(e.target.value)
          }}/>

        <div className = "bg-sky-500 rounded-lg w-[25%] text-center h-[30px] border-black border-2 font-semibold" 
          onClick = {()=>{
            searchCandidates(name)}}
          >Търси</div>
      
        </div>

        <div className = "mt-4 ml-4 flex justify-around items-center">

          <div className = "w-[150px] border-black border-2 rounded-xl">
            <TimeInput label="Event Time" onChange = {(e)=>{
              setHours(e?.hour)
              setMinutes(e?.minute)
            }}/>
          </div>

          <div className = "flex">
            <div className = {fiftyMinutesActive == 1 ? "border-black border-2 rounded-xl bg-sky px-4 h-[40px] flex items-center mr-4 bg-sky-500" :"border-black border-2 rounded-xl bg-sky px-4 h-[40px] flex items-center mr-4 bg-white"} 
            onClick = {()=>{
              setFiftyMinutesActive(1)
            }}>50 мин</div>
            <div className = {fiftyMinutesActive == 0 ? "border-black border-2 rounded-xl bg-sky px-4 h-[40px] flex items-center mr-4 bg-sky-500" :"border-black border-2 rounded-xl bg-sky px-4 h-[40px] flex items-center mr-4 bg-white"} 
            onClick = {()=>{
              setFiftyMinutesActive(0)
            }}>100 мин</div>
          </div>
        
          <div className = "border-black border-2 rounded-xl bg-sky px-4 h-[40px] flex items-center mr-4 bg-sky-500 font-semibold" 
          onClick = {()=>{
            let longHour ; 
            {fiftyMinutesActive ? longHour = "50": longHour = "100"}
            signNewClass(
              candidate,
              selectedDate, 
              hours,
              minutes,
              longHour
            );
            setCreatedClasses(createdClasses+1)
          }}>
            Запиши</div>
        </div>

        <div>
          {candidates?.map((candidate:Candidate,key:number)=>(
            <div>
              {candidates ? 
                <div className = "flex justify-around my-2">
                  <div>{candidate.firstName} {candidate.surname} {candidate.lastName}</div>
                  <div className = "border-black border-2 bg-sky-500 px-4 font-semibold" 
                  onClick={()=>{
                    
                    setCandidate(candidate._id)
                  }}>Избери</div>
                </div> 
              : 
              <></>}
            </div>
          ))}             
        </div>

      </div>
    </div>
  </div></div>:<></>}
  </>)
}

export default Admin;

/*

*/