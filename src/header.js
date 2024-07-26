import { useEffect, useState } from "react";
import FetchUrl from "./fetch";

function List({filterBtnClicked, hideList, filterOn}){
    const [departements, setDepartements] = useState([]);
    const [checkedDep, setCheckedDep] = useState(false)
    useEffect(() => {
        FetchUrl("http://localhost/gestion-imprimantes-react/functions/getters/get_departements.php")
        .then(res => {
            setDepartements(res)
        })
    }, [])
    const nodeList = departements.map((dep, i) => (
        <>
            <li key={i} className="flex items-center">
                <button onClick={() => setCheckedDep(dep.titre)} 
                className={"w-5 h-5 border-2 bg-white border-slate-500 mr-2 " + (checkedDep === dep.titre ? "bg-yellow-400" : " ") }></button>
                {dep['titre']}
                
            </li>
        </>
    ));
    let myClass = "opacity-0 mt-2 pointer-events-none";
    if (filterBtnClicked === true) {
        myClass = "";
    }
    function handleApplyBtn(){
        if (checkedDep !== false ){
            filterOn(checkedDep)
        }
    }
    return (
        <div className={"flex flex-col absolute duration-500 right-6 bottom-0 translate-y-full z-10 rounded shadow-sm shadow-slate-400 "  + myClass}>
            <ul className={ "grid grid-cols-2 p-4 gap-4 bg-slate-200"}>
                {nodeList}
                <li key={99} className="flex items-center">
                    <button onClick={() => setCheckedDep('')} 
                    className={"w-5 h-5 border-2 bg-white border-slate-500 mr-2 " + (checkedDep === '' ? "bg-yellow-400" : " ") }></button>
                    All
                </li>
            </ul>
            <div className="grid grid-cols-3">
                <button className="bg-slate-400 col-span-2 text-white py-3" onClick={handleApplyBtn}>Appliquer</button>
                <button className="bg-red-300 col-span-1 text-white py-3" onClick={hideList}>Close</button>

            </div>
        </div>
    )
}

export default function Header({titre, onClick, filterOn}){
    const [filterBtnClicked, setFilterBtnClicked] = useState(false);
    return(
        <header className="w-full md:w-11/12 lg:w-10/12 absolute top-0 right-0 p-7 bg-slate-50  mb-8 align-middle h-24">
            <div className="flex justify-between">
                <h1 className="font-medium text-2xl"> {titre + "s"} </h1>
            <div className="flex " >
                <button>
                    <img src="../icons/moon.svg" alt="dark mode" />
                </button>

                <div className="flex items-center">
                    <button onClick={() => setFilterBtnClicked(!filterBtnClicked)} className="ml-3">
                        <img className="w-6" src="../icons/filter.svg" alt="filter" />
                    </button>
                    <List filterBtnClicked={filterBtnClicked} filterOn={filterOn} hideList={() => {setFilterBtnClicked(false)}} />
                </div>

                <button onClick={onClick} className="bg-blue-500 text-white p-2 rounded ml-8">
                    Ajouter {titre}
                </button>

            </div>
            </div>
        </header>
    )
}