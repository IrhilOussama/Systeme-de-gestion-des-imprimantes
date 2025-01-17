import React, { useState, useEffect, useContext} from 'react'; 
import FetchUrl from '../fetch.js';
import {Head, ModificationButtons} from './table_components';
import fetchData from '../fetch.js';

import { AppContext } from '../App.js';



function Rows(){
    const {refreshData, triggerRefresh} = useContext(AppContext);
    const [rows, setRows] = useState([]);
    const [imprimantes, setImprimantes] = useState([]);
    // form data to send to update_departement.php when update
    const [myFormData, setMyFormData] = useState({
        id: "",
        titre: ""
    })
    const [editableRowId, setEditableRowId] = useState(-1);
    // the form data will get the data of the (to update) row
    useEffect(() => {
        const editableRow = rows.find(row => row.id === editableRowId);
        if (editableRow !== undefined)
            setMyFormData({
                id: editableRow.id,
                titre: editableRow.titre
            })
    }, [rows, editableRowId])
    // updating data when submiting form
    async function handleFormSubmit(e){
        e.preventDefault();
        const readyFormData = new FormData();
        for (let key in myFormData){
            if (myFormData.hasOwnProperty(key)){
                readyFormData.append(key, myFormData[key]);
            }
        }
        try {
            const response = await fetchData("departement", "update", "POST", readyFormData);

            await response.text(); // Use response.json() if your PHP returns JSON
        } catch (error) {
            console.error('Error:', error);
        }
        triggerRefresh();
        setEditableRowId(-1);
    }
    // getting departements
    useEffect(() => {
        FetchUrl("departement", 'get_departements')
        .then(res => {
            setRows(res);
        })
        FetchUrl("imprimante", "get_imprimantes")
        .then(res => {
            setImprimantes(res);
        })
    }, [refreshData])

    function getImprimantesNumber(imprimantes){
        let currentImpriantesNumber = 0;
        imprimantes.forEach(imp => {
          currentImpriantesNumber += imp.stock;
        })
        return currentImpriantesNumber;
    }

    const myNodeList = [];
    rows.forEach((row, i) => {
        let isEditable = row.id === editableRowId;
        let editableExist = editableRowId !== -1;
        const inputsClasses = 
        "w-full bg-transparent flex justify-center items-center focus:outline-none font-medium text-xs md:text-sm lg:text-base h-full outline-none text-center py-3 duration-200 " 
        +(isEditable ? "bg-green-200 focus:border-blue-500 border-b border-transparent dark:bg-amber-950 dark:shadow-amber-500 " : "") ;
        myNodeList.push(
            <form key={i} onSubmit={handleFormSubmit} 
            className={"grid mygrid-3 text-center dark:text-white "
            + ( (isEditable) ? "bg-amber-50 shadow-sm shadow-slate-300 dark:bg-amber-950 dark:shadow-amber-500 " 
            : " hover:bg-myColor1 hover:shadow-sm hover:shadow-slate-300 dark:hover:bg-blue-900 dark:hover:shadow-slate-400 "
            + (editableExist && !isEditable ? " pointer-events-none" : ""))}>
                <div>
                    <input 
                        readOnly={!isEditable}  
                        onChange={(e) => {
                            setMyFormData({...myFormData, titre: e.target.value});
                        }}
                        name='titre'
                        type='text' 
                        placeholder="Titre" 
                        className={inputsClasses} 
                        value={isEditable ? myFormData.titre : row.titre}
                    />
                </div>
                <div>
                    <p className={inputsClasses}> {getImprimantesNumber(imprimantes.filter(imp => imp['departement_id'] === row['id']))} </p>
                </div>
                <ModificationButtons 
                    myId={row.id} 
                    name='departement'
                    title={'departement'} 
                    triggerRefresh={triggerRefresh} 
                    onClickModificationBtn={setEditableRowId}
                    editableRowId={editableRowId}
                    onClickSaveBtn={() => {setEditableRowId(-1)}}
                />

            </form>
        )
    })
    return(
        <>
        {myNodeList}
        </>
    )
}



export default function TableDepartement({onClickAddUserBtn}){
    const departement_columns = ["titre", "nombre des imprimantes", "action"];

    return(
        <div className="absolute w-10/12 right-0 mt-24 p-6">
            <Head key={0} columns={departement_columns}/>
            <Rows 
            onClickAddUserBtn={onClickAddUserBtn}
             key={1} 
             imprimante_columns={departement_columns} />
        </div>
    )
}

