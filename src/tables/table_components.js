import { useState } from "react";
import FetchUrl from '../fetch';
import fetchData from "../fetch";

export function Head({columns}){
    let nodeList = [];
    
    nodeList = columns.map((column, i) => column === "stock"
    ? <div className="flex items-center justify-center">
        <img className="cursor-pointer" src="../icons/order.svg" alt="" />
        <h2 key={i} className="py-3 ml-2 font-semibold text-xs md:text-sm lg:text-base"> {column} </h2>
    </div>
    : <h2 key={i} className="py-3 font-semibold text-xs md:text-sm lg:text-base"> {column} </h2>)
    let myClass = "mygrid-" + nodeList.length;
    return(
        <>
            <div className={`text-center ${myClass} mb-3 bg-myColor1 dark:bg-blue-800 dark:text-white`}>
                {nodeList}
            </div>
        </>
    )
}

export function ModificationButtons({myId, title, triggerRefresh, editableRowId, onClickModificationBtn, onClickSaveBtn, }){
    const [toggle, setToggle] = useState(true);
    const myFormData = new FormData();
    myFormData.append('id', myId);
    return (
        <div className="flex items-center justify-evenly text-base text-center">
            {toggle === false && myId === editableRowId
            ? (
                <button onClick={() => {setToggle(true); onClickSaveBtn(myId)}} className='no-underline text-green-500'><img src='../icons/check.svg' alt='check' /></button>
            )
            : (
                <button onClick={(e) => {setToggle(false); ;e.preventDefault(); onClickModificationBtn(myId)}} className='no-underline text-amber-500'><img src='../icons/edit.svg' alt='edit' /></button>
            )}
            
            <button onClick={ async (e) =>{
                e.preventDefault();
                const res = await fetchData(title, 'delete', 'POST', myFormData);
                console.log(res)
                triggerRefresh()
            }}
            className='no-underline'><img src='../icons/delete.svg' alt='delete' /></button>
        </div>
    )
}
