import { useState } from "react"
import style from './CalendarInput.module.css'

export default function CalendarInput(){
    const
        [inputValue,SetInputValue]=useState(''),
        [outputValue,SetOutputValue]=useState([]);
    return <>
        <input type="text" placeholder="xx xxxx" title="Month year format: xx xxxx" value={inputValue} onInput={evt=>SetInputValue(evt.target.value)}/>
        <input type="button" value="показать календарь на указанный месяц" onClick={()=>{
            if(!inputValue)
            {
                
            }
            else{
                let regexp=new RegExp('[0-9]{1,2} [0-9]{4}$');
                if(!regexp.test(inputValue))
                {
                    SetOutputValue('incorrect input');
                }
                else{
                    let temp=inputValue.split(' ');
                    let _=MonthAndShiftRecognizer(parseInt(temp[0]),parseInt(temp[1]));
                    SetOutputValue(month(_.shiftBegin, _.days ))}
                }  
            }
        }/>
        <table className={style.table}><tbody>{outputValue =='incorrect input'?'incorrect input':outputValue.map((el,index)=><tr key={index}>{el.map((el1,index1)=><td key={index1}>{el1}</td>)}</tr>)}</tbody></table>
    </>
}
function month(startShift, days) { 
    let str=[];
    for (let m = 1 - startShift; m <= days; m += 7) 
    {    
        str.push(week(m, days));  
    }
    return str;
}

function week(monday, days) {  
    let str = [];  
    for (let i = monday; i < monday + 7; i++) 
    {    let cell = String(i);    
        if (i < 1 || i > days) cell = ' ';       
        str.push(cell); 
    }  
    return str;
}
function MonthAndShiftRecognizer(monthNumber,year)
{
    let days;
    let shiftBegin;
    let shiftEnd;
    let D1 = new Date();
    let D1Nfirst = new Date(year,monthNumber-1,1).getDay();
    if(D1Nfirst!=0)
    {
        shiftBegin=D1Nfirst-1;
    }
    else{
        shiftBegin=6;
    }
    switch(monthNumber){
        case 1:
            days=31;
            alert(D1.getMonth());
            break;
        case 2:
            days=28;
            break;
        case 3:
            days=31;
            break;
        case 4:
            days=30;
            break;
        case 5:
            days=31;
            break;
        case 6:
            days=30;
            break;
        case 7:
            days=31;
            break;
        case 8:
            days=31;
            break;
        case 9:
            days=30;
            break;
        case 10:
            days=31;
            break;
        case 11:
            days=30;
            break;
        case 12:
            days=31;
            break;
        default:
            days=0;
        
        
    }
    return {days,shiftBegin};
}