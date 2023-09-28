import { useState } from "react"

export default function FindUser({users,visibleUsers,setVisibleUsers})
{
    const
        [inputValue,setInputValue]=useState(null);
    return <><div>Search</div><input value={inputValue} onInput={(event)=>{
        setInputValue(event.target.value);
        alert(inputValue);
        users.map((user,index)=>{if(user.name.includes(inputValue)||user.email.includes(inputValue)||user.address.city.includes(inputValue)||user.phone.includes(inputValue)
            ||user.website.includes(inputValue)||user.company.name.includes(inputValue)){
            setVisibleUsers(visibleUsers.map((a,index1)=>{
                if(index!=index1)
                {
                    return false
                }
                else return true
            }))
        }})
    }}/></>
}