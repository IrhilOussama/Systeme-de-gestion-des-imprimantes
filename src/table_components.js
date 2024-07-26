import { useState } from "react";
import FetchUrl from './fetch';

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
            <div className={`text-center ${myClass} mb-3 bg-myColor1`}>
                {nodeList}
            </div>
        </>
    )
}

export function ModificationButtons({myId, title, triggerRefresh, editableRowId, onClickModificationBtn, onClickSaveBtn, }){
    const [toggle, setToggle] = useState(true);
    return (
        <div className="flex items-center justify-evenly text-base text-center">
            {toggle === false && myId === editableRowId
            ? (
                <button onClick={() => {setToggle(true); onClickSaveBtn(myId)}} className='no-underline text-green-500'><img src='../icons/check.svg' alt='check' /></button>
            )
            : (
                <button onClick={(e) => {setToggle(false); ;e.preventDefault(); onClickModificationBtn(myId)}} className='no-underline text-amber-500'><img src='../icons/edit.svg' alt='edit' /></button>
            )}
            
            <button onClick={ async () =>{
                const res = await FetchUrl(`http://localhost/gestion-imprimantes-react/functions/supprimer.php?id=${myId}&table=${title}s`);
                if (res.deleted === false){
                    if (title === 'imprimante'){
                        if (res.toners.length === 1){
                            await FetchUrl(`http://localhost/gestion-imprimantes-react/functions/supprimer.php?id=${res.toners[0].id}&table=toners`);
                        }
                        if (res.utilisateurs.length === 1){
                            await FetchUrl(`http://localhost/gestion-imprimantes-react/functions/supprimer.php?id=${res.utilisateurs[0].id}&table=utilisateurs`);
                        }
                        await FetchUrl(`http://localhost/gestion-imprimantes-react/functions/supprimer.php?id=${myId}&table=${title}s`);
                    }
                }
                triggerRefresh()
            }}
            className='no-underline'><img src='../icons/delete.svg' alt='delete' /></button>
        </div>
    )
}
