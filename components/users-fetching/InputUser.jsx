import { useState } from "react"
import style from "./InputUser.module.css"
export default function InputUsers({colNames,users,setUsers,selectedRow})
{
    const
        [inputValues,setInputValues]=useState(["","","","","",""]);
    
    return <fieldset><div className={style.main}>{inputValues.map((el,index)=><div className={style.input}><span className={style.label}>{colNames[index]}</span><input className={style.field} id ={index} type="text" value={el} onInput={(event)=>setInputValues(inputValues.map((inp,index1)=>{
        if(index1==index)
        {
            return event.target.value;
        }
        else return inp;
    }))}/></div>)}
    </div><button onClick={()=>
    setUsers(users.concat({name: inputValues[0],email: inputValues[1],address:{city: inputValues[2]},phone: inputValues[3],website: inputValues[4],company:{name: inputValues[5]}}))}>
        add</button>
    <button onClick={()=>selectedRow?setUsers(users.map((user,index)=>{
        if(selectedRow===index) return {name: inputValues[0],email: inputValues[1],address:{city: inputValues[2]},phone: inputValues[3],website: inputValues[4],company:{name: inputValues[5]}};
        else return user;
    })):alert("выберите строку")}>update</button>
        </fieldset>
}