import { useEffect, useState } from "react"
import style from './TableFetch.module.css'

export default function TableFetch(){
    const
        [users,setUsers]=useState(null),
        [error,setError]=useState(null);
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
    });
    if(error) return <h2 style={{color:'red'}}>{error.toString()}</h2>
    if(users) return <table className={style.table}>
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>City</th>
                <th>Phone</th>
                <th>Website</th>
                <th>Company name</th>
            </tr>
        </thead>
        <tbody>
            {users.map(user=>
            <tr>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.address.city}</td>
                <td>{user.phone}</td>
                <td>{user.website}</td>
                <td>{user.company.name}</td>
            </tr>)}
        </tbody>
    </table>
}