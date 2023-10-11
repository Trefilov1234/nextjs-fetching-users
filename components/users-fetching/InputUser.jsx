import { useState } from "react"
import style from "./InputUser.module.css"
import toast from "react-hot-toast";
export default function InputUsers({colNames,users,mutate,selectedRow,fetcher})
{
    const
        [inputValues,setInputValues]=useState(["","","","","",""]);
    let optimisticData;
    return <fieldset><div className={style.main}>{inputValues.map((el,index)=><div className={style.input}><span className={style.label}>{colNames[index]}</span><input className={style.field} id ={index} type="text" value={el} onInput={(event)=>setInputValues(inputValues.map((inp,index1)=>{
        if(index1==index)
        {
            return event.target.value;
        }
        else return inp;
    }))}/></div>)}
    </div><button onClick={async ()=>
    {
        let userId;
        let addedUser={name: inputValues[0],email: inputValues[1],address:{city: inputValues[2]},
        phone: inputValues[3],website: inputValues[4],company:{name: inputValues[5]}};
        optimisticData=users.concat(addedUser);
            let promise=fetch('http://localhost:3333/users/', { method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(addedUser) })
                            .then(async res => {
                                if (!res.ok) {
                                throw (new Error(res.status + ' ' + res.statusText));
                                }
                                
                            });
                            if(promise)
                            {
                                toast.promise(promise, {
                                    loading: 'Fetching post',
                                    success: 'ok',
                                    error: (err) => `${err.toString()}`,
                                });
                            }
                            await mutate(promise.then(fetcher,fetcher),{optimisticData, populateCache: true, revalidate: false });
    }
    }>
        add</button>
    <button onClick={ async()=>{
       console.log(selectedRow);
        if(selectedRow||selectedRow==0)
        {
            console.log(selectedRow);
            let userId;
            let updatedUser;
            optimisticData=users.map((user,index)=>{
                if(selectedRow===index) 
                {
                    userId=user.id;
                    updatedUser={name: inputValues[0],email: inputValues[1],address:{city: inputValues[2]},
                    phone: inputValues[3],website: inputValues[4],company:{name: inputValues[5]}};
                    return updatedUser;
                }
                else return user;
            });
            console.log(optimisticData);
            let promise=fetch('http://localhost:3333/users/' + userId, { method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedUser) })
                            .then(async res => {
                                if (!res.ok) {
                                throw (new Error(res.status + ' ' + res.statusText));
                                }
                                
                            });
                            if(promise)
                            {
                                toast.promise(promise, {
                                    loading: 'Fetching update',
                                    success: 'ok',
                                    error: (err) => `${err.toString()}`,
                                });
                            }
                            await mutate(promise.then(fetcher,fetcher),{optimisticData, populateCache: true, revalidate: false });

        }
    }}>update</button>
        </fieldset>
}