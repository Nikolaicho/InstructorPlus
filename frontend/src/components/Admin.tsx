import {useEffect, useState } from "react";
import NavBar from "./NavBar";
import useIsAdmin from "../hooks/Admin/useIsAdmin";
import { Calendar } from "@nextui-org/react";
import useCandidates from "../hooks/Admin/useCandidates";
import useClass from "../hooks/Admin/useClass";
import useTodayDate from "../hooks/Admin/useTodayDate";
import { parseDate } from "@internationalized/date";
import useClassesArray from "../hooks/Admin/useClassesArray";
import useTodayClasses from "../hooks/Admin/useTodayClasses";
import useSearchCandidate from "../hooks/Admin/useSearchCandidates";
import { Candidate } from "../interfaces/candidate.interface";
import useGetTimeLeft from "../hooks/Admin/useGetTimeLeft"; 

function Admin() {
  const { isAdmin } = useIsAdmin();
  const { availableCandidates } = useCandidates();
  
  //импорт за функциите които следят останалото работно време
  const {getTimeLeft,workingTime} = useGetTimeLeft();

  //дава селектираната дата и функция за записване на час
  const { setSelectedDate, selectedDate, signNewClass } = useClass();

  //iso формат за да може да се слага дефоут днешна дата на календара
  const dateString = useTodayDate();

  //намира всички часове за определена дата
  const { getClasses } = useTodayClasses();

  // отговаря за визуализирането на часовете и менюто за курсисти
  const {classes,formatDates,setClasses} = useClassesArray();

  const [refresh, setRefresh] = useState(0);
  const [error, setError] = useState<string>();

  //използва се за събиране на стойностите кога да започва часа, който в момента се въвежда
  const [hours,setHours] = useState(0); //TODO проверявай дали дават час или някаква простотия
  const [minutes,setMinutes] = useState(0);
  const [longHour,setLongHour] = useState("50")

  //стейт за търсачка
  const [name,setName] = useState("")

  //стейт за името на избрания за час курсист
  const [candidate,setCandidate] = useState("");

  //импортва функцията,която търси кандидатите, самите кандидати и дали е заредило
  const {searchCandidates,candidates,isCandidatesLoaded} = useSearchCandidate()

  const [isSearchVisible,setIsSearchVisible] = useState(false)
  useEffect(() => {
    async function awaitFunction() {
      await formatDates(getClasses(selectedDate));
    }
    awaitFunction()
    
  },[selectedDate]);

  useEffect(()=>{
    setClasses(classes);
  },[refresh])

  
  return (
    <>
      {(
        <>
          <NavBar />
          {workingTime}
          <div className="text-red-600">{error}</div>
          <div className="container">
            <div style={{padding:"100px"}}>
              <Calendar 
                aria-label="Date (Controlled)"
                defaultValue={parseDate(dateString)}
                minValue={parseDate(dateString)}
                onChange={(e) => {
                  let date = new Date(e.year, e.month-1, e.day, 0);
                  setSelectedDate(date);
                  getTimeLeft(date.getTime().toString());
                }}
              />
            </div>
          </div>

            <div onClick={()=>{
                  setIsSearchVisible((prev) => {
                    const newValue = !prev;
                    return newValue;
                  })
                }}>
                  pokaji
            </div>

                <div
                  className={isSearchVisible ? "pop-up absolute top-80 bg-blue-700 p-20" : "hidden"}
                >
                  <div className="flex mb-4">

                  
                  Kandidat
                  <input onChange={(e)=>{
                    setName(e.target.value)
                  }}></input>
                  
                  <div className = "ml-10">
                    продължителност
                    <select   onChange={(e)=>{
                      setLongHour(e.target.value)
                    }}>
                    <option value = "50">50 min</option>
                    <option value = "100">100 min</option>
                  </select>
                  </div>

                  <button className = "ml-10 border border-black border-1" onClick = {()=>{
                    searchCandidates(name)
                  }}>търси</button>
              </div>
                  
                  {isCandidatesLoaded ? 
                    <div className="p-4 overflow-auto h-20">
                    {candidates?.map((candidate:Candidate,key:number)=>(
                      <div className="flex">
                      <div>{candidate.firstName} {candidate.surname} {candidate.lastName}</div>
                      <div className = "ml-4 border border-black" onClick={()=>{
                        setCandidate(candidate._id)
                      }}>Избери</div>
                      </div>
                    ))} 
                    </div>
                    :<></>}
                  <div className="flex">
                    
                  <div>
                    <div>Час</div>
                    <input className="w-20 m-4" onChange={(e)=>{
                      
                      setHours(parseInt(e.target.value))
                    }}></input>
                    
                    </div>
                  <div>
 
                  <div>Минути</div>
                  <input className="w-20 m-4" onChange={(e)=>{
                      setMinutes(parseInt(e.target.value))
                    }}></input>
                  </div>
                  
                </div>
                <div className = "border-1 border-black"onClick={()=>{
                  signNewClass(
                    candidate,
                    selectedDate, 
                    hours,
                    minutes,
                    longHour
                  );
                }}>Запиши</div>
                </div>
        </>
      ) }
    </>
  );
}

export default Admin;
