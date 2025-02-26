import { useState, useEffect} from "react";
import useSendRequestToJoin from "../hooks/ChooseCorporation/useSendRequestToJoin";
import SearchIcon from '@mui/icons-material/Search';
import { TextField } from "@mui/material";
import {socket} from '../socket'
import { useNavigate } from "react-router-dom";

function ChooseCorporation (){
    const [results,setResults] = useState<any>([])
    const [chosenCorp,setChosenCorp] = useState<number>()
    const {sendRequestToJoin} = useSendRequestToJoin();
    const navigate = useNavigate()
    useEffect(() => {

        socket.on("results",(result) => {
            setChosenCorp(undefined)
            setResults(result)
        })

        return () => {
            socket.off("event");
            socket.off("connect");
            socket.close();
        }
    }, []);

    return(<>
        <div className = "bg-sky-600 h-screen w-screen flex justify-center font-bold">
            <div className = "w-[1000px]">
                <div className = "text-center pt-4 text-2xl">Изпратете завка към фирмата, в която ще се обучавате</div>

                <TextField
                    variant="outlined"
                    placeholder="Търси фирма"
                    onChange={(e) => {
                        socket.send(e.target.value);
                    }}
                    slotProps={{
                        input: {
                          startAdornment: <SearchIcon/>
                        },
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "black",
                            borderWidth:"3px" 
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "black", 
                            borderWidth:"3px"
                          },
                        },
                        marginTop:"3vh"
                      }}
                    className="w-[600px] rounded-lg focus:border-black absolute left-[50%] transform -translate-x-1/2 bg-white "
                />

                <div className = {results.length > 0 ? "w-[595px] bg-white absolute left-[50%] transform -translate-x-1/2 mt-[2px] rounded-xl border-black border-x-2 border-t-2":"hidden"}>
                      {results.map((result:any,index:number)=>(
                        <div className = "flex hover:bg-gray-200 rounded-xl items-center border-b-2 border-black" onClick = {()=>{
                            setChosenCorp(index)
                        }}>
                            <div className = "px-2 py-2 text-sm ">{result.name}</div>
                            <div className = "ml-auto mr-[5px]">{result.id}</div>    
                        </div>
                      ))}
                </div>
                
                <div className = {chosenCorp != undefined ? "w-[600px] bg-white mt-40 relative left-[50%] transform -translate-x-1/2 rounded-lg border-2 border-black":"hidden"}>
                    
                    <table className="w-full text-black text-left border-separate border-spacing-4">
                        <thead className = "">
                            <tr>
                                <th className="text-center font-bold" >
                                Информация относно фирмата
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="font-medium">ЕИК</td>
                                <td>{chosenCorp !== undefined ? results[chosenCorp].id : "-"}</td>
                            </tr>
                            <tr>
                                <td className="font-medium">Име</td>
                                <td>{chosenCorp !== undefined ? results[chosenCorp].name : "-"}</td>
                            </tr>
                            <tr>
                                <td className="font-medium">Телефон</td>
                                <td>{chosenCorp !== undefined ? results[chosenCorp].telephone : "-"}</td>
                            </tr>
                            <tr>
                                <td className="font-medium">Адрес</td>
                                <td>{chosenCorp !== undefined ? results[chosenCorp].address : "-"}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className = "bg-gray-300  absolute left-[50%] transform -translate-x-1/2 mt-[10px] w-[600px] py-[5px] text-center border-2 border-black" 
                    onClick={()=>{
                        if(chosenCorp != undefined){
                            sendRequestToJoin(results[chosenCorp].id)
                            navigate("/ThankYou")
                        }
                        
                    }}>Запиши се</div>    
                </div>
                
            </div>
        </div>
    </>)
}
export default ChooseCorporation