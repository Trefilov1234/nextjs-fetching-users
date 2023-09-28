import { useEffect, useState } from "react"
import style from './TableFetch.module.css'
import InputUser from "./InputUser";
import FindUser from "./FindUser";

export default function TableFetch(){
    const
        [users,setUsers]=useState(null),
        [error,setError]=useState(null),
        [selectedRow,setSelectedRow]=useState(null),
        [selectedCol,setSelectedCol]=useState(null);
        
    useEffect(()=>{
        async function f(){
            try{
                setError(null);
                const
                    res= await fetch('https://jsonplaceholder.typicode.com/users');
                if(!res.ok) throw Error('fetch error');
                setUsers(await res.json());
            } catch(err){
                setError(err);
            }
        }
        f(); 
    },[]);
    let headerRow=["Name","Email","City","Phone","Website","Company name"];
    if(error) return <h2 style={{color:'red'}}>{error.toString()}</h2>
    if(users) 
    {
        return <><table className={style.table}>
        <thead>
            <tr>{headerRow.map((el,index)=><th key={index} onClick={(event)=>{setSelectedCol(index),setUsers(users.sort((a,b)=>{
                if(headerRow[index]=="Name") return a.name.localeCompare(b.name);
                if(headerRow[index]=="Email") return a.email.localeCompare(b.email);
                if(headerRow[index]=="City") return a.address.city.localeCompare(b.address.city);
                if(headerRow[index]=="Phone") return a.phone.localeCompare(b.phone);
                if(headerRow[index]=="Website") return a.website.localeCompare(b.website);
                if(headerRow[index]=="Company name") return a.company.name.localeCompare(b.company.name);
            }))}} className={selectedCol===index? style.selectedCol:null}>{el}</th>)}</tr>
        </thead>
        <tbody>
            {users.map((user,index)=>
                <tr key={index} onClick={(event)=>{setSelectedRow((old)=>old===index?null:index)}} className={ selectedRow==index?style.selected:null}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.address.city}</td>
                    <td>{user.phone}</td>
                    <td>{user.website}</td>
                    <td>{user.company.name}</td>
                    <td><button id={index} type="button" onClick={event=>setUsers(users.filter(a=>event.currentTarget.id!=users.indexOf(a)))}>delete</button></td>
                </tr>
                
            )}
        </tbody>
    </table>
    
    <InputUser colNames={headerRow} users={users} setUsers={setUsers} selectedRow={selectedRow}/>
    </>
    }
}