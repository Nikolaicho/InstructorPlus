import { useState } from "react";

function useClassesArray() {
  const [classes, setClasses] = useState<Array<String>>();

  async function formatDates(dates: Promise<any>) {
    let awaitedDates = await dates;
    let arr = new Array(10);
    let min = 0;
    if(awaitedDates.length >= 1){
      min = new Date(awaitedDates[0].date).getHours()
    }
    
    
    for(let i = 0; i<awaitedDates.length;i++){
      let currentHour = new Date(awaitedDates[i].date).getHours()
      if(min > currentHour){
        min = currentHour
      }
    }
      
    
    for (let i = 0; i < awaitedDates.length; i++) {
      let time = awaitedDates[i].date;
      let date = new Date(time);
      let hourOfTheClass = date.getHours() // ex. class starts in 9 o'clock so the hour will be 9
      let minutesOfTheClass = date.getMinutes()
      let numberOfClass = ((hourOfTheClass - min) * 60 + date.getMinutes()) / 50;

      arr[numberOfClass] = `${awaitedDates[i].name} ${hourOfTheClass}:${minutesOfTheClass}`
    }
    for (let i = 0; i < 10; i++) {
      if (arr[i] == undefined) {
        arr[i] = `ЧАС${i + 1}`
      }
    }
    
    setClasses(arr)
  }

  return {classes,formatDates,setClasses};
}
export default useClassesArray;
