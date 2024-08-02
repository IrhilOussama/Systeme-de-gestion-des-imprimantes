import { useEffect, useState } from "react";
import fetchData from "../fetch";

function List({filterBtnClicked, hideList, filterOn}){
    const [departements, setDepartements] = useState([]);
    const [checkedDep, setCheckedDep] = useState(false)
    useEffect(() => {
        fetchData("departement", "get_departements")
        .then(res => {
            setDepartements(res)
        })
    }, [])
    const nodeList = departements.map((dep, i) => (
            <li key={i} className="flex items-center">
                <button onClick={() => setCheckedDep(dep.titre)} 
                className={"w-5 h-5 border-2 bg-white border-slate-500 mr-2 " + (checkedDep === dep.titre ? "bg-yellow-400" : " ") }></button>
                {dep['titre']}
                
            </li>
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
            <ul key={0} className={ "grid grid-cols-2 p-4 gap-4 bg-slate-200 dark:bg-slate-600"}>
                {nodeList}
                <li key={0} className="flex items-center">
                    <button onClick={() => setCheckedDep('')} 
                    className={"w-5 h-5 border-2 bg-white border-slate-500 mr-2 " + (checkedDep === '' ? "bg-yellow-400" : " ") }></button>
                    All
                </li>
            </ul>
            <div key={1} className="grid grid-cols-3">
                <button key={0} className="bg-slate-400 col-span-2 text-white py-3" onClick={handleApplyBtn}>Appliquer</button>
                <button key={1} className="bg-red-300 col-span-1 text-white py-3" onClick={hideList}>Close</button>

            </div>
        </div>
    )
}

export default function Header({titre, onClick, filterOn}){
    const [filterBtnClicked, setFilterBtnClicked] = useState(false);
    const [mode, setMode] = useState(localStorage['mode']);
    async function handleDocumentBtnClick(){
        await fetch('http://localhost/gestion-imprimantes-react/functions/excel/generate_excel.php');
        const a = document.createElement("A");
        a.href = 'http://localhost/gestion-imprimantes-react/functions/excel/imprimantes_data.xlsx';
        a.download = 'imprimanes_data';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
    

    if (mode !== 'dark'){
        document.documentElement.classList.remove('dark');

    }
    else {
        document.documentElement.classList.add('dark');
    }
    

    return(
        <header className="w-full md:w-11/12 lg:w-10/12 absolute top-0 right-0 p-7 bg-slate-50 dark:bg-slate-800 dark:text-white  mb-8 align-middle h-24">
            <div className="flex justify-between">
                <h1 className="font-medium text-2xl"> {titre + "s"} </h1>
                <div className="flex items-center" >
                    <button key={0} className="underline mr-4 font-medium" download onClick={handleDocumentBtnClick}>document</button>
                    <button key={1} onClick={ () => {
                        localStorage['mode'] = localStorage['mode'] === 'dark' ? 'light' : 'dark';
                        setMode(localStorage['mode'])
                    }
                        }>
                        <img className="dark:bg-white rounded-md p-1" src="../icons/moon.svg" alt="dark mode" />
                    </button>

                    <div key={2} className="flex items-center">
                        <button onClick={() => setFilterBtnClicked(!filterBtnClicked)} className="ml-3">
                            <img className="w-8 dark:bg-white rounded-md p-1" src="../icons/filter.svg" alt="filter" />
                        </button>
                        <List filterBtnClicked={filterBtnClicked} filterOn={filterOn} hideList={() => {setFilterBtnClicked(false)}} />
                    </div>
                    {titre !== 'statistique' ? (
                    <button key={3} onClick={onClick} className="bg-blue-500 text-white p-2 rounded ml-8">
                        Ajouter {titre}
                    </button>

                    ): null}
                </div>
            </div>
        </header>
    )
}