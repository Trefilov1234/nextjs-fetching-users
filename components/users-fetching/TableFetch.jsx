import { useEffect, useState } from "react"
import style from './TableFetch.module.css'
import InputUser from "./InputUser";
import useSWR from "swr";
import Spinner from "../Spinner";
import toast from "react-hot-toast";

export default function TableFetch(){
    let fetcher = async() => {
        const response = await fetch('http://localhost:3333/users');
        if (!response.ok) throw new Error('fetch ' + response.status);
        return await response.json();
      };
    const
        [users,setUsers]=useState(null),
        {data,error,isLoading,isValidating,mutate}=useSWR('http://localhost:3333/users/',fetcher),
        //[error,setError]=useState(null),
        [selectedRow,setSelectedRow]=useState(null),
        [selectedCol,setSelectedCol]=useState(null),
        [visibleUsers,setVisibleUsers]=useState(null);
        
    let temp;
    // useEffect(()=>{
    //     async function f(){
    //         try{
    //             //setError(null);
    //             const
    //                 // res= await fetch('https://jsonplaceholder.typicode.com/users');
    //                 res= await fetch('http://localhost:3333/users');
    //             if(!res.ok) throw Error('fetch error');
    //             temp=await res.json();
    //             //console.log(temp);
    //             setUsers(temp);
    //             setVisibleUsers(Array(temp.length).fill(true));
    //         } catch(err){
    //             //setError(err);
    //         }
    //     }
    //     f(); 
    // },[]);
    let headerRow=["Name","Email","City","Phone","Website","Company name"];
    let optimisticData;
    if (error) return <h2 style={{color:'red'}}>{error.toString()}</h2>
    //if (isValidating||isLoading) return <Spinner/>
    //if(error) return <h2 style={{color:'red'}}>{error.toString()}</h2>
    if(data) 
    {
        return <>
        <div style={{ position: 'absolute', fontSize: 'xxx-large' }}>
            {isLoading && <>⌛</>}
            {isValidating && <>👁</>}
        </div>
        <table className={style.table}>
        <thead>
            <tr>{headerRow.map((el,index)=><th key={index} onClick={(event)=>{setSelectedCol(index),mutate(data.sort((a,b)=>{
                if(headerRow[index]=="Name") return a.name.localeCompare(b.name);
                if(headerRow[index]=="Email") return a.email.localeCompare(b.email);
                if(headerRow[index]=="City") return a.address.city.localeCompare(b.address.city);
                if(headerRow[index]=="Phone") return a.phone.localeCompare(b.phone);
                if(headerRow[index]=="Website") return a.website.localeCompare(b.website);
                if(headerRow[index]=="Company name") return a.company.name.localeCompare(b.company.name);
            }))}} className={selectedCol===index? style.selectedCol:null}>{el}</th>)}</tr>
        </thead>
        <tbody>
            {data.map((user,index)=>
                <tr key={index} onClick={(event)=>{setSelectedRow((old)=>old===index?null:index)}} className={ selectedRow==index?style.selected:null}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.address.city}</td>
                    <td>{user.phone}</td>
                    <td>{user.website}</td>
                    <td>{user.company.name}</td>
                    <td><button id={user.id} type="button" onClick={async event=>{
                        optimisticData=data.filter(a=>event.currentTarget.id!=a.id);
                        let promise=fetch('http://localhost:3333/users/' + event.currentTarget.id, { method: 'DELETE' })
                        .then(async res => {
                            if (!res.ok) {
                              throw (new Error(res.status + ' ' + res.statusText));
                            }
                            
                          });
                          if(promise)
                          {
                            toast.promise(promise, {
                                loading: 'Fetching delete',
                                success: 'ok',
                                error: (err) => `${err.toString()}`,
                              });
                          }
                        await mutate(promise.then(fetcher,fetcher),{optimisticData, populateCache: true, revalidate: false });
                        
                        }}>delete</button></td>
                </tr>
                
            )}
        </tbody>
    </table>
    
    <InputUser colNames={headerRow} users={data} mutate={mutate} selectedRow={selectedRow} fetcher={fetcher}/>
    {/* <div>{visibleUsers.map((el,index)=><li key={index}>{el.toString()}</li>)}</div> */}
    </>
    }
}